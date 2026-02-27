// app/api/content/hero/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET() {
  try {
    await connectToDatabase();
    const content = await Content.findOne().sort({ publishedAt: -1 });
    
    if (!content || !content.data || !content.data.hero) {
      return NextResponse.json(null);
    }
    
    return NextResponse.json(content.data.hero);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero' },
      { status: 500 }
    );
  }
}