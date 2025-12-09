"use client";
import { FormEvent } from 'react';

export default function LoginForm() {
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log("e", e.target);
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        const response = await fetch('http://127.0.0.1:8000/login', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                password
            })
        });
        
        const data = await response.json();
        console.log("Response:", data);
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input type="text" name="email" placeholder="Email" className="px-4 py-1.5 border-2 border-black rounded-md"/>
            <input type="password" name="password" placeholder="Password" className="px-4 py-1.5 border-2 border-black rounded-md"/>
            <button type="submit" className="px-4 py-1.5 border-2 border-black rounded-md">Login</button>
        </form>
    )
}