import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { getAuthUser } from '@/lib/auth';

// GET /api/services/[id]
export async function GET(request, { params }) {
    try {
        await connectDB();
        const url = new URL(request.url);
        const id = params?.id || url.pathname.split('/').pop();
        const service = await Service.findById(id) || await Service.findOne({ slug: id });
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
        const url = new URL(request.url);
        const id = params?.id || url.pathname.split('/').pop();

        // Re-generate slug if title changed and slug not manually set
        if (body.title && !body.slug) {
            body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        const service = await Service.findByIdAndUpdate(id, body, { new: true, runValidators: true })
            || await Service.findOneAndUpdate({ slug: id }, body, { new: true, runValidators: true });
        if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        return NextResponse.json({ service });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
        }
        return NextResponse.json({ error: error.message || 'Failed to update service' }, { status: 500 });
    }
}

// DELETE /api/services/[id]
export async function DELETE(request, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await connectDB();
        const url = new URL(request.url);
        const id = params?.id || url.pathname.split('/').pop();
        const service = await Service.findByIdAndDelete(id)
            || await Service.findOneAndDelete({ slug: id });
        if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
