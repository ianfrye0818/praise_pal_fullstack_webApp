import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

@Injectable()
export class EmailService {
  private SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;

  constructor() {
    if (!this.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not defined');
    }
    sgMail.setApiKey(this.SENDGRID_API_KEY);
  }

  async sendCronErrorNotification(errorDetails: string, errorTitle: string) {
    const emailPath = path.resolve(
      __dirname,
      '..',
      'html-templates',
      'cronerror.html',
    );
    const emailTemplate = fs.readFileSync(emailPath, 'utf8');

    const htmlContent = emailTemplate
      .replace('{{ title }}', errorTitle)
      .replace('{{ errorDetails }}', errorDetails);

    await this.sendEmail({
      to: 'ianfrye.dev@gmail.com',
      subject: 'Error Notification',
      from: 'ianfrye3@ianfrye.dev',
      html: htmlContent,
    });
  }

  public async sendEmail(msg: sgMail.MailDataRequired) {
    try {
      await sgMail.send(msg);
      return 'Email sent successfully';
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
