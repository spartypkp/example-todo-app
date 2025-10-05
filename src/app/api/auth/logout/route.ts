import { logout } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		await logout();

		// Simple logging
		console.log('User logged out');

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Logout error:', error);

		return NextResponse.json(
			{ error: { code: 'LOGOUT_FAILED', message: 'Failed to logout' } },
			{ status: 500 }
		);
	}
}