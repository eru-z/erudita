const fs = require('fs');
const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');

// ================= LOAD .ENV MANUALLY =================

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        process.env[key] = value;
      }
    });
}

// ================= ENV CHECK =================

console.log("ENV CHECK:", {
  EMAIL_USER: process.env.EMAIL_USER || "MISSING",
  EMAIL_PASS: process.env.EMAIL_PASS ? "SET" : "MISSING",
  PORT: process.env.PORT || 3000
});

// ================= APP SETUP =================

const app = express();

const path = require("path");

app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// ROOT ROUTE (THIS WAS MISSING)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// ================= SECURITY HEADERS =================

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

// ================= CONTACT ENDPOINT =================

app.post(['/send', '/sendmail'], async (req, res) => {
  const { name, email, message, company } = req.body || {};

  console.log("📨 Incoming:", { name, email });

  // Bot honeypot
  if (company) return res.json({ status: "ok" });

  if (!name || !email || !message) {
    return res.status(400).json({ status: "missing" });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Email credentials missing");
    return res.status(500).json({ status: "error", error: "Mail not configured" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });

    console.log("✅ Email sent");
    res.json({ status: "ok" });

} catch (err) {
  console.error("❌ Email error:", err);
  res.status(500).json({ status: "error", error: err.message });
}
});

// ================= START SERVER =================

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
