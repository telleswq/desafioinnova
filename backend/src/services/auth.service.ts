import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      return {
        success: false,
        message: 'Herói não encontrado. Registre-se primeiro!',
      };
    }

    // Simular verificação de senha 
    if (loginDto.password !== '123456') {
      return {
        success: false,
        message: 'Senha incorreta. Tente novamente!',
      };
    }

    return {
      success: true,
      message: 'Login realizado com sucesso!',
      user,
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Verificar se email já existe
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUserByEmail) {
      return {
        success: false,
        message: 'Este email já está em uso por outro herói!',
      };
    }

    const existingUserByAlias = await this.userRepository.findOne({
      where: { alias: registerDto.alias },
    });

    if (existingUserByAlias) {
      return {
        success: false,
        message: 'Este nome de herói já está em uso!',
      };
    }

    // Criar novo usuário
    const newUser = this.userRepository.create({
      ...registerDto,
      password: registerDto.password,
    });

    const savedUser = await this.userRepository.save(newUser);

    return {
      success: true,
      message: 'Herói registrado com sucesso!',
      user: savedUser,
    };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return user;
  }
}

