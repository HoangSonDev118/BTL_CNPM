// src/app/admin/super/_components/SuperAdminDashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Table, Tag, Badge, Progress } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  TrophyOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

type SystemStats = {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalStaff: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
};

type TopProduct = {
  key: string;
  title: string;
  sold: number;
  revenue: number;
};

type RecentActivity = {
  key: string;
  type: "order" | "user" | "staff";
  description: string;
  time: string;
};

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<SystemStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalStaff: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    customersGrowth: 0,
  });
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setStats({
        totalRevenue: 125430000,
        totalOrders: 1248,
        totalCustomers: 856,
        totalStaff: 12,
        revenueGrowth: 15.8,
        ordersGrowth: 12.3,
        customersGrowth: 8.5,
      });

      setTopProducts([
        { key: "1", title: "Đắc Nhân Tâm", sold: 234, revenue: 20124000 },
        { key: "2", title: "Nhà Giả Kim", sold: 198, revenue: 15642000 },
        { key: "3", title: "Sapiens", sold: 156, revenue: 29484000 },
        { key: "4", title: "7 Thói Quen Hiệu Quả", sold: 142, revenue: 13490000 },
        { key: "5", title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", sold: 128, revenue: 8704000 },
      ]);

      setActivities([
        { key: "1", type: "order", description: "Đơn hàng #ORD-2024-1248 đã hoàn thành", time: "2 phút trước" },
        { key: "2", type: "user", description: "Khách hàng mới đăng ký: Nguyễn Văn A", time: "5 phút trước" },
        { key: "3", type: "staff", description: "Nhân viên Trần Thị B đã xử lý 5 đơn hàng", time: "10 phút trước" },
        { key: "4", type: "order", description: "Đơn hàng #ORD-2024-1247 cần xác nhận", time: "15 phút trước" },
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const productColumns: ColumnsType<TopProduct> = [
    {
      title: "Sản phẩm",
      dataIndex: "title",
      key: "title",
      render: (text, _, index) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge count={index + 1} style={{ backgroundColor: index < 3 ? "#ffd700" : "#d9d9d9" }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </div>
      ),
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      render: (sold) => <span style={{ fontWeight: 500 }}>{sold} quyển</span>,
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue) => (
        <span style={{ fontWeight: 600, color: "#52c41a" }}>
          {revenue.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 0 24px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#1a1d2e" }}>
          Dashboard Super Admin
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0, fontSize: 15 }}>
          Tổng quan toàn bộ hệ thống và các chỉ số quan trọng
        </p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              height: "100%",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.95)", fontSize: 14 }}>Tổng doanh thu</span>}
              value={stats.totalRevenue}
              suffix="đ"
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#fff", fontSize: 24, fontWeight: 700 }}
            />
            <div style={{ marginTop: 12, fontSize: 13, opacity: 0.95, display: "flex", alignItems: "center", gap: 4 }}>
              <RiseOutlined />
              <span>+{stats.revenueGrowth}% so với tháng trước</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "#fff",
              height: "100%",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.95)", fontSize: 14 }}>Tổng đơn hàng</span>}
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#fff", fontSize: 24, fontWeight: 700 }}
            />
            <div style={{ marginTop: 12, fontSize: 13, opacity: 0.95, display: "flex", alignItems: "center", gap: 4 }}>
              <RiseOutlined />
              <span>+{stats.ordersGrowth}% so với tháng trước</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "#fff",
              height: "100%",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.95)", fontSize: 14 }}>Khách hàng</span>}
              value={stats.totalCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#fff", fontSize: 24, fontWeight: 700 }}
            />
            <div style={{ marginTop: 12, fontSize: 13, opacity: 0.95, display: "flex", alignItems: "center", gap: 4 }}>
              <RiseOutlined />
              <span>+{stats.customersGrowth}% so với tháng trước</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              color: "#fff",
              height: "100%",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.95)", fontSize: 14 }}>Nhân viên</span>}
              value={stats.totalStaff}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#fff", fontSize: 24, fontWeight: 700 }}
            />
            <div style={{ marginTop: 12, fontSize: 13, opacity: 0.95 }}>
              <Badge status="success" /> Tất cả đang hoạt động
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={14}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TrophyOutlined style={{ color: "#ffd700", fontSize: 18 }} />
                <span style={{ fontSize: 16, fontWeight: 600 }}>Top sản phẩm bán chạy</span>
              </div>
            }
            bordered={false}
            extra={<a style={{ color: "#696cff" }}>Xem tất cả</a>}
          >
            <Table
              columns={productColumns}
              dataSource={topProducts}
              loading={loading}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={<span style={{ fontSize: 16, fontWeight: 600 }}>Hoạt động gần đây</span>}
            bordered={false}
            style={{ height: "100%" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {activities.map((activity) => (
                <div key={activity.key} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        activity.type === "order"
                          ? "#e6f7ff"
                          : activity.type === "user"
                            ? "#f6ffed"
                            : "#fff7e6",
                    }}
                  >
                    {activity.type === "order" && <ShoppingCartOutlined style={{ color: "#1890ff" }} />}
                    {activity.type === "user" && <UserOutlined style={{ color: "#52c41a" }} />}
                    {activity.type === "staff" && <TeamOutlined style={{ color: "#fa8c16" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, marginBottom: 4 }}>{activity.description}</div>
                    <div style={{ fontSize: 12, color: "#8c8c8c" }}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}