// Simple validation functions

export function validatePassword(password: string): boolean {
	return password.length >= 6;
}

export function validateTaskTitle(title: string): boolean {
	return title.length > 0 && title.length <= 100;
}

export function validateName(name: string): boolean {
	return name.length > 0 && name.length <= 50;
}
