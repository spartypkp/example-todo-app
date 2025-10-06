import { createUserSession, hashPassword } from '@/lib/auth';
import { createUser, getUserByEmail } from '@/lib/db';
import { validateName, validatePassword } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { name, email, password } = await request.json();

		// Proper validation per spec
		if (!name || !email || !password) {
			return NextResponse.json(
				{ error: 'All fields are required' },
				{ status: 400 }
			);
		}

		// Validate name
		if (!validateName(name)) {
			return NextResponse.json(
				{ error: 'Name must be 1-50 characters' },
				{ status: 400 }
			);
		}

		// Validate password length
		if (!validatePassword(password)) {
			return NextResponse.json(
				{ error: 'Password must be at least 6 characters' },
				{ status: 400 }
			);
		}

		// Check if user exists
		const existingUser = getUserByEmail(email);
		if (existingUser) {
			return NextResponse.json(
				{ error: 'Email already registered' },
				{ status: 400 }
			);
		}

		// Create user
		const passwordHash = await hashPassword(password);
		const user = createUser(name, email, passwordHash);

		// Create session
		await createUserSession(user.id);

		// Simple logging
		console.log('User registered:', email);

		return NextResponse.json({
			user: {
				id: user.id,
				name: user.name,
				email: user.email
			}
		});
	} catch (error) {
		console.error('Registration error:', error);

		return NextResponse.json(
			{ error: 'Registration failed. Please try again.' },
			{ status: 500 }
		);
	}
}