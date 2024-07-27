import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "EMAIL_SERVICE",
  auth: {
    user: "EMAIL",
    pass: "APP_PASSWORD",
  },
});

const mailOptions = {
  from: "EMAIL_SENDER",
  to: "EMAIL_RECIPIENT",
  subject: "EMAIL_HEADER",
  text: "EMAIL_MESSAGE",
};

export class MailService {
  static sendEmail() {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`E-mail sent: ${info.response}`);
      }
    });
  }
}
