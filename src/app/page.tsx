import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 text-center">
				<div>
					<h1 className="text-4xl font-bold text-gray-900">Welcome to TODOs</h1>
					<p className="mt-4 text-lg text-gray-600">
						A simple task management app to help you stay organized.
					</p>
				</div>

				<div className="space-y-4">
					<Link href="/login">
						<Button className="w-full">Get Started</Button>
					</Link>

					<p className="text-sm text-gray-500">
						New user? <Link href="/register" className="text-blue-600 hover:underline">Register here</Link>
					</p>
				</div>
			</div>
		</div>
	);
}