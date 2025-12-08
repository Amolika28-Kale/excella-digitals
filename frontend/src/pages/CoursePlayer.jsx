import React, { useEffect, useState, useRef } from "react";
import API from "../api";
import { useParams, useSearchParams } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";

export default function CoursePlayer() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();

  const initialVideo = searchParams.get("video");
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const res = await API.get(`/courses/${courseId}`);
    setCourse(res.data.course);

    // Find the module/video
    let foundVideo = null;
    res.data.course.modules.forEach((m) => {
      m.videos.forEach((v) => {
        if (v._id === initialVideo) foundVideo = v;
      });
    });

    setCurrentVideo(foundVideo || res.data.course.modules[0].videos[0]);
  };

  // Load saved progress
  useEffect(() => {
    if (currentVideo) {
      API.get(`/student/progress/${currentVideo._id}`).then((res) => {
        if (res.data.progress) {
          videoRef.current.currentTime = res.data.progress.currentTime;
        }
      });
    }
  }, [currentVideo]);

  // Auto save progress every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && currentVideo) {
        API.post("/student/progress", {
          videoId: currentVideo._id,
          courseId,
          moduleId: currentVideo.moduleId,
          currentTime: videoRef.current.currentTime,
          completed:
            videoRef.current.currentTime >= videoRef.current.duration - 5,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentVideo]);

  if (!course || !currentVideo)
    return <StudentLayout>Loading Player...</StudentLayout>;

  return (
    <StudentLayout>
      <div className="grid md:grid-cols-3 gap-4">
        
        {/* Left — Module/Video List */}
        <div className="bg-white p-4 rounded shadow h-full overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{course.title}</h2>

          {course.modules.map((m) => (
            <div key={m._id} className="mb-4">
              <h3 className="font-semibold mb-2">{m.title}</h3>

              {m.videos.map((v) => (
                <button
                  key={v._id}
                  onClick={() => setCurrentVideo(v)}
                  className={`block w-full text-left p-2 rounded mb-1 ${
                    currentVideo._id === v._id
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  ▶ {v.title}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Right — Video Player */}
        <div className="md:col-span-2 bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">{currentVideo.title}</h2>

          <video
            ref={videoRef}
            controls
            className="w-full rounded"
            src={currentVideo.videoUrl}
          />
        </div>

      </div>
    </StudentLayout>
  );
}
