"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, Form, Input, Typography, message } from "antd";

import { useAuth } from "@/contexts/AuthContext";

const { Title, Paragraph } = Typography;

type RegisterFormValues = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { refresh, user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async ({ confirmPassword: _confirm, ...values }: RegisterFormValues) => {
    try {
      setSubmitting(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Đăng ký thất bại");
      }

      await refresh();
      message.success("Tạo tài khoản thành công!");
      router.push("/");
    } catch (error) {
      const err = error as Error;
      message.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0">
        <div className="floating-blob absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-[#FDBA74]/40" />
        <div className="floating-blob absolute bottom-0 right-20 h-96 w-96 rounded-full bg-[#96C8DD]/35" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6">
        <div className="glass-panel w-full max-w-3xl rounded-3xl border border-white/40 bg-white/70 p-12 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <Title level={2} className="!mb-2 text-[#2F4858]">
              Tạo tài khoản mới
            </Title>
            <Paragraph className="!mb-0 text-[#64748B]">
              Chỉ mất một phút để tham gia cộng đồng đọc sách và nhận ưu đãi độc quyền từ CNPM Books.
            </Paragraph>
          </div>

          <Form
            layout="vertical"
            size="large"
            onFinish={onFinish}
            requiredMark={false}
            disabled={loading}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input placeholder="Ví dụ: Nguyễn Minh Quân" autoComplete="name" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    pattern: /^\d{9,11}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                ]}
              >
                <Input placeholder="Tuỳ chọn" autoComplete="tel" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                className="md:col-span-2"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="nhapemail@vidu.com" autoComplete="email" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu" },
                  {
                    min: 6,
                    message: "Mật khẩu tối thiểu 6 ký tự",
                  },
                ]}
              >
                <Input.Password placeholder="••••••" autoComplete="new-password" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu" },
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
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              disabled={loading}
              className="mt-4 h-12 w-full rounded-2xl text-[16px] shadow-lg"
            >
              Đăng ký tài khoản
            </Button>
          </Form>

          <div className="mt-6 text-center text-[14px] text-[#64748B]">
            Bạn đã có tài khoản? {" "}
            <Link href="/auth/login" className="font-semibold text-[#96C8DD] hover:text-[#5f9cb7]">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
