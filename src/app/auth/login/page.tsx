"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import { useToast, ToastContainer } from "@/components/Toast";

const { Title, Paragraph } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

const UserLoginPage = () => {
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

  const onFinish = async (values: LoginFormValues) => {
    try {
      setSubmitting(true);
      setIsRedirecting(true); // Ngăn useEffect redirect
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      await refresh();
      
      // Hiển thị toast
      toast.success("Đăng nhập thành công! Chào mừng bạn trở lại 🎉", 2500);
      
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
      
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 px-4 py-16">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="absolute bottom-10 -right-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="overflow-hidden rounded-3xl border border-sky-200/50 bg-white shadow-2xl">
            <div className="space-y-6 px-10 py-12">
              {/* Logo */}
              <div className="flex flex-col items-center gap-2">
                <Link href="/">
                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100">
                      <img src="/logos/logo.svg" alt="Enfants Books" className="h-7 w-7" />
                    </span>
                    <span className="text-2xl font-bold text-gray-800">Enfants Books</span>
                  </span>
                </Link>
              </div>

              {/* Title */}
              <div className="text-center">
                <Title level={3} className="!mb-2 text-gray-800">
                  Chào mừng bạn trở lại! 👋
                </Title>
                <Paragraph className="!mb-0 text-gray-600">
                  Đăng nhập để tiếp tục mua sắm và khám phá thêm nhiều sách hay
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
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                >
                  <Input.Password placeholder="••••••" autoComplete="current-password" />
                </Form.Item>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                  </Form.Item>
                  <Link href="/auth/forgot-password" className="text-sky-500 hover:text-sky-600">
                    Quên mật khẩu?
                  </Link>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  disabled={loading}
                  className="mt-4 h-12 w-full rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-[16px] font-semibold shadow-lg hover:from-sky-500 hover:to-blue-600"
                >
                  Đăng nhập
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
                  Đăng nhập với Google
                </Button>
                <Button
                  size="large"
                  block
                  disabled
                  className="h-12 rounded-xl border-2 border-gray-200"
                  icon={<img src="/logos/facebook.png" className="h-5 w-5" alt="Facebook" />}
                >
                  Đăng nhập với Facebook
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-10 py-6 text-center text-sm text-gray-600">
              <span>Chưa có tài khoản?</span>{" "}
              <Link href="/auth/register" className="font-semibold text-sky-500 hover:text-sky-600">
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLoginPage;