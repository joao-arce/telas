import { Todo } from '../types/todo';

export const loadTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data: Todo[] = await res.json();
  return data;
};
