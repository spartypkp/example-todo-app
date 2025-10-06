import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Simple in-memory rate limiting store
const rateLimit = new Map<string, { count: number; resetTime: number; }>();

export function middleware(request: NextRequest) {
	// Rate limiting logic
	const ip = request.ip || 'unknown';
	const now = Date.now();
	const windowMs = 60 * 1000; // 1 minute window
	const maxRequests = 100; // Max 100 requests per minute

	const userLimit = rateLimit.get(ip);

	if (userLimit && userLimit.resetTime > now) {
		if (userLimit.count >= maxRequests) {
			return new NextResponse('Too Many Requests', { status: 429 });
		}
		userLimit.count++;
	} else {
		rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
	}

	// Clean up old entries periodically
	if (Math.random() < 0.01) {
		for (const [key, value] of rateLimit.entries()) {
			if (value.resetTime <= now) {
				rateLimit.delete(key);
			}
		}
	}

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