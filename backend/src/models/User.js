const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {type:String, required:true},
  email: {type:String, required:true, unique:true, index:true},
  phone: {type:String},
  passwordHash: {type:String, required:true},
  hasPaid: {type:Boolean, default:false},
  paidAt: {type:Date},
  referredBy: {type:String, default:null},
  referralCode: {type:String, unique:true, sparse:true},
  walletBalance: {type:Number, default:0},
  role: {type:String, enum:['student','admin'], default:'student'},
  blocked: { type: Boolean, default: false },
  completedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  lastWatched: {
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  watchedAt: Date
}
}, {timestamps:true});
module.exports = mongoose.model('User', UserSchema);
