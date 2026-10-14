import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'Hoạt động' | 'Đã khóa';
}

const initialUsers: User[] = [
  { id: '1', name: 'Nguyễn Hữu Thắng', email: 'thang.nguyen@kho.com', role: 'admin', status: 'Hoạt động' },
  { id: '2', name: 'Trần Văn Khoa', email: 'khoa.tran@kho.com', role: 'user', status: 'Hoạt động' },
  { id: '3', name: 'Lê Thị Hoa', email: 'hoa.le@kho.com', role: 'user', status: 'Đã khóa' },
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [status, setStatus] = useState<'Hoạt động' | 'Đã khóa'>('Hoạt động');

  // Mở modal thêm mới
  const handleOpenAdd = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setRole('user');
    setStatus('Hoạt động');
    setIsModalOpen(true);
  };

  // Mở modal chỉnh sửa
  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
    setIsModalOpen(true);
  };

  // Xử lý Thêm hoặc Cập nhật
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (editingUser) {
      // Cập nhật người dùng
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name, email, role, status } : u));
    } else {
      // Thêm mới người dùng
      const newUser: User = {
        id: 'usr-' + Date.now(),
        name,
        email,
        role,
        status,
      };
      setUsers([...users, newUser]);
    }

    setIsModalOpen(false);
  };

  // Xóa người dùng
  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Quản Lý Người Dùng</h2>
          <p className="text-sm text-gray-500">Thêm, sửa, xóa và phân quyền tài khoản</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Thêm người dùng
        </button>
      </div>

      {/* Bảng danh sách người dùng */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${user.status === 'Hoạt động' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleOpenEdit(user)} className="text-indigo-600 hover:text-indigo-900 mr-3">Sửa</button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm / Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Nhập họ tên..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="email@kho.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'Hoạt động' | 'Đã khóa')}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Đã khóa">Đã khóa</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  {editingUser ? 'Lưu thay đổi' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};