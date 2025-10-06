import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';

// Type definitions
export interface User {
	id: string;
	name: string;
	email: string;
	passwordHash: string;
	createdAt: string;
}

export interface Task {
	id: string;
	userId: string;
	title: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Session {
	id: string;
	userId: string;
	expiresAt: string;
}

// Simple SQLite database
const db = new Database('todos.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
  
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    expiresAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`);

// User functions
export function createUser(name: string, email: string, passwordHash: string): Omit<User, 'passwordHash'> {
	const id = randomUUID();
	const createdAt = new Date().toISOString();

	const stmt = db.prepare(
		'INSERT INTO users (id, name, email, passwordHash, createdAt) VALUES (?, ?, ?, ?, ?)'
	);
	stmt.run(id, name, email, passwordHash, createdAt);

	return { id, name, email, createdAt };
}

export function getUserByEmail(email: string): User | undefined {
	const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
	return stmt.get(email) as User | undefined;
}

export function getUserById(id: string): Omit<User, 'passwordHash'> | undefined {
	const stmt = db.prepare('SELECT id, name, email, createdAt FROM users WHERE id = ?');
	return stmt.get(id) as Omit<User, 'passwordHash'> | undefined;
}

// Task functions
export function createTask(userId: string, title: string): Task {
	const id = randomUUID();
	const now = new Date().toISOString();

	const stmt = db.prepare(
		'INSERT INTO tasks (id, userId, title, completed, createdAt, updatedAt) VALUES (?, ?, ?, 0, ?, ?)'
	);
	stmt.run(id, userId, title, now, now);

	return { id, userId, title, completed: false, createdAt: now, updatedAt: now };
}

export function getUserTasks(userId: string): Task[] {
	const stmt = db.prepare('SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt ASC');
	return stmt.all(userId).map((task: any) => ({
		...task,
		completed: Boolean(task.completed)
	})) as Task[];
}

export function updateTask(id: string, userId: string, updates: { title?: string; completed?: boolean; }): Task | null {
	const task = getTask(id, userId);
	if (!task) return null;

	const title = updates.title ?? task.title;
	const completed = updates.completed ?? task.completed;
	const updatedAt = new Date().toISOString();

	const stmt = db.prepare(
		'UPDATE tasks SET title = ?, completed = ?, updatedAt = ? WHERE id = ? AND userId = ?'
	);
	stmt.run(title, completed ? 1 : 0, updatedAt, id, userId);

	return { ...task, title, completed, updatedAt };
}

export function deleteTask(id: string, userId: string): boolean {
	const stmt = db.prepare('DELETE FROM tasks WHERE id = ? AND userId = ?');
	const result = stmt.run(id, userId);
	return result.changes > 0;
}

export function getTask(id: string, userId: string): Task | null {
	const stmt = db.prepare('SELECT * FROM tasks WHERE id = ? AND userId = ?');
	const task = stmt.get(id, userId) as any;
	return task ? { ...task, completed: Boolean(task.completed) } as Task : null;
}

// Session functions
export function createSession(userId: string): Session {
	const id = randomUUID();
	const expiresAt = new Date().toISOString(); // No expiry set

	const stmt = db.prepare('INSERT INTO sessions (id, userId, expiresAt) VALUES (?, ?, ?)');
	stmt.run(id, userId, expiresAt);

	return { id, userId, expiresAt };
}

export function getSession(id: string): Session | undefined {
	const stmt = db.prepare('SELECT * FROM sessions WHERE id = ? AND expiresAt > ?');
	return stmt.get(id, new Date().toISOString()) as Session | undefined;
}

export function deleteSession(id: string): void {
	const stmt = db.prepare('DELETE FROM sessions WHERE id = ?');
	stmt.run(id);
}

// Database transactions for bulk operations
export function clearCompletedTasks(userId: string): number {
	const transaction = db.transaction(() => {
		const stmt = db.prepare('DELETE FROM tasks WHERE userId = ? AND completed = 1');
		const result = stmt.run(userId);
		return result.changes;
	});

	return transaction() as number;
}

export function deleteAllTasks(userId: string): number {
	const transaction = db.transaction(() => {
		const stmt = db.prepare('DELETE FROM tasks WHERE userId = ?');
		const result = stmt.run(userId);
		return result.changes;
	});

	return transaction() as number;
}

export function toggleAllTasks(userId: string, completed: boolean): number {
	const transaction = db.transaction(() => {
		const stmt = db.prepare('UPDATE tasks SET completed = ?, updatedAt = ? WHERE userId = ?');
		const result = stmt.run(completed ? 1 : 0, new Date().toISOString(), userId);
		return result.changes;
	});

	return transaction() as number;
}

export default db;
