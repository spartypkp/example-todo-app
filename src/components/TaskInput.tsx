import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';

interface TaskInputProps {
	onAddTask: (title: string) => Promise<void>;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
	const [title, setTitle] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			setError('Task title is required');
			return;
		}

		if (title.length > 100) {
			setError('Task title must be 100 characters or less');
			return;
		}

		setError('');
		setLoading(true);

		try {
			await onAddTask(title);
			setTitle('');
		} catch (err) {
			setError('Failed to add task');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mb-8">
			<div className="flex gap-2">
				<Input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter a new task..."
					className="flex-1"
					disabled={loading}
				/>
				<Button type="submit" disabled={loading}>
					{loading ? 'Adding...' : 'Create'}
				</Button>
			</div>
			{error && (
				<p className="text-red-500 text-sm mt-2">{error}</p>
			)}
		</form>
	);
}
