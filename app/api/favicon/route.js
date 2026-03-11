import path from 'path';
import { readFile } from 'fs/promises';
import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

const getContentType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.webp') return 'image/webp';
  return 'image/x-icon';
};

const buildResponse = (buffer, contentType) => {
  return new Response(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    },
  });
};

export async function GET() {
  const fallbackPath = path.join(process.cwd(), 'public', 'favicon.ico');
  try {
    await connectDB();
    const settings = await SiteSettings.findOne();
    const rawPath = settings?.favicon || '/favicon.ico';
    const faviconPath = rawPath.split('?')[0];

    if (faviconPath.startsWith('http://') || faviconPath.startsWith('https://')) {
      const res = await fetch(faviconPath, { cache: 'no-store' });
      if (!res.ok) throw new Error('Remote favicon fetch failed');
      const arrayBuffer = await res.arrayBuffer();
      return buildResponse(arrayBuffer, res.headers.get('content-type') || 'image/x-icon');
    }

    const safePath = faviconPath.startsWith('/') ? faviconPath.slice(1) : faviconPath;
    const localPath = path.join(process.cwd(), 'public', safePath);
    const buffer = await readFile(localPath);
    return buildResponse(buffer, getContentType(localPath));
  } catch (error) {
    const fallback = await readFile(fallbackPath);
    return buildResponse(fallback, getContentType(fallbackPath));
  }
}
