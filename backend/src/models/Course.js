const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  title: {type:String, required:true},
  description: String,
  thumbnail: String,
  modules: [{type: mongoose.Schema.Types.ObjectId, ref: 'Module'}]
}, {timestamps:true});
module.exports = mongoose.model('Course', CourseSchema);
