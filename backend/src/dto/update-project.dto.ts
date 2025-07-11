import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '../entities/project.entity';

export class UpdateProjectDto {
  @ApiProperty({ description: 'Nome do projeto', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Descrição do projeto', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Responsável pelo projeto', required: false })
  @IsString()
  @IsOptional()
  responsible?: string;

  @ApiProperty({ 
    description: 'Status do projeto', 
    enum: ProjectStatus, 
    required: false 
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}

