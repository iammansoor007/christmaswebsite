// app/api/test-db/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Content from '../../../models/Content';

export async function GET() {
  try {
    // Test connection
    console.log('Attempting to connect to database...');
    await connectToDatabase();
    console.log('Database connected successfully');

    // Try to find any content
    const count = await Content.countDocuments();
    console.log(`Found ${count} documents in contents collection`);

    // Try to get the latest content
    const content = await Content.findOne().sort({ publishedAt: -1 });
    
    if (!content) {
      return NextResponse.json({ 
        success: false, 
        message: 'No content found in database',
        count: 0
      });
    }

    // Check if services data exists
    const hasServices = !!(content.data && content.data.services);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected',
      count,
      hasServices,
      servicesExists: hasServices,
      dataKeys: content.data ? Object.keys(content.data) : [],
      lastUpdated: content.publishedAt
    });

  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}