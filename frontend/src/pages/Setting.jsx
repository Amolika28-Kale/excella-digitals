import React, { useState } from "react";
import StudentLayout from "../layout/StudentLayout";
import API from "../api";
import { User, Mail, Lock, LogOut } from "lucide-react";

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const updateProfile = async () => {
    await API.put("/auth/update-profile", { name });
    alert("Profile updated!");
  };

  const changePassword = async () => {
    if (!password) return alert("Enter new password");
    await API.put("/auth/change-password", { password });
    alert("Password changed!");
    setPassword("");
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        ⚙️Settings
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl mx-auto border">

        {/* PROFILE SECTION */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User className="text-indigo-600" /> Profile Information
        </h2>

        <label className="font-semibold text-gray-700">Full Name</label>
        <div className="relative mb-5">
          <User className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <label className="font-semibold text-gray-700">Email</label>
        <div className="relative mb-5">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            value={email}
            readOnly
            className="w-full pl-10 mt-1 border px-3 py-2 rounded-lg bg-gray-100 text-gray-600"
          />
        </div>

        <button
          onClick={updateProfile}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg mb-8 hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>

        {/* PASSWORD SECTION */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lock className="text-purple-600" /> Change Password
        </h2>

        <label className="font-semibold text-gray-700">New Password</label>
        <div className="relative mb-5">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full pl-10 mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        <button
          onClick={changePassword}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Update Password
        </button>

        {/* LOGOUT */}
        <div className="mt-10">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

      </div>
    </StudentLayout>
  );
}
