"use client";
import { UserSchema } from "@/models/User";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { ZodError } from "zod";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleEye, setToggleEye] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const data = {
        name,
        email,
        password,
      };

      // Sanitize the Incoming Data
      UserSchema.parse(data);
      Promise.resolve();

      // Set Button Disabled to true
      setButtonDisabled(true);

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
      toast.success(result?.message);

      // RESET : Input Fileds
      setName("");
      setEmail("");
      setPassword("");

      console.log("result", result);
      router.refresh();
      setTimeout(() => {
        return router.push("/login");
      }, 3000);
    } catch (e) {
      const err = e as Error;
      if (e instanceof ZodError) {
        return toast.error(e?.errors[0]?.message);
      }
      return toast.error(err?.message);
    } finally {
      // RESET : Button Disabled false
      setTimeout(() => {
        setButtonDisabled(false);
      }, 2000);
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
        <div className="grid gap-3 relative">
          <label htmlFor="password">Password</label>
          <input
            type={toggleEye ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Enter Password"
            className="input input-bordered"
          />
          <div className="absolute right-3 bottom-3">
            {toggleEye ? (
              <RiEyeFill
                onClick={() => setToggleEye((prev) => !prev)}
                size={20}
                color="white"
                className="cursor-pointer"
              />
            ) : (
              <RiEyeCloseFill
                onClick={() => setToggleEye((prev) => !prev)}
                size={20}
                color="white"
                className="cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Button */}
        <div className="mt-5">
          <button
            disabled={buttonDisabled}
            type="submit"
            className="btn btn-md w-full btn-outline btn-accent font-semibold"
          >
            {buttonDisabled ? "Loading..." : "Sign Up"}
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
