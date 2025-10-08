"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import { useToast, ToastContainer } from "@/components/Toast";

const { Title, Paragraph } = Typography;

type RegisterFormValues = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
};

const UserRegisterPage = () => {
  const router = useRouter();
  const { user, loading, refresh } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { toast, toasts, closeToast } = useToast();

  useEffect(() => {
    // Chỉ redirect nếu KHÔNG PHẢI đang trong quá trình submit
    if (!loading && user && !isRedirecting) {
      toast.info("Bạn đã đăng nhập rồi!");
      router.replace("/");
    }
  }, [loading, user, router, isRedirecting]);

  const onFinish = async ({ confirmPassword: _confirm, ...values }: RegisterFormValues) => {
    try {
      setSubmitting(true);
      setIsRedirecting(true); // Ngăn useEffect redirect
      
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng ký thất bại");
      }

      await refresh();
      
      // Hiển thị toast
      toast.success("Đăng ký thành công! Chào mừng bạn đến với Enfants Books 🎉", 2500);
      
      // Đợi 2.5s để người dùng thấy toast, sau đó mới chuyển trang
      await new Promise(resolve => setTimeout(resolve, 2500));
      router.push("/");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      setSubmitting(false);
      setIsRedirecting(false); // Enable lại useEffect nếu có lỗi
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={closeToast} />
      
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-4 py-16">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl" />
          <div className="absolute bottom-10 -right-16 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-xl">
          <div className="overflow-hidden rounded-3xl border border-rose-200/50 bg-white shadow-2xl">
            <div className="space-y-6 px-10 py-12">
              {/* Logo */}
              <div className="flex flex-col items-center gap-2">
                <Link href="/">
                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100">
                      <img src="/logos/logo.svg" alt="Enfants Books" className="h-7 w-7" />
                    </span>
                    <span className="text-2xl font-bold text-gray-800">Enfants Books</span>
                  </span>
                </Link>
              </div>

              {/* Title */}
              <div className="text-center">
                <Title level={3} className="!mb-2 text-gray-800">
                  Tạo tài khoản mới 🚀
                </Title>
                <Paragraph className="!mb-0 text-gray-600">
                  Đăng ký để khám phá thế giới sách thiếu nhi đầy màu sắc
                </Paragraph>
              </div>

              {/* Form */}
              <Form
                layout="vertical"
                size="large"
                onFinish={onFinish}
                requiredMark={false}
                disabled={loading || submitting}
              >
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                >
                  <Input placeholder="Nguyễn Văn A" autoComplete="name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không đúng định dạng" },
                  ]}
                >
                  <Input placeholder="your@email.com" autoComplete="email" />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại (tùy chọn)"
                  name="phone"
                  rules={[
                    {
                      pattern: /^\d{9,11}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                >
                  <Input placeholder="0912345678" autoComplete="tel" />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                    { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                  ]}
                >
                  <Input.Password placeholder="••••••" autoComplete="new-password" />
                </Form.Item>

                <Form.Item
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Vui lòng xác nhận mật khẩu" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Mật khẩu nhập lại chưa khớp"));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="••••••" autoComplete="new-password" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  disabled={loading}
                  className="mt-2 h-12 w-full rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-[16px] font-semibold shadow-lg hover:from-rose-500 hover:to-pink-600"
                >
                  Đăng ký
                </Button>
              </Form>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm text-gray-400">hoặc</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  size="large"
                  block
                  disabled
                  className="h-12 rounded-xl border-2 border-gray-200"
                  icon={<img src="/logos/pngegg.png" className="h-5 w-5" alt="Google" />}
                >
                  Đăng ký với Google
                </Button>
                <Button
                  size="large"
                  block
                  disabled
                  className="h-12 rounded-xl border-2 border-gray-200"
                  icon={<img src="/logos/facebook.png" className="h-5 w-5" alt="Facebook" />}
                >
                  Đăng ký với Facebook
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-10 py-6 text-center text-sm text-gray-600">
              <span>Đã có tài khoản?</span>{" "}
              <Link href="/auth/login" className="font-semibold text-rose-500 hover:text-rose-600">
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegisterPage;