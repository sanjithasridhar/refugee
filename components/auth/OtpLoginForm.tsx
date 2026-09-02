"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const supabase = createClient();

    const login = async () => {
        if (!email || !password) return alert("Enter both email and password.");

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error("Auth Error:", error.message);
            alert(`Login failed: ${error.message}`);
        } else {
            alert("Logged in successfully!");
            window.location.href = "/find-help";
        }
    };

    const signUp = async () => {
        if (!email || !password) return alert("Enter both email and password.");

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.error("Signup Error:", error.message);
            alert(`Signup failed: ${error.message}`);
        } else {
            alert("Signed up successfully! Check your email to verify your account.");
        }
    };

    return (
        <div className="flex flex-col gap-4 text-black max-w-sm w-full mx-auto mt-8">
            <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={login} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-semibold transition-colors">
                Log In
            </button>
            <button onClick={signUp} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 font-semibold transition-colors">
                Sign Up
            </button>
        </div>
    );
}