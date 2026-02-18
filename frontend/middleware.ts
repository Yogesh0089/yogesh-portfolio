import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
        // Exclude the login page from protection
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for admin_token cookie
        const token = request.cookies.get('admin_token');

        if (!token) {
            // Redirect to login if no token
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
