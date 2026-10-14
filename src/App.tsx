import React, { useState } from 'react';
import { AuthProvider, useAuth } from './khoa/auth/context/AuthContext';
import { LoginForm } from './khoa/auth/components/LoginForm';
import { RegisterPage } from './khoa/auth/components/RegisterPage';
import { InventoryTable } from './khoa/inventory/components/InventoryTable';
import { AccountPage } from './khoa/users/components/AccountPage';

const MainContent: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'inventory' | 'account'>('inventory');
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        {isRegistering ? (
          <RegisterPage onSwitchToLogin={() => setIsRegistering(false)} />
        ) : (
          <div className="w-full max-w-md">
            <LoginForm />
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Chưa có tài khoản? Đăng ký ngay
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Thanh Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Hệ Thống Quản Trị Kho</h1>
          <p className="text-sm text-gray-500">
            Xin chào, <span className="font-semibold">{user?.name}</span> ({user?.role})
          </p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
        >
          Đăng xuất
        </button>
      </header>

      {/* Thanh Điều hướng Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 flex space-x-8">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`py-4 px-2 font-medium text-sm border-b-2 transition ${
            activeTab === 'inventory'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Quản Lý Kho (Inventory)
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`py-4 px-2 font-medium text-sm border-b-2 transition ${
            activeTab === 'account'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Tài Khoản (Account & Loyalty)
        </button>
      </div>

      {/* Nội dung thay đổi theo Tab */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'inventory' ? <InventoryTable /> : <AccountPage />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}