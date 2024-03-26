"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = {
        email,
        password,
      };
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        return toast.error(result?.message);
      }
      console.log("result", result);
      return toast.success(result?.message);
    } catch (e) {
      const err = e as Error;
      return toast.error(err?.message);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <section className="min-h-screen">
      <form
        onSubmit={handleLogin}
        className="mt-10 max-w-md mx-auto p-5 rounded-md border-2 border-slate-400"
      >
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        {/* Email */}
        <div className="grid gap-3 mb-5">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter name"
            className="input input-bordered"
          />
        </div>

        {/* Password */}
        <div className="grid gap-3">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            className="input input-bordered"
          />
        </div>

        {/* Button */}
        <div className="mt-5">
          <button
            type="submit"
            className="btn btn-md w-full btn-outline btn-accent font-semibold"
          >
            Login
          </button>
        </div>
      </form>
      <Toaster />
    </section>
  );
}
