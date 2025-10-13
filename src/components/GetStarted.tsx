import axios from "axios";
import { useState } from "react";
import { Router, useNavigate } from "react-router";
import { useUserStore } from "../store/useUserStore";
import { set } from "date-fns";

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
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticated } = useUserStore();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const handleLogin = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData);
        const user_data = res.data
        if (user_data) {
            localStorage.setItem("token", user_data.authtoken)
            setIsAuthenticated(true);
            navigate("/dashboard")
        }

        setIsLoading(false);

    };

    return (
        <>
            {
                isLoading && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                    </div>
                )
            }
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
                        name="email"
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-600"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
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

    const navigate = useNavigate()
    const { setIsAuthenticated } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSignup = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        setChooseOption("signin"); // after signup, go to login
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, formData);
        const user_data = res.data
        if (user_data) {
            localStorage.setItem("token", user_data.authtoken)
            setIsAuthenticated(true);
            navigate("/dashboard")
        }
        setIsLoading(false);

    };

    return (
        <>
            {
                isLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                    </div>
                )
            }
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
                        name="name"
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-600"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-600"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2">Password</label>
                    <input
                        name="password"
                        onChange={handleChange}
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
