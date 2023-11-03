import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerService } from 'shared/mailer/mailer.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, MailerService],
})
export class EmailModule {}
