import { RegisterFormValues, LoginFormValues } from './types';

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email không được để trống.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Định dạng email không hợp lệ.';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Mật khẩu không được để trống.';
  if (password.length < 6) return 'Mật khẩu phải có tối thiểu 6 ký tự.';
  return null;
};

export const validateLoginForm = (values: LoginFormValues): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (values: RegisterFormValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!values.name.trim()) {
    errors.name = 'Họ tên không được để trống.';
  }

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Xác nhận mật khẩu không khớp.';
  }

  return errors;
};