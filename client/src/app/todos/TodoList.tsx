'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

interface Todo {
    id: number;
    ownerId: number;
    userName: string;
    task: string;
    dueDate: Date;
    isDone: number;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState('');
    const router = useRouter();
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/todos', {
                    credentials: 'include',
                });
                if (!res.ok) {
                    throw new Error('Server responded with an error!');
                }
                const data = await res.json();
                setTodos(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchTodos();
    }, []);

    const handleDelete = async (todoId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/todos/${todoId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                router.push('/todos');
            } else {
                setError('Failed to delete the todo.');
            }
        } catch (error) {
            setError('There was an error processing the request.');
        }
    };

    return (
        <div>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {todos.map((todo) => (
                <div key={todo.id} className="todo mb-6 p-4 bg-custom-cream rounded-lg shadow">
                    <Link href={`/todos/${todo.id}`}>
                        <h2 className="text-xl font-bold text-custom-darkorange cursor-pointer">{todo.isDone}</h2>
                    </Link>
                    <p className="text-custom-green">
                        Posted by {todo.userName} on{' '}
                        {new Date(todo.dueDate).toLocaleDateString()}
                    </p>
                    <p className='text-custom-pink'>{todo.task.substring(0, 200)}...</p>
                    <button
                        type="button"
                        onClick={() => handleDelete(todo.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Delete
                    </button>
                    <Link href={`/todos/edit/${todo.id}`}>
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                    >
                        Edit
                    </button>
                </Link>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
