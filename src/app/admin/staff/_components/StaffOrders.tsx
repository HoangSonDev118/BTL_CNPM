// Quản lý đơn hàng
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
  Steps,
  Timeline,
  message,
  Badge,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { TextArea } = Input;

type OrderStatus = "pending" | "confirmed" | "shipping" | "completed" | "cancelled";

type Order = {
  key: string;
  id: string;
  orderId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: Array<{
    title: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  note?: string;
};

const STATUS_CONFIG = {
  pending: { color: "orange", label: "Chờ xác nhận", icon: <ClockCircleOutlined /> },
  confirmed: { color: "blue", label: "Đã xác nhận", icon: <CheckCircleOutlined /> },
  shipping: { color: "cyan", label: "Đang giao", icon: <CheckCircleOutlined /> },
  completed: { color: "green", label: "Hoàn thành", icon: <CheckCircleOutlined /> },
  cancelled: { color: "red", label: "Đã hủy", icon: <CloseCircleOutlined /> },
};

const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  pending: "confirmed",
  confirmed: "shipping",
  shipping: "completed",
  completed: null,
  cancelled: null,
};

export default function StaffOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [cancelNote, setCancelNote] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    // Mock data
    setTimeout(() => {
      setOrders([
        {
          key: "1",
          id: "1",
          orderId: "ORD-2024-001",
          customer: {
            name: "Nguyễn Văn A",
            phone: "0912345678",
            address: "123 Đường ABC, Quận 1, TP.HCM",
          },
          items: [
            { title: "Đắc Nhân Tâm", quantity: 2, price: 86000 },
            { title: "Nhà Giả Kim", quantity: 1, price: 79000 },
          ],
          totalAmount: 251000,
          status: "pending",
          createdAt: "2024-01-15 10:30:25",
        },
        {
          key: "2",
          id: "2",
          orderId: "ORD-2024-002",
          customer: {
            name: "Trần Thị B",
            phone: "0987654321",
            address: "456 Đường XYZ, Quận 2, TP.HCM",
          },
          items: [{ title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", quantity: 3, price: 68000 }],
          totalAmount: 204000,
          status: "confirmed",
          createdAt: "2024-01-15 09:15:10",
        },
        {
          key: "3",
          id: "3",
          orderId: "ORD-2024-003",
          customer: {
            name: "Lê Văn C",
            phone: "0901234567",
            address: "789 Đường DEF, Quận 3, TP.HCM",
          },
          items: [
            { title: "Đắc Nhân Tâm", quantity: 1, price: 86000 },
            { title: "Nhà Giả Kim", quantity: 2, price: 79000 },
          ],
          totalAmount: 244000,
          status: "shipping",
          createdAt: "2024-01-14 16:45:30",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setCancelNote("");
    setUpdateModalOpen(true);
  };

  const confirmUpdateStatus = (newStatus: OrderStatus) => {
    if (!selectedOrder) return;

    setOrders(
      orders.map((o) =>
        o.id === selectedOrder.id ? { ...o, status: newStatus, note: cancelNote } : o
      )
    );

    message.success(`Đã cập nhật trạng thái đơn hàng thành "${STATUS_CONFIG[newStatus].label}"`);
    setUpdateModalOpen(false);
    setCancelNote("");
  };

  const getStatusStep = (status: OrderStatus): number => {
    const steps = ["pending", "confirmed", "shipping", "completed"];
    return steps.indexOf(status);
  };

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: ColumnsType<Order> = [
    {
      title: "Mã đơn",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => (
        <a style={{ color: "#696cff", fontWeight: 500 }}>{text}</a>
      ),
    },
    {
      title: "Khách hàng",
      key: "customer",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.customer.name}</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>
            {record.customer.phone}
          </div>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => (
        <span style={{ fontWeight: 600, color: "#696cff" }}>
          {amount.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: OrderStatus) => {
        const config = STATUS_CONFIG[status];
        return (
          <Tag icon={config.icon} color={config.color}>
            {config.label}
          </Tag>
        );
      },
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (time) => <span style={{ fontSize: 13 }}>{time}</span>,
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
          {NEXT_STATUS[record.status] && (
            <Button
              type="primary"
              size="small"
              onClick={() => handleUpdateStatus(record)}
              style={{ background: "#696cff" }}
            >
              Cập nhật
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
          Quản lý đơn hàng
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0 }}>
          Xử lý và cập nhật trạng thái đơn hàng
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        {Object.entries(STATUS_CONFIG).map(([key, config]) => {
          const count = orders.filter((o) => o.status === key).length;
          return (
            <Card key={key} bordered={false} size="small">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Badge
                  count={count}
                  showZero
                  style={{ backgroundColor: config.color }}
                />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{config.label}</span>
              </div>
            </Card>
          );
        })}
      </div>

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
            placeholder="Tìm mã đơn, tên khách hàng..."
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
              ...Object.entries(STATUS_CONFIG).map(([key, config]) => ({
                label: config.label,
                value: key,
              })),
            ]}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredOrders}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} đơn hàng`,
          }}
        />
      </Card>

      {/* Detail Modal */}
      <Modal
        title={<span style={{ fontSize: 18, fontWeight: 600 }}>Chi tiết đơn hàng</span>}
        open={detailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        footer={null}
        width={700}
      >
        {selectedOrder && (
          <div style={{ marginTop: 24 }}>
            <Steps
              current={getStatusStep(selectedOrder.status)}
              items={[
                { title: "Chờ xác nhận", icon: <ClockCircleOutlined /> },
                { title: "Đã xác nhận", icon: <CheckCircleOutlined /> },
                { title: "Đang giao", icon: <CheckCircleOutlined /> },
                { title: "Hoàn thành", icon: <CheckCircleOutlined /> },
              ]}
              style={{ marginBottom: 32 }}
            />

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Mã đơn hàng">
                <strong>{selectedOrder.orderId}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Khách hàng">
                {selectedOrder.customer.name}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {selectedOrder.customer.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ giao hàng">
                {selectedOrder.customer.address}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag
                  icon={STATUS_CONFIG[selectedOrder.status].icon}
                  color={STATUS_CONFIG[selectedOrder.status].color}
                >
                  {STATUS_CONFIG[selectedOrder.status].label}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian đặt">
                {selectedOrder.createdAt}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <h4 style={{ marginBottom: 12 }}>Sản phẩm đã đặt:</h4>
              <Table
                dataSource={selectedOrder.items.map((item, index) => ({
                  key: index,
                  ...item,
                }))}
                columns={[
                  { title: "Sản phẩm", dataIndex: "title", key: "title" },
                  {
                    title: "Số lượng",
                    dataIndex: "quantity",
                    key: "quantity",
                    width: 100,
                  },
                  {
                    title: "Đơn giá",
                    dataIndex: "price",
                    key: "price",
                    width: 120,
                    render: (price) => `${price.toLocaleString("vi-VN")}đ`,
                  },
                  {
                    title: "Thành tiền",
                    key: "total",
                    width: 120,
                    render: (_, record) =>
                      `${(record.price * record.quantity).toLocaleString("vi-VN")}đ`,
                  },
                ]}
                pagination={false}
                size="small"
              />
              <div
                style={{
                  marginTop: 16,
                  textAlign: "right",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Tổng cộng:{" "}
                <span style={{ color: "#696cff" }}>
                  {selectedOrder.totalAmount.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Update Status Modal */}
      <Modal
        title="Cập nhật trạng thái đơn hàng"
        open={updateModalOpen}
        onCancel={() => setUpdateModalOpen(false)}
        footer={null}
        width={500}
      >
        {selectedOrder && (
          <div style={{ marginTop: 24 }}>
            <p style={{ marginBottom: 16 }}>
              Đơn hàng: <strong>{selectedOrder.orderId}</strong>
            </p>
            <p style={{ marginBottom: 24 }}>
              Trạng thái hiện tại:{" "}
              <Tag color={STATUS_CONFIG[selectedOrder.status].color}>
                {STATUS_CONFIG[selectedOrder.status].label}
              </Tag>
            </p>

            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              {NEXT_STATUS[selectedOrder.status] && (
                <Button
                  type="primary"
                  block
                  size="large"
                  onClick={() =>
                    confirmUpdateStatus(NEXT_STATUS[selectedOrder.status]!)
                  }
                  style={{ background: "#696cff" }}
                >
                  Chuyển sang: {STATUS_CONFIG[NEXT_STATUS[selectedOrder.status]!].label}
                </Button>
              )}

              {selectedOrder.status !== "cancelled" && selectedOrder.status !== "completed" && (
                <div>
                  <TextArea
                    placeholder="Lý do hủy đơn (tùy chọn)"
                    rows={3}
                    value={cancelNote}
                    onChange={(e) => setCancelNote(e.target.value)}
                    style={{ marginBottom: 12 }}
                  />
                  <Button
                    danger
                    block
                    size="large"
                    onClick={() => confirmUpdateStatus("cancelled")}
                  >
                    Hủy đơn hàng
                  </Button>
                </div>
              )}
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
}