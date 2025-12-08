const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  orderId: String,
  paymentId: String,
  amount: Number,
  status: String
}, {timestamps:true});
module.exports = mongoose.model('Payment', PaymentSchema);
