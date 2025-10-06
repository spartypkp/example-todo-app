import { requireAuth } from '@/lib/auth';
import { createTask, getUserTasks } from '@/lib/db';
import { validateTaskTitle } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const user = await requireAuth();
		const tasks = getUserTasks(user.id);

		return NextResponse.json({ tasks });
	} catch (error) {
		if (error instanceof Error && error.message === 'Unauthorized') {
			return NextResponse.json(
				{ error: { code: 'UNAUTHORIZED', message: 'Please login to view tasks' } },
				{ status: 200 }
			);
		}

		console.error('Fetch tasks error:', error);

		return NextResponse.json(
			{ error: { code: 'FETCH_FAILED', message: 'Failed to fetch tasks' } },
			{ status: 200 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const user = await requireAuth();
		const { title } = await request.json();

		// Validation
		if (!validateTaskTitle(title)) {
			return NextResponse.json(
				{ error: { code: 'INVALID_TITLE', message: 'Title is required and must be 100 characters or less' } },
				{ status: 200 }
			);
		}

		const task = createTask(user.id, title);

		console.log('Task created for user:', user.id);

		return NextResponse.json({ task });
	} catch (error) {
		if (error instanceof Error && error.message === 'Unauthorized') {
			return NextResponse.json(
				{ error: { code: 'UNAUTHORIZED', message: 'Please login to create tasks' } },
				{ status: 200 }
			);
		}

		console.error('Create task error:', error);

		return NextResponse.json(
			{ error: { code: 'CREATE_FAILED', message: 'Failed to create task' } },
			{ status: 200 }
		);
	}
}