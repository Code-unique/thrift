const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'uniqueadhikari25@gmail.com@gmail.com',
    pass: 'hfcw wzkw gvjn irth'
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
