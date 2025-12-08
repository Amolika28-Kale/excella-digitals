import React, { useEffect, useState } from "react";
import API from "../api";
import StudentLayout from "../layout/StudentLayout";
import { Link } from "react-router-dom";
import { BookOpen, Lock } from "lucide-react";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
    loadCourses();
  }, []);

  const loadUser = async () => {
    const res = await API.get("/auth/me");
    setUser(res.data.user);
  };

  const loadCourses = async () => {
    try {
      const res = await API.get("/courses/my");
      setCourses(res.data.courses);
    } catch (e) {
      setCourses([]);
    }
    setLoading(false);
  };

  if (loading) return <StudentLayout>Loading...</StudentLayout>;

  return (
    <StudentLayout>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookOpen /> My Courses
      </h1>

      {/* If unpaid */}
      {!user?.hasPaid && (
        <div className="bg-red-100 border-l-4 border-red-600 p-4 mb-6 text-red-700 rounded">
          <strong>You haven’t purchased the course.</strong>  
          Pay <b>₹1200</b> to unlock all courses.
          <Link
to={`/payment/${user?._id}`}
            className="ml-4 bg-red-600 px-4 py-2 rounded text-white"
          >
            Pay Now
          </Link>
        </div>
      )}

      {/* If paid but no courses */}
      {user?.hasPaid && courses.length === 0 && (
        <p className="text-gray-600">No courses available yet.</p>
      )}

      {/* Course list */}
      <div className="grid md:grid-cols-2 gap-4">
        {user?.hasPaid
          ? courses.map((c) => (
              <div key={c._id} className="bg-white shadow p-4 rounded-xl">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-gray-600 mb-3">{c.description}</p>
                <Link
                  to={`/courses/${c._id}`}
                  className="btn"
                >
                  Start Learning
                </Link>
              </div>
            ))
          : (
            <div className="text-center text-gray-600 col-span-2 p-10">
              <Lock size={40} className="mx-auto mb-3 text-red-600" />
              Your courses are locked.  
              <br />Make payment to unlock everything.
            </div>
          )}
      </div>
    </StudentLayout>
  );
}
