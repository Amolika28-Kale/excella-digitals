import React, { useState, useEffect } from "react";
import { LogOut, Bell, Menu, Sun, Moon, User } from "lucide-react";

export default function AdminTopbar({ onMenuClick }) {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false); // profile dropdown

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  /* ---------------- DARK MODE ---------------- */
  useEffect(() => {
    const mode = localStorage.getItem("darkMode") === "true";
    setDark(mode);
    mode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, []);

  const toggleDark = () => {
    const newMode = !dark;
    setDark(newMode);
    localStorage.setItem("darkMode", newMode);

    newMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="
      fixed top-0 left-0 right-0 lg:left-64
      h-16 bg-white dark:bg-gray-900 dark:text-white
      shadow-md flex items-center justify-between px-4 z-30
    ">

      {/* ----------- MOBILE MENU BUTTON ----------- */}
      <button
        className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={onMenuClick}
      >
        <Menu size={22} />
      </button>

      {/* ----------- TITLE ----------- */}
      <h2 className="text-xl font-semibold">Admin Panel</h2>

      {/* ----------- RIGHT SIDE ACTIONS ----------- */}
      <div className="flex items-center gap-4 relative">

        {/* 🔔 NOTIFICATIONS */}
        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          <Bell size={20} />
        </button>

        {/* 🌙 DARK MODE */}
        <button
          onClick={toggleDark}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* 👤 PROFILE / DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="
              flex items-center gap-2 py-1 px-3 
              bg-gray-100 dark:bg-gray-800 
              rounded-full hover:bg-gray-200 dark:hover:bg-gray-700
            "
          >
            <User size={18} />
            <span className="hidden sm:block">{user?.name || "Admin"}</span>
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="
              absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg 
              rounded-lg border dark:border-gray-700 animate-fade
            ">
              <div className="px-4 py-3 border-b dark:border-gray-700">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>

              <button
                onClick={() => (window.location.href = "/admin/settings")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </button>

              <button
                onClick={logout}
                className="
                  flex items-center gap-2 text-red-600 w-full text-left px-4 py-2 
                  hover:bg-red-50 dark:hover:bg-red-900/40
                "
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
