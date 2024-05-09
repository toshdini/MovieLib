'use client'
import { login, signup } from "./action";

export default function Login() {
    return (
        <main
            className="h-screen flex items-center justify-center bg-gray-800 p-6"
        >
            <div className="bg-gray-900 p-8 rounder-lg shadow-md w-96">
                <form>
                    <input
                        className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <button
                        className="w-full mb-2 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                        formAction={signup}
                    >Sign-Up</button>
                    <button
                        className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
                        formAction={login}
                    >Sign In</button>
                </form>
            </div>
        </main>
    )
}
