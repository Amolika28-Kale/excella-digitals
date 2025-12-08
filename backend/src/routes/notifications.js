const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const auth = require("../middleware/auth");

// SEND NOTIFICATION (ADMIN)
router.post("/send", auth, async (req, res) => {
  try {
    const { title, message, userIds } = req.body;

    if (!title || !message)
      return res.status(400).json({ error: "Missing fields" });

    if (!Array.isArray(userIds) || userIds.length === 0)
      return res.status(400).json({ error: "No users selected" });

    const notifications = userIds.map((id) => ({
      userId: id,
      title,
      message,
    }));

    await Notification.insertMany(notifications);
    res.json({ ok: true, msg: "Notifications sent!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET USER NOTIFICATIONS
router.get("/:userId", auth, async (req, res) => {
  const list = await Notification.find({ userId: req.params.userId }).sort({
    createdAt: -1,
  });
  res.json({ ok: true, notifications: list });
});

module.exports = router;
