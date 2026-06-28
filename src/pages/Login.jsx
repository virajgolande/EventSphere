import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import authService from "../appwrite/auth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Login user
      await authService.login(form);

      // Get current user from Appwrite
      const currentUser = await authService.getCurrentUser();

      const role = currentUser.email.endsWith("@college.edu")
        ? "admin"
        : "user";

      // Save complete user in AuthContext
      login({
        id: currentUser.$id,
        name: currentUser.name,
        email: currentUser.email,
        role,
      });

      navigate("/");
    } catch (error) {
      alert(error.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-x-hidden">

      {/* LEFT IMAGE */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="/concert.jpg"
          alt="event"
          className="w-full h-screen object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 py-10">

        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-pink-500/20 shadow-2xl shadow-pink-500/10">

          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
            Log In
          </h2>

          <p className="text-sm text-gray-400 text-center mb-6">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-pink-500 hover:text-pink-400 hover:underline"
            >
              Sign up
            </NavLink>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 bg-black/40 rounded-lg border border-white/10 focus:outline-none focus:border-pink-500"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 bg-black/40 rounded-lg border border-white/10 focus:outline-none focus:border-pink-500"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="submit"
              className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg shadow-pink-600/30"
            >
              Log In
            </button>

          </form>

          <p className="text-xs text-gray-500 mt-6 text-center">
            Secure access to your events dashboard
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;