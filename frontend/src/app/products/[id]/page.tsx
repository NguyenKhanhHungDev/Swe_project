'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProduct } from '../../lib/products';
import { getProductOptions } from '../../lib/product-options';
import type { Product } from '../../types/product';
import type {
  ProductOptions,
  SizeOption,
} from '../../types/product-options';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();

  // Khi chuyển sang món khác, khởi tạo lại toàn bộ lựa chọn.
  return <ProductDetail key={params.id} id={params.id} />;
}

function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [options, setOptions] = useState<ProductOptions | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption['id']>('S');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadDetail() {
      try {
        const productId = Number(id);

        if (!Number.isSafeInteger(productId) || productId <= 0) {
          throw new Error('Mã đồ uống không hợp lệ.');
        }

        const [productData, optionsData] = await Promise.all([
          getProduct(productId),
          getProductOptions(productId),
        ]);

        const initialSize = optionsData.sizes[0];

        if (!initialSize) {
          throw new Error('Đồ uống chưa có size để lựa chọn.');
        }

        if (active) {
          setProduct(productData);
          setOptions(optionsData);
          setSelectedSize(initialSize.id);
        }
      } catch (err: unknown) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Không tải được chi tiết đồ uống.',
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadDetail();

    return () => {
      active = false;
    };
  }, [id]);

  function toggleTopping(toppingId: string) {
    setSelectedToppings((current) =>
      current.includes(toppingId)
        ? current.filter((item) => item !== toppingId)
        : [...current, toppingId],
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 p-8 text-stone-900">
        <p role="status">Đang tải chi tiết đồ uống...</p>
      </main>
    );
  }

  if (error || !product || !options) {
    return (
      <main className="min-h-screen bg-stone-50 p-8 text-stone-900">
        <p role="alert" className="text-red-700">
          {error || 'Không có dữ liệu đồ uống.'}
        </p>
        <Link href="/" className="mt-4 inline-block underline">
          Quay lại menu
        </Link>
      </main>
    );
  }

  const sizeExtra =
    options.sizes.find((size) => size.id === selectedSize)?.extraPrice ?? 0;

  const toppingTotal = options.toppings
    .filter((topping) => selectedToppings.includes(topping.id))
    .reduce((total, topping) => total + topping.price, 0);

  const totalPrice = product.price + sizeExtra + toppingTotal;

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-amber-800 underline">
          ← Quay lại menu
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-200">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-stone-600">
              Giá gốc: {formatPrice(product.price)}
            </p>

            <fieldset className="mt-8">
              <legend className="text-lg font-semibold">Chọn size</legend>

              <div className="mt-3 flex flex-wrap gap-3">
                {options.sizes.map((size) => (
                  <label
                    key={size.id}
                    className={`cursor-pointer rounded-xl border px-4 py-3 ${
                      selectedSize === size.id
                        ? 'border-amber-800 bg-amber-50'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size.id}
                      checked={selectedSize === size.id}
                      onChange={() => setSelectedSize(size.id)}
                      className="mr-2 accent-amber-800"
                    />
                    {size.id} (+{formatPrice(size.extraPrice)})
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="text-lg font-semibold">
                Thêm topping
              </legend>
              <p className="mt-1 text-sm text-stone-600">
                Có thể chọn nhiều loại hoặc không chọn.
              </p>

              {options.toppings.length === 0 && (
                <p className="mt-3 text-stone-600">
                  Món này chưa có topping.
                </p>
              )}

              <div className="mt-3 space-y-3">
                {options.toppings.map((topping) => (
                  <label
                    key={topping.id}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-300 bg-white p-4"
                  >
                    <input
                      type="checkbox"
                      checked={selectedToppings.includes(topping.id)}
                      onChange={() => toggleTopping(topping.id)}
                      className="accent-amber-800"
                    />
                    <span className="flex-1">{topping.name}</span>
                    <span>+{formatPrice(topping.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div
              aria-live="polite"
              className="mt-8 rounded-xl bg-amber-100 p-5"
            >
              <p className="text-sm text-stone-700">Giá cho 1 ly</p>
              <p className="mt-1 text-3xl font-bold text-amber-900">
                {formatPrice(totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}