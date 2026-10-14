import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, LoginFormValues, RegisterFormValues } from '../types';
import { mockLogin, mockRegister } from '../mocks/auth.mock';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean> | boolean;
  register: (values: RegisterFormValues) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const res = await mockLogin({ email, password });
    if (res.success && res.user) {
      setUser(res.user);
      return true;
    }
    return false;
  };

  const register = async (values: RegisterFormValues): Promise<boolean> => {
    const res = await mockRegister(values);
    if (res.success && res.user) {
      setUser(res.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};