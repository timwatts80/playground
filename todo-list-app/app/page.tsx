import React from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import useSWR from 'swr';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const MyComponent: React.FC = () => {
  const { data: todos, error } = useSWR<Todo[]>('/api/todos', fetcher);

  if (error) {
    return <div>Error loading todos</div>;
  }

  if (!todos) {
    return <div>Loading todos...</div>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default MyComponent;