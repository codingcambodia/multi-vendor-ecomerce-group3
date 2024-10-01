const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  console.log(
    process.env.SMPT_HOST,
    process.env.SMPT_PORT,
    process.env.SMPT_SERVICE
  );
  console.log(process.env.SMPT_PASSWORD, process.env.SMPT_MAIL);

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
