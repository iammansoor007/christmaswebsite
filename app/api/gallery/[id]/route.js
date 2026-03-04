import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import GalleryItem from '@/models/GalleryItem';
import { getAuthUser } from '@/lib/auth';

export async function PUT(request, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        await connectDB();
        const body = await request.json();
        const item = await GalleryItem.findByIdAndUpdate(params.id, body, { new: true });
        if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ item });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        await connectDB();
        const item = await GalleryItem.findByIdAndDelete(params.id);
        if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
