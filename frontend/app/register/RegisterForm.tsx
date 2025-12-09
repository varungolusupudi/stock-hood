"use client"

import { FormEvent, useState } from "react"

export default function RegisterForm() {
    const [error, setError]= useState("");
    const [success, setSuccess]= useState("");

    async function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const password_confirm = formData.get('password_confirm');

        try {
            const response = await fetch('http://127.0.0.1:8000/register', {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    email,
                    password,
                    password_confirm
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                // Handle different error formats
                if (typeof data.detail === 'string') {
                    // HTTPException errors: "Email already registered"
                    setError(data.detail);
                } else if (Array.isArray(data.detail)) {
                    // Pydantic validation errors: array of error objects
                    const messages = data.detail.map((err: any) => 
                        err.msg || JSON.stringify(err)
                    ).join(', ');
                    setError(messages);
                } else {
                    setError("Registration failed");
                }
            } else {
                setSuccess(data.message || "Account created successfully!");
            }

            console.log("Response:", data);
        } catch (err) {
            setError("Network error. Please try again.");
            console.error(err);
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input 
                type="email"
                name="email"
                placeholder="Email"
                required
                className="px-2 py-1 border-2 border-black rounded-md"
            />
            <input
                type="password"
                name="password"
                placeholder="Password (min 8 chars, uppercase, lowercase, number)"
                required
                minLength={8}
                className="px-2 py-1 border-2 border-black rounded-md"
            />
            <input
                type="password"
                name="password_confirm"
                placeholder="Confirm Password"
                required
                minLength={8}
                className="px-2 py-1 border-2 border-black rounded-md"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <button type="submit" className="px-2 py-1.5 border-2 border-black rounded-md hover:bg-black hover:text-white transition">
                Register
            </button>
        </form>
    )
}