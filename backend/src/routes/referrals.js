const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');
const auth = require('../middleware/auth');

router.get('/my', auth, async (req, res) => {
  const refs = await Referral.find({referrerUserId: req.user._id}).populate('referredUserId','name email');
  res.json({ok:true, refs});
});

module.exports = router;
