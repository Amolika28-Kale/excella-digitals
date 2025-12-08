const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { nanoid } = require('nanoid');
const { sendMail } = require('../utils/mailer');
const authMiddleware = require('../middleware/auth');

// Register
router.post('/register',
  body('email').isEmail(),
  body('password').isLength({min:6}),
  body('name').notEmpty(),
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    const { name, email, phone, password, referralCode } = req.body;
    const existing = await User.findOne({email});
    if(existing) return res.status(400).json({error:'user exists'});
    const hash = await bcrypt.hash(password, 10);
    const code = nanoid(8);
    const user = new User({name, email, phone, passwordHash:hash, referralCode: code, referredBy: referralCode || null});
    await user.save();
    sendMail(email, 'Welcome to Excella', `<p>Hello ${name}, welcome to Excella. Please pay ₹1200 to unlock courses.</p>`).catch(e=>console.error(e));
    res.json({ok:true, userId: user._id});
  } catch(err){ console.error(err); res.status(500).json({error:'server error'});}
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: 'invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '7d' }
    );

    res.json({
      ok: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        hasPaid: user.hasPaid,
        referralCode: user.referralCode,
        role: user.role     // ⭐ FIX ADDED
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});


// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.json({ user: { id: user._id, name: user.name, email: user.email, hasPaid: user.hasPaid, referralCode: user.referralCode, walletBalance: user.walletBalance, role: user.role } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

module.exports = router;
