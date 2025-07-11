import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({ description: 'Indica se a operação foi bem-sucedida' })
  success: boolean;

  @ApiProperty({ description: 'Mensagem de resposta' })
  message: string;

  @ApiProperty({ description: 'Dados do usuário', type: User, required: false })
  user?: User;
}

