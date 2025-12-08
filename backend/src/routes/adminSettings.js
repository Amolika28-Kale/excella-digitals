const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Settings = require("../models/Settings");
const User = require("../models/User");
const Payment = require("../models/Payment");
const Referral = require("../models/Referral");
const WalletTransaction = require("../models/WalletTransaction");
const { sendMail } = require("../utils/mailer");

// 🔧 Load settings, or create default
const loadSettings = async () => {
  let s = await Settings.findOne();
  if (!s) {
    s = new Settings();
    await s.save();
  }
  return s;
};

// -----------------------------------------------
// GET ALL SETTINGS
// -----------------------------------------------
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "forbidden" });

  const settings = await loadSettings();

  res.json({
    profile: {
      name: req.user.name,
      email: req.user.email
    },
    payment: {
      coursePrice: settings.coursePrice,
      referralBonus: settings.referralBonus
    },
    site: {
      siteName: settings.siteName,
      supportEmail: settings.supportEmail,
      supportPhone: settings.supportPhone
    }
  });
});

// -----------------------------------------------
// UPDATE PROFILE
// -----------------------------------------------
router.put("/profile", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "forbidden" });

  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).json({ error: "admin not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    const bcrypt = require("bcrypt");
    user.passwordHash = await bcrypt.hash(req.body.password, 10);
  }

  await user.save();

  res.json({ ok: true, msg: "Profile updated" });
});

// -----------------------------------------------
// UPDATE PAYMENT SETTINGS
// -----------------------------------------------
router.put("/payment", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "forbidden" });

  const settings = await loadSettings();

  settings.coursePrice = req.body.coursePrice;
  settings.referralBonus = req.body.referralBonus;

  await settings.save();

  res.json({ ok: true, msg: "Payment settings updated" });
});

// -----------------------------------------------
// UPDATE SITE SETTINGS
// -----------------------------------------------
router.put("/site", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "forbidden" });

  const settings = await loadSettings();

  settings.siteName = req.body.siteName;
  settings.supportEmail = req.body.supportEmail;
  settings.supportPhone = req.body.supportPhone;

  await settings.save();

  res.json({ ok: true, msg: "Site settings updated" });
});

// -----------------------------------------------
// SYSTEM ACTIONS
// -----------------------------------------------
router.post("/action", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "forbidden" });

  const { action } = req.body;

  const settings = await loadSettings();

  switch (action) {
    case "clear_failed_payments":
      await Payment.deleteMany({ status: "failed" });
      return res.json({ ok: true, msg: "Failed payments cleared" });

    case "clear_pending_withdrawals":
      await WalletTransaction.deleteMany({ type: "withdraw", status: "pending" });
      return res.json({ ok: true, msg: "Pending withdrawals cleared" });

    case "send_test_email":
      await sendMail("admin@test.com", "Test Email", "<p>Test email working.</p>");
      return res.json({ ok: true, msg: "Test email sent" });

    case "maintenance_toggle":
      settings.maintenanceMode = !settings.maintenanceMode;
      await settings.save();
      return res.json({ ok: true, msg: "Maintenance mode toggled" });

    default:
      return res.status(400).json({ error: "invalid action" });
  }
});

module.exports = router;
