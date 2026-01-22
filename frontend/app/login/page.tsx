import LoginForm from "./LoginForm";
import GridBackground from "@/components/ui/GridBackground";
import Link from "next/link";

export default function Login() {
    return (
        <div className="relative flex justify-center items-center min-h-screen px-4">
            <GridBackground />
            <div className="relative z-10 w-full max-w-md rounded-2xl px-8 py-10 border border-stone-200 shadow-xl bg-white">
                <h1 className="text-2xl font-bold text-stone-800 tracking-tight mb-2">Login to your account</h1>
                <p className="mb-6 text-sm text-stone-500">Welcome back! Please enter your details.</p>
                <LoginForm />
                <p className="mt-6 text-center text-sm text-stone-500">
                    Don't have an account?{" "}
                    <Link href="/register" className="font-medium text-stone-800 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}