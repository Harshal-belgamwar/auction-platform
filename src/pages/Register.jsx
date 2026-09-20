import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gavel, ShieldCheck, UserPlus } from "lucide-react";
import api from "../api/axios";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (formData.name.trim() === "" || formData.email.trim() === "" || formData.password.trim() === "") {
            setError("All fields are required");
            return;
        }

        var data = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password.trim(),
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                "/api/v1/auth/register",
                data
            );

            console.log("Registration successful:", response.data);

            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
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
                            Create Your{" "}
                            <span className="gradient-text">Account</span>
                        </h1>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-surface-400">
                            Join BidVerse and start discovering, bidding,
                            and winning exclusive items.
                        </p>
                    </div>

                    {/* Register Card */}
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
                                <UserPlus size={20} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-surface-100">
                                    Register
                                </h2>

                                <p className="text-xs text-surface-500">
                                    Create your BidVerse account
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

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-surface-300"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
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
                                    placeholder="Create a password"
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

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-surface-300"
                                >
                                    Confirm Password
                                </label>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
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
                                {loading ? "Creating Account..." : "Create Account"}

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

                        {/* Login */}
                        <div className="mt-6 border-t border-surface-800 pt-6 text-center">
                            <p className="text-sm text-surface-500">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="
                    font-semibold
                    text-accent-400
                    transition-colors
                    hover:text-accent-300
                  "
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Bottom Text */}
                    <p className="mt-6 text-center text-xs text-surface-600">
                        By creating an account, you agree to the BidVerse
                        terms and conditions.
                    </p>
                </motion.div>
            </div>
        </main>
    );
};

export default Register;