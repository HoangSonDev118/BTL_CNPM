// Quản lý sản phẩm

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
  Form,
  InputNumber,
  Switch,
  Upload,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { TextArea } = Input;

type Product = {
  key: string;
  id: string;
  title: string;
  category: string;
  author: string;
  price: number;
  stock: number;
  isActive: boolean;
  coverImage?: string;
};

type ProductFormValues = {
  title: string;
  category: string;
  author: string;
  description?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  isActive: boolean;
  coverImage?: string;
};

export default function StaffProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    // Mock data - replace with API call
    setTimeout(() => {
      setProducts([
        {
          key: "1",
          id: "1",
          title: "Đắc Nhân Tâm",
          category: "Sách kỹ năng",
          author: "Dale Carnegie",
          price: 86000,
          stock: 150,
          isActive: true,
          coverImage: "/api/placeholder/80/120",
        },
        {
          key: "2",
          id: "2",
          title: "Nhà Giả Kim",
          category: "Tiểu thuyết",
          author: "Paulo Coelho",
          price: 79000,
          stock: 8,
          isActive: true,
          coverImage: "/api/placeholder/80/120",
        },
        {
          key: "3",
          id: "3",
          title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
          category: "Sách kỹ năng",
          author: "Rosie Nguyễn",
          price: 68000,
          stock: 0,
          isActive: false,
          coverImage: "/api/placeholder/80/120",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true, stock: 0 });
    setIsModalOpen(true);
  };

  const handleEdit = (record: Product) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    message.success("Đã xóa sản phẩm");
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleToggleStatus = (record: Product) => {
    const newStatus = !record.isActive;
    setProducts(
      products.map((p) =>
        p.id === record.id ? { ...p, isActive: newStatus } : p
      )
    );
    message.success(newStatus ? "Đã hiển thị sản phẩm" : "Đã ẩn sản phẩm");
  };

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      if (editingProduct) {
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id
              ? { ...p, ...values, key: p.key }
              : p
          )
        );
        message.success("Cập nhật sản phẩm thành công");
      } else {
        const newProduct: Product = {
          key: Date.now().toString(),
          id: Date.now().toString(),
          ...values,
        };
        setProducts([newProduct, ...products]);
        message.success("Thêm sản phẩm thành công");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.author.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const columns: ColumnsType<Product> = [
    {
      title: "Sản phẩm",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={record.coverImage}
            alt={text}
            style={{
              width: 50,
              height: 70,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
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
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span style={{ fontWeight: 500, color: "#696cff" }}>
          {price.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      render: (stock) => (
        <Tag color={stock === 0 ? "red" : stock < 10 ? "orange" : "green"}>
          {stock} quyển
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleStatus(record)}
          checkedChildren={<EyeOutlined />}
          unCheckedChildren={<EyeInvisibleOutlined />}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ padding: 0 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              style={{ padding: 0 }}
            >
              Xóa
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
          Quản lý sản phẩm
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0 }}>
          Thêm mới, chỉnh sửa và quản lý sản phẩm trong hệ thống
        </p>
      </div>

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
          <Space>
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ width: 150 }}
              options={[
                { label: "Tất cả", value: "all" },
                { label: "Sách kỹ năng", value: "Sách kỹ năng" },
                { label: "Tiểu thuyết", value: "Tiểu thuyết" },
                { label: "Thiếu nhi", value: "Thiếu nhi" },
              ]}
            />
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
            style={{ background: "#696cff" }}
          >
            Thêm sản phẩm
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} sản phẩm`,
          }}
        />
      </Card>

      <Modal
        title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="Tên sách"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên sách" }]}
          >
            <Input placeholder="Nhập tên sách" />
          </Form.Item>

          <Form.Item
            label="Tác giả"
            name="author"
            rules={[{ required: true, message: "Vui lòng nhập tác giả" }]}
          >
            <Input placeholder="Nhập tên tác giả" />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select
              placeholder="Chọn danh mục"
              options={[
                { label: "Sách kỹ năng", value: "Sách kỹ năng" },
                { label: "Tiểu thuyết", value: "Tiểu thuyết" },
                { label: "Thiếu nhi", value: "Thiếu nhi" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Form.Item
              label="Giá bán"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="0"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                addonAfter="đ"
              />
            </Form.Item>

            <Form.Item label="Giá gốc" name="originalPrice">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="0"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                addonAfter="đ"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Số lượng tồn kho"
            name="stock"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="0"
              min={0}
              addonAfter="quyển"
            />
          </Form.Item>

          <Form.Item label="Ảnh bìa" name="coverImage">
            <Upload listType="picture-card" maxCount={1}>
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item label="Hiển thị" name="isActive" valuePropName="checked">
            <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" style={{ background: "#696cff" }}>
                {editingProduct ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}