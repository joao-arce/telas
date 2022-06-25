import { useState } from 'react';
import { loadTodos } from '../libs/fetch-todo';
import { ITodo } from '../types/todo';
import ItemOrder from './itemOrder';
import Todo from './todo';

type Props = {
  todos: ITodo[];
};

const Pedido = ({ todos }: Props) => {
  const [tasks, SetTasks] = useState<ITodo[]>([]);

  const addITem = (task: ITodo) => {
    console.log('addITem ', task);

    SetTasks([...tasks, task]);
  };

  return (
    <div>
      <ItemOrder tasks={tasks} />
      <Todo todos={todos} addItem={addITem} />
    </div>
  );
};

export const getStaticProps = async () => {
  const todos = await loadTodos();
  return {
    props: {
      todos,
    },
  };
};

export default Pedido;
