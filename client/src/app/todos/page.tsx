import React from 'react';
import TodoList from './TodoList';
import Link from 'next/link';

const TodoListPage: React.FC = () => {
  return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-6 text-custom-darkorange">Welcome to Todo List</h1>
        {<TodoList />}
        <div className="inline-block align-baseline font-bold text-sm text-custom-green hover:text-custom-orange cursor-pointer" >
            <Link  href={"/todos/add"}>
                Create your Todos
            </Link>
        </div>
      </div>
  );
};

export default TodoListPage;
