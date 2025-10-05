import { Button } from '@/components/ui/button';

interface HeaderProps {
	userName: string;
	onLogout: () => void;
}

export default function Header({ userName, onLogout }: HeaderProps) {
	return (
		<header className="bg-white shadow-sm border-b">
			<div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold">My TODOs</h1>
				<div className="flex items-center gap-4">
					<span className="text-gray-600">{userName}</span>
					<Button onClick={onLogout} variant="outline" size="sm">
						Logout
					</Button>
				</div>
			</div>
		</header>
	);
}
