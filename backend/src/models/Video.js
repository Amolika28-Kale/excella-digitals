const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
  moduleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Module'},
  title: {type:String, required:true},
  videoUrl: {type:String, required:true},
  duration: Number,
  isFree: {type:Boolean, default:false}
}, {timestamps:true});
module.exports = mongoose.model('Video', VideoSchema);
