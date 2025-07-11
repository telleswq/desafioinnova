import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ProjectStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity('projects')
export class Project {
  @ApiProperty({ description: 'ID único do projeto' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome do projeto' })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ description: 'Descrição do projeto' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'Responsável pelo projeto' })
  @Column({ length: 255 })
  responsible: string;

  @ApiProperty({ description: 'Status do projeto', enum: ProjectStatus })
  @Column({
    type: 'varchar',
    default: ProjectStatus.PENDING,
  })
  status: ProjectStatus;

  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  @UpdateDateColumn()
  updatedAt: Date;
}

