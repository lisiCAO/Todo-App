
import React from 'react';
import TodoForm from './TodoForm';

const AddTodoPage = () => {
    return (
      <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold my-6 text-custom-darkorange">Create new Task</h1>
            <TodoForm />
          </div>
      );
    };

export default AddTodoPage;
