// src/app/admin/super/_components/SuperAdminCustomers.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Modal,
  Descriptions,
  Statistic,
  Row,
  Col,
  Switch,
  message,
  Popconfirm,
  Timeline,
  Badge,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

type Customer = {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  lastOrderAt?: string;
};

type CustomerDetail = Customer & {
  address?: string;
  orderHistory: Array<{
    orderId: string;
    amount: number;
    status: string;
    date: string;
  }>;
};

export default function SuperAdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetail | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    setLoading(true);
    // Mock data
    setTimeout(() => {
      setCustomers([
        {
          key: "1",
          id: "1",
          name: "Nguyễn Văn A",
          email: "nguyenvana@email.com",
          phone: "0912345678",
          isActive: true,
          totalOrders: 15,
          totalSpent: 2450000,
          createdAt: "2024-01-10",
          lastOrderAt: "2024-01-15",
        },
        {
          key: "2",
          id: "2",
          name: "Trần Thị B",
          email: "tranthib@email.com",
          phone: "0987654321",
          isActive: true,
          totalOrders: 8,
          totalSpent: 1280000,
          createdAt: "2024-01-12",
          lastOrderAt: "2024-01-14",
        },
        {
          key: "3",
          id: "3",
          name: "Lê Văn C",
          email: "levanc@email.com",
          phone: "0901234567",
          isActive: false,
          totalOrders: 3,
          totalSpent: 450000,
          createdAt: "2024-01-05",
          lastOrderAt: "2024-01-08",
        },
        {
          key: "4",
          id: "4",
          name: "Phạm Thị D",
          email: "phamthid@email.com",
          phone: "0923456789",
          isActive: true,
          totalOrders: 22,
          totalSpent: 3680000,
          createdAt: "2023-12-20",
          lastOrderAt: "2024-01-15",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleViewDetail = (customer: Customer) => {
    // Mock detailed data
    const detail: CustomerDetail = {
      ...customer,
      address: "123 Đường ABC, Quận 1, TP.HCM",
      orderHistory: [
        { orderId: "ORD-2024-001", amount: 450000, status: "completed", date: "2024-01-15" },
        { orderId: "ORD-2024-002", amount: 320000, status: "completed", date: "2024-01-10" },
        { orderId: "ORD-2024-003", amount: 680000, status: "shipping", date: "2024-01-14" },
      ],
    };
    setSelectedCustomer(detail);
    setDetailModalOpen(true);
  };

  const handleToggleStatus = (record: Customer) => {
    const newStatus = !record.isActive;
    setCustomers(
      customers.map((c) =>
        c.id === record.id ? { ...c, isActive: newStatus } : c
      )
    );
    message.success(
      newStatus ? "Đã mở khóa tài khoản" : "Đã khóa tài khoản khách hàng"
    );
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchSearch =
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.phone.includes(searchText);
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && customer.isActive) ||
      (statusFilter === "locked" && !customer.isActive);
    return matchSearch && matchStatus;
  });

  const activeCount = customers.filter((c) => c.isActive).length;
  const lockedCount = customers.filter((c) => !c.isActive).length;
  const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  const columns: ColumnsType<Customer> = [
    {
      title: "Khách hàng",
      key: "customer",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.name}</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>{record.email}</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>{record.phone}</div>
        </div>
      ),
    },
    {
      title: "Số đơn hàng",
      dataIndex: "totalOrders",
      key: "totalOrders",
      width: 120,
      sorter: (a, b) => a.totalOrders - b.totalOrders,
      render: (total) => (
        <Tag color="blue" icon={<ShoppingCartOutlined />}>
          {total} đơn
        </Tag>
      ),
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "totalSpent",
      key: "totalSpent",
      width: 150,
      sorter: (a, b) => a.totalSpent - b.totalSpent,
      render: (amount) => (
        <span style={{ fontWeight: 600, color: "#52c41a" }}>
          {amount.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Đơn gần nhất",
      dataIndex: "lastOrderAt",
      key: "lastOrderAt",
      width: 120,
      render: (date) => date || <span style={{ color: "#8c8c8c" }}>Chưa có</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      width: 120,
      filters: [
        { text: "Hoạt động", value: true },
        { text: "Bị khóa", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (isActive) => (
        <Tag color={isActive ? "success" : "error"} icon={isActive ? <UnlockOutlined /> : <LockOutlined />}>
          {isActive ? "Hoạt động" : "Bị khóa"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
            style={{ padding: 0 }}
          >
            Chi tiết
          </Button>
          <Popconfirm
            title={record.isActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}
            description={
              record.isActive
                ? "Khách hàng sẽ không thể đăng nhập và đặt hàng"
                : "Khách hàng sẽ có thể đăng nhập trở lại"
            }
            onConfirm={() => handleToggleStatus(record)}
            okText={record.isActive ? "Khóa" : "Mở khóa"}
            cancelText="Hủy"
          >
            <Button
              type="link"
              danger={record.isActive}
              icon={record.isActive ? <LockOutlined /> : <UnlockOutlined />}
              style={{ padding: 0 }}
            >
              {record.isActive ? "Khóa" : "Mở khóa"}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
          Quản lý khách hàng
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0 }}>
          Quản lý thông tin và theo dõi hoạt động của khách hàng
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng khách hàng"
              value={customers.length}
              prefix={<UserOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Đang hoạt động"
              value={activeCount}
              prefix={<UnlockOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Bị khóa"
              value={lockedCount}
              prefix={<LockOutlined style={{ color: "#ff4d4f" }} />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      <Card bordered={false}>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <Input
            placeholder="Tìm tên, email, số điện thoại..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150 }}
            options={[
              { label: "Tất cả", value: "all" },
              { label: "Hoạt động", value: "active" },
              { label: "Bị khóa", value: "locked" },
            ]}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredCustomers}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} khách hàng`,
          }}
        />
      </Card>

      {/* Detail Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <UserOutlined style={{ fontSize: 20, color: "#1890ff" }} />
            <span style={{ fontSize: 18, fontWeight: 600 }}>Thông tin khách hàng</span>
          </div>
        }
        open={detailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedCustomer && (
          <div style={{ marginTop: 24 }}>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card bordered={false} style={{ background: "#f0f5ff" }}>
                  <Statistic
                    title="Tổng đơn hàng"
                    value={selectedCustomer.totalOrders}
                    prefix={<ShoppingCartOutlined />}
                    valueStyle={{ color: "#1890ff", fontSize: 24 }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{ background: "#f6ffed" }}>
                  <Statistic
                    title="Tổng chi tiêu"
                    value={selectedCustomer.totalSpent}
                    suffix="đ"
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: "#52c41a", fontSize: 20 }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{ background: selectedCustomer.isActive ? "#f6ffed" : "#fff2e8" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 14, color: "#8c8c8c", marginBottom: 8 }}>
                      Trạng thái
                    </div>
                    <Tag
                      color={selectedCustomer.isActive ? "success" : "error"}
                      icon={selectedCustomer.isActive ? <UnlockOutlined /> : <LockOutlined />}
                      style={{ fontSize: 14, padding: "4px 12px" }}
                    >
                      {selectedCustomer.isActive ? "Hoạt động" : "Bị khóa"}
                    </Tag>
                  </div>
                </Card>
              </Col>
            </Row>

            <Descriptions bordered column={2} size="small" style={{ marginBottom: 24 }}>
              <Descriptions.Item label="Họ tên" span={2}>
                <strong>{selectedCustomer.name}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={2}>
                {selectedCustomer.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {selectedCustomer.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đăng ký">
                {selectedCustomer.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={2}>
                {selectedCustomer.address || "Chưa cập nhật"}
              </Descriptions.Item>
              <Descriptions.Item label="Đơn hàng gần nhất">
                {selectedCustomer.lastOrderAt || "Chưa có"}
              </Descriptions.Item>
            </Descriptions>

            <div>
              <h4 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
                Lịch sử đơn hàng
              </h4>
              <Timeline
                items={selectedCustomer.orderHistory.map((order) => ({
                  children: (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontWeight: 500 }}>{order.orderId}</span>
                        <span style={{ color: "#52c41a", fontWeight: 600 }}>
                          {order.amount.toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: "#8c8c8c" }}>
                        <ClockCircleOutlined /> {order.date}
                        <Tag color="success" style={{ marginLeft: 8 }}>
                          {order.status}
                        </Tag>
                      </div>
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}