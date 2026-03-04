import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { getAuthUser } from '@/lib/auth';

// GET /api/services/[id]
export async function GET(request, { params }) {
    try {
        await connectDB();
        const service = await Service.findById(params.id);
        if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        return NextResponse.json({ service });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
    }
}

// PUT /api/services/[id]
export async function PUT(request, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await connectDB();
        const body = await request.json();

        // Re-generate slug if title changed and slug not manually set
        if (body.title && !body.slug) {
            body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        const service = await Service.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
        if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        return NextResponse.json({ service });
    } catch (error) {
        return NextResponse.json({ error: error.message || 'Failed to update service' }, { status: 500 });
    }
}

// DELETE /api/services/[id]
export async function DELETE(request, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await connectDB();
        const service = await Service.findByIdAndDelete(params.id);
        if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
