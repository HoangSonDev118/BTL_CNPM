// Trang dashboadrd tổng quan
"use client";

import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Table, Tag, Badge } from "antd";
import {
  ShoppingCartOutlined,
  InboxOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

type DashboardStats = {
  totalOrders: number;
  pendingOrders: number;
  lowStockItems: number;
  todayRevenue: number;
};

type RecentOrder = {
  key: string;
  orderId: string;
  customer: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
};

const STATUS_COLORS = {
  pending: "orange",
  processing: "blue",
  completed: "green",
  cancelled: "red",
};

const STATUS_LABELS = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export default function StaffDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    lowStockItems: 0,
    todayRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setStats({
        totalOrders: 148,
        pendingOrders: 23,
        lowStockItems: 12,
        todayRevenue: 15420000,
      });

      setRecentOrders([
        {
          key: "1",
          orderId: "ORD-2024-001",
          customer: "Nguyễn Văn A",
          amount: 450000,
          status: "pending",
          createdAt: "2024-01-15 10:30",
        },
        {
          key: "2",
          orderId: "ORD-2024-002",
          customer: "Trần Thị B",
          amount: 320000,
          status: "processing",
          createdAt: "2024-01-15 09:15",
        },
        {
          key: "3",
          orderId: "ORD-2024-003",
          customer: "Lê Văn C",
          amount: 680000,
          status: "completed",
          createdAt: "2024-01-14 16:45",
        },
        {
          key: "4",
          orderId: "ORD-2024-004",
          customer: "Phạm Thị D",
          amount: 250000,
          status: "pending",
          createdAt: "2024-01-14 14:20",
        },
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const orderColumns: ColumnsType<RecentOrder> = [
    {
      title: "Mã đơn",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <a style={{ color: "#696cff", fontWeight: 500 }}>{text}</a>,
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span style={{ fontWeight: 500 }}>
          {amount.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: RecentOrder["status"]) => (
        <Tag color={STATUS_COLORS[status]}>{STATUS_LABELS[status]}</Tag>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div style={{ padding: "0 0 24px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
          Dashboard Nhân Viên
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0 }}>
          Tổng quan hoạt động và các chỉ số quan trọng
        </p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)" }}>Tổng đơn hàng</span>}
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#fff", fontSize: 28, fontWeight: 600 }}
            />
            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.9 }}>
              <RiseOutlined /> +12% so với tuần trước
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "#fff",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)" }}>Chờ xử lý</span>}
              value={stats.pendingOrders}
              prefix={<InboxOutlined />}
              valueStyle={{ color: "#fff", fontSize: 28, fontWeight: 600 }}
            />
            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.9 }}>
              <Badge status="processing" /> Cần xử lý ngay
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "#fff",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)" }}>Sắp hết hàng</span>}
              value={stats.lowStockItems}
              valueStyle={{ color: "#fff", fontSize: 28, fontWeight: 600 }}
            />
            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.9 }}>
              <FallOutlined /> Cần nhập thêm hàng
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
              color: "#fff",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)" }}>Doanh thu hôm nay</span>}
              value={stats.todayRevenue}
              suffix="đ"
              valueStyle={{ color: "#fff", fontSize: 24, fontWeight: 600 }}
            />
            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.9 }}>
              <RiseOutlined /> +8% so với hôm qua
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card
            title={
              <span style={{ fontSize: 16, fontWeight: 600 }}>
                Đơn hàng gần đây
              </span>
            }
            bordered={false}
            extra={<a style={{ color: "#696cff" }}>Xem tất cả</a>}
          >
            <Table
              columns={orderColumns}
              dataSource={recentOrders}
              loading={loading}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}