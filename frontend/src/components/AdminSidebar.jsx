import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Wallet,
  Share2,
  CreditCard,
  X,
  Bell
} from "lucide-react";

export default function AdminSidebar({ closeSidebar }) {
  const { pathname } = useLocation();

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Courses", icon: BookOpen, path: "/admin/courses" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Payments", icon: CreditCard, path: "/admin/payments" },
  { name: "Referrals", icon: Share2, path: "/admin/referrals" },
  { name: "Withdrawals", icon: Wallet, path: "/admin/withdrawals" },
  { name: "Notifications", icon: Bell, path: "/admin/notifications" },
];


  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <div className="w-64 bg-white shadow-xl h-screen px-4 py-6 border-r flex flex-col relative">

      {/* Close button for mobile */}
      <button
        onClick={closeSidebar}
        className="lg:hidden absolute top-4 right-4 text-gray-600 hover:text-red-500"
      >
        <X size={24} />
      </button>

      {/* LOGO */}
      <h1 className="text-2xl font-bold text-indigo-600 mb-10 text-center mt-4">
        Excella Admin
      </h1>

      {/* MENU */}
      <nav className="space-y-2 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => closeSidebar && closeSidebar()}
              className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all
                ${
                  isActive(item.path)
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-indigo-50"
                }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-500 py-3">
        © {new Date().getFullYear()} Excella Digitals
      </div>
    </div>
  );
}
