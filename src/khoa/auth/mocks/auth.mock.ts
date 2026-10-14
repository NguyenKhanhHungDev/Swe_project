import { User, LoginFormValues, RegisterFormValues, AuthResponse } from '../types';

// Danh sách tài khoản giả lập sẵn trong hệ thống
export const MOCK_USERS: User[] = [
  {
    id: 'usr-1',
    email: 'admin@brewlite.com',
    name: 'Quản Trị Viên (Admin)',
    role: 'admin',
    points: 1250,
  },
  {
    id: 'usr-2',
    email: 'user@brewlite.com',
    name: 'Nguyễn Văn User',
    role: 'user',
    points: 350,
  },
];

export const mockLogin = async (values: LoginFormValues): Promise<AuthResponse> => {
  // Giả lập độ trễ mạng (network delay)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === values.email.toLowerCase());

  if (!foundUser) {
    return {
      success: false,
      message: 'Email không tồn tại trong hệ thống demo.',
    };
  }

  // Mật khẩu giả định cho phép bất kỳ mật khẩu nào dài >= 6 ký tự hoặc kiểm tra cụ thể
  if (values.password.length < 6) {
    return {
      success: false,
      message: 'Mật khẩu phải có ít nhất 6 ký tự.',
    };
  }

  return {
    success: true,
    message: 'Đăng nhập thành công!',
    user: foundUser,
    token: 'mock-jwt-token-xyz-123456',
  };
};

export const mockRegister = async (values: RegisterFormValues): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const existing = MOCK_USERS.some((u) => u.email.toLowerCase() === values.email.toLowerCase());
  if (existing) {
    return {
      success: false,
      message: 'Email này đã được đăng ký tài khoản.',
    };
  }

  const newUser: User = {
    id: `usr-${Date.now()}`,
    email: values.email,
    name: values.name,
    role: 'user',
    points: 100, // Tặng điểm thưởng chào mừng mặc định
  };

  MOCK_USERS.push(newUser);

  return {
    success: true,
    message: 'Đăng ký tài khoản thành công!',
    user: newUser,
    token: 'mock-jwt-token-xyz-123456',
  };
};