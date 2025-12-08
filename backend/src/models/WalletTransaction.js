const mongoose = require('mongoose');
const WalletSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  type: {type:String, enum:['referral','withdraw','admin_credit']},
  amount: Number,
  status: {type:String, enum:['success','pending','failed'], default:'success'}
}, {timestamps:true});
module.exports = mongoose.model('WalletTransaction', WalletSchema);
