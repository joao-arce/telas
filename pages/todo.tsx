import { ITodo } from '../types/todo';

type Props = {
  todos: ITodo[];
  addItem(todo: ITodo): void;
};

const Todo = ({ todos, addItem }: Props) => {
  let incomplete: ITodo[] = [];
  let complete: ITodo[] = [];

  // console.log('todos ', todos);

  // todos.forEach((element) => {
  //   if (element.completed) {
  //     complete.push({ title: element.title, completed: element.completed });
  //   } else {
  //     incomplete.push({ title: element.title, completed: element.completed });
  //   }
  // });

  const handleAdd = (e: any, task: ITodo) => {
    e.preventDefault();
    console.log('clicou ');
    addItem(task);
  };
  return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      <div className="text-gray-600 py-1 ">
        <div className="containter mx-auto">
          <details className="shadow rounded">
            <summary className="bg-orange-600 text-yellow-100 cursor-pointer hover:bg-orange-500 list-none px-4 py-2 font-semibold">
              Completed Task
            </summary>
            {todos?.map((task, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-4 justify-between bg-teal-100 "
                >
                  <p className="col-span-3">{task.title}</p>
                  <div>
                    <button
                      className="flex justify-center px-0 py-1 mt-2 text-gray-100 bg-emerald-600 rounded-full"
                      onClick={(e) => handleAdd(e, task)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-10"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </details>
        </div>
      </div>
    </div>
  );
};

export default Todo;
