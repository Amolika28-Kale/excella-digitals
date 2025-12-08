import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg border-r z-40
          w-64 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <AdminSidebar closeSidebar={() => setOpen(false)} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 lg:ml-64">

        {/* TOPBAR */}
        <AdminTopbar onMenuClick={() => setOpen(true)} />

        {/* PAGE CONTENT */}
        <div className="p-6 mt-20">
          {children}
        </div>
      </div>
    </div>
  );
}
