"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, Form, Input, Typography, message } from "antd";

import { useAuth } from "@/contexts/AuthContext";

const { Title, Paragraph, Text } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { refresh, user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    try {
      setSubmitting(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Đăng nhập thất bại");
      }

      const data = (await response.json()) as { user: typeof user };

      await refresh();
      message.success("Đăng nhập thành công!");
      const destination =
        data.user?.role === "SUPER_ADMIN"
          ? "/admin"
          : data.user?.role === "STAFF"
            ? "/admin/staff"
            : "/";
      router.push(destination);
    } catch (error) {
      const err = error as Error;
      message.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      const destination =
        user.role === "SUPER_ADMIN"
          ? "/admin"
          : user.role === "STAFF"
            ? "/admin/staff"
            : "/";
      router.replace(destination);
    }
  }, [loading, user, router]);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0">
        <div className="floating-blob absolute -top-40 -left-20 h-72 w-72 rounded-full bg-[#96C8DD]/40" />
        <div className="floating-blob absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#FBBF24]/40" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6">
        <div className="glass-panel w-full max-w-xl rounded-3xl border border-white/40 bg-white/70 p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <Title level={2} className="!mb-2 text-[#2F4858]">
              Chào mừng trở lại!
            </Title>
            <Paragraph className="!mb-0 text-[#64748B]">
              Đăng nhập để đồng bộ tủ sách yêu thích và tiếp tục hành trình tri thức của bạn.
            </Paragraph>
          </div>

          <Form
            layout="vertical"
            size="large"
            onFinish={onFinish}
            requiredMark={false}
            disabled={loading}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                {
                  type: "email",
                  message: "Email không đúng định dạng",
                },
              ]}
            >
              <Input placeholder="nhapemail@vidu.com" autoComplete="email" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password placeholder="••••••" autoComplete="current-password" />
            </Form.Item>

            <div className="mb-6 flex items-center justify-between text-[14px] text-[#64748B]">
              <span>
                <Text>Bạn chưa có tài khoản?</Text>{" "}
                <Link href="/auth/register" className="font-semibold text-[#96C8DD] hover:text-[#5f9cb7]">
                  Đăng ký ngay
                </Link>
              </span>
              <Link href="#" className="text-[#96C8DD] hover:text-[#5f9cb7]">
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              disabled={loading}
              className="h-12 w-full rounded-2xl text-[16px] shadow-lg"
            >
              Đăng nhập
            </Button>
          </Form>

          <div className="mt-8 grid gap-3 text-[14px] text-[#64748B]">
            <div className="flex items-center justify-center gap-2 text-[#94A3B8]">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CBD5F5] to-transparent" />
              Hoặc tiếp tục với
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CBD5F5] to-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-12 rounded-2xl border border-[#CBD5F5] bg-white/80" disabled>
                Google (sắp ra mắt)
              </Button>
              <Button className="h-12 rounded-2xl border border-[#CBD5F5] bg-white/80" disabled>
                Facebook (sắp ra mắt)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
