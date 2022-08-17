const nodemailer = require("nodemailer");
const message = {
  from: "ankitknit15@gmail.com",
  to: "ankit.kumar@creolestudios.com",
  subject: "nodemailer",
  text: "wooo",
};
nodemailer
  .createTransport({
    service: "gmail",
    auth: {
      user: "ankitknit15@gmail.com",
      pass: "@Ankitkn1234",
    },
    port: 465,
    host: "smtp.gmail.com",
  })
  .sendMail(message, (err: Error) => {
    if (err) {
      return "error";
    } else {
      return "email sent";
    }
  });
