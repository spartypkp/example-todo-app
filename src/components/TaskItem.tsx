import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { Task } from '@/lib/db';

interface TaskItemProps {
	task: Task;
	onToggle: (task: Task) => void;
	onDelete: (taskId: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
	// Get priority from task (if it exists)
	const priority = (task as any).priority || 'medium';
	const priorityColors = {
		low: 'text-gray-500',
		medium: 'text-blue-500',
		high: 'text-red-500'
	};

	return (
		<div className="bg-white rounded-lg p-4 flex items-center gap-3">
			<Checkbox
				checked={task.completed}
				onCheckedChange={() => onToggle(task)}
			/>
			<span
				className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''
					}`}
			>
				{task.title}
			</span>
			{/* Priority indicator */}
			<span className={`text-xs font-medium ${priorityColors[priority as keyof typeof priorityColors]}`}>
				{priority.toUpperCase()}
			</span>
			<Button
				onClick={() => onDelete(task.id)}
				variant="ghost"
				size="sm"
				className="text-red-500 hover:text-red-700"
			>
				✕
			</Button>
		</div>
	);
}
