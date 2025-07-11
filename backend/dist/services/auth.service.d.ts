import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
}
