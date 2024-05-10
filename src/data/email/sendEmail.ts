
const nodemailer = require('nodemailer')
import { ISendEmail } from "../../shared/interfaces/ISendEmail";

import hbs from "nodemailer-express-handlebars";
export class Email implements ISendEmail {
  async sendEmail(
    to: string,
    from: string,
    subject: string,
    name: string,
    token: string
  ): Promise<void> {

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      },
    });
    
    transport.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".handlebars",
          defaultLayout: false,
        },
        viewPath: "./views",
        extName: ".handlebars",
      })
    );
    const mail = {
      from: from || "equipe@apitimesheet.com.br",
      to: to,
      subject: subject,
      template: "email",
      context: {
        name,
        token,
      },
    };


    return await transport.sendMail(mail);
  }
}
