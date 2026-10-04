import type { Product } from '../types/product';

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return (
    'id' in value &&
    typeof value.id === 'number' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'price' in value &&
    typeof value.price === 'number' &&
    'imageUrl' in value &&
    typeof value.imageUrl === 'string'
  );
}

export async function getProducts(id: number): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('Chưa cấu hình NEXT_PUBLIC_API_URL.');
  }
      // do tre 
  const response = await fetch(`${apiUrl}/products`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Không tải được menu. Mã lỗi: ${response.status}.`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error('Dữ liệu sản phẩm từ backend không đúng cấu trúc.');
  }
  return data;
}



export async function getProduct(id: number): Promise<Product> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('Chưa cấu hình NEXT_PUBLIC_API_URL.');
  }

  const response = await fetch(`${apiUrl}/products/${id}`, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    throw new Error('Không tìm thấy đồ uống.');
  }

  if (!response.ok) {
    throw new Error(`Không tải được đồ uống. Mã lỗi: ${response.status}.`);
  }

  const data: unknown = await response.json();

  if (!isProduct(data)) {
    throw new Error('Dữ liệu đồ uống không đúng cấu trúc.');
  }

  return data;
} // End of getProduct function