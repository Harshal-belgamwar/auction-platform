import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gavel, LogIn } from "lucide-react";
import api from "../api/axios";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        formData.email = formData.email.trim();
        formData.password = formData.password.trim();

        if (formData.email === "" || formData.password === "") {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                "/api/v1/auth/login",
                formData,

            );

            // console.log("Login successful:", response.data);

            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-surface-950">

            {/* Background Glow */}
            <div
                className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[350px]
          w-[350px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-accent-500/10
          blur-3xl
          sm:h-[500px]
          sm:w-[500px]
          lg:h-[650px]
          lg:w-[650px]
        "
            />

            {/* Content */}
            <div
                className="
          container-app
          relative
          flex
          min-h-screen
          items-center
          justify-center
          px-4
          py-12
          sm:py-16
        "
            >
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Header */}
                    <div className="mb-8 text-center">

                        {/* Logo Icon */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-accent-500/10
                text-accent-400
                ring-1
                ring-accent-500/20
              "
                        >
                            <Gavel size={28} />
                        </motion.div>

                        <h1
                            className="
                mt-5
                font-display
                text-3xl
                font-bold
                text-surface-50
                sm:text-4xl
              "
                        >
                            Welcome <span className="gradient-text">Back</span>
                        </h1>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-surface-400">
                            Log in to your BidVerse account to continue discovering, bidding,
                            and winning exclusive items.
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="glass-card p-6 sm:p-8">

                        {/* Card Header */}
                        <div className="mb-6 flex items-center gap-3">
                            <div
                                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  bg-accent-500/10
                  text-accent-400
                "
                            >
                                <LogIn size={20} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-surface-100">
                                    Login
                                </h2>

                                <p className="text-xs text-surface-500">
                                    Sign in to your account
                                </p>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="
                  mb-5
                  rounded-lg
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-400
                "
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-surface-300"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="
                    w-full
                    rounded-lg
                    border
                    border-surface-700
                    bg-surface-900
                    px-4
                    py-3
                    text-sm
                    text-surface-100
                    placeholder:text-surface-600
                    outline-none
                    transition
                    focus:border-accent-500
                    focus:ring-2
                    focus:ring-accent-500/10
                  "
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-surface-300"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="
                    w-full
                    rounded-lg
                    border
                    border-surface-700
                    bg-surface-900
                    px-4
                    py-3
                    text-sm
                    text-surface-100
                    placeholder:text-surface-600
                    outline-none
                    transition
                    focus:border-accent-500
                    focus:ring-2
                    focus:ring-accent-500/10
                  "
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-accent-500
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-surface-950
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-accent-400
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
                            >
                                {loading ? "Logging In..." : "Log In"}

                                {!loading && (
                                    <ArrowRight
                                        size={17}
                                        className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                                    />
                                )}
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="mt-6 border-t border-surface-800 pt-6 text-center">
                            <p className="text-sm text-surface-500">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="
                    font-semibold
                    text-accent-400
                    transition-colors
                    hover:text-accent-300
                  "
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>

                </motion.div>
            </div>
        </main>
    );
};

export default Login;
