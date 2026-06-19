"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const result = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        });

        if(result?.error) {
            setError("Invalid username or password");
        } else {
            router.push("/");
            router.refresh();
        }

    }
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {error && <p style={{ color: "red"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>
                        Username
                        <input type="text" name="username" required className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2" />
                    </label>
                </div>
                <div className="mb-4">
                    <label>
                        Password
                        <input type="password" name="password" required className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2" />
                    </label>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    )
}