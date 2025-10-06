'use client';

import Header from '@/components/Header';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { Task } from '@/lib/db';

interface User {
	name: string;
	email: string;
}

export default function DashboardPage() {
	const router = useRouter();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const response = await fetch('/api/tasks');

			if (!response.ok) {
				if (response.status === 401) {
					router.push('/login');
					return;
				}
				throw new Error('Failed to fetch tasks');
			}

			const data = await response.json();
			setTasks(data.tasks || []);

			// Mock user data for now
			setUser({ name: 'User', email: 'user@example.com' });
		} catch (err) {
			console.error('Failed to load tasks:', err);
		} finally {
			setLoading(false);
		}
	};

	const handleAddTask = async (title: string, priority?: string) => {
		const response = await fetch('/api/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, priority: priority || 'medium' }),
		});

		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.error || 'Failed to add task');
		}

		const data = await response.json();
		setTasks([data.task, ...tasks]);
	};

	const handleToggleTask = async (task: Task) => {
		try {
			const response = await fetch(`/api/tasks/${task.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ completed: !task.completed }),
			});

			if (response.ok) {
				const data = await response.json();
				setTasks(tasks.map(t => t.id === task.id ? data.task : t));
			}
		} catch (err) {
			console.error('Failed to update task');
		}
	};

	const handleDeleteTask = async (taskId: string) => {
		try {
			const response = await fetch(`/api/tasks/${taskId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				setTasks(tasks.filter(t => t.id !== taskId));
			}
		} catch (err) {
			console.error('Failed to delete task');
		}
	};

	const handleLogout = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
			});

			if (response.ok) {
				router.push('/login');
			}
		} catch (err) {
			console.error('Logout failed:', err);
		}
	};


	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header
				userName={user?.name || 'User'}
				onLogout={handleLogout}
			/>

			<main className="max-w-4xl mx-auto px-4 py-8">
				<TaskInput onAddTask={handleAddTask} />


				<TaskList
					tasks={tasks}
					onToggleTask={handleToggleTask}
					onDeleteTask={handleDeleteTask}
				/>

			</main>
		</div>
	);
}