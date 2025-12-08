const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: "Excella" },
  supportEmail: { type: String, default: "" },
  supportPhone: { type: String, default: "" },

  // Payment settings
  coursePrice: { type: Number, default: 1200 },
  referralBonus: { type: Number, default: 600 },

  // Maintenance Mode
  maintenanceMode: { type: Boolean, default: false }
});

module.exports = mongoose.model("Settings", SettingsSchema);
