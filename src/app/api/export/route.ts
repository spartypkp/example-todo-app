import { requireAuth } from '@/lib/auth';
import { getUserTasks } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const user = await requireAuth();
		const tasks = getUserTasks(user.id);

		// Generate CSV content
		const csvHeader = 'ID,Title,Completed,Created At,Updated At\n';
		const csvRows = tasks.map(task => {
			const title = task.title.includes(',') ? `"${task.title.replace(/"/g, '""')}"` : task.title;
			return `${task.id},${title},${task.completed},${task.createdAt},${task.updatedAt}`;
		}).join('\n');
		
		const csvContent = csvHeader + csvRows;

		// Return CSV file
		return new Response(csvContent, {
			headers: {
				'Content-Type': 'text/csv',
				'Content-Disposition': 'attachment; filename="tasks.csv"'
			}
		});
	} catch (error) {
		console.error('Export error:', error);
		return NextResponse.json(
			{ error: 'Failed to export tasks' },
			{ status: 500 }
		);
	}
}
