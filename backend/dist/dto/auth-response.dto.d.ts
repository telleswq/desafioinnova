import { User } from '../entities/user.entity';
export declare class AuthResponseDto {
    success: boolean;
    message: string;
    user?: User;
}
