"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SignupForm from "@/components/SignupForm";
import { useAppSelector } from "@/redux/store";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const username = useAppSelector((state) => state.auth.user?.username);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#F9F7F7] text-black min-h-screen">
      <Navbar />

      <main className="flex flex-col h-screen bg-slate-100">
        <div className="w-full">
          <div className="bg-red-200 h-20 mb-20 text-end p-6 font-bold ">
            <>{username && `Welcome, ${username}`}</>
          </div>
          {loading ? (
            <div className="flex items-center justify-center mt-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-r-4 border-b-4 border-transparent"></div>
            </div>
          ) : (
            <>{!username && <SignupForm />}</>
          )}
        </div>
      </main>
    </div>
  );
}
