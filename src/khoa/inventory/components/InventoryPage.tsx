import React from 'react';
import { InventoryTable } from '../components/InventoryTable';

export const InventoryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Tiêu đề trang */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Kho Hàng (Inventory)</h1>
          <p className="text-sm text-gray-500">Theo dõi, kiểm soát số lượng vật tư và hàng hóa trong kho.</p>
        </div>
      </div>

      {/* Các thẻ thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Tổng số sản phẩm</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Cảnh báo sắp hết</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Trạng thái kho</p>
          <p className="text-2xl font-bold text-green-600 mt-1">Ổn định</p>
        </div>
      </div>

      {/* Khung danh sách kho */}
      <div className="bg-white rounded-lg shadow">
        <InventoryTable />
      </div>
    </div>
  );
};