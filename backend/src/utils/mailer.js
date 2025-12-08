const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendMail(to, subject, html){
  if(!process.env.SMTP_USER) {
    console.log('SMTP not configured - skipping email to', to);
    return;
  }
  return transporter.sendMail({from: process.env.SMTP_USER, to, subject, html});
}

module.exports = { sendMail };
