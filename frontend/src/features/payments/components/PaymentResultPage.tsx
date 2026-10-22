'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { DemoOrderRecord, PaymentSimScenario } from '../types';
import {
  getSharedOrderById,
  replayTimeoutOrderCheck,
  retryOrderPayment,
} from '../checkout-actions';

interface PaymentResultPageProps {
  orderId: string;
}

const emptySubscribe = () => () => {};

export function PaymentResultPage({ orderId }: PaymentResultPageProps) {
  const isLoaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Lưu bản ghi đơn hàng sau khi người dùng bấm Retry hoặc Replay
  const [updatedOrder, setUpdatedOrder] = useState<DemoOrderRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [retryScenario, setRetryScenario] = useState<PaymentSimScenario>('SUCCESS');
  const [actionError, setActionError] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center text-gray-600">
        Đang kiểm tra kết quả đơn hàng...
      </div>
    );
  }

  const order =
    updatedOrder && updatedOrder.orderId === orderId
      ? updatedOrder
      : getSharedOrderById(orderId);

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h1 className="text-lg font-bold text-red-900">
            Không tìm thấy đơn hàng ({orderId})
          </h1>
          <p className="mt-2 text-sm text-red-700">
            Mã đơn không tồn tại trong hệ thống demo hoặc đã bị xóa.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              href="/orders"
              className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
            >
              Xem Lịch sử đơn (/orders)
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
            >
              Về Menu (/)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleRetryPayment = async () => {
    if (isProcessing) return;
    setActionError(null);
    try {
      setIsProcessing(true);
      const updated = await retryOrderPayment({
        orderId: order.orderId,
        scenario: retryScenario,
      });
      setUpdatedOrder({ ...updated });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Lỗi khi thử lại thanh toán.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReplayCheck = async (resolvedOutcome: 'PAID' | 'PAYMENT_FAILED') => {
    if (isProcessing) return;
    setActionError(null);
    try {
      setIsProcessing(true);
      const updated = await replayTimeoutOrderCheck({
        orderId: order.orderId,
        resolvedOutcome,
      });
      setUpdatedOrder({ ...updated });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Lỗi khi kiểm tra trạng thái.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isTimeoutUnknown =
    order.status === 'PENDING' && order.lastAttemptOutcome === 'TIMEOUT';

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Header Trạng thái */}
        {order.status === 'PAID' && (
          <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200">
            <span className="inline-block rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
              PAID — THÀNH CÔNG
            </span>
            <h1 className="mt-2 text-xl font-bold text-emerald-950">
              Thanh toán đơn hàng thành công!
            </h1>
            <p className="mt-1 text-sm text-emerald-800">
              {order.source === 'BUY_NOW'
                ? 'Đơn Mua Ngay đã hoàn tất. Giỏ hàng hiện tại của bạn vẫn được giữ nguyên.'
                : 'Đơn từ Giỏ hàng đã hoàn tất. Các món trong snapshot đã được xử lý khỏi giỏ.'}
            </p>
          </div>
        )}

        {order.status === 'PAYMENT_FAILED' && (
          <div className="rounded-lg bg-red-50 p-4 border border-red-200">
            <span className="inline-block rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
              PAYMENT_FAILED — THẤT BẠI XÁC NHẬN
            </span>
            <h1 className="mt-2 text-xl font-bold text-red-950">
              Thanh toán không thành công
            </h1>
            <p className="mt-1 text-sm text-red-800">
              Giao dịch đã bị từ chối. Bạn có thể thử thanh toán lại trên cùng mã đơn này (không tạo đơn trùng và không gia hạn thêm 15 phút).
            </p>
          </div>
        )}

        {isTimeoutUnknown && (
          <div className="rounded-lg bg-amber-50 p-4 border border-amber-300">
            <span className="inline-block rounded bg-amber-600 px-2 py-0.5 text-xs font-bold text-white">
              PENDING (TIMEOUT) — CHƯA RÕ KẾT QUẢ
            </span>
            <h1 className="mt-2 text-xl font-bold text-amber-950">
              Đang chờ xác nhận kết quả từ cổng thanh toán
            </h1>
            <p className="mt-1 text-sm text-amber-800">
              Mất kết nối trong lúc chờ phản hồi. Hệ thống không tự động coi là thất bại hay thu tiền lại để tránh trừ tiền 2 lần. Vui lòng kiểm tra/đồng bộ lại trạng thái lượt giao dịch cũ.
            </p>
          </div>
        )}

        {actionError && (
          <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {actionError}
          </div>
        )}

        {/* Thông tin chung của đơn */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 text-sm sm:grid-cols-4">
          <div>
            <p className="text-xs text-gray-500">Mã đơn (Order ID)</p>
            <p className="font-mono font-bold text-gray-900">{order.orderId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Nguồn tạo</p>
            <p className="font-semibold text-gray-800">{order.source}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Số lượt thử (Attempt)</p>
            <p className="font-semibold text-gray-800">{order.attemptCount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Hạn thanh toán (15p cố định)</p>
            <p className="font-semibold text-gray-800">
              {new Date(order.expiresAt).toLocaleTimeString('vi-VN')}
            </p>
          </div>
        </div>

        {/* Khu vực Retry cho PAYMENT_FAILED */}
        {order.status === 'PAYMENT_FAILED' && (
          <div className="mt-6 rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-bold text-gray-900">
              Thử thanh toán lại (Retry trên cùng đơn {order.orderId})
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <select
                value={retryScenario}
                onChange={(e) => setRetryScenario(e.target.value as PaymentSimScenario)}
                className="rounded border border-gray-300 px-3 py-2 text-xs font-medium"
              >
                <option value="SUCCESS">Kịch bản Retry: Thành công (PAID)</option>
                <option value="FAIL_CONFIRMED">Kịch bản Retry: Tiếp tục thất bại</option>
                <option value="TIMEOUT_UNKNOWN">Kịch bản Retry: Bị Timeout</option>
              </select>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleRetryPayment}
                className="rounded-lg bg-amber-700 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
              >
                {isProcessing ? 'Đang gửi lượt mới...' : 'Thử thanh toán lại ngay'}
              </button>
            </div>
          </div>
        )}

        {/* Khu vực Replay/Kiểm tra cho TIMEOUT */}
        {isTimeoutUnknown && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50/40 p-4">
            <h2 className="text-sm font-bold text-gray-900">
              Kiểm tra / Replay kết quả lượt giao dịch cũ (Không tăng Attempt)
            </h2>
            <p className="mt-1 text-xs text-gray-600">
              Chọn kết quả phản hồi từ cổng thanh toán cho lượt vừa bị ngắt kết nối:
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleReplayCheck('PAID')}
                className="rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
              >
                Đồng bộ kết quả: Đã thu tiền (PAID)
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleReplayCheck('PAYMENT_FAILED')}
                className="rounded-lg bg-red-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-red-800 disabled:opacity-50"
              >
                Đồng bộ kết quả: Chưa thu được tiền (PAYMENT_FAILED)
              </button>
            </div>
          </div>
        )}

        {/* Chi tiết Snapshot món trong đơn */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            Snapshot danh sách món trong đơn
          </h2>
          <div className="divide-y divide-gray-100 text-sm">
            {order.items.map((item) => (
              <div key={item.lineId} className="flex justify-between py-2">
                <div>
                  <span className="font-medium text-gray-900">{item.productName}</span>{' '}
                  <span className="text-xs text-gray-500">
                    (Size {item.size} × {item.quantity})
                  </span>
                </div>
                <span className="font-medium text-gray-900">
                  {item.lineTotal.toLocaleString('vi-VN')}đ
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900">
            <span>Tổng cộng:</span>
            <span className="text-amber-700">
              {order.totalAmount.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>

        {/* Điều hướng sang Orders của Phát hoặc về Menu */}
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-gray-200 pt-5">
          <div className="flex gap-3">
            <Link
              href={`/orders/${order.orderId}`}
              className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
            >
              Xem Chi tiết đơn (/orders/{order.orderId})
            </Link>
            <Link
              href="/orders"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Lịch sử đơn hàng (/orders)
            </Link>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100"
          >
            Tiếp tục mua sắm (/)
          </Link>
        </div>
      </div>
    </div>
  );
}