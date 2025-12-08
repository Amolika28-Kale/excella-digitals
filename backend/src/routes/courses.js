const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Module = require('../models/Module');
const Video = require('../models/Video');
const auth = require('../middleware/auth');


// ==========================================
// GET ALL COURSES
// ==========================================
router.get('/', async (req, res) => {
  const courses = await Course.find().populate({
    path: 'modules',
    populate: { path: 'videos' }
  });

  res.json({ ok: true, courses });
});


// ==========================================
// STUDENT → GET MY COURSES (MUST COME BEFORE /:id)
// ==========================================
router.get('/my', auth, async (req, res) => {
  try {
    if (!req.user.hasPaid) {
      return res.json({ ok: true, courses: [] });
    }

    const courses = await Course.find().populate({
      path: 'modules',
      populate: { path: 'videos' }
    });

    res.json({ ok: true, courses });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Mark video as completed (student)
router.post('/modules/:moduleId/videos/:videoId/complete', auth, async (req, res) => {
  try {
    const user = req.user; // auth middleware sets req.user
    const { moduleId, videoId } = req.params;

    // find video to check isFree flag
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ error: 'video not found' });

    // If video is not free, only allow if user hasPaid
    if (!video.isFree && !user.hasPaid) {
      return res.status(403).json({ error: 'Payment required' });
    }

    // Ensure user.completedVideos exists
    if (!Array.isArray(user.completedVideos)) user.completedVideos = [];

    if (!user.completedVideos.includes(videoId)) {
      user.completedVideos.push(videoId);
      await user.save();
    }

    return res.json({ ok: true, msg: 'Marked completed', completedVideos: user.completedVideos });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'server error' });
  }
});

// Get user's completed videos (optional)
router.get('/progress/me', auth, async (req, res) => {
  try {
    const user = req.user;
    res.json({ ok: true, completedVideos: user.completedVideos || [] });
  } catch (e) {
    res.status(500).json({ error: 'server error' });
  }
});

// ==========================================
// GET SINGLE COURSE BY ID
// ==========================================
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'modules',
    populate: { path: 'videos' }
  });

  if (!course) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true, course });
});


// ==========================================
// CREATE COURSE (ADMIN)
// ==========================================
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });

  const { title, description, thumbnail } = req.body;
  const course = new Course({ title, description, thumbnail });

  await course.save();
  res.json({ ok: true, course });
});


// ==========================================
// UPDATE COURSE (ADMIN)
// ==========================================
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });

  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ ok: true, course });
});


// ==========================================
// DELETE COURSE (ADMIN)
// ==========================================
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });

  await Course.findByIdAndDelete(req.params.id);
  res.json({ ok: true, msg: "Course deleted" });
});


// ==========================================
// ADD MODULE TO COURSE (ADMIN)
// ==========================================
router.post('/:id/modules', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });

  const { title, description } = req.body;

  const mod = new Module({
    courseId: req.params.id,
    title,
    description
  });

  await mod.save();

  await Course.findByIdAndUpdate(req.params.id, {
    $push: { modules: mod._id }
  });

  res.json({ ok: true, module: mod });
});


// ==========================================
// ADD VIDEO TO MODULE (ADMIN)
// ==========================================
router.post("/modules/:moduleId/videos/:videoId/complete", auth, async (req, res) => {
  const { moduleId, videoId } = req.params;
  const user = req.user;

  if (!user.completedVideos.includes(videoId)) {
    user.completedVideos.push(videoId);
  }

  user.lastWatched = {
    videoId,
    moduleId,
    watchedAt: new Date()
  };

  await user.save();

  res.json({ ok: true });
});


// ==========================================
// DELETE VIDEO (ADMIN)
// ==========================================
router.delete("/modules/:moduleId/videos/:videoId", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "forbidden" });

  const { moduleId, videoId } = req.params;

  await Module.findByIdAndUpdate(moduleId, {
    $pull: { videos: videoId }
  });

  await Video.findByIdAndDelete(videoId);

  res.json({ ok: true, msg: "Video deleted" });
});


// ==========================================
// DELETE MODULE (ADMIN)
// ==========================================
router.delete("/:courseId/modules/:moduleId", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "forbidden" });

  const { courseId, moduleId } = req.params;

  await Course.findByIdAndUpdate(courseId, {
    $pull: { modules: moduleId }
  });

  const module = await Module.findById(moduleId);
  if (module) {
    await Video.deleteMany({ _id: { $in: module.videos } });
    await Module.findByIdAndDelete(moduleId);
  }

  res.json({ ok: true, msg: "Module deleted" });
});


module.exports = router;
