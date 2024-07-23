import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Extract valid2fa from cookies
    const valid2fa: any = request.cookies.get('valid2fa');

    // Redirect based on condition
    if ((pathname === '/dashboard' || pathname === '/profile') && (!valid2fa || valid2fa?.value == 'false')) {
        // Redirect to a different URL
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow the request to continue
    return NextResponse.next();
}