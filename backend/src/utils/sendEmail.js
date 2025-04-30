const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: '"DevTinder" jay251836@gmail.com', 
      to, 
      subject, 
      text, 
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
};

module.exports = { run: sendEmail };
