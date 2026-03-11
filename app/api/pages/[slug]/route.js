import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PageContent from '@/models/PageContent';
import { getAuthUser } from '@/lib/auth';

// GET /api/pages/[slug]
export async function GET(request, { params }) {
  try {
    await connectDB();
    const page = await PageContent.findOne({ slug: params.slug });
    return NextResponse.json({ page });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
  }
}

// PUT /api/pages/[slug]
export async function PUT(request, { params }) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await request.json();
    const page = await PageContent.findOneAndUpdate(
      { slug: params.slug },
      { slug: params.slug, data: body },
      { new: true, upsert: true, runValidators: true }
    );
    return NextResponse.json({ page });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update page content' }, { status: 500 });
  }
}
