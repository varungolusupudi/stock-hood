import RegisterForm from "./RegisterForm";
import GridBackground from "@/components/ui/GridBackground";
import Link from "next/link";

export default function Register() {
    return (
        <div className="relative min-h-screen flex items-center justify-center px-4">
            <GridBackground />
            <div className="relative z-10 w-full max-w-md rounded-2xl border border-stone-200 bg-white shadow-xl px-8 py-10">
                <h1 className="text-2xl font-bold text-stone-800 tracking-tight">
                    Create your account
                </h1>
                <p className="mt-2 text-sm text-stone-500">
                    Join thousands of traders sharing insights
                </p>
                
                <div className="mt-8">
                    <RegisterForm />
                </div>

                <p className="mt-6 text-center text-sm text-stone-500">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-stone-800 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
}
