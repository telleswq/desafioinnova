export interface User {
  id: string;
  name: string;
  email: string;
  alias: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  alias: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

