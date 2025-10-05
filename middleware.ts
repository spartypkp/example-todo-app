import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const sessionCookie = request.cookies.get('todo-session');
	const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
		request.nextUrl.pathname.startsWith('/register');
	const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

	// If trying to access dashboard without session, redirect to login
	if (isDashboard && !sessionCookie) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// If already logged in and trying to access auth pages, redirect to dashboard
	if (isAuthPage && sessionCookie) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/login', '/register'],
};