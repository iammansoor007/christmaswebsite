import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HomepageContent from '@/models/HomepageContent';
import { getAuthUser } from '@/lib/auth';

// GET /api/homepage
export async function GET() {
    try {
        await connectDB();
        let content = await HomepageContent.findOne();
        if (!content) {
            // Return empty object if not seeded yet
            return NextResponse.json({ content: null });
        }
        return NextResponse.json({ content });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch homepage content' }, { status: 500 });
    }
}

// PUT /api/homepage
export async function PUT(request) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await connectDB();
        const body = await request.json();

        const content = await HomepageContent.findOneAndUpdate(
            {},
            body,
            { new: true, upsert: true, runValidators: true }
        );
        return NextResponse.json({ content });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update homepage content' }, { status: 500 });
    }
}
