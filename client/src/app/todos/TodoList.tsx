'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
/**
 * id INT PK AI
- ownerId INT FK linked to users table's id
- task VC(100) NOT NULL
- dueDate DATE NOT NULL
- isDone INT NOT NULL
 */
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
    const [error, setError] =useState('');
    useEffect(() => {
        const fetchTodos = async () => {
            try{
                const res = await fetch('http://localhost:3000/api/todos');
            if(!res.ok) {
                throw new Error('Server responded with an error!');
            }
            const data = await res.json();
            setTodos(data);
            } catch (error:any) {
                setError(error.message);
            }
        };

        fetchTodos();
    }, []);
    if(error) {
        return <div className="text-red-600">{error}</div>
    }

    return (
        <div>
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
                </div>
            ))}
        </div>
    );
};

export default TodoList;
