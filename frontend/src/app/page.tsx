'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getProducts } from './lib/products';
import type { Product } from './types/product';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const data = await getProducts();

        if (active) {
          setProducts(data);
        }
      } catch (err: unknown) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Không tải được menu. Vui lòng thử lại.',
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="font-semibold uppercase tracking-widest text-amber-800">
            BrewLite
          </p>
          <h1 className="mt-2 text-4xl font-bold">Menu đồ uống</h1>
          <p className="mt-3 text-stone-600">
            Chọn một thức uống cho ngày của bạn.
          </p>
        </header>

        {loading && (
          <p role="status" className="py-10 text-center text-stone-600">
            Đang tải menu...
          </p>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-white"
            >
              Thử lại
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="py-10 text-center text-stone-600">
            Chưa có đồ uống trong menu.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
              >
                <div className="relative aspect-square bg-stone-100">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="mt-2 text-lg font-bold text-amber-800">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(product.price)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}