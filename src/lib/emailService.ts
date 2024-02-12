import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lasepa44@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
