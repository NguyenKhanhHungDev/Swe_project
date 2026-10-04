import type {
  ProductOptions,
  SizeOption,
  ToppingOption,
} from '../types/product-options';

function isSizeOption(value: unknown): value is SizeOption {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return (
    'id' in value &&
    (value.id === 'S' || value.id === 'M' || value.id === 'L') &&
    'extraPrice' in value &&
    typeof value.extraPrice === 'number' &&
    Number.isFinite(value.extraPrice) &&
    value.extraPrice >= 0
  );
}

function isToppingOption(value: unknown): value is ToppingOption {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return (
    'id' in value &&
    typeof value.id === 'string' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'price' in value &&
    typeof value.price === 'number' &&
    Number.isFinite(value.price) &&
    value.price >= 0
  );
}

function isProductOptions(value: unknown): value is ProductOptions {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return (
    'sizes' in value &&
    Array.isArray(value.sizes) &&
    value.sizes.length > 0 &&
    value.sizes.every(isSizeOption) &&
    'toppings' in value &&
    Array.isArray(value.toppings) &&
    value.toppings.every(isToppingOption)
  );
}

export async function getProductOptions(
  id: number,
): Promise<ProductOptions> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('Chưa cấu hình NEXT_PUBLIC_API_URL.');
  }

  const response = await fetch(`${apiUrl}/products/${id}/options`, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    throw new Error('Không tìm thấy đồ uống.');
  }

  if (!response.ok) {
    throw new Error(
      `Không tải được size và topping. Mã lỗi: ${response.status}.`,
    );
  }

  const data: unknown = await response.json();

  if (!isProductOptions(data)) {
    throw new Error('Dữ liệu size và topping không đúng cấu trúc.');
  }

  return data;
}


// types/product-options.ts: mô tả cấu trúc dữ liệu.
//lib/product-options.ts: chứa code gọi API và kiểm tra dữ liệu.