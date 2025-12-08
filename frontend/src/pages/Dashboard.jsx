import React, { useEffect, useState } from "react";
import API from "../api";
import StudentLayout from "../layout/StudentLayout";
import { BookOpen, PlayCircle, Percent, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/student/dashboard").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <StudentLayout>Loading...</StudentLayout>;

  return (
    <StudentLayout>
      
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white shadow rounded-lg flex items-center gap-4">
          <BookOpen className="text-blue-600" size={32} />
          <div>
            <h3 className="text-lg font-bold">{stats.totalCourses}</h3>
            <p className="text-gray-500">Total Courses</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-lg flex items-center gap-4">
          <CheckCircle className="text-green-600" size={32} />
          <div>
            <h3 className="text-lg font-bold">{stats.completedVideos}</h3>
            <p className="text-gray-500">Completed Videos</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-lg flex items-center gap-4">
          <Percent className="text-purple-600" size={32} />
          <div>
            <h3 className="text-lg font-bold">{stats.progressPercent}%</h3>
            <p className="text-gray-500">Overall Progress</p>
          </div>
        </div>
      </div>

      {/* PAYMENT STATUS */}
      {!stats.hasPaid && (
        <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded mb-6">
          <strong>You haven't purchased the course.</strong>
          <br />
          Pay <b>₹1200</b> to unlock all content.
          <Link
            to={`/payment/${localStorage.getItem("userId")}`}
            className="inline-block mt-2 px-5 py-2 bg-red-600 text-white rounded"
          >
            Pay Now
          </Link>
        </div>
      )}

      {/* RESUME LAST WATCHED */}
      {stats.lastWatched && (
        <div className="bg-indigo-100 p-4 rounded-lg flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-indigo-700">Resume Learning</h3>
            <p className="text-gray-600 text-sm">
              Continue where you left off
            </p>
          </div>

          <Link
            to={`/courses/${stats.lastWatched.moduleId}?video=${stats.lastWatched.videoId}`}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded"
          >
            <PlayCircle size={20} /> Continue
          </Link>
        </div>
      )}

      {/* QUICK LINKS */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          to="/my-courses"
          className="p-4 bg-white shadow rounded-lg flex items-center gap-3 hover:bg-gray-50"
        >
          <BookOpen /> <span>Go to My Courses</span>
        </Link>

        <Link
          to="/wallet"
          className="p-4 bg-white shadow rounded-lg flex items-center gap-3 hover:bg-gray-50"
        >
          💰 <span>Wallet & Earnings</span>
        </Link>
      </div>

    </StudentLayout>
  );
}
