const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Payment = require('../models/Payment');
const Referral = require('../models/Referral');
const WalletTransaction = require('../models/WalletTransaction');
const auth = require('../middleware/auth');

router.get('/users', auth, async (req, res) => {
  if(req.user.role !== 'admin') return res.status(403).json({error:'forbidden'});
  const users = await User.find().select('-passwordHash');
  res.json({ok:true, users});
});

router.get('/payments', auth, async (req, res) => {
  if(req.user.role !== 'admin') return res.status(403).json({error:'forbidden'});
  const pays = await Payment.find().populate('userId','name email');
  res.json({ok:true, pays});
});

router.get('/referrals', auth, async (req, res) => {
  if(req.user.role !== 'admin') return res.status(403).json({error:'forbidden'});
  const refs = await Referral.find()
    .populate('referrerUserId referredUserId','name email');
  res.json({ok:true, refs});
});


router.get('/wallet/transactions', auth, async (req, res) => {
  if(req.user.role !== 'admin') return res.status(403).json({error:'forbidden'});
  const tx = await WalletTransaction.find().populate('userId','name email');
  res.json({ok:true, tx});
});

router.post('/wallet/approve', auth, async (req, res) => {
  if(req.user.role !== 'admin') return res.status(403).json({error:'forbidden'});
  const { txId } = req.body;
  const tx = await WalletTransaction.findById(txId);
  if(!tx) return res.status(404).json({error:'not found'});
  tx.status = 'success';
  await tx.save();
  res.json({ok:true, tx});
});

router.post("/users/block", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "forbidden" });

  const { id, block } = req.body;

  await User.findByIdAndUpdate(id, { blocked: block });

  return res.json({ ok: true, msg: block ? "User blocked" : "User unblocked" });
});


module.exports = router;
