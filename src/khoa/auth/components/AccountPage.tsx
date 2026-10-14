import React from 'react';
import { useAuth } from '../../auth/context/AuthContext';

export const AccountPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông Tin Tài Khoản</h2>

      <div className="space-y-4">
        <div className="flex border-b pb-3">
          <span className="w-1/3 font-medium text-gray-500">Họ và tên:</span>
          <span className="w-2/3 text-gray-900 font-semibold">{user?.name || 'Chưa cập nhật'}</span>
        </div>

        <div className="flex border-b pb-3">
          <span className="w-1/3 font-medium text-gray-500">Email:</span>
          <span className="w-2/3 text-gray-900">{user?.email || 'Chưa cập nhật'}</span>
        </div>

        <div className="flex border-b pb-3">
          <span className="w-1/3 font-medium text-gray-500">Vai trò (Role):</span>
          <span className="w-2/3 uppercase text-blue-600 font-semibold">{user?.role || 'user'}</span>
        </div>

        {/* Vị trí chuẩn bị ghép số dư điểm thưởng (LoyaltySummary) của Huy */}
        <div className="flex border-b pb-3 items-center bg-yellow-50 p-4 rounded-md">
          <span className="w-1/3 font-medium text-gray-700">Điểm thưởng tích lũy:</span>
          <div className="w-2/3 flex items-center justify-between">
            <span className="text-lg font-bold text-yellow-600">{user?.points ?? 0} điểm</span>
            <span className="text-xs text-gray-500 italic">(Vị trí ghép LoyaltySummary của Huy)</span>
          </div>
        </div>
      </div>
    </div>
  );
};