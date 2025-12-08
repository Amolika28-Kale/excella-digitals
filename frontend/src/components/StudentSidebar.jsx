import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Wallet, Share2, Menu, X } from "lucide-react";

export default function StudentSidebar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Courses", icon: BookOpen, path: "/my-courses" },
    { name: "Wallet", icon: Wallet, path: "/wallet" },
    { name: "Referral", icon: Share2, path: "/referral" },
    // { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-md shadow"
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl border-r px-5 py-6 flex flex-col z-50 
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* CLOSE BUTTON (Mobile Only) */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-gray-600"
        >
          <X size={26} />
        </button>

        {/* LOGO */}
        <h1 className="text-2xl font-bold text-indigo-600 mb-10 text-center tracking-wide mt-4">
          Excella Student
        </h1>

        {/* MENU */}
        <nav className="space-y-2 flex flex-col">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all 
                  ${
                    isActive(item.path)
                      ? "bg-indigo-600 text-white shadow"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="mt-auto text-center text-xs text-gray-500 py-4">
          © {new Date().getFullYear()} Excella Digitals
        </div>
      </div>

      {/* OVERLAY (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm lg:hidden z-40"
        ></div>
      )}
    </>
  );
}
