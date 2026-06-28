import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import authService from "../appwrite/auth";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (form.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      await authService.signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      const role = form.email.endsWith("@college.edu")
        ? "admin"
        : "user";

      login({ email: form.email, role });
      navigate("/");
    } catch (error) {
      alert(error.message || "Signup failed");
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
      <div className="w-full md:w-1/2 flex justify-center items-center px-4 py-10">

        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-pink-500/20 shadow-2xl shadow-pink-500/10">

          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account
          </h2>

          <p className="text-center text-gray-400 mb-6">
            Join EventSphere today
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 bg-black/40 rounded-lg border border-white/10 focus:outline-none focus:border-pink-500"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
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

            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-3 bg-black/40 rounded-lg border border-white/10 focus:outline-none focus:border-pink-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 py-3 rounded-lg font-semibold transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-pink-500 hover:underline"
            >
              Login
            </NavLink>
          </p>

          <p className="text-xs text-center text-gray-500 mt-4">
            By signing up, you agree to our Terms & Privacy Policy
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;