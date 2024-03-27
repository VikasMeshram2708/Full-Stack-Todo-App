"use client";

import { TodoSchemaType } from "@/models/Todo";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface TheTodo {
  todo: string;
  done: boolean;
}
export default function Todo() {
  const router = useRouter();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editable, setEditable] = useState(false);
  const [editId, setEditId] = useState<number | null>();

  // GET : TODOS
  const GetTodos = async () => {
    try {
      const response = await fetch("/api/myTodos");
      const result = await response.json();
      if (!response.ok) {
        return toast.error(result?.message);
      }
      console.log(result?.data);
      // console.log(result?.data?.reverse())
      setTodos(result?.data);
      return response;
    } catch (error) {
      return toast.error(
        "Something went wrong. Failed to retrieve the Todos. Please try again after some time"
      );
    }
  };
  useEffect(() => {
    GetTodos();
  }, []);

  // HANDLE:  Add Todos
  const handleTodo = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      // prevent from entering empty data
      if (!todo.trim()) {
        return toast.error("Todo is required.");
      }

      const todoData = {
        done: false,
        todo: todo,
      };
      const respose = await fetch("/api/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      const result = await respose.json();

      if (!respose.ok) {
        return toast.error(result?.message);
      }

      console.log(todo);

      setTodo("");
      toast.success(result?.message);
      GetTodos();
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
  const handleDelete = async (todoId: string) => {
    try {
      const response = await fetch("/api/deleteTodo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoId }),
      });
      const result = await response.json();

      if (!response.ok) {
        return toast.error(result?.message);
      }
      toast.success(result?.mesage);
      GetTodos();
    } catch (error) {
      return toast.error(
        `Something went wrong. Failed to delete the todo. : ${
          error instanceof Error && error?.message
        }`
      );
    }
    // setTodos(todos?.filter((todo) => todo?._id !== todoId));
  };

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
        {todos?.map((todo) => (
          <div
            key={todo._id}
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
                onClick={() => handleDelete(todo._id)}
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
