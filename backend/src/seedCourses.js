require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Video = require('./models/Video');

async function run(){
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/excella_dev');
  const c = new Course({title: 'Digital Marketing Mastery', description: 'Learn social media, SEO, WhatsApp marketing', thumbnail: ''});
  await c.save();
  const m1 = new Module({courseId: c._id, title: 'Introduction', description: 'Overview of digital marketing'});
  await m1.save();
  const v1 = new Video({moduleId: m1._id, title: 'What is Digital Marketing?', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 600});
  await v1.save();
  m1.videos.push(v1._id); await m1.save();
  c.modules.push(m1._id); await c.save();
  console.log('Seeded sample course:', c.title);
  process.exit(0);
}
run().catch(e=>{console.error(e); process.exit(1)});
