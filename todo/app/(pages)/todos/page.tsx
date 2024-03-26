"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Todo {
  id: number;
  todo: string;
  done: boolean;
}
export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // Add Todos
  const handleTodo = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setTodos([
        ...todos,
        {
          id: Date.now(),
          todo: todo,
          done: false,
        },
      ]);
      console.log(todo);
    } catch (e) {
      const err = e as Error;
      return toast.error(err?.message);
    }
  };

  // Mark as done
  const handleDone = (todoId: number) => {
    setTodos(
      todos?.map((todo) =>
        todo?.id === todoId ? { ...todo, done: !todo.done } : todo
      )
    );
    console.log(todos);
  };
  return (
    <section className="min-h-screen">
      {/* Todo Form */}
      <form
        onSubmit={handleTodo}
        className="mt-10 max-w-md mx-auto p-5 rounded-md border-2 border-slate-400"
      >
        <h1 className="text-3xl font-semibold text-center">Add Todos</h1>
        {/* Todo */}
        <div className="mt-5 grid gap-3 mb-5">
          <input
            type="text"
            name="todo"
            value={todo}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTodo(e.target.value)
            }
            placeholder="Enter Email"
            className="input input-bordered"
          />
        </div>

        {/* Button */}
        <div className="mt-5">
          <button
            type="submit"
            className="btn btn-md w-full btn-outline btn-accent font-semibold"
          >
            Add ToDo
          </button>
        </div>
      </form>
      {/* All Todos */}
      <ul className="container mx-auto mt-5">
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className="shadow-base-300 shadow-lg bg-base-300  p-3  rounded-md flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              {/* CheckBox */}
              <input
                checked={todo?.done}
                onChange={() => handleDone(todo?.id)}
                type="checkbox"
                className="checkbox border-orange-400 checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange]"
              />
              {/* Todo Item */}
              <li className={`text-xl ${todo?.done && "line-through"}`}>{todo?.todo}</li>
            </div>
            <div className="flex items-center gap-5">
              {/* Edit Button */}
              <button type="button" className="rounded-md btn btn-error">
                Edit
              </button>
              {/* Delete Button */}
              <button
                type="button"
                className="rounded-md btn btn-outline btn-secondary"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
      <Toaster />
    </section>
  );
}
