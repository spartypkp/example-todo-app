'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Login failed');
				return;
			}

			router.push('/dashboard');
		} catch (err) {
			setError('Network error. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="text-3xl font-bold text-center">Login</h2>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="mt-1"
								placeholder="your@email.com"
							/>
						</div>

						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="mt-1"
								placeholder="••••••••"
							/>
						</div>
					</div>

					{error && (
						<div className="text-red-500 text-sm">{error}</div>
					)}

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? 'Logging in...' : 'Login'}
					</Button>
				</form>

				<p className="text-center text-sm text-gray-600">
					Don't have an account?{' '}
					<Link href="/register" className="text-blue-600 hover:underline">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}