const express = require('express');
const router = express.Router();
const WalletTransaction = require('../models/WalletTransaction');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('walletBalance');
  const tx = await WalletTransaction.find({userId: req.user._id});
  res.json({ok:true, balance: user.walletBalance || 0, transactions: tx});
});

router.post('/withdraw', auth, async (req, res) => {
  const { amount } = req.body;
  if(!amount || amount <= 0) return res.status(400).json({error:'invalid amount'});
  const user = await User.findById(req.user._id);
  if(!user) return res.status(400).json({error:'invalid user'});
  if((user.walletBalance || 0) < amount) return res.status(400).json({error:'insufficient balance'});
  user.walletBalance = user.walletBalance - amount;
  await user.save();
  const tx = new WalletTransaction({userId: user._id, type:'withdraw', amount, status:'pending'});
  await tx.save();
  res.json({ok:true, tx});
});

module.exports = router;
