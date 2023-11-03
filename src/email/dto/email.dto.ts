import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    description: "The user's email",
    default: 'email@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
