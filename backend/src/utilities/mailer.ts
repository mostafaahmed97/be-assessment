import config from "../config";
import nodemailer, { Transporter } from "nodemailer";

type email = {
  to: string;
  subject: string;
  text: string;
};

class Mailer {
  private mailer: Transporter;

  constructor() {
    this.mailer = nodemailer.createTransport({
      host: config.mailer.host,
      service: config.mailer.service,
      port: 587,
      secure: false,
      // auth: {
      //   user: config.mailer.user,
      //   pass: config.mailer.pass,
      // },
    });
  }

  async sendMail(data: email) {
    try {
      await this.mailer.sendMail({
        from: config.mailer.user,
        to: data.to,
        subject: data.subject,
        text: data.text,
      });
      console.log("Email sent");
    } catch (error) {
      console.log("Failed to send email");
      console.log(error);
    }
  }
}

export const mailer = new Mailer();
