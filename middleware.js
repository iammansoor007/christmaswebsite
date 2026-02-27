// middleware.js
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    let res = NextResponse.next()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return req.cookies.get(name)?.value
                },
                set(name, value, options) {
                    res.cookies.set({ name, value, ...options })
                },
                remove(name, options) {
                    res.cookies.set({ name, value: '', ...options })
                },
            },
        }
    )

    const { data: { session } } = await supabase.auth.getSession()

    // Check if trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (req.nextUrl.pathname === '/admin/login') {
            return res
        }

        // Redirect to login if no session
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', req.url))
        }
    }

    return res
}

export const config = {
    matcher: ['/admin/:path*']
}