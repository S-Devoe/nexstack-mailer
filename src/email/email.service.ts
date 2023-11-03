import { ForbiddenException, Injectable } from '@nestjs/common';
import { EmailDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { MailerService } from 'shared/mailer/mailer.service';

@Injectable()
export class EmailService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}
  async create(dto: EmailDto) {
    try {
      const user = await this.prisma.userEmail.create({
        data: { email: dto.email },
      });
      this.mailerService.sendWaitlistMessage(user.email);
      return {
        message: 'Email saved successfully',
        data: user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'P2002')) {
          throw new ForbiddenException('Email already on waitlist');
        }
      } else {
        throw error;
      }
    }
  }

  async getAllEmails() {
    const user = await this.prisma.userEmail.findMany();
    return { data: user };
  }
}
