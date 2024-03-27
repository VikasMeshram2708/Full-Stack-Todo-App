"use client";

import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LogoutButton({ email }: { email: string }) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) {
        return toast.error(result?.message);
      }
      toast.success(result?.message);
      // REFRESH the page
      router.refresh();
      return response;
    } catch (error) {
      return toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <>
      <button
        onClick={handleLogout}
        type="button"
        className="btn btn-outline btn-info btn-md rounded-md"
      >
        Logout
      </button>
      <Toaster />
    </>
  );
}
