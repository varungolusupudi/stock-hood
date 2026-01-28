"use client";
import Navbar from "@/components/ui/Navbar";
import { useState } from "react";

export default function Dashboard() {

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const post = formData.get("post");
    try {
      const response = await fetch("http://127.0.0.1:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          content: post,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar/>
      <form className="flex items-center justify-center gap-4 mt-5" onSubmit={handleSubmit}>
        <label htmlFor="post">Post</label>
        <input name="post" type="text" placeholder="Post something..." className="border-2 w-1/2 border-stone-500 rounded-lg p-4" />
        <button className="bg-stone-800 text-white rounded-lg p-4">Post</button>
      </form>
    </div>
  );
}
  