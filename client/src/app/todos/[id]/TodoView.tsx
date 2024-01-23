'use client';
// components/TodoView.tsx
import React, { useState, useEffect } from 'react';

interface Todo {
  _id: string;
  title: string;
  authorId: string;
  slug: string;
  createdAt: string;
  body: string;
}


const TodoView = ({ slug }: { slug: string }) => {
  const [authorName, setAuthorName] = useState('');
  const [Todo, setTodo] = useState<Todo | null>(null);


  useEffect(() => {
    // Fetch author name
    const fetchAuthor = async () => {
      if (Todo?.authorId) {
        const response = await fetch(`http://localhost:3000/api/users/${Todo.authorId}`);
        const data = await response.json();
        setAuthorName(data.name);
      }
    };
    fetchAuthor();
  }, [Todo?.authorId]);

  if(!Todo) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold my-6 text-custom-darkorange">{Todo.title}</h1>
      <p className="mb-2 text-custom-green">Posted by {authorName} on {Todo.createdAt}</p>
      <TodoView className="mb-6">{Todo.body}</TodoView>

    </div>
  );
};

export default TodoView;
