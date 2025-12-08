const mongoose = require('mongoose');
const ReferralSchema = new mongoose.Schema({
  referrerUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  referredUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  amount: Number,
  status: {type:String, enum:['credited','pending','withdrawn'], default:'credited'}
}, {timestamps:true});
module.exports = mongoose.model('Referral', ReferralSchema);
