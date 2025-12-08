import React, { useState, useEffect } from "react";
import { User, Menu, Sun, Moon, LogOut, Bell, Settings } from "lucide-react";
import API from "../api";

export default function StudentTopbar({ onMenuClick }) {
  const [dark, setDark] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  /* ---------- Load Dark Mode ---------- */
useEffect(() => {
  const mode = localStorage.getItem("darkMode") === "true";
  setDark(mode);

  if (mode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, []);


  /* ---------- Fetch Notifications ---------- */
useEffect(() => {
  if (!user?._id) return;

  console.log("Fetching notifications for:", user._id);

 API.get(`/notifications/${user._id}`)
  .then((res) => setNotifications(res.data.notifications || []))
  .catch((err) => {
    console.log("Notification fetch error:", err.response?.data || err.message);
  

      setNotifications([]);
    });
}, [user?._id]);


  /* ---------- Toggle Dark Mode ---------- */
const toggleDark = () => {
  const next = !dark;
  setDark(next);
  localStorage.setItem("darkMode", next);

  if (next) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

  /* ---------- Logout ---------- */
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className="
        fixed top-0 
        left-0 lg:left-64 
        right-0 
        h-16 bg-white dark:bg-gray-900 dark:text-white
        border-b shadow 
        flex items-center justify-between 
        px-4 sm:px-6 
        z-20
      "
    >
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={onMenuClick}
      >
        <Menu size={22} />
      </button>

      <h2 className="text-lg font-semibold hidden sm:block">Student Panel</h2>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-4 relative">

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDark}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 relative"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="
              absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 
              shadow-lg border dark:border-gray-700 rounded-lg
            ">
              <h3 className="px-4 py-3 font-semibold border-b dark:border-gray-700">
                Notifications
              </h3>

              {notifications.length === 0 ? (
                <p className="px-4 py-3 text-gray-500 text-sm">
                  No new notifications
                </p>
              ) : (
                <div className="max-h-60 overflow-y-auto">
                  {notifications.map((n, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 border-b dark:border-gray-700 text-sm"
                    >
                      {n.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="
              flex items-center gap-2 px-3 py-1 
              bg-gray-100 dark:bg-gray-800
              rounded-full hover:bg-gray-200 dark:hover:bg-gray-700
            "
          >
            <User size={18} className="text-indigo-600" />
            <span className="hidden sm:block">{user?.name}</span>
          </button>

          {profileOpen && (
            <div
              className="
                absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg
                border dark:border-gray-700 rounded-lg
              "
            >
              <div className="px-4 py-3 border-b dark:border-gray-700">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>

              <button
                onClick={() => (window.location.href = "/settings")}
                className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings size={16} /> Settings
              </button>

              <button
                onClick={logout}
                className="w-full px-4 py-2 text-left flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40"
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
