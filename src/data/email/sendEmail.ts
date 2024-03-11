import {
  createTransport,
  createTestAccount,
} from "nodemailer";
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
    const account = await createTestAccount();
    const transport = createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
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
    // "./src/views";
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

    const message = await transport.sendMail(mail);
  }
}
