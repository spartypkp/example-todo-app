'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		// Load theme from localStorage
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
		if (savedTheme) {
			setTheme(savedTheme);
			document.documentElement.classList.toggle('dark', savedTheme === 'dark');
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
	};

	return (
		<Button
			onClick={toggleTheme}
			variant="ghost"
			size="sm"
			className="fixed top-4 right-4 z-50"
		>
			{theme === 'light' ? '🌙' : '☀️'} Theme
		</Button>
	);
}
