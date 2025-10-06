'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		// Client-side validation
		if (!name) {
			setError('Name is required');
			setLoading(false);
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError('Please enter a valid email address');
			setLoading(false);
			return;
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters');
			setLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Registration failed');
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
					<h2 className="text-3xl font-bold text-center">Register</h2>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="mt-1"
								placeholder="Your Name"
							/>
						</div>

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
						{loading ? 'Creating account...' : 'Register'}
					</Button>
				</form>

				<p className="text-center text-sm text-gray-600">
					Already have an account?{' '}
					<Link href="/login" className="text-blue-600 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}