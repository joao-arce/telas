import { ITodo } from '../types/todo';

export const loadTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data: ITodo[] = await res.json();
  return data;
};
