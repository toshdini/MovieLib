'use client'
import { login, signUp } from '@/app/login/action';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignUp = async () => {
        login(email, password);
        router.refresh();
        setEmail('');
        setPassword('');
    }

    const handleSignIn = async () => {
        signUp(email, password);
        router.refresh();
        setEmail('');
        setPassword('');
    }

    return (
        <main
            className="h-screen flex items-center justify-center bg-gray-800 p-6"
        >
            <div className="bg-gray-900 p-8 rounder-lg shadow-md w-96">
                <input
                    className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    type="email"
                    name="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full mb-2 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                    onClick={handleSignUp}
                >Sign-Up</button>
                <button
                    className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
                    onClick={handleSignIn}
                >Sign In</button>
            </div>
        </main>
    )
}
