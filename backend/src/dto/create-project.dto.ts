import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
  @ApiProperty({ description: 'Nome do projeto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Descrição do projeto' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Responsável pelo projeto' })
  @IsString()
  @IsNotEmpty()
  responsible: string;

  @ApiProperty({ 
    description: 'Status do projeto', 
    enum: ProjectStatus, 
    required: false,
    default: ProjectStatus.PENDING 
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}

