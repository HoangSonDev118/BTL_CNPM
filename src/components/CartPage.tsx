"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faXmark, faShoppingBag, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: 'Những truyện cổ tích danh',
    code: '2677',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
    price: 189050,
    quantity: 2
  },
  {
    id: 2,
    name: 'Dọc tranh nhỏ chữ - Combo - Tập đọc khám phá',
    code: 'CBDTNC2',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
    price: 57000,
    quantity: 1
  }
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 0;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header with wave decoration */}
      <div className="bg-gradient-to-r from-sky-400 to-blue-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" fill="white"/>
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-3">Giỏ hàng</h1>
          <div className="flex items-center justify-center gap-2 text-sm opacity-90">
            <span>Trang chủ</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            <span>Giỏ hàng</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-sky-400 text-white flex items-center justify-center font-bold mb-2">
              1
            </div>
            <span className="text-sm font-semibold text-gray-800">GIỎ HÀNG</span>
          </div>
          
          <div className="w-20 h-1 bg-gray-300 mb-8"></div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold mb-2">
              2
            </div>
            <span className="text-sm text-gray-400">CHI TIẾT THANH TOÁN</span>
          </div>
          
          <div className="w-20 h-1 bg-gray-300 mb-8"></div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold mb-2">
              3
            </div>
            <span className="text-sm text-gray-400">THANH TOÁN THÀNH CÔNG</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Products List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 border-b">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
                  <div className="col-span-5">SẢN PHẨM</div>
                  <div className="col-span-2 text-center">GIÁ TIỀN</div>
                  <div className="col-span-3 text-center">SỐ LƯỢNG</div>
                  <div className="col-span-2 text-center">TỔNG</div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-6 items-center hover:bg-gray-50 transition-colors">
                    {/* Product Info */}
                    <div className="col-span-5 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-28 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">Code: {item.code}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center">
                      <span className="text-gray-700">{formatPrice(item.price)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-3 flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faMinus} className="text-sm" />
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-sm" />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="col-span-1 text-center">
                      <span className="font-semibold text-orange-500">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <div className="col-span-1 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded hover:bg-red-50 text-red-500 flex items-center justify-center transition-colors mx-auto"
                      >
                        <FontAwesomeIcon icon={faXmark} className="text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b">
                THÀNH TIỀN
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Tạm tính</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Thuế</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <span>Tổng</span>
                  <span className="text-orange-500">{formatPrice(total)}</span>
                </div>
              </div>

              <button onClick={() => router.push('/checkout')} className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-sky-500 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                THANH TOÁN
              </button>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-8">
          <button className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
            <FontAwesomeIcon icon={faShoppingBag} />
            TIẾP TỤC MUA HÀNG
          </button>
        </div>
      </div>
    </div>
  );
}
