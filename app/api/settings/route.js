import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    try {
        await connectDB();
        let settings = await SiteSettings.findOne();
        return NextResponse.json({ settings });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        await connectDB();
        const body = await request.json();
        const settings = await SiteSettings.findOneAndUpdate({}, body, { new: true, upsert: true });
        return NextResponse.json({ settings });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
