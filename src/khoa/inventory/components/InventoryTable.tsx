import React, { useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
}

export const InventoryTable: React.FC = () => {
  // Dữ liệu mẫu ban đầu
  const [items, setItems] = useState<InventoryItem[]>([
    { id: '1', name: 'Laptop Dell Latitude', sku: 'DEL-01', quantity: 15 },
    { id: '2', name: 'Ghế xoay văn phòng', sku: 'FUR-02', quantity: 40 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', sku: '', quantity: 0 });

  // Mở Modal để Thêm mới
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({ name: '', sku: '', quantity: 0 });
    setIsModalOpen(true);
  };

  // Mở Modal để Sửa
  const handleOpenEditModal = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({ name: item.name, sku: item.sku, quantity: item.quantity });
    setIsModalOpen(true);
  };

  // Xử lý Xóa mặt hàng
  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mặt hàng này không?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Xử lý Lưu (Thêm mới hoặc Cập nhật)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) return;

    if (editingItem) {
      // Cập nhật mặt hàng hiện có
      setItems(
        items.map((item) =>
          item.id === editingItem.id
            ? { ...item, name: formData.name, sku: formData.sku, quantity: Number(formData.quantity) }
            : item
        )
      );
    } else {
      // Thêm mặt hàng mới
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        name: formData.name,
        sku: formData.sku,
        quantity: Number(formData.quantity),
      };
      setItems([...items, newItem]);
    }

    setIsModalOpen(false);
  };

  // Lọc sản phẩm theo tìm kiếm
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Khung Quản Lý Kho (Inventory)</h2>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          + Thêm mặt hàng
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc mã SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase">
              <th className="py-3 px-4">Tên sản phẩm</th>
              <th className="py-3 px-4">Mã SKU</th>
              <th className="py-3 px-4">Số lượng</th>
              <th className="py-3 px-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{item.name}</td>
                  <td className="py-3 px-4 text-gray-500">{item.sku}</td>
                  <td className="py-3 px-4 text-gray-500">{item.quantity}</td>
                  <td className="py-3 px-4 text-right space-x-3">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  Không tìm thấy mặt hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm / Sửa mặt hàng */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {editingItem ? 'Sửa mặt hàng' : 'Thêm mặt hàng mới'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã SKU</label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};