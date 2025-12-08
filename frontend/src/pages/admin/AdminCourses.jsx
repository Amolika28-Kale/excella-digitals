import React, { useEffect, useState } from "react";
import API from "../../api";
import { Link } from "react-router-dom";
export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  useEffect(() => {
    API.get("/courses")
      .then((r) => setCourses(r.data.courses))
      .catch(console.error);
  }, []);
  const createCourse = async () => {
    try {
      const res = await API.post("/courses", { title, description: desc });
      setCourses([res.data.course, ...courses]);
      setTitle("");
      setDesc("");
    } catch (err) {
      alert(err?.response?.data?.error || "Error");
    }
  };

  const deleteCourse = async (id) => {
  if (!window.confirm("Delete this course?")) return;
  try {
    await API.delete("/courses/" + id);
    setCourses(courses.filter((c) => c._id !== id));
  } catch (err) {
    alert(err?.response?.data?.error || "Error deleting");
  }
};

  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-4">Courses</h2>
      <div className="card max-w-lg mb-4">
        <input
          className="input"
          placeholder="Course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="btn" onClick={createCourse}>
          Create Course
        </button>
      </div>
      <div>
        {courses.map((c) => (
          <div key={c._id} className="card flex justify-between items-center">
            
            <div>
              <strong>{c.title}</strong>
              <div className="text-sm">{c.description}</div>
            </div>
            <div>
              <Link className="btn" to={"/admin/courses/" + c._id}>
                Manage
              </Link>
            </div>
            <button
  className="btn bg-red-600 text-white ml-2"
  onClick={() => deleteCourse(c._id)}
>
  Delete
</button>

          </div>
          
        ))}
      </div>
    </div>
  );
}
