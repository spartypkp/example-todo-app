import { requireAuth } from '@/lib/auth';
import { deleteTask, getTask, updateTask } from '@/lib/db';
import { validateTaskTitle } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string; }>; }
) {
	try {
		const user = await requireAuth();
		const { id } = await params;
		const task = getTask(id, user.id);

		if (!task) {
			return NextResponse.json(
				{ error: { code: 'NOT_FOUND', message: 'Task not found' } },
				{ status: 404 }
			);
		}

		return NextResponse.json({ task });
	} catch (error) {
		if (error instanceof Error && error.message === 'Unauthorized') {
			return NextResponse.json(
				{ error: { code: 'UNAUTHORIZED', message: 'Please login to view tasks' } },
				{ status: 401 }
			);
		}

		console.error('Get task error:', error);

		return NextResponse.json(
			{ error: { code: 'FETCH_FAILED', message: 'Failed to fetch task' } },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string; }>; }
) {
	try {
		const user = await requireAuth();
		const { id } = await params;
		const body = await request.json();

		// Validate title if provided
		if (body.title !== undefined && !validateTaskTitle(body.title)) {
			return NextResponse.json(
				{ error: { code: 'INVALID_TITLE', message: 'Title must be 100 characters or less' } },
				{ status: 400 }
			);
		}

		const task = updateTask(id, user.id, body);

		if (!task) {
			return NextResponse.json(
				{ error: { code: 'NOT_FOUND', message: 'Task not found' } },
				{ status: 404 }
			);
		}

		console.log('Task updated:', id);

		return NextResponse.json({ task });
	} catch (error) {
		if (error instanceof Error && error.message === 'Unauthorized') {
			return NextResponse.json(
				{ error: { code: 'UNAUTHORIZED', message: 'Please login to update tasks' } },
				{ status: 401 }
			);
		}

		console.error('Update task error:', error);

		return NextResponse.json(
			{ error: { code: 'UPDATE_FAILED', message: 'Failed to update task' } },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string; }>; }
) {
	try {
		const user = await requireAuth();
		const { id } = await params;

		const deleted = deleteTask(id, user.id);

		if (!deleted) {
			return NextResponse.json(
				{ error: { code: 'NOT_FOUND', message: 'Task not found' } },
				{ status: 404 }
			);
		}

		console.log('Task deleted:', id);

		return NextResponse.json({ success: true });
	} catch (error) {
		if (error instanceof Error && error.message === 'Unauthorized') {
			return NextResponse.json(
				{ error: { code: 'UNAUTHORIZED', message: 'Please login to delete tasks' } },
				{ status: 401 }
			);
		}

		console.error('Delete task error:', error);

		return NextResponse.json(
			{ error: { code: 'DELETE_FAILED', message: 'Failed to delete task' } },
			{ status: 500 }
		);
	}
}