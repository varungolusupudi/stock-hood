import LoginForm from "./LoginForm";
export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-2 border-2 border-black rounded-lg p-4 justify-center items-center">
                <h1 className="">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}