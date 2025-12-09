import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setMsg(err?.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#061028] to-[#071132] px-4">
      <div className="bg-white/10 backdrop-blur-xl w-full max-w-md p-8 rounded-2xl shadow-2xl border border-white/20">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={submit} className="space-y-5">
          
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold shadow-lg hover:shadow-indigo-500/30"
          >
            Login
          </button>

        </form>

        {/* Error Message */}
        {msg && (
          <p className="text-center text-red-400 mt-4 bg-red-900/20 py-2 rounded-md">
            {msg}
          </p>
        )}

        {/* Register Link */}
        <p className="text-center text-gray-300 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-300 hover:underline">
            Register
          </a>
        </p>

      </div>
    </div>
  );
}
