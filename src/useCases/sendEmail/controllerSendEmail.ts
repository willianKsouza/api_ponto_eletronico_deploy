// import { Request, Response } from "express";
// import { SendEmailService } from "./sendEmailService";

// export class ControllerSendEmail {
//   constructor(private sendEmail: SendEmailService) {}

//   async SendEmail(req: Request, res: Response): Promise<any> {
//     try {
//         const sendEmail = this.sendEmail.execute();
//         return res.status(201).json({ data: sendEmail });

//     } catch (error) {
//         console.log(res.status(error.statusCode).json({ data: error.message }));
        
//     }
//   }
// }
