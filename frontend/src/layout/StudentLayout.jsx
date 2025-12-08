import React from "react";
import StudentSidebar from "../components/StudentSidebar";
import StudentTopbar from "../components/StudentTopbar";

export default function StudentLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR (mobile slide + desktop fixed) */}
      <StudentSidebar />

      {/* MAIN CONTENT  */}
      <div className="flex-1 lg:ml-64">
        {/* FIXED TOPBAR */}
        <StudentTopbar />

        {/* PAGE CONTENT */}
        <div className="mt-20 p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
