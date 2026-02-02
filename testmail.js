const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendTest() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email",
      text: "Hello! This is a test from Node.js"
    });
    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

sendTest();
