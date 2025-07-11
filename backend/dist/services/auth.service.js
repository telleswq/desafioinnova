"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let AuthService = class AuthService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(loginDto) {
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
    async register(registerDto) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
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
    async findAll() {
        return await this.userRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map