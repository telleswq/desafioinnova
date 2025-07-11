import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'ID único do usuário' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome completo do usuário' })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  @Column({ unique: true, length: 255 })
  email: string;

  @ApiProperty({ description: 'Senha do usuário (hash)' })
  @Column({ length: 255 })
  password: string;

  @ApiProperty({ description: 'Nome de herói/alias' })
  @Column({ unique: true, length: 255 })
  alias: string;

  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  @UpdateDateColumn()
  updatedAt: Date;
}

