import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';

const UpdateTodoForm = () => {
  const [todo, setTodo] = useState({ id: '', isDone: 0, dueDate: new Date(), task: '', body: '' });
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { id } = router.query;
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Server responded with an error!');
        }
        const data = await res.json();
        setTodo({
          id: data.id,
          isDone: data.isDone,
          dueDate: new Date(data.dueDate),
          task: data.task,
          body: data.body,
        });
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchTodo();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'dueDate') {
      setTodo((prev) => ({ ...prev, [name]: new Date(value) }));
      return;
    }
    if (name === 'isDone') {
      if (value === 'pending') {
        setTodo((prev) => ({ ...prev, [name]: 0 }));
        return;
      }
      if (value === 'done') {
        setTodo((prev) => ({ ...prev, [name]: 1 }));
        return;
      }
      setTodo((prev) => ({ ...prev, [name]: Number(value) }));
      return;
    }

    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(todo),
      });

      if (response.ok) {
        // redirect to todos list
        router.push('/todos');
      } else {
        setError('Failed to update the todo.');
      }
    } catch (error) {
      setError('There was an error submitting the form.');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="mb-4">
        <label htmlFor="isDone" className="block text-gray-700 text-sm font-bold mb-2">
          Status
        </label>
        <select
          id="isDone"
          name="isDone"
          value={todo.isDone === 0 ? 'pending' : 'done'}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
          Task
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          value={todo.body}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          required
          minLength={50}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
      </div>
    </form>
    
  );
};

export default UpdateTodoForm;