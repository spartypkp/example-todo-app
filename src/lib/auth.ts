import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { createSession, deleteSession, getSession, getUserById } from './db';

const SESSION_COOKIE = 'todo-session';

// Password hashing
export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

// Session management
export async function createUserSession(userId: string) {
	const session = createSession(userId);

	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE, session.id, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/'
	});

	return session;
}

export async function getCurrentUser() {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

	if (!sessionId) return null;

	const session = getSession(sessionId);
	if (!session) return null;

	return getUserById(session.userId);
}

export async function requireAuth() {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('Unauthorized');
	}
	return user;
}

export async function logout() {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

	if (sessionId) {
		deleteSession(sessionId);
		cookieStore.delete(SESSION_COOKIE);
	}
}
