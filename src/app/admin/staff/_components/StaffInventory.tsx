// Trang báo cáo tồn kho
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  Input,
  Select,
  Progress,
  Statistic,
  Row,
  Col,
  Alert,
} from "antd";
import {
  SearchOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

type InventoryItem = {
  key: string;
  id: string;
  title: string;
  category: string;
  author: string;
  stock: number;
  minStock: number;
  maxStock: number;
  price: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  coverImage?: string;
};

const STATUS_CONFIG = {
  in_stock: {
    color: "success",
    label: "Còn hàng",
    icon: <CheckCircleOutlined />,
  },
  low_stock: {
    color: "warning",
    label: "Sắp hết",
    icon: <ExclamationCircleOutlined />,
  },
  out_of_stock: {
    color: "error",
    label: "Hết hàng",
    icon: <WarningOutlined />,
  },
};

export default function StaffInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = () => {
    setLoading(true);
    // Mock data
    setTimeout(() => {
      setItems([
        {
          key: "1",
          id: "1",
          title: "Đắc Nhân Tâm",
          category: "Sách kỹ năng",
          author: "Dale Carnegie",
          stock: 150,
          minStock: 20,
          maxStock: 200,
          price: 86000,
          status: "in_stock",
          coverImage: "/api/placeholder/60/90",
        },
        {
          key: "2",
          id: "2",
          title: "Nhà Giả Kim",
          category: "Tiểu thuyết",
          author: "Paulo Coelho",
          stock: 8,
          minStock: 15,
          maxStock: 100,
          price: 79000,
          status: "low_stock",
          coverImage: "/api/placeholder/60/90",
        },
        {
          key: "3",
          id: "3",
          title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
          category: "Sách kỹ năng",
          author: "Rosie Nguyễn",
          stock: 0,
          minStock: 10,
          maxStock: 150,
          price: 68000,
          status: "out_of_stock",
          coverImage: "/api/placeholder/60/90",
        },
        {
          key: "4",
          id: "4",
          title: "Sapiens: Lược Sử Loài Người",
          category: "Khoa học",
          author: "Yuval Noah Harari",
          stock: 45,
          minStock: 20,
          maxStock: 80,
          price: 189000,
          status: "in_stock",
          coverImage: "/api/placeholder/60/90",
        },
        {
          key: "5",
          id: "5",
          title: "7 Thói Quen Hiệu Quả",
          category: "Sách kỹ năng",
          author: "Stephen Covey",
          stock: 12,
          minStock: 15,
          maxStock: 100,
          price: 95000,
          status: "low_stock",
          coverImage: "/api/placeholder/60/90",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const getStockPercentage = (stock: number, maxStock: number) => {
    return Math.min((stock / maxStock) * 100, 100);
  };

  const getProgressStatus = (status: InventoryItem["status"]) => {
    if (status === "out_of_stock") return "exception";
    if (status === "low_stock") return "normal";
    return "success";
  };

  const filteredItems = items.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.author.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  const totalValue = items.reduce(
    (sum, item) => sum + item.stock * item.price,
    0
  );
  const outOfStockCount = items.filter((i) => i.status === "out_of_stock").length;
  const lowStockCount = items.filter((i) => i.status === "low_stock").length;

  const columns: ColumnsType<InventoryItem> = [
    {
      title: "Sản phẩm",
      key: "product",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={record.coverImage}
            alt={record.title}
            style={{
              width: 45,
              height: 65,
              objectFit: "cover",
              borderRadius: 4,
              border: "1px solid #f0f0f0",
            }}
          />
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>
              {record.title}
            </div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>
              {record.author}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Tồn kho",
      key: "stock",
      width: 250,
      render: (_, record) => (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
              fontSize: 13,
            }}
          >
            <span>
              <strong>{record.stock}</strong> / {record.maxStock}
            </span>
            <span style={{ color: "#8c8c8c" }}>
              {getStockPercentage(record.stock, record.maxStock).toFixed(0)}%
            </span>
          </div>
          <Progress
            percent={getStockPercentage(record.stock, record.maxStock)}
            showInfo={false}
            status={getProgressStatus(record.status)}
            strokeColor={
              record.status === "in_stock"
                ? "#52c41a"
                : record.status === "low_stock"
                  ? "#faad14"
                  : "#ff4d4f"
            }
          />
        </div>
      ),
    },
    {
      title: "Giá trị tồn",
      key: "value",
      render: (_, record) => (
        <span style={{ fontWeight: 500 }}>
          {(record.stock * record.price).toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: InventoryItem["status"]) => {
        const config = STATUS_CONFIG[status];
        return (
          <Tag icon={config.icon} color={config.color}>
            {config.label}
          </Tag>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
          Báo cáo tồn kho
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0 }}>
          Theo dõi tình trạng tồn kho và cảnh báo hàng sắp hết
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Tổng sản phẩm"
              value={items.length}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Sắp hết hàng"
              value={lowStockCount}
              prefix={<ExclamationCircleOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Hết hàng"
              value={outOfStockCount}
              prefix={<WarningOutlined style={{ color: "#ff4d4f" }} />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Tổng giá trị tồn"
              value={totalValue}
              suffix="đ"
              valueStyle={{ color: "#696cff", fontSize: 20 }}
            />
          </Card>
        </Col>
      </Row>

      {(outOfStockCount > 0 || lowStockCount > 0) && (
        <Alert
          message="Cảnh báo tồn kho"
          description={
            <div>
              {outOfStockCount > 0 && (
                <div>• Có {outOfStockCount} sản phẩm đã hết hàng</div>
              )}
              {lowStockCount > 0 && (
                <div>• Có {lowStockCount} sản phẩm sắp hết hàng</div>
              )}
            </div>
          }
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          style={{ marginBottom: 24 }}
        />
      )}

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
              { label: "Tất cả trạng thái", value: "all" },
              { label: "Còn hàng", value: "in_stock" },
              { label: "Sắp hết", value: "low_stock" },
              { label: "Hết hàng", value: "out_of_stock" },
            ]}
          />
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 150 }}
            options={[
              { label: "Tất cả danh mục", value: "all" },
              { label: "Sách kỹ năng", value: "Sách kỹ năng" },
              { label: "Tiểu thuyết", value: "Tiểu thuyết" },
              { label: "Khoa học", value: "Khoa học" },
              { label: "Thiếu nhi", value: "Thiếu nhi" },
            ]}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredItems}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} sản phẩm`,
          }}
        />
      </Card>
    </div>
  );
}