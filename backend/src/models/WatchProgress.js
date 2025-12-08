const mongoose = require("mongoose");

const WatchProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },

  currentTime: { type: Number, default: 0 }, // in seconds
  completed: { type: Boolean, default: false },

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WatchProgress", WatchProgressSchema);
