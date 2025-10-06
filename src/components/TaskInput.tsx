import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';

interface TaskInputProps {
	onAddTask: (title: string, priority?: string) => Promise<void>;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
	const [title, setTitle] = useState('');
	const [priority, setPriority] = useState('medium');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			setError('Task title is required');
			return;
		}

		if (title.length > 50) {
			setError('Task title must be 50 characters or less');
			return;
		}

		setError('');
		setLoading(true);

		try {
			// Pass priority along with title to parent handler
			await onAddTask(title, priority as any);
			setTitle('');
			setPriority('medium');
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
				<select
					value={priority}
					onChange={(e) => setPriority(e.target.value)}
					className="px-3 py-2 border rounded-md"
					disabled={loading}
				>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
				<Button type="submit" disabled={loading}>
					{loading ? 'Adding...' : 'Add Task'}
				</Button>
			</div>
			{error && (
				<p className="text-red-500 text-sm mt-2">{error}</p>
			)}
		</form>
	);
}
