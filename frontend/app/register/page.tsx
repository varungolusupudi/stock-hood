import RegisterForm from "./RegisterForm";

export default function Register() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center gap-2 border-2 border-black rounded-lg p-4">
                <h1>Register</h1>
                <RegisterForm />
            </div>
        </div>
    )
}