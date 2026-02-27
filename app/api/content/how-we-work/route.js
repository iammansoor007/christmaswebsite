// app/api/content/how-we-work/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET() {
  try {
    await connectToDatabase();
    const content = await Content.findOne().sort({ publishedAt: -1 });
    
    if (!content || !content.data || !content.data.howWeWork) {
      return NextResponse.json(null);
    }
    
    return NextResponse.json(content.data.howWeWork);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch how we work data' },
      { status: 500 }
    );
  }
}