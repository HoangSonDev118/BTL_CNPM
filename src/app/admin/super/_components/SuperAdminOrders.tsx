// src/app/admin/super/_components/SuperAdminOrders.tsx
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
  Timeline,
  message,
  Row,
  Col,
  Statistic,
  Steps,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TruckOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

type OrderStatus = "pending" | "confirmed" | "shipping" | "completed" | "cancelled";

type Order = {
  key: string;
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
};

type OrderDetail = Order & {
  orderItems: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  statusHistory: Array<{
    status: string;
    time: string;
    note?: string;
  }>;
};

const statusConfig = {
  pending: { text: "Chờ xác nhận", color: "warning", icon: <ClockCircleOutlined /> },
  confirmed: { text: "Đã xác nhận", color: "processing", icon: <SyncOutlined spin /> },
  shipping: { text: "Đang giao", color: "blue", icon: <TruckOutlined /> },
  completed: { text: "Hoàn thành", color: "success", icon: <CheckCircleOutlined /> },
  cancelled: { text: "Đã hủy", color: "error", icon: <CloseCircleOutlined /> },
};

export default function SuperAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    setTimeout(() => {
      setOrders([
        {
          key: "1",
          id: "1",
          orderId: "ORD-2024-001",
          customerName: "Nguyễn Văn A",
          customerEmail: "nguyenvana@email.com",
          customerPhone: "0912345678",
          items: 3,
          totalAmount: 452000,
          status: "pending",
          paymentMethod: "COD",
          shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
          createdAt: "2024-01-15 10:30",
          updatedAt: "2024-01-15 10:30",
        },
        {
          key: "2",
          id: "2",
          orderId: "ORD-2024-002",
          customerName: "Trần Thị B",
          customerEmail: "tranthib@email.com",
          customerPhone: "0987654321",
          items: 2,
          totalAmount: 368000,
          status: "confirmed",
          paymentMethod: "Banking",
          shippingAddress: "456 Đường XYZ, Quận 2, TP.HCM",
          createdAt: "2024-01-15 09:15",
          updatedAt: "2024-01-15 09:45",
        },
        {
          key: "3",
          id: "3",
          orderId: "ORD-2024-003",
          customerName: "Lê Văn C",
          customerEmail: "levanc@email.com",
          customerPhone: "0901234567",
          items: 1,
          totalAmount: 189000,
          status: "shipping",
          paymentMethod: "COD",
          shippingAddress: "789 Đường DEF, Quận 3, TP.HCM",
          createdAt: "2024-01-14 16:20",
          updatedAt: "2024-01-15 08:00",
        },
        {
          key: "4",
          id: "4",
          orderId: "ORD-2024-004",
          customerName: "Phạm Thị D",
          customerEmail: "phamthid@email.com",
          customerPhone: "0923456789",
          items: 4,
          totalAmount: 645000,
          status: "completed",
          paymentMethod: "Banking",
          shippingAddress: "321 Đường GHI, Quận 4, TP.HCM",
          createdAt: "2024-01-13 14:30",
          updatedAt: "2024-01-14 16:45",
        },
        {
          key: "5",
          id: "5",
          orderId: "ORD-2024-005",
          customerName: "Hoàng Văn E",
          customerEmail: "hoangvane@email.com",
          customerPhone: "0934567890",
          items: 2,
          totalAmount: 280000,
          status: "cancelled",
          paymentMethod: "COD",
          shippingAddress: "654 Đường JKL, Quận 5, TP.HCM",
          createdAt: "2024-01-13 11:00",
          updatedAt: "2024-01-13 12:00",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleViewDetail = (order: Order) => {
    const detail: OrderDetail = {
      ...order,
      orderItems: [
        { productName: "Đắc Nhân Tâm", quantity: 2, price: 86000 },
        { productName: "Nhà Giả Kim", quantity: 1, price: 79000 },
        { productName: "Sapiens", quantity: 1, price: 189000 },
      ],
      statusHistory: [
        { status: "Đơn hàng đã được tạo", time: order.createdAt },
        { status: "Đã xác nhận đơn hàng", time: "2024-01-15 09:45" },
        { status: "Đang chuẩn bị hàng", time: "2024-01-15 10:00" },
      ],
    };
    setSelectedOrder(detail);
    setDetailModalOpen(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, updatedAt: new Date().toLocaleString() }
          : o
      )
    );
    message.success(`Đã cập nhật trạng thái đơn hàng thành "${statusConfig[newStatus].text}"`);
  };

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      order.customerPhone.includes(searchText);
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const shippingCount = orders.filter((o) => o.status === "shipping").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;
  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const columns: ColumnsType<Order> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
      width: 130,
      render: (orderId) => (
        <span style={{ fontWeight: 600, color: "#1890ff" }}>{orderId}</span>
      ),
    },
    {
      title: "Khách hàng",
      key: "customer",
      width: 200,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.customerName}</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>{record.customerPhone}</div>
        </div>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "items",
      key: "items",
      width: 100,
      render: (items) => <Tag color="cyan">{items} sản phẩm</Tag>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 130,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (amount) => (
        <span style={{ fontWeight: 600, color: "#52c41a" }}>
          {amount.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 110,
      render: (method) => (
        <Tag color={method === "COD" ? "orange" : "blue"}>{method}</Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      filters: [
        { text: "Chờ xác nhận", value: "pending" },
        { text: "Đã xác nhận", value: "confirmed" },
        { text: "Đang giao", value: "shipping" },
        { text: "Hoàn thành", value: "completed" },
        { text: "Đã hủy", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: OrderStatus) => (
        <Tag color={statusConfig[status].color} icon={statusConfig[status].icon}>
          {statusConfig[status].text}
        </Tag>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space size="small" direction="vertical">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
            style={{ padding: 0 }}
          >
            Xem chi tiết
          </Button>
          {record.status === "pending" && (
            <Button
              type="link"
              style={{ padding: 0, color: "#52c41a" }}
              onClick={() => handleUpdateStatus(record.id, "confirmed")}
            >
              Xác nhận
            </Button>
          )}
          {record.status === "confirmed" && (
            <Button
              type="link"
              style={{ padding: 0, color: "#1890ff" }}
              onClick={() => handleUpdateStatus(record.id, "shipping")}
            >
              Giao hàng
            </Button>
          )}
          {record.status === "shipping" && (
            <Button
              type="link"
              style={{ padding: 0, color: "#52c41a" }}
              onClick={() => handleUpdateStatus(record.id, "completed")}
            >
              Hoàn thành
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const getCurrentStep = (status: OrderStatus) => {
    const steps = ["pending", "confirmed", "shipping", "completed"];
    return steps.indexOf(status);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
          Quản lý đơn hàng
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0 }}>
          Theo dõi và xử lý đơn hàng của khách hàng
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Chờ xác nhận"
              value={pendingCount}
              prefix={<ClockCircleOutlined style={{ color: "#fa8c16" }} />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Đang giao"
              value={shippingCount}
              prefix={<TruckOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Hoàn thành"
              value={completedCount}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Doanh thu"
              value={totalRevenue}
              suffix="đ"
              prefix={<DollarOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a", fontSize: 20 }}
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
            placeholder="Tìm mã đơn, tên, số điện thoại..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 180 }}
            options={[
              { label: "Tất cả trạng thái", value: "all" },
              { label: "Chờ xác nhận", value: "pending" },
              { label: "Đã xác nhận", value: "confirmed" },
              { label: "Đang giao", value: "shipping" },
              { label: "Hoàn thành", value: "completed" },
              { label: "Đã hủy", value: "cancelled" },
            ]}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredOrders}
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} đơn hàng`,
          }}
        />
      </Card>

      {/* Detail Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ShoppingCartOutlined style={{ fontSize: 20, color: "#1890ff" }} />
            <span style={{ fontSize: 18, fontWeight: 600 }}>Chi tiết đơn hàng</span>
          </div>
        }
        open={detailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        footer={null}
        width={900}
      >
        {selectedOrder && (
          <div style={{ marginTop: 24 }}>
            <div style={{ marginBottom: 24 }}>
              <Steps
                current={getCurrentStep(selectedOrder.status)}
                status={selectedOrder.status === "cancelled" ? "error" : "process"}
                items={[
                  { title: "Chờ xác nhận", icon: <ClockCircleOutlined /> },
                  { title: "Đã xác nhận", icon: <CheckCircleOutlined /> },
                  { title: "Đang giao", icon: <TruckOutlined /> },
                  { title: "Hoàn thành", icon: <CheckCircleOutlined /> },
                ]}
              />
            </div>

            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Card bordered={false} style={{ background: "#f0f5ff" }}>
                  <h4 style={{ marginBottom: 12 }}>Thông tin khách hàng</h4>
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Họ tên">
                      <strong>{selectedOrder.customerName}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      {selectedOrder.customerEmail}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                      {selectedOrder.customerPhone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">
                      {selectedOrder.shippingAddress}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} style={{ background: "#f6ffed" }}>
                  <h4 style={{ marginBottom: 12 }}>Thông tin đơn hàng</h4>
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Mã đơn hàng">
                      <strong style={{ color: "#1890ff" }}>{selectedOrder.orderId}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Thanh toán">
                      <Tag color={selectedOrder.paymentMethod === "COD" ? "orange" : "blue"}>
                        {selectedOrder.paymentMethod}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                      <Tag
                        color={statusConfig[selectedOrder.status].color}
                        icon={statusConfig[selectedOrder.status].icon}
                      >
                        {statusConfig[selectedOrder.status].text}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian tạo">
                      {selectedOrder.createdAt}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            <Card bordered={false} style={{ marginBottom: 24 }}>
              <h4 style={{ marginBottom: 16 }}>Sản phẩm đã đặt</h4>
              <Table
                dataSource={selectedOrder.orderItems.map((item, index) => ({
                  key: index,
                  ...item,
                }))}
                pagination={false}
                size="small"
                columns={[
                  {
                    title: "Tên sản phẩm",
                    dataIndex: "productName",
                    key: "productName",
                  },
                  {
                    title: "Số lượng",
                    dataIndex: "quantity",
                    key: "quantity",
                    width: 100,
                    align: "center",
                  },
                  {
                    title: "Đơn giá",
                    dataIndex: "price",
                    key: "price",
                    width: 120,
                    align: "right",
                    render: (price) => `${price.toLocaleString("vi-VN")}đ`,
                  },
                  {
                    title: "Thành tiền",
                    key: "total",
                    width: 140,
                    align: "right",
                    render: (_, record) => (
                      <span style={{ fontWeight: 600, color: "#52c41a" }}>
                        {(record.price * record.quantity).toLocaleString("vi-VN")}đ
                      </span>
                    ),
                  },
                ]}
                summary={() => (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={3} align="right">
                        <strong>Tổng cộng:</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align="right">
                        <strong style={{ fontSize: 16, color: "#52c41a" }}>
                          {selectedOrder.totalAmount.toLocaleString("vi-VN")}đ
                        </strong>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                )}
              />
            </Card>

            <Card bordered={false}>
              <h4 style={{ marginBottom: 16 }}>Lịch sử trạng thái</h4>
              <Timeline
                items={selectedOrder.statusHistory.map((history) => ({
                  children: (
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: 4 }}>
                        {history.status}
                      </div>
                      <div style={{ fontSize: 12, color: "#8c8c8c" }}>
                        <ClockCircleOutlined /> {history.time}
                      </div>
                      {history.note && (
                        <div style={{ fontSize: 12, color: "#8c8c8c", marginTop: 4 }}>
                          {history.note}
                        </div>
                      )}
                    </div>
                  ),
                }))}
              />
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
}