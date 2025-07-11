import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Nome completo do usuário', example: 'Clark Kent' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email do usuário', example: 'clark.kent@dailyplanet.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'minhasenha123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Nome de herói/alias', example: 'Superman' })
  @IsString()
  @IsNotEmpty()
  alias: string;
}

