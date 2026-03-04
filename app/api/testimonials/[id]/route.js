import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { getAuthUser } from '@/lib/auth';

export async function PUT(request, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        await connectDB();
        const body = await request.json();
        const testimonial = await Testimonial.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
        if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ testimonial });
    } catch (error) {
        return NextResponse.json({ error: error.message || 'Failed to update' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        await connectDB();
        const testimonial = await Testimonial.findByIdAndDelete(params.id);
        if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
