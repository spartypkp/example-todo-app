import { Button } from '@/components/ui/button';
import type { Task } from '@/lib/db';

interface TaskItemProps {
	task: Task;
	onToggle: (task: Task) => void;
	onDelete: (taskId: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
	return (
		<div className="bg-white rounded-lg p-4 flex items-center gap-3">
			<Button
				onClick={() => onToggle(task)}
				variant="ghost"
				size="sm"
				className="w-5 h-5 p-0"
			>
				{task.completed ? '✓' : '○'}
			</Button>
			<span
				className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''
					}`}
			>
				{task.title}
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
