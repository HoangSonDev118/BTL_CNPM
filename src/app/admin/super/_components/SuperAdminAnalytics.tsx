// src/app/admin/super/_components/SuperAdminAnalytics.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Row,
  Col,
  Statistic,
  Select,
  DatePicker,
  Space,
  Tag,
  Progress,
} from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  RiseOutlined,
  FallOutlined,
  TrophyOutlined,
  TeamOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

type RevenueData = {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  avgOrderValue: number;
  newCustomers: number;
  returningCustomers: number;
};

type TopProduct = {
  key: string;
  productName: string;
  category: string;
  sold: number;
  revenue: number;
  growth: number;
};

type TopCustomer = {
  key: string;
  name: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
};

type CategoryStats = {
  key: string;
  category: string;
  products: number;
  sold: number;
  revenue: number;
  percentage: number;
};

type StaffPerformance = {
  key: string;
  name: string;
  ordersHandled: number;
  revenue: number;
  rating: number;
};

export default function SuperAdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<string>("month");
  const [revenueData, setRevenueData] = useState<RevenueData>({
    totalRevenue: 0,
    revenueGrowth: 0,
    totalOrders: 0,
    ordersGrowth: 0,
    avgOrderValue: 0,
    newCustomers: 0,
    returningCustomers: 0,
  });
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [staffPerformance, setStaffPerformance] = useState<StaffPerformance[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = () => {
    setLoading(true);
    setTimeout(() => {
      setRevenueData({
        totalRevenue: 125430000,
        revenueGrowth: 15.8,
        totalOrders: 1248,
        ordersGrowth: 12.3,
        avgOrderValue: 100500,
        newCustomers: 342,
        returningCustomers: 514,
      });

      setTopProducts([
        {
          key: "1",
          productName: "Đắc Nhân Tâm",
          category: "Kỹ năng sống",
          sold: 234,
          revenue: 20124000,
          growth: 18.5,
        },
        {
          key: "2",
          productName: "Nhà Giả Kim",
          category: "Văn học",
          sold: 198,
          revenue: 15642000,
          growth: 12.3,
        },
        {
          key: "3",
          productName: "Sapiens",
          category: "Lịch sử",
          sold: 156,
          revenue: 29484000,
          growth: 25.7,
        },
        {
          key: "4",
          productName: "7 Thói Quen Hiệu Quả",
          category: "Kỹ năng sống",
          sold: 142,
          revenue: 13490000,
          growth: 8.9,
        },
        {
          key: "5",
          productName: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
          category: "Kỹ năng sống",
          sold: 128,
          revenue: 8704000,
          growth: -5.2,
        },
      ]);

      setTopCustomers([
        {
          key: "1",
          name: "Nguyễn Văn A",
          orders: 28,
          totalSpent: 4560000,
          lastOrder: "2024-01-15",
        },
        {
          key: "2",
          name: "Trần Thị B",
          orders: 22,
          totalSpent: 3890000,
          lastOrder: "2024-01-14",
        },
        {
          key: "3",
          name: "Lê Văn C",
          orders: 19,
          totalSpent: 3120000,
          lastOrder: "2024-01-13",
        },
        {
          key: "4",
          name: "Phạm Thị D",
          orders: 17,
          totalSpent: 2850000,
          lastOrder: "2024-01-15",
        },
        {
          key: "5",
          name: "Hoàng Văn E",
          orders: 15,
          totalSpent: 2340000,
          lastOrder: "2024-01-12",
        },
      ]);

      setCategoryStats([
        {
          key: "1",
          category: "Kỹ năng sống",
          products: 45,
          sold: 678,
          revenue: 56780000,
          percentage: 35,
        },
        {
          key: "2",
          category: "Văn học",
          products: 38,
          sold: 542,
          revenue: 42860000,
          percentage: 28,
        },
        {
          key: "3",
          category: "Lịch sử",
          products: 28,
          sold: 398,
          revenue: 38920000,
          percentage: 20,
        },
        {
          key: "4",
          category: "Khoa học",
          products: 22,
          sold: 287,
          revenue: 18450000,
          percentage: 12,
        },
        {
          key: "5",
          category: "Thiếu nhi",
          products: 18,
          sold: 189,
          revenue: 8420000,
          percentage: 5,
        },
      ]);

      setStaffPerformance([
        {
          key: "1",
          name: "Nguyễn Thị X",
          ordersHandled: 156,
          revenue: 28340000,
          rating: 4.8,
        },
        {
          key: "2",
          name: "Trần Văn Y",
          ordersHandled: 142,
          revenue: 24560000,
          rating: 4.6,
        },
        {
          key: "3",
          name: "Lê Thị Z",
          ordersHandled: 128,
          revenue: 21890000,
          rating: 4.7,
        },
        {
          key: "4",
          name: "Phạm Văn K",
          ordersHandled: 118,
          revenue: 19450000,
          rating: 4.5,
        },
      ]);

      setLoading(false);
    }, 500);
  };

  const productColumns: ColumnsType<TopProduct> = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      render: (name, record, index) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background:
                index === 0
                  ? "#ffd700"
                  : index === 1
                    ? "#c0c0c0"
                    : index === 2
                      ? "#cd7f32"
                      : "#e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {index + 1}
          </div>
          <div>
            <div style={{ fontWeight: 500, marginBottom: 2 }}>{name}</div>
            <Tag color="blue" style={{ fontSize: 11 }}>
              {record.category}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      width: 100,
      align: "center",
      render: (sold) => <span style={{ fontWeight: 600 }}>{sold}</span>,
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      width: 140,
      align: "right",
      render: (revenue) => (
        <span style={{ fontWeight: 600, color: "#52c41a" }}>
          {revenue.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Tăng trưởng",
      dataIndex: "growth",
      key: "growth",
      width: 120,
      align: "center",
      render: (growth) => (
        <Tag
          color={growth > 0 ? "success" : "error"}
          icon={growth > 0 ? <RiseOutlined /> : <FallOutlined />}
        >
          {growth > 0 ? "+" : ""}
          {growth}%
        </Tag>
      ),
    },
  ];

  const customerColumns: ColumnsType<TopCustomer> = [
    {
      title: "Khách hàng",
      dataIndex: "name",
      key: "name",
      render: (name) => <span style={{ fontWeight: 500 }}>{name}</span>,
    },
    {
      title: "Đơn hàng",
      dataIndex: "orders",
      key: "orders",
      width: 100,
      align: "center",
      render: (orders) => (
        <Tag color="blue" icon={<ShoppingCartOutlined />}>
          {orders}
        </Tag>
      ),
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "totalSpent",
      key: "totalSpent",
      width: 140,
      align: "right",
      render: (amount) => (
        <span style={{ fontWeight: 600, color: "#52c41a" }}>
          {amount.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Đơn gần nhất",
      dataIndex: "lastOrder",
      key: "lastOrder",
      width: 120,
    },
  ];

  const categoryColumns: ColumnsType<CategoryStats> = [
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => <span style={{ fontWeight: 500 }}>{category}</span>,
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      width: 100,
      align: "center",
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      width: 100,
      align: "center",
      render: (sold) => <span style={{ fontWeight: 600 }}>{sold}</span>,
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      width: 140,
      align: "right",
      render: (revenue) => (
        <span style={{ fontWeight: 600, color: "#52c41a" }}>
          {revenue.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Tỷ trọng",
      dataIndex: "percentage",
      key: "percentage",
      width: 180,
      render: (percentage) => (
        <div>
          <Progress percent={percentage} size="small" />
        </div>
      ),
    },
  ];

  const staffColumns: ColumnsType<StaffPerformance> = [
    {
      title: "Nhân viên",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <TeamOutlined style={{ fontSize: 18, color: "#1890ff" }} />
          <span style={{ fontWeight: 500 }}>{name}</span>
        </div>
      ),
    },
    {
      title: "Đơn xử lý",
      dataIndex: "ordersHandled",
      key: "ordersHandled",
      width: 120,
      align: "center",
      render: (orders) => (
        <Tag color="cyan" icon={<ShoppingCartOutlined />}>
          {orders}
        </Tag>
      ),
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      width: 140,
      align: "right",
      render: (revenue) => (
        <span style={{ fontWeight: 600, color: "#52c41a" }}>
          {revenue.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      width: 120,
      align: "center",
      render: (rating) => (
        <Tag color="gold">
          ⭐ {rating.toFixed(1)}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
            Thống kê & Báo cáo
          </h1>
          <p style={{ color: "#8c8c8c", margin: 0 }}>
            Phân tích dữ liệu và hiệu suất kinh doanh
          </p>
        </div>
        <Space>
          <Select
            value={timeRange}
            onChange={setTimeRange}
            style={{ width: 150 }}
            options={[
              { label: "7 ngày qua", value: "week" },
              { label: "Tháng này", value: "month" },
              { label: "Quý này", value: "quarter" },
              { label: "Năm nay", value: "year" },
            ]}
          />
          <RangePicker
            defaultValue={[dayjs().subtract(7, "day"), dayjs()]}
            format="DD/MM/YYYY"
          />
        </Space>
      </div>

      {/* Revenue Overview */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              height: "100%",
            }}
          >
            <Statistic
              title={
                <span style={{ color: "rgba(255,255,255,0.95)", fontSize: 14 }}>
                  Tổng doanh thu
                </span>
              }
              value={revenueData.totalRevenue}
              suffix="đ"
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#fff", fontSize: 24, fontWeight: 700 }}
            />
            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                opacity: 0.95,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <RiseOutlined />
              <span>+{revenueData.revenueGrowth}% so với kỳ trước</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "#fff",
              height: "100%",
            }}
          >
            <Statistic
              title={
                <span style={{ color: "rgba(255,255,255,0.95)", fontSize: 14 }}>
                  Tổng đơn hàng
                </span>
              }
              value={revenueData.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#fff", fontSize: 24, fontWeight: 700 }}
            />
            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                opacity: 0.95,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <RiseOutlined />
              <span>+{revenueData.ordersGrowth}% so với kỳ trước</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "#fff",
              height: "100%",
            }}
          >
            <Statistic
              title={
                <span style={{ color: "rgba(255,255,255,0.95)", fontSize: 14 }}>
                  Giá trị đơn TB
                </span>
              }
              value={revenueData.avgOrderValue}
              suffix="đ"
              prefix={<LineChartOutlined />}
              valueStyle={{ color: "#fff", fontSize: 24, fontWeight: 700 }}
            />
            <div style={{ marginTop: 12, fontSize: 13, opacity: 0.95 }}>
              Trung bình mỗi đơn hàng
            </div>
          </Card>
        </Col>
      </Row>

      {/* Customer Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <Card bordered={false}>
            <Statistic
              title="Khách hàng mới"
              value={revenueData.newCustomers}
              prefix={<UserOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card bordered={false}>
            <Statistic
              title="Khách hàng quay lại"
              value={revenueData.returningCustomers}
              prefix={<UserOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Top Products */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TrophyOutlined style={{ color: "#ffd700", fontSize: 18 }} />
                <span style={{ fontSize: 16, fontWeight: 600 }}>
                  Top sản phẩm bán chạy
                </span>
              </div>
            }
            bordered={false}
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

        {/* Top Customers */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <UserOutlined style={{ color: "#1890ff", fontSize: 18 }} />
                <span style={{ fontSize: 16, fontWeight: 600 }}>
                  Khách hàng tiềm năng
                </span>
              </div>
            }
            bordered={false}
          >
            <Table
              columns={customerColumns}
              dataSource={topCustomers}
              loading={loading}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        {/* Category Performance */}
        <Col xs={24} lg={14}>
          <Card
            title={
              <span style={{ fontSize: 16, fontWeight: 600 }}>
                Hiệu suất theo danh mục
              </span>
            }
            bordered={false}
          >
            <Table
              columns={categoryColumns}
              dataSource={categoryStats}
              loading={loading}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        {/* Staff Performance */}
        <Col xs={24} lg={10}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TeamOutlined style={{ color: "#fa8c16", fontSize: 18 }} />
                <span style={{ fontSize: 16, fontWeight: 600 }}>
                  Hiệu suất nhân viên
                </span>
              </div>
            }
            bordered={false}
          >
            <Table
              columns={staffColumns}
              dataSource={staffPerformance}
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