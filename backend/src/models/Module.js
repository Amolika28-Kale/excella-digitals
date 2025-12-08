const mongoose = require('mongoose');
const ModuleSchema = new mongoose.Schema({
  courseId: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
  title: {type:String, required:true},
  description: String,
  videos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Video'}]
}, {timestamps:true});
module.exports = mongoose.model('Module', ModuleSchema);
