"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = {
        name,
        email,
        password,
      };
      const response = await fetch("/api/signup", {
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
      setName("");
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
        <h1 className="text-3xl font-semibold text-center">SignUp</h1>
        {/* Name */}
        <div className="grid gap-3 mb-5">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Enter Name"
            className="input input-bordered"
          />
        </div>
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
            placeholder="Enter Email"
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
            placeholder="Enter Password"
            className="input input-bordered"
          />
        </div>

        {/* Button */}
        <div className="mt-5">
          <button
            type="submit"
            className="btn btn-md w-full btn-outline btn-accent font-semibold"
          >
            Sign Up
          </button>
          <p className="mt-5">
            Already a User ?{" "}
            <span>
              <Link
                href="/login"
                className="hover:underline underline-offset-4"
              >
                Login
              </Link>
            </span>
          </p>
        </div>
      </form>
      <Toaster />
    </section>
  );
}
