require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function run(){
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/excella-digits');
  const email = process.env.ADMIN_EMAIL || 'admin@excella.com';
  const pass = process.env.ADMIN_PASSWORD || 'Admin@123';
  const existing = await User.findOne({email});
  if(existing){ console.log('Admin exists'); process.exit(0); }
  const hash = await bcrypt.hash(pass, 10);
  const admin = new User({ name: 'Admin', email, phone:'', passwordHash: hash, role: 'admin', referralCode: 'ADMIN001' });
  await admin.save();
  console.log('Admin created:', email, 'password:', pass);
  process.exit(0);
}
run().catch(e=>{console.error(e); process.exit(1)});
