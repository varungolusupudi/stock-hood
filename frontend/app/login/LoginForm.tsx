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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                required
                className="px-4 py-1.5 border-2 border-black rounded-md"
            />
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                required
                minLength={1}
                className="px-4 py-1.5 border-2 border-black rounded-md"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <button 
                type="submit" 
                className="px-4 py-1.5 border-2 border-black rounded-md hover:bg-black hover:text-white transition"
            >
                Login
            </button>
        </form>
    )
}