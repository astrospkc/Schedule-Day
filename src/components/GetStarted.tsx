"use client";
import { useState } from "react";
// import { useRouter } from "next/navigation";

export default function GetStartedPage() {
    const [chooseOption, setChooseOption] = useState("signin");

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center text-white px-6"
            style={{
                background:
                    "radial-gradient(circle at center, #1f1f1f, #0f0f0f, #2d0a48)",
            }}
        >
            {chooseOption === "signin" ? (
                <Login setChooseOption={setChooseOption} />
            ) : (
                <Signup setChooseOption={setChooseOption} />
            )}
        </div>
    );
}

// ---------- LOGIN COMPONENT ----------
const Login = ({ setChooseOption }: { setChooseOption: (opt: string) => void }) => {
    // const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Call your API for login here
        // router.push("/dashboard"); // redirect after login success
    };

    return (
        <>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
                Login Your Free Account
            </h1>
            <p className="text-gray-300 text-lg mb-12 text-center max-w-2xl">
                Login today to start managing your weekly recurring slots with ease.
            </p>

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-white/10 p-8 rounded-2xl shadow-lg space-y-6"
            >
                <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-600"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-600"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 font-semibold text-lg shadow-lg"
                >
                    Log In
                </button>
            </form>

            {/* Extra Links */}
            <p className="mt-6 text-gray-400 text-sm">
                Don&apos;t have an account?{" "}
                <button
                    onClick={() => setChooseOption("signup")}
                    className="text-violet-400 hover:underline"
                >
                    Sign Up
                </button>
            </p>
        </>
    );
};

// ---------- SIGNUP COMPONENT ----------
const Signup = ({ setChooseOption }: { setChooseOption: (opt: string) => void }) => {
    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: call signup API
        setChooseOption("signin"); // after signup, go to login
    };

    return (
        <>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
                Create Your Free Account
            </h1>
            <p className="text-gray-300 text-lg mb-12 text-center max-w-2xl">
                Sign up today to start managing your weekly recurring slots with ease.
            </p>

            <form
                onSubmit={handleSignup}
                className="w-full max-w-md bg-white/10 p-8 rounded-2xl shadow-lg space-y-6"
            >
                <div>
                    <label className="block text-sm mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-600"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-600"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-600"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 font-semibold text-lg shadow-lg"
                >
                    Sign Up
                </button>
            </form>

            {/* Extra Links */}
            <p className="mt-6 text-gray-400 text-sm">
                Already have an account?{" "}
                <button
                    onClick={() => setChooseOption("signin")}
                    className="text-violet-400 hover:underline"
                >
                    Log in
                </button>
            </p>
        </>
    );
};
