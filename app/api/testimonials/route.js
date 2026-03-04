import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { getAuthUser } from '@/lib/auth';

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const status = searchParams.get('status') || '';

        const query = status ? { status } : {};
        const total = await Testimonial.countDocuments(query);
        const testimonials = await Testimonial.find(query)
            .sort({ order: 1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return NextResponse.json({ testimonials, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await connectDB();
        const body = await request.json();
        const testimonial = new Testimonial(body);
        await testimonial.save();
        return NextResponse.json({ testimonial }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message || 'Failed to create testimonial' }, { status: 500 });
    }
}
