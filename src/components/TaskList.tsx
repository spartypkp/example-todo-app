import type { Task } from '@/lib/db';
import TaskItem from './TaskItem';

interface TaskListProps {
	tasks: Task[];
	onToggleTask: (task: Task) => void;
	onDeleteTask: (taskId: string) => void;
}

export default function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
	console.log('TaskList rendering with', tasks.length, 'tasks');
	
	if (tasks.length === 0) {
		console.log('No tasks to display');
		return (
			<div className="bg-white rounded-lg p-8 text-center text-gray-500">
				No tasks yet. Add your first task above!
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{tasks.map(task => {
				console.log('Rendering task:', task.id, task.title);
				return (
					<TaskItem
						key={task.id}
						task={task}
						onToggle={onToggleTask}
						onDelete={onDeleteTask}
					/>
				);
			})}
		</div>
	);
}
