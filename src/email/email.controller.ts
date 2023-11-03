import { Controller, Post, Body, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  create(@Body() createEmailDto: EmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @Get()
  findAll() {
    return this.emailService.getAllEmails();
  }
}
