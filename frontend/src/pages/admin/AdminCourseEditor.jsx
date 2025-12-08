import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
export default function AdminCourseEditor() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedModule, setSelectedModule] = useState(null);
  useEffect(() => {
    API.get("/courses/" + id)
      .then((r) => setCourse(r.data.course))
      .catch(console.error);
  }, [id]);
  const createModule = async () => {
    try {
      const res = await API.post("/courses/" + id + "/modules", {
        title: moduleTitle,
        description: moduleDesc,
      });
      setCourse({ ...course, modules: [...course.modules, res.data.module] });
      setModuleTitle("");
      setModuleDesc("");
    } catch (err) {
      alert(err?.response?.data?.error || "Error");
    }
  };
  const addVideo = async () => {
    if (!selectedModule) return alert("Select module");
    try {
      const res = await API.post(
        "/courses/modules/" + selectedModule + "/videos",
        { title: videoTitle, videoUrl, duration: 0, isFree: false }
      );
      const mods = course.modules.map((m) =>
        m._id === selectedModule
          ? { ...m, videos: [...m.videos, res.data.video] }
          : m
      );
      setCourse({ ...course, modules: mods });
      setVideoTitle("");
      setVideoUrl("");
    } catch (err) {
      alert(err?.response?.data?.error || "Error");
    }
  };
  const deleteVideo = async (moduleId, videoId) => {
  if (!window.confirm("Delete this video?")) return;

  try {
    await API.delete(`/courses/modules/${moduleId}/videos/${videoId}`);

    // update UI
    const updatedModules = course.modules.map((m) =>
      m._id === moduleId
        ? { ...m, videos: m.videos.filter((v) => v._id !== videoId) }
        : m
    );

    setCourse({ ...course, modules: updatedModules });
  } catch (err) {
    alert(err?.response?.data?.error || "Error deleting video");
  }
};
const deleteModule = async (moduleId) => {
  if (!window.confirm("Delete this module?")) return;

  try {
    await API.delete(`/courses/${id}/modules/${moduleId}`);

    // remove from UI
    setCourse({
      ...course,
      modules: course.modules.filter((m) => m._id !== moduleId),
    });
  } catch (err) {
    alert(err?.response?.data?.error || "Error");
  }
};

  if (!course) return <div className="container">Loading...</div>;
  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-4">
        Manage Course: {course.title}
      </h2>
      <div className="card max-w-2xl mb-4">
        <h3 className="font-semibold">Create Module</h3>
        <input
          className="input"
          placeholder="Module title"
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Module description"
          value={moduleDesc}
          onChange={(e) => setModuleDesc(e.target.value)}
        />
        <button className="btn" onClick={createModule}>
          Add Module
        </button>
      </div>
      <div className="card max-w-2xl mb-4">
        <h3 className="font-semibold">Add Video to Module</h3>
        <select
          className="input"
          value={selectedModule || ""}
          onChange={(e) => setSelectedModule(e.target.value)}
        >
          <option value="">Select Module</option>
          {course.modules.map((m) => (
            <option key={m._id} value={m._id}>
              {m.title}
            </option>
            
          ))}
        </select>
        <input
          className="input"
          placeholder="Video title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
        <input
          className="input"
          placeholder="Video URL (YouTube/Vimeo/Cloud)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button className="btn" onClick={addVideo}>
          Add Video
        </button>
        <button
  className="btn bg-red-600 text-white mt-2"
  onClick={() => deleteModule(m._id)}
>
  Delete Module
</button>

      </div>
      <h3 className="text-lg font-semibold mb-2">Modules</h3>
      {course.modules.map((m) => (
        <div key={m._id} className="card mb-2">
          <div className="font-semibold">{m.title}</div>
          <div className="text-sm mb-2">{m.description}</div>
          <div className="text-sm">Videos:</div>
          {m.videos.map((v) => (
            <div key={v._id} className="mt-2 p-2 bg-gray-50 rounded">
              {v.title} -{" "}
              <a
                href={v.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600"
              >
                Open
              </a>
              <button
  className="btn bg-red-500 text-white ml-3"
  onClick={() => deleteVideo(m._id, v._id)}
>
  Delete
</button>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
