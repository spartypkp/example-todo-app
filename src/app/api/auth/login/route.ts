import { createUserSession, verifyPassword } from '@/lib/auth';
import { getUserByEmail } from '@/lib/db';
import { validateEmail } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		// Validation
		if (!email || !password) {
			return NextResponse.json(
				{ error: { code: 'MISSING_CREDENTIALS', message: 'Email and password required' } },
				{ status: 400 }
			);
		}

		if (!validateEmail(email)) {
			return NextResponse.json(
				{ error: { code: 'INVALID_EMAIL', message: 'Invalid email format' } },
				{ status: 400 }
			);
		}

		// Find user
		const user = getUserByEmail(email);
		if (!user) {
			return NextResponse.json(
				{ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
				{ status: 401 }
			);
		}

		// Verify password
		const isValid = await verifyPassword(password, user.passwordHash);
		if (!isValid) {
			return NextResponse.json(
				{ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
				{ status: 401 }
			);
		}

		// Create session
		await createUserSession(user.id);

		// Simple logging
		console.log('User logged in:', email);

		return NextResponse.json({
			user: {
				id: user.id,
				name: user.name,
				email: user.email
			}
		});
	} catch (error) {
		console.error('Login error:', error);

		return NextResponse.json(
			{ error: { code: 'LOGIN_FAILED', message: 'Login failed. Please try again.' } },
			{ status: 500 }
		);
	}
}