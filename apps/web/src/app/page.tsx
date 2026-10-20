"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function checkBackend() {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("Chưa cấu hình NEXT_PUBLIC_API_URL.");
      }

      const response = await fetch(`${apiUrl}/`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Backend trả về lỗi HTTP ${response.status}.`);
      }

      const data = await response.text();

      setMessage(`Backend phản hồi: ${data}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không kết nối được backend."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-amber-50 px-6">
      <h1 className="text-center text-5xl font-bold text-amber-900">
        Hello BrewLite!
      </h1>

      <p className="mt-4 text-center text-lg text-gray-700">
        Ứng dụng đặt cà phê và thanh toán không tiền mặt.
      </p>

      <button
        type="button"
        onClick={checkBackend}
        disabled={loading}
        className="mt-8 rounded-lg bg-amber-900 px-6 py-3 font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Đang kết nối..." : "Kiểm tra kết nối backend"}
      </button>

      {message && (
        <p role="status" className="mt-4 text-center text-green-700">
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="mt-4 text-center text-red-600">
          {error}
        </p>
      )}
    </main>
  );
}