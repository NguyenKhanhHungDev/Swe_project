'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCheckout } from '../CheckoutProvider';
import { PaymentMethod, PaymentSimScenario } from '../types';
import { confirmAndPayDraft } from '../checkout-actions';

export function CheckoutPage() {
  const router = useRouter();
  const { draft, isHydrated, loadDemoMockDraft, clearDraft } = useCheckout();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MOMO_SIM');
  const [simScenario, setSimScenario] = useState<PaymentSimScenario>('SUCCESS');
  const [isDemoLoggedIn, setIsDemoLoggedIn] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-4xl p-6 text-center text-gray-600">
        Đang tải thông tin thanh toán...
      </div>
    );
  }

  // Trường hợp mở trực tiếp /checkout không có draft -> Không tự tạo đơn rỗng
  if (!draft || draft.items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
          <h1 className="text-xl font-bold text-gray-900">
            Chưa có danh sách món cần thanh toán
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Trang thanh toán không tự động tạo đơn rỗng. Vui lòng chọn món từ Menu hoặc Giỏ hàng.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
            >
              Về trang Menu (/)
            </Link>
            <Link
              href="/cart"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Quay lại Giỏ hàng (/cart)
            </Link>
          </div>

          {/* Thanh công cụ bật nhanh kịch bản Demo độc lập */}
          <div className="mt-8 border-t border-amber-200 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-900">
              [Chế độ Demo Độc lập] Nạp nhanh dữ liệu mẫu:
            </p>
            <div className="mt-3 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => loadDemoMockDraft('BUY_NOW')}
                className="rounded bg-white px-3 py-1.5 text-xs font-medium text-amber-900 shadow-sm ring-1 ring-amber-300 hover:bg-amber-100"
              >
                + Nạp mẫu &ldquo;Mua Ngay&rdquo; (1 món)
              </button>
              <button
                type="button"
                onClick={() => loadDemoMockDraft('CART')}
                className="rounded bg-white px-3 py-1.5 text-xs font-medium text-amber-900 shadow-sm ring-1 ring-amber-300 hover:bg-amber-100"
              >
                + Nạp mẫu &ldquo;Từ Giỏ Hàng&rdquo; (2 món + Mã giảm)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleConfirmPayment = async () => {
    if (isSubmitting) return; // Chặn bấm liên tiếp tạo đơn lặp
    setErrorMsg(null);

    if (!isDemoLoggedIn) {
      // Giữ nguyên draft trong sessionStorage và điều hướng sang /login
      router.push('/login?redirect=/checkout');
      return;
    }

    try {
      setIsSubmitting(true);
      const createdOrder = await confirmAndPayDraft({
        draft,
        paymentMethod,
        scenario: simScenario,
      });

      // Nếu thanh toán thành công thì xóa draft hiện tại; nếu lỗi/timeout vẫn chuyển sang trang kết quả của đơn đó để thử lại
      if (createdOrder.status === 'PAID') {
        clearDraft();
      }

      router.push(`/checkout/result/${createdOrder.orderId}`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo đơn.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Thanh điều khiển chế độ Demo */}
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase text-blue-800">
              Bảng điều khiển Kịch bản Demo (UI Mock)
            </span>
            <p className="text-xs text-blue-700">
              Dùng để test nhanh các checklist G2/G3 (Mua ngay vs Từ giỏ, Thành công, Thất bại, Timeout).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadDemoMockDraft('BUY_NOW')}
              className="rounded bg-white px-2.5 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue-300"
            >
              Đổi sang mẫu Mua Ngay
            </button>
            <button
              type="button"
              onClick={() => loadDemoMockDraft('CART')}
              className="rounded bg-white px-2.5 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue-300"
            >
              Đổi sang mẫu Từ Giỏ
            </button>
            <button
              type="button"
              onClick={clearDraft}
              className="rounded bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-red-200"
            >
              Xóa Draft (Test rỗng)
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 border-t border-blue-200 pt-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-xs text-blue-900">
            <input
              type="checkbox"
              checked={isDemoLoggedIn}
              onChange={(e) => setIsDemoLoggedIn(e.target.checked)}
              className="rounded border-blue-400"
            />
            Giả lập trạng thái: <strong>Đã đăng nhập</strong> (Bỏ chọn để test chuyển sang /login giữ draft)
          </label>

          <div className="flex items-center gap-2 text-xs text-blue-900">
            <span>Kết quả mô phỏng:</span>
            <select
              value={simScenario}
              onChange={(e) => setSimScenario(e.target.value as PaymentSimScenario)}
              className="rounded border border-blue-300 bg-white px-2 py-1 text-xs font-semibold"
            >
              <option value="SUCCESS">1. Thanh toán Thành công (PAID)</option>
              <option value="FAIL_CONFIRMED">2. Thất bại xác nhận (PAYMENT_FAILED)</option>
              <option value="TIMEOUT_UNKNOWN">3. Lỗi kết nối / Timeout (Chưa rõ KQ)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tiêu đề & Nhãn Nguồn mua */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Xác nhận Thanh toán</h1>
          <p className="text-sm text-gray-600">
            Đơn hàng chỉ được khởi tạo khi bạn bấm nút &ldquo;Xác nhận &amp; Thanh toán&rdquo;.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            draft.source === 'BUY_NOW'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          Nguồn mua: {draft.source === 'BUY_NOW' ? 'MUA NGAY (Giữ nguyên giỏ hàng)' : 'TỪ GIỎ HÀNG (Snapshot)'}
        </span>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Danh sách món */}
        <div className="space-y-4 md:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Danh sách thức uống ({draft.items.length} dòng)
            </h2>
            <div className="divide-y divide-gray-100">
              {draft.items.map((item) => (
                <div key={item.lineId} className="flex justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.productName}{' '}
                      <span className="text-xs font-normal text-gray-500">
                        (Size {item.size})
                      </span>
                    </p>
                    {item.toppings.length > 0 ? (
                      <p className="text-xs text-gray-600">
                        Topping:{' '}
                        {item.toppings
                          .map((t) => `${t.name} x${t.quantity}`)
                          .join(', ')}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">Không thêm topping</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Đơn giá: {item.unitPrice.toLocaleString('vi-VN')}đ × {item.quantity} ly
                    </p>
                  </div>
                  <div className="text-right font-semibold text-gray-900">
                    {item.lineTotal.toLocaleString('vi-VN')}đ
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Phương thức thanh toán (Mô phỏng)
            </h2>
            <div className="space-y-2">
              {[
                { id: 'MOMO_SIM', label: 'Ví điện tử MoMo (Simulated)' },
                { id: 'VNPAY_SIM', label: 'Cổng VNPAY-QR (Simulated)' },
                { id: 'CARD_SIM', label: 'Thẻ ATM / Quốc tế (Simulated)' },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 ${
                    paymentMethod === method.id
                      ? 'border-amber-600 bg-amber-50/50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-800">{method.label}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id as PaymentMethod)}
                    className="text-amber-600"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Tổng kết tiền & Nút xác nhận */}
        <div className="md:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Tạm tính đơn hàng</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span>{draft.subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Giảm giá {draft.promoCode ? `(${draft.promoCode})` : ''}:</span>
                <span className="text-emerald-700">
                  -{draft.discountAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-bold text-gray-900">
                <span>Tổng thanh toán:</span>
                <span className="text-amber-700">
                  {draft.totalAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmPayment}
              className="mt-6 w-full rounded-lg bg-amber-700 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Đang xử lý giao dịch...'
                : isDemoLoggedIn
                ? 'Xác nhận & Thanh toán'
                : 'Đăng nhập để Thanh toán'}
            </button>

            <div className="mt-4 text-center">
              <Link
                href={draft.source === 'BUY_NOW' ? '/' : '/cart'}
                className="text-xs font-medium text-gray-500 hover:text-gray-800 underline"
              >
                {draft.source === 'BUY_NOW' ? '← Quay lại Menu' : '← Quay lại Giỏ hàng'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}