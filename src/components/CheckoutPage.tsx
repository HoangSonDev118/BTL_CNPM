"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faTruck, 
  faMoneyBill, 
  faCreditCard,
  faMapMarkerAlt,
  faUser,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutFormData = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note: string;
};

const cartItems: CartItem[] = [
  { id: 1, name: 'Những truyện cổ tích danh', price: 189050, quantity: 2 },
  { id: 2, name: 'Dọc tranh nhỏ chữ - Combo', price: 57000, quantity: 1 }
];

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '', phone: '', email: '', address: '', city: '', district: '', ward: '', note: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 30000;
  const total = subtotal + shippingFee;

  const formatPrice = (price: number) => price.toLocaleString('vi-VN') + 'đ';

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Payment:', paymentMethod, 'Data:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-sky-400 to-blue-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" fill="white"/>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-3">Chi tiết thanh toán</h1>
          <div className="flex items-center justify-center gap-2 text-sm opacity-90">
            <span>Trang chủ</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            <span>Giỏ hàng</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            <span>Chi tiết thanh toán</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mb-2">✓</div>
            <span className="text-sm font-semibold text-gray-800">GIỎ HÀNG</span>
          </div>
          <div className="w-20 h-1 bg-sky-400 mb-8"></div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-sky-400 text-white flex items-center justify-center font-bold mb-2">2</div>
            <span className="text-sm font-semibold text-gray-800">CHI TIẾT THANH TOÁN</span>
          </div>
          <div className="w-20 h-1 bg-gray-300 mb-8"></div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold mb-2">3</div>
            <span className="text-sm text-gray-400">THANH TOÁN THÀNH CÔNG</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faTruck} className="text-sky-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Thông tin giao hàng</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400" />
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-400" />
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                    placeholder="Nhập email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-400" />
                    Địa chỉ cụ thể *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                    placeholder="Số nhà, tên đường..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tỉnh/Thành phố *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quận/Huyện *</label>
                  <select
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    <option value="cau-giay">Cầu Giấy</option>
                    <option value="dong-da">Đống Đa</option>
                    <option value="hai-ba-trung">Hai Bà Trưng</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phường/Xã *</label>
                  <select
                    value={formData.ward}
                    onChange={(e) => handleChange('ward', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                  >
                    <option value="">Chọn Phường/Xã</option>
                    <option value="dich-vong">Dịch Vọng</option>
                    <option value="dich-vong-hau">Dịch Vọng Hậu</option>
                    <option value="mai-dich">Mai Dịch</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú đơn hàng</label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => handleChange('note', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none resize-none"
                    placeholder="Ghi chú về đơn hàng..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faCreditCard} className="text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Phương thức thanh toán</h2>
              </div>

              <div className="space-y-4">
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-sky-400 bg-sky-50' : 'border-gray-200 hover:border-sky-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'border-sky-400' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-sky-400"></div>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FontAwesomeIcon icon={faMoneyBill} className="text-green-500 text-xl" />
                        <h3 className="font-semibold text-gray-800">Thanh toán khi nhận hàng (COD)</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Quý khách sẽ thanh toán bằng tiền mặt khi nhận được hàng từ nhân viên giao hàng
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('vnpay')}
                  className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${
                    paymentMethod === 'vnpay' ? 'border-sky-400 bg-sky-50' : 'border-gray-200 hover:border-sky-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'vnpay' ? 'border-sky-400' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'vnpay' && <div className="w-3 h-3 rounded-full bg-sky-400"></div>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FontAwesomeIcon icon={faCreditCard} className="text-blue-500 text-xl" />
                        <h3 className="font-semibold text-gray-800">Chuyển khoản ngân hàng (VNPAY QR)</h3>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Sắp ra mắt</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Quét mã QR để thanh toán nhanh chóng qua ứng dụng ngân hàng (tính năng đang phát triển)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b">Đơn hàng của bạn</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 ml-3">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Tạm tính</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold">{formatPrice(shippingFee)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Tổng cộng</span>
                  <span className="text-orange-500">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-sky-500 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                ĐẶT HÀNG
              </button>

              <button
                onClick={() => window.history.back()}
                className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Quay lại giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
