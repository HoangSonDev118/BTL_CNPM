// src/app/admin/super/_components/SuperAdminInventory.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  Input,
  Select,
  Row,
  Col,
  Statistic,
  Progress,
  Alert,
  Space,
  Button,
  Modal,
  Form,
  InputNumber,
  message,
} from "antd";
import {
  SearchOutlined,
  InboxOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  ShoppingOutlined,
  PlusOutlined,
  MinusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

type InventoryItem = {
  key: string;
  id: string;
  productName: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  price: number;
  totalValue: number;
  status: "good" | "low" | "critical" | "overstock";
  lastRestocked?: string;
  soldThisMonth: number;
};

type StockAdjustment = {
  type: "add" | "remove";
  productId: string;
  productName: string;
  quantity: number;
  reason: string;
};

const statusConfig = {
  good: { text: "Tốt", color: "success", icon: <CheckCircleOutlined /> },
  low: { text: "Sắp hết", color: "warning", icon: <WarningOutlined /> },
  critical: { text: "Rất thấp", color: "error", icon: <WarningOutlined /> },
  overstock: { text: "Dư thừa", color: "default", icon: <InboxOutlined /> },
};

export default function SuperAdminInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = () => {
    setLoading(true);
    setTimeout(() => {
      setInventory([
        {
          key: "1",
          id: "1",
          productName: "Đắc Nhân Tâm",
          category: "Kỹ năng sống",
          currentStock: 150,
          minStock: 50,
          maxStock: 300,
          price: 86000,
          totalValue: 12900000,
          status: "good",
          lastRestocked: "2024-01-10",
          soldThisMonth: 45,
        },
        {
          key: "2",
          id: "2",
          productName: "Nhà Giả Kim",
          category: "Văn học",
          currentStock: 25,
          minStock: 30,
          maxStock: 200,
          price: 79000,
          totalValue: 1975000,
          status: "low",
          lastRestocked: "2024-01-05",
          soldThisMonth: 38,
        },
        {
          key: "3",
          id: "3",
          productName: "Sapiens",
          category: "Lịch sử",
          currentStock: 8,
          minStock: 20,
          maxStock: 100,
          price: 189000,
          totalValue: 1512000,
          status: "critical",
          lastRestocked: "2023-12-28",
          soldThisMonth: 32,
        },
        {
          key: "4",
          id: "4",
          productName: "7 Thói Quen Hiệu Quả",
          category: "Kỹ năng sống",
          currentStock: 280,
          minStock: 50,
          maxStock: 250,
          price: 95000,
          totalValue: 26600000,
          status: "overstock",
          lastRestocked: "2024-01-12",
          soldThisMonth: 15,
        },
        {
          key: "5",
          id: "5",
          productName: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
          category: "Kỹ năng sống",
          currentStock: 45,
          minStock: 40,
          maxStock: 150,
          price: 68000,
          totalValue: 3060000,
          status: "good",
          lastRestocked: "2024-01-08",
          soldThisMonth: 28,
        },
        {
          key: "6",
          id: "6",
          productName: "Thinking Fast and Slow",
          category: "Tâm lý học",
          currentStock: 12,
          minStock: 25,
          maxStock: 100,
          price: 156000,
          totalValue: 1872000,
          status: "low",
          lastRestocked: "2024-01-03",
          soldThisMonth: 18,
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleAdjustStock = (product: InventoryItem, type: "add" | "remove") => {
    setSelectedProduct(product);
    form.setFieldsValue({ type, quantity: 0, reason: "" });
    setIsAdjustModalOpen(true);
  };

  const handleSubmitAdjustment = async (values: StockAdjustment) => {
    if (!selectedProduct) return;

    try {
      const newStock =
        values.type === "add"
          ? selectedProduct.currentStock + values.quantity
          : selectedProduct.currentStock - values.quantity;

      setInventory(
        inventory.map((item) =>
          item.id === selectedProduct.id
            ? {
                ...item,
                currentStock: newStock,
                totalValue: newStock * item.price,
                status: getStockStatus(newStock, item.minStock, item.maxStock),
              }
            : item
        )
      );

      message.success(
        `Đã ${values.type === "add" ? "nhập" : "xuất"} ${values.quantity} sản phẩm`
      );
      setIsAdjustModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const getStockStatus = (
    current: number,
    min: number,
    max: number
  ): "good" | "low" | "critical" | "overstock" => {
    if (current === 0 || current < min * 0.5) return "critical";
    if (current < min) return "low";
    if (current > max) return "overstock";
    return "good";
  };

  const filteredInventory = inventory.filter((item) => {
    const matchSearch = item.productName
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalProducts = inventory.length;
  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockCount = inventory.filter(
    (item) => item.status === "low" || item.status === "critical"
  ).length;
  const criticalStockCount = inventory.filter(
    (item) => item.status === "critical"
  ).length;

  const columns: ColumnsType<InventoryItem> = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: 250,
      render: (name, record) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>{name}</div>
          <Tag color="blue" style={{ fontSize: 11 }}>
            {record.category}
          </Tag>
        </div>
      ),
    },
    {
      title: "Tồn kho hiện tại",
      dataIndex: "currentStock",
      key: "currentStock",
      width: 150,
      sorter: (a, b) => a.currentStock - b.currentStock,
      render: (stock, record) => (
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            {stock} / {record.maxStock}
          </div>
          <Progress
            percent={(stock / record.maxStock) * 100}
            size="small"
            status={
              record.status === "critical"
                ? "exception"
                : record.status === "low"
                  ? "normal"
                  : "success"
            }
            showInfo={false}
          />
        </div>
      ),
    },
    {
      title: "Ngưỡng tối thiểu",
      dataIndex: "minStock",
      key: "minStock",
      width: 130,
      render: (min) => <span>{min} quyển</span>,
    },
    {
      title: "Bán trong tháng",
      dataIndex: "soldThisMonth",
      key: "soldThisMonth",
      width: 130,
      sorter: (a, b) => a.soldThisMonth - b.soldThisMonth,
      render: (sold) => (
        <Tag color="cyan" icon={<ShoppingOutlined />}>
          {sold} quyển
        </Tag>
      ),
    },
    {
      title: "Giá trị tồn kho",
      dataIndex: "totalValue",
      key: "totalValue",
      width: 140,
      sorter: (a, b) => a.totalValue - b.totalValue,
      render: (value) => (
        <span style={{ fontWeight: 600, color: "#52c41a" }}>
          {value.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      filters: [
        { text: "Tốt", value: "good" },
        { text: "Sắp hết", value: "low" },
        { text: "Rất thấp", value: "critical" },
        { text: "Dư thừa", value: "overstock" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: keyof typeof statusConfig) => (
        <Tag color={statusConfig[status].color} icon={statusConfig[status].icon}>
          {statusConfig[status].text}
        </Tag>
      ),
    },
    {
      title: "Nhập gần nhất",
      dataIndex: "lastRestocked",
      key: "lastRestocked",
      width: 120,
      render: (date) => date || <span style={{ color: "#8c8c8c" }}>Chưa có</span>,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 180,
      fixed: "right",
      render: (_, record) => (
        <Space size="small" direction="vertical">
          <Button
            type="link"
            icon={<PlusOutlined />}
            onClick={() => handleAdjustStock(record, "add")}
            style={{ padding: 0, color: "#52c41a" }}
          >
            Nhập hàng
          </Button>
          <Button
            type="link"
            icon={<MinusOutlined />}
            onClick={() => handleAdjustStock(record, "remove")}
            style={{ padding: 0, color: "#ff4d4f" }}
          >
            Xuất hàng
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
          Báo cáo tồn kho
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0 }}>
          Theo dõi và quản lý tồn kho sản phẩm
        </p>
      </div>

      {criticalStockCount > 0 && (
        <Alert
          message={`Cảnh báo: ${criticalStockCount} sản phẩm có tồn kho rất thấp`}
          description="Vui lòng nhập thêm hàng để tránh tình trạng hết hàng"
          type="error"
          showIcon
          icon={<WarningOutlined />}
          style={{ marginBottom: 24 }}
        />
      )}

      {lowStockCount > criticalStockCount && (
        <Alert
          message={`Lưu ý: ${lowStockCount - criticalStockCount} sản phẩm sắp hết hàng`}
          description="Cân nhắc nhập thêm hàng trong thời gian tới"
          type="warning"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Tổng sản phẩm"
              value={totalProducts}
              prefix={<InboxOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Giá trị tồn kho"
              value={totalValue}
              suffix="đ"
              prefix={<DollarOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a", fontSize: 20 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Sắp hết hàng"
              value={lowStockCount}
              prefix={<WarningOutlined style={{ color: "#fa8c16" }} />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Cần nhập gấp"
              value={criticalStockCount}
              prefix={<WarningOutlined style={{ color: "#ff4d4f" }} />}
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
            justifyContent: "space-between",
          }}
        >
          <Space wrap>
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 150 }}
              options={[
                { label: "Tất cả", value: "all" },
                { label: "Tốt", value: "good" },
                { label: "Sắp hết", value: "low" },
                { label: "Rất thấp", value: "critical" },
                { label: "Dư thừa", value: "overstock" },
              ]}
            />
          </Space>
          <Button
            icon={<SyncOutlined />}
            onClick={loadInventory}
            loading={loading}
          >
            Làm mới
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredInventory}
          loading={loading}
          scroll={{ x: 1400 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} sản phẩm`,
          }}
        />
      </Card>

      {/* Stock Adjustment Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <InboxOutlined style={{ fontSize: 20, color: "#1890ff" }} />
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              {form.getFieldValue("type") === "add" ? "Nhập hàng" : "Xuất hàng"}
            </span>
          </div>
        }
        open={isAdjustModalOpen}
        onCancel={() => {
          setIsAdjustModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={500}
      >
        {selectedProduct && (
          <div>
            <Card
              bordered={false}
              style={{ background: "#f5f5f5", marginBottom: 24, marginTop: 16 }}
            >
              <div style={{ fontWeight: 500, marginBottom: 8 }}>
                {selectedProduct.productName}
              </div>
              <div style={{ fontSize: 13, color: "#8c8c8c" }}>
                Tồn kho hiện tại: <strong>{selectedProduct.currentStock} quyển</strong>
              </div>
            </Card>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmitAdjustment}
              initialValues={{ type: "add", quantity: 0, reason: "" }}
            >
              <Form.Item name="type" label="Loại điều chỉnh">
                <Select
                  options={[
                    { label: "Nhập hàng", value: "add" },
                    { label: "Xuất hàng", value: "remove" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[
                  { required: true, message: "Vui lòng nhập số lượng" },
                  {
                    validator: (_, value) => {
                      if (
                        form.getFieldValue("type") === "remove" &&
                        value > selectedProduct.currentStock
                      ) {
                        return Promise.reject(
                          "Số lượng xuất không được lớn hơn tồn kho"
                        );
                      }
                      if (value <= 0) {
                        return Promise.reject("Số lượng phải lớn hơn 0");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber
                  placeholder="Nhập số lượng"
                  style={{ width: "100%" }}
                  min={1}
                />
              </Form.Item>

              <Form.Item
                name="reason"
                label="Lý do"
                rules={[{ required: true, message: "Vui lòng nhập lý do" }]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Nhập lý do điều chỉnh tồn kho"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                  <Button onClick={() => setIsAdjustModalOpen(false)}>Hủy</Button>
                  <Button type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
}