"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Todo {
  todo: string;
  done: boolean;
}
export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editable, setEditable] = useState(false);
  const [editId, setEditId] = useState<number | null>();

  // HANDLE:  Add Todos
  const handleTodo = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      // prevent from entering empty data
      if (!todo.trim()) {
        return toast.error("Todo is required.");
      }
      setTodos([
        ...todos,
        {
          todo: todo,
          done: false,
        },
      ]);
      // make the api request
      const respose = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todos),
      });

      const result = await respose.json();
      
      if (!respose.ok) {
        return toast.error(result?.message);
      }
      
      console.log(todo);
      
      setTodo("");
      return toast.success(result?.message);
    } catch (e) {
      const err = e as Error;
      return toast.error(err?.message);
    }
  };

  // HANDLE: Mark as done
  // const handleDone = (todoId: number) => {
  //   setTodos(
  //     todos?.map((todo) =>
  //       todo?.id === todoId ? { ...todo, done: !todo.done } : todo
  //     )
  //   );
  //   console.log(todos);
  // };

  // HANDLE: Delete Todos
  // const handleDelete = (todoId: number) => {
  //   setTodos(todos?.filter((todo) => todo?.id !== todoId));
  // };

  // HANDLE: Edit Todos
  // const handleEdit = (todoId: number) => {
  //   setEditId(todoId);
  //   setEditable((prev) => !prev);
  //   const myTodo = todos?.find((i) => i.id === todoId);
  //   setTodo(!editable ? (myTodo?.todo as string) : "");
  // };
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
            {editable ? "Save Edit" : "Add Todo"}
          </button>
        </div>
      </form>
      {/* All Todos */}
      <ul className="container grid gap-5 mx-auto mt-5">
        {todos?.map((todo, index) => (
          <div
            key={index}
            className="shadow-base-300 shadow-lg bg-base-300  p-3  rounded-md flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              {/* CheckBox */}
              <input
                // checked={todo?.done}
                // onChange={() => handleDone(todo?.id)}
                type="checkbox"
                className="checkbox border-orange-400 checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange]"
              />
              {/* Todo Item */}
              <li className={`text-xl ${todo?.done && "line-through"}`}>
                {todo?.todo}
              </li>
            </div>
            <div className="flex items-center gap-5">
              {/* Edit Button */}
              <button
                // onClick={() => handleEdit(todo?.id)}
                type="button"
                className="rounded-md btn btn-error"
              >
                Edit
              </button>
              {/* Delete Button */}
              <button
                type="button"
                // onClick={() => handleDelete(todo?.id)}
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
