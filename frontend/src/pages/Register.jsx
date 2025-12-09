import React, { useState } from "react";
import API from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref") || null;

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { ...form, referralCode: ref });
      setMsg("Registered successfully! Please login and pay ₹1200.");
      navigate("/login");
    } catch (err) {
      setMsg(err?.response?.data?.error || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#061028] to-[#071132] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        {/* Referral Code (optional display) */}
        {ref && (
          <p className="text-center text-indigo-300 mb-4">
            Referral Code Applied: <span className="font-semibold">{ref}</span>
          </p>
        )}

        <form onSubmit={submit} className="space-y-5">

          {/* Name */}
          <input
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          {/* Email */}
          <input
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          {/* Phone */}
          <input
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold shadow-lg hover:shadow-indigo-500/30"
          >
            Register
          </button>
        </form>

        {/* Error / message */}
        {msg && (
          <p className="text-center text-red-400 mt-4 bg-red-900/20 py-2 rounded-md">
            {msg}
          </p>
        )}

        {/* Login redirect */}
        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-300 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
