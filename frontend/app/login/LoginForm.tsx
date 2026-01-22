"use client";
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    email,
                    password
                })
            });
        
            const data = await response.json();
            
            if (!response.ok) {
                // Handle different error formats
                if (typeof data.detail === 'string') {
                    setError(data.detail);
                } else if (Array.isArray(data.detail)) {
                    // Pydantic validation errors
                    const messages = data.detail.map((err: any) => 
                        err.msg || JSON.stringify(err)
                    ).join(', ');
                    setError(messages);
                } else {
                    setError("Login failed");
                }
            } else {
                setSuccess(data.message || "Logged in successfully!");
                const token = data.access_token;
                router.push('/dashboard');
            }

            console.log("Response:", data);
        } catch(err) {
            setError("Network error. Please try again.");
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-stone-700">
                    Email
                </label>
                <input 
                    id="email"
                    type="email" 
                    name="email" 
                    placeholder="you@example.com" 
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all duration-200"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-stone-700">Password</label>
                <input 
                    id="password"
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    required
                    minLength={1}
                    className="px-4 py-3 border border-stone-300 rounded-lg text-stone-500 placeholder-stone-500 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all duration-200"
                />
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 text-sm border border-green-200 rounded-lg px-4 py-3">{success}</div>}
            <button 
                type="submit" 
                className="px-4 py-3 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors duration-200 text-white font-medium"
            >
                Login
            </button>
        </form>
    )
}