const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Course = require("../models/Course");
const Video = require("../models/Video");
const WatchProgress = require("../models/WatchProgress");


router.get("/dashboard", auth, async (req, res) => {
  try {
    const hasPaid = req.user.hasPaid;

    const totalCourses = await Course.countDocuments();
    const totalVideos = await Video.countDocuments();

    const completedVideos = 0;
    const progressPercent = totalVideos === 0 ? 0 : Math.round((completedVideos / totalVideos) * 100);

    res.json({
      ok: true,
      hasPaid,
      totalCourses,
      completedVideos,
      totalVideos,
      progressPercent,
      lastWatched: null
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



// SAVE PROGRESS
router.post("/progress", auth, async (req, res) => {
  const { courseId, moduleId, videoId, currentTime, completed } = req.body;

  await WatchProgress.findOneAndUpdate(
    { userId: req.user._id, videoId },
    { courseId, moduleId, currentTime, completed, updatedAt: Date.now() },
    { upsert: true }
  );

  res.json({ ok: true });
});

// GET PROGRESS OF VIDEO
router.get("/progress/:videoId", auth, async (req, res) => {
  const prog = await WatchProgress.findOne({
    userId: req.user._id,
    videoId: req.params.videoId
  });

  res.json({ ok: true, progress: prog || null });
});

module.exports = router;
