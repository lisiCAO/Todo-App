// app/articles/[id]/page.tsx
import React from 'react';  
import TodoView from './TodoView';

const TodoPage = ({ params }: { params: { id: number } }) => {

  return (
      <div className="container mx-auto px-4">
      <TodoView id={params.id} />
      </div>
  );
};

export default TodoPage;
