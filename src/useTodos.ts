import React from 'react';

export type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};
export function useTodos({

}) {
	const [todos, setTodos] = React.useState<Todo[]>([]);

	const removeTodo = (id: number) => {
		setTodos(todos.filter(todo => todo.id !== id));
	}
	const addTodo = (title: string) => {
		setTodos([
			...todos,
			{
				userId: 1,
				id: todos.length + 1,
				title,
				completed: false,
			}
		]);
	}

	return {
		todos,
		removeTodo,
		addTodo,
	};
}