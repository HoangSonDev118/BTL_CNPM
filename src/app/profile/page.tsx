"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Form, Input, Button, Tabs, Spin, Card, Tag, Empty } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faShoppingBag,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useToast, ToastContainer } from "@/components/Toast";

type ProfileFormValues = {
  name: string;
  email: string;
  phone?: string;
};

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Order = {
  id: string;
  createdAt: string;
  total: number;
  status: string;
  items: {
    id: string;
    bookTitle: string;
    quantity: number;
    price: number;
  }[];
};

const ProfilePage = () => {
  const router = useRouter();
  const { user, loading: authLoading, refresh } = useAuth();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { toast, toasts, closeToast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Debug log
  useEffect(() => {
    console.log("Current toasts:", toasts);
  }, [toasts]);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.warning("Vui lòng đăng nhập để xem thông tin cá nhân");
      router.push("/auth/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      profileForm.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      });
    }
  }, [user, profileForm]);

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await fetch("/api/user/orders");
      
      if (!response.ok) {
        throw new Error("Không thể tải danh sách đơn hàng");
      }

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateProfile = async (values: ProfileFormValues) => {
    try {
      setLoading(true);
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("Update Profile Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Cập nhật thất bại");
      }

      await refresh();
      console.log("About to show success toast");
      toast.success(data.message || "Cập nhật thông tin thành công!");
    } catch (error) {
      const err = error as Error;
      console.log("Update Profile Error:", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values: PasswordFormValues) => {
    try {
      setLoading(true);
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });

      const data = await response.json();
      console.log("Change Password Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Đổi mật khẩu thất bại");
      }

      console.log("About to show success toast");
      toast.success(data.message || "Đổi mật khẩu thành công!");
      passwordForm.resetFields();
    } catch (error) {
      const err = error as Error;
      console.log("Change Password Error:", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "orange",
      processing: "blue",
      completed: "green",
      cancelled: "red",
    };
    return statusMap[status] || "default";
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "Chờ xác nhận",
      processing: "Đang xử lý",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tabItems = [
    {
      key: "profile",
      label: (
        <span className="flex items-center gap-2 text-base">
          <FontAwesomeIcon icon={faUser} />
          Thông tin cá nhân
        </span>
      ),
      children: (
        <div className="space-y-8">
          {/* Profile Information */}
          <Card
            title={
              <span className="text-lg font-bold text-sky-600">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Cập nhật thông tin
              </span>
            }
            className="shadow-md"
          >
            <Form
              form={profileForm}
              layout="vertical"
              onFinish={handleUpdateProfile}
              size="large"
            >
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input
                  prefix={<FontAwesomeIcon icon={faUser} className="text-gray-400" />}
                  placeholder="Nhập họ và tên"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  prefix={<FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />}
                  placeholder="Nhập email"
                  disabled
                />
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
                <Input
                  prefix={<FontAwesomeIcon icon={faPhone} className="text-gray-400" />}
                  placeholder="Nhập số điện thoại (tùy chọn)"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-12 text-base font-bold"
                >
                  Cập nhật thông tin
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* Change Password */}
          <Card
            title={
              <span className="text-lg font-bold text-rose-600">
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                Đổi mật khẩu
              </span>
            }
            className="shadow-md"
          >
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handleChangePassword}
              size="large"
            >
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}
              >
                <Input.Password
                  prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400" />}
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới" },
                  { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                ]}
              >
                <Input.Password
                  prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400" />}
                  placeholder="Nhập mật khẩu mới"
                />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400" />}
                  placeholder="Xác nhận mật khẩu mới"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  danger
                  className="w-full h-12 text-base font-bold"
                >
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      ),
    },
    {
      key: "orders",
      label: (
        <span className="flex items-center gap-2 text-base">
          <FontAwesomeIcon icon={faShoppingBag} />
          Đơn hàng của tôi
        </span>
      ),
      children: (
        <div>
          {loadingOrders ? (
            <div className="flex justify-center py-12">
              <Spin size="large" />
            </div>
          ) : orders.length === 0 ? (
            <Empty
              description="Bạn chưa có đơn hàng nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type="primary"
                onClick={() => router.push("/books")}
                className="mt-4"
              >
                Mua sắm ngay
              </Button>
            </Empty>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card
                  key={order.id}
                  className="shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Mã đơn hàng: <span className="font-bold text-gray-800">{order.id}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Ngày đặt:{" "}
                        {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Tag color={getStatusColor(order.status)} className="text-base px-3 py-1">
                      {getStatusText(order.status)}
                    </Tag>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.bookTitle}</p>
                          <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sky-600">{formatPrice(item.price)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-4 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-orange-500">
                      {formatPrice(order.total)}
                    </span>
                  </div>

                  <Button
                    type="link"
                    className="mt-2 p-0 text-sky-600 font-bold"
                    onClick={() => router.push(`/orders/${order.id}`)}
                  >
                    Xem chi tiết <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <ToastContainer toasts={toasts} onClose={closeToast} />
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-400 to-blue-400 text-white rounded-2xl p-8 mb-8 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-sky-500 text-3xl">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
                <p className="text-sky-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Card className="shadow-lg">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              size="large"
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;