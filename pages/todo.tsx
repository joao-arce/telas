import React from 'react';

import { loadTodos } from '../libs/fetch-todo';
import { Todo } from '../types/todo';

type Props = {
  todos: Todo[];
};

const Todo = ({ todos }: Props) => {
  let incomplete: Todo[] = [];
  let complete: Todo[] = [];

  todos.forEach((element) => {
    if (element.completed) {
      complete.push({ title: element.title, completed: element.completed });
    } else {
      incomplete.push({ title: element.title, completed: element.completed });
    }
  });
  // console.log(complete);
  return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      <div className="text-gray-600 py-1 ">
        <div className="containter mx-auto">
          <details className="shadow rounded">
            <summary className="bg-orange-600 text-yellow-100 cursor-pointer hover:bg-orange-500 list-none px-4 py-2 font-semibold">
              Completed Task
            </summary>
            {complete.map((task, index) => {
              return (
                <div key={index} className="grid grid-cols-2 justify-between">
                  <p>{task.title}</p>
                  <p className="text-right"> {task.completed.toString()}</p>
                </div>
              );
            })}
          </details>
        </div>
      </div>
      <div className="text-gray-600  ">
        <div className="containter mx-auto">
          <details className="shadow rounded">
            <summary className="bg-lime-700 text-yellow-100 cursor-pointer hover:bg-lime-500 list-none px-4 py-2 font-semibold">
              How do I get a reference ??
            </summary>

            {incomplete.map((task, index) => {
              return (
                <div key={index} className="grid grid-cols-2 justify-between">
                  <p>{task.title}</p>
                  <p className="text-right"> {task.completed.toString()}</p>
                </div>
              );
            })}
          </details>
        </div>
        <div className="flex justify-center gap-10">
          <button className="bg-teal-500 px-6 py-4">Save</button>
          <button className="bg-gray-600 text-gray-50 px-6 py-4">Cancel</button>
        </div>
      </div>
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

export default Todo;
