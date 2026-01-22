"use client"

import { FormEvent, useState } from "react"

export default function RegisterForm() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    password_confirm
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (typeof data.detail === 'string') {
                    setError(data.detail);
                } else if (Array.isArray(data.detail)) {
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email field */}
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
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg text-stone-800 placeholder-stone-400
                               focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100
                               transition-all duration-200"
                />
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-stone-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Min 8 chars, mixed case, number"
                    required
                    minLength={8}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg text-stone-800 placeholder-stone-400
                               focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100
                               transition-all duration-200"
                />
            </div>

            {/* Confirm Password field */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="password_confirm" className="text-sm font-medium text-stone-700">
                    Confirm password
                </label>
                <input
                    id="password_confirm"
                    type="password"
                    name="password_confirm"
                    placeholder="Re-enter your password"
                    required
                    minLength={8}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg text-stone-800 placeholder-stone-400
                               focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100
                               transition-all duration-200"
                />
            </div>

            {/* Error message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                    {error}
                </div>
            )}

            {/* Success message */}
            {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-3">
                    {success}
                </div>
            )}

            {/* Submit button */}
            <button
                type="submit"
                className="w-full py-3 bg-stone-800 text-white font-medium rounded-lg
                           hover:bg-stone-700 transition-colors duration-200 mt-2"
            >
                Create account
            </button>
        </form>
    )
}
