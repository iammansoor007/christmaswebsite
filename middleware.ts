import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-change-this'
);

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes
    if (pathname.startsWith('/admin')) {
        // Allow login page through without checking token
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('cms_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            const { payload } = await jwtVerify(token, JWT_SECRET);
            if (!payload || payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
            return NextResponse.next();
        } catch {
            // Token invalid/expired — clear cookie and redirect
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.set({ name: 'cms_token', value: '', expires: new Date(0), path: '/' });
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    // Use the new "matcher" pattern — the middleware file itself is fine,
    // Next.js 16 just changed the filename convention to "proxy.ts" but
    // middleware.ts still works at runtime.
    matcher: ['/admin/:path*'],
};
