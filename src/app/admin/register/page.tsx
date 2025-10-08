"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import { SUPER_ADMIN_ROLE, type Role } from "@/lib/roles";
import { useToast, ToastContainer } from "@/components/Toast";

const { Title, Paragraph, Text } = Typography;

type RegisterFormValues = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
};

export default function StaffRegisterPage() {
  const router = useRouter();
  const { user, loading, refresh } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { toast, toasts, closeToast } = useToast();

  useEffect(() => {
    // Chỉ redirect nếu KHÔNG PHẢI đang trong quá trình submit
    if (!loading && user && !isRedirecting) {
      const destination =
        user.role === SUPER_ADMIN_ROLE
          ? "/admin"
          : user.role === "STAFF"
            ? "/admin/staff"
            : "/";
      router.replace(destination);
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
        body: JSON.stringify({ ...values, role: "STAFF" as Role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng ký nhân viên thất bại");
      }

      await refresh();
      
      const destination = data.user?.role === SUPER_ADMIN_ROLE ? "/admin" : "/admin/staff";
      
      // Hiển thị toast
      toast.success("Tạo tài khoản nhân viên thành công! 🎉", 2500);
      
      // Đợi 2.5s để người dùng thấy toast, sau đó mới chuyển trang
      await new Promise(resolve => setTimeout(resolve, 2500));
      router.push(destination);
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
      
      <div className="relative flex min-h-screen items-center justify-center bg-[#eef0f8] px-4 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-[#03c3ec]/10 blur-3xl" />
          <div className="absolute bottom-10 -right-16 h-80 w-80 rounded-full bg-[#696cff]/10 blur-3xl" />
          <div className="absolute top-1/3 left-10 h-40 w-40 rounded-full border border-[#d9def8]" />
        </div>

        <div className="relative z-10 w-full max-w-xl">
          <div className="overflow-hidden rounded-3xl border border-[#e4e6ef] bg-white shadow-2xl">
            <div className="space-y-6 px-10 py-12">
              <div className="flex flex-col items-center gap-2">
                <Link href="/">
                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03c3ec]/10">
                      <img src="/logos/logo.svg" alt="CNPM Books" className="h-6 w-6" />
                    </span>
                    <span className="text-xl font-bold text-[#475569]">EnfantsBooks Staff</span>
                  </span>
                </Link>
              </div>

              <div className="text-center">
                <Title level={3} className="!mb-2 text-[#1f2937]">
                  Đăng ký tài khoản nhân viên
                </Title>
                <Paragraph className="!mb-0 text-[#6b7280]">
                  Tạo tài khoản để truy cập các công cụ hỗ trợ xử lý đơn hàng và quản lý sách.
                </Paragraph>
              </div>

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
                  <Input placeholder="Ví dụ: Nguyễn Văn A" autoComplete="name" />
                </Form.Item>

                <Form.Item
                  label="Email công việc"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không đúng định dạng" },
                  ]}
                >
                  <Input placeholder="staff@cnpmbooks.com" autoComplete="email" />
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
                  <Input placeholder="Ví dụ: 0912345678" autoComplete="tel" />
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
                  className="mt-2 h-12 w-full rounded-xl bg-[#03c3ec] text-[16px] shadow-md hover:bg-[#0795bb]"
                >
                  Đăng ký nhân viên
                </Button>
              </Form>

              <div className="space-y-2 rounded-2xl bg-[#f8fafc] p-5 text-center text-sm text-[#64748b]">
                <Text>Đã có tài khoản?</Text>{" "}
                <Link href="/admin/login" className="font-semibold text-[#03c3ec] hover:text-[#0795bb]">
                  Đăng nhập ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}