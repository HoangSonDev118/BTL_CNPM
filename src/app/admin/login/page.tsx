"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import { SUPER_ADMIN_ROLE } from "@/lib/roles";
import { useToast, ToastContainer } from "@/components/Toast";

const { Title, Paragraph, Text } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

const AdminLoginPage = () => {
  const router = useRouter();
  const { user, loading, refresh } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { toast, toasts, closeToast } = useToast();

  useEffect(() => {
    // Chỉ redirect nếu KHÔNG PHẢI đang trong quá trình submit
    if (!loading && user && !isRedirecting) {
      if (user.role === SUPER_ADMIN_ROLE) {
        router.replace("/admin");
        return;
      }
      if (user.role === "STAFF") {
        router.replace("/admin/staff");
        return;
      }
      toast.warning("Bạn không có quyền truy cập trang quản trị");
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
        body: JSON.stringify({ ...values, requireRole: ["STAFF", SUPER_ADMIN_ROLE] }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập quản trị thất bại");
      }

      await refresh();
      
      const destination = data.user?.role === SUPER_ADMIN_ROLE ? "/admin" : "/admin/staff";
      
      // Hiển thị toast
      toast.success("Đăng nhập quản trị thành công! 🎉", 2500);
      
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
          <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-[#696cff]/10 blur-3xl" />
          <div className="absolute bottom-10 -right-16 h-80 w-80 rounded-full bg-[#03c3ec]/10 blur-3xl" />
          <div className="absolute top-1/3 left-10 h-40 w-40 rounded-full border border-[#d9def8]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="overflow-hidden rounded-3xl border border-[#e4e6ef] bg-white shadow-2xl">
            <div className="space-y-6 px-10 py-12">
              <div className="flex flex-col items-center gap-2">
                <Link href="/">
                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#696cff]/10">
                      <img src="/logos/logo.svg" alt="CNPM Books" className="h-6 w-6" />
                    </span>
                    <span className="text-xl font-bold text-[#475569]">EnfantsBooks Admin</span>
                  </span>
                </Link>
              </div>

              <div className="text-center">
                <Title level={3} className="!mb-2 text-[#1f2937]">
                  Chào mừng quay lại 👋
                </Title>
                <Paragraph className="!mb-0 text-[#6b7280]">
                  Đăng nhập để truy cập bảng điều khiển quản trị và quản lý nội dung.
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
                  label="Email quản trị"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không đúng định dạng" },
                  ]}
                >
                  <Input placeholder="admin@domain.com" autoComplete="email" />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                >
                  <Input.Password placeholder="••••••" autoComplete="current-password" />
                </Form.Item>

                <div className="flex items-center justify-between text-sm text-[#6b7280]">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                  </Form.Item>
                  <Link href="/auth/login" className="text-[#696cff] hover:text-[#4c4fd2]">
                    Quên mật khẩu?
                  </Link>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-[#696cff] text-[16px] shadow-md hover:bg-[#5a5dcf]"
                >
                  Đăng nhập quản trị
                </Button>
              </Form>

              <div className="space-y-3 rounded-2xl bg-[#f8fafc] p-5 text-center text-sm text-[#64748b]">
                <Text className="block text-[#475569]">Tùy chọn bảo mật nâng cao</Text>
                <Button block disabled className="h-12 rounded-xl border border-dashed border-[#cbd5f5] bg-white/80">
                  MFA (đang phát triển)
                </Button>
                <Paragraph className="!mb-0 text-xs text-[#94a3b8]">
                  Bật xác thực đa yếu tố để bảo vệ tài khoản quản trị khi tính năng sẵn sàng.
                </Paragraph>
              </div>
            </div>

            <div className="bg-[#f9fafb] px-10 py-6 text-center text-sm text-[#6b7280]">
              <div>
                <span>Không phải admin?</span>{" "}
                <Link href="/auth/login" className="font-semibold text-[#696cff] hover:text-[#4c4fd2]">
                  Đăng nhập người dùng
                </Link>
              </div>
              <div className="mt-2">
                <span>Chưa có tài khoản nhân viên?</span>{" "}
                <Link href="/admin/register" className="font-semibold text-[#03c3ec] hover:text-[#0795bb]">
                  Đăng ký ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;