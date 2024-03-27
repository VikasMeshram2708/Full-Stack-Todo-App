"use client";

import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const [userData, setUserData] = useState<UserDetails[]>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/me");
        const result = await response.json();
        setUserData(result?.data);
      } catch (error) {
        return toast.error("Something went wrong. Failed to get User Details.");
      }
    };
    getUser();
  }, []);

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-96 h-44 mx-auto bg-base-300 shadow-lg rounded-lg">
        {userData?.map((user) => (
          <div
            key={user.id}
            className="flex gap-10 items-center p-6 shadow-info shadow-xl rounded-md"
          >
            {/* Left Side */}
            <div className="uppercase">
              <p className="rounded-full border-2 border-info w-20 h-20 flex items-center justify-center">{user.name[0]}</p>
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-3">
              <div className="">
                <h2 className="text-lg font-semibold text-white">
                  {user.name}
                </h2>
                <p className="text-white">{user.email}</p>
              </div>

              {/* Logout Button */}
              <div>
                <LogoutButton email={user.email} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
