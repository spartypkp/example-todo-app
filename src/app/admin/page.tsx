'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserStats {
	id: string;
	name: string;
	email: string;
	taskCount: number;
	completedCount: number;
}

export default function AdminPage() {
	const router = useRouter();
	const [users, setUsers] = useState<UserStats[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Mock data for admin view
		// In a real app, this would fetch from an admin API endpoint
		const mockUsers: UserStats[] = [
			{ id: '1', name: 'John Doe', email: 'john@example.com', taskCount: 5, completedCount: 3 },
			{ id: '2', name: 'Jane Smith', email: 'jane@example.com', taskCount: 8, completedCount: 8 },
			{ id: '3', name: 'Bob Johnson', email: 'bob@example.com', taskCount: 3, completedCount: 1 },
		];

		setTimeout(() => {
			setUsers(mockUsers);
			setLoading(false);
		}, 500);
	}, []);

	const handleBackToDashboard = () => {
		router.push('/dashboard');
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>Loading admin data...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-6xl mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold">Admin Dashboard</h1>
					<Button onClick={handleBackToDashboard}>
						Back to Dashboard
					</Button>
				</div>

				<div className="bg-white rounded-lg shadow">
					<div className="p-6 border-b">
						<h2 className="text-xl font-semibold">User Statistics</h2>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Email
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Total Tasks
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Completed
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Completion %
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{users.map((user) => {
									const completionRate = user.taskCount > 0
										? Math.round((user.completedCount / user.taskCount) * 100)
										: 0;
									return (
										<tr key={user.id}>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
												{user.name}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{user.email}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{user.taskCount}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{user.completedCount}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{completionRate}%
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div className="p-4 border-t bg-gray-50">
						<p className="text-sm text-gray-500">
							Total users: {users.length}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
