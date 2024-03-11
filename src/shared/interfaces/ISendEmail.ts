export interface ISendEmail {
  sendEmail(
    to: string,
    from: string,
    subject: string,
    name: string,
    token: string
  ): Promise<void>;
}