import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
@Injectable()
export class MailerService {
  constructor(private config: ConfigService) {}
  public sendWaitlistMessage(email: string) {
    const transporter = nodemailer.createTransport({
      service: this.config.get('SMTP_SERVICE'),
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });

    const filePath = path.resolve(
      __dirname,
      '../../../shared/mailer/email_template.hbs',
    );
    const source = fs.readFileSync(filePath, 'utf-8');
    console.log(filePath);

    const template = handlebars.compile(source);

    // data for the template
    const data = {
      header: 'Hey there!',
      text1: this.config.get('TEXT1'),
      text2: this.config.get('TEXT2'),
      text3: this.config.get('TEXT3'),
      facebook: this.config.get('FACEBOOK_LINK'),
      twitter: this.config.get('TWITTER_LINK'),
      instagram: this.config.get('INSTAGRAM_LINK'),
      linkedin: this.config.get('LINKEDIN_LINK'),
    };

    const htmlToSend = template(data);

    const mailOptions = {
      from: this.config.get('SMTP_USER'),
      to: email,
      subject: 'NEXSTACK',
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      console.log(error);
      console.log('success', info);
      throw new Error(error);
    });
  }
}
