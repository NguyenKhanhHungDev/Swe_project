export type UserRole = 'admin' | 'user' | 'manager';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  points?: number; // Vị trí chuẩn bị ghép số dư điểm thưởng
}

export interface AuthSession {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}