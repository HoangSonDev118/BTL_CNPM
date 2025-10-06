// src/app/admin/super/_components/SuperAdminProducts.tsx
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
  Upload,
  InputNumber,
  Switch,
  message,
  Popconfirm,
  Image,
  Descriptions,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
  UploadOutlined,
  InboxOutlined,
  DollarOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { UploadFile } from "antd/es/upload/interface";

type Product = {
  key: string;
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  isActive: boolean;
  image?: string;
  description?: string;
  createdAt: string;
};

type ProductFormValues = {
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  isActive: boolean;
};

export default function SuperAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    setTimeout(() => {
      setProducts([
        {
          key: "1",
          id: "1",
          title: "Đắc Nhân Tâm",
          author: "Dale Carnegie",
          category: "Kỹ năng sống",
          price: 86000,
          stock: 150,
          sold: 234,
          isActive: true,
          image: "/placeholder-book.jpg",
          description: "Cuốn sách kinh điển về kỹ năng giao tiếp và xây dựng mối quan hệ",
          createdAt: "2024-01-01",
        },
        {
          key: "2",
          id: "2",
          title: "Nhà Giả Kim",
          author: "Paulo Coelho",
          category: "Văn học",
          price: 79000,
          stock: 200,
          sold: 198,
          isActive: true,
          description: "Hành trình tìm kiếm kho báu và ý nghĩa cuộc sống",
          createdAt: "2024-01-02",
        },
        {
          key: "3",
          id: "3",
          title: "Sapiens",
          author: "Yuval Noah Harari",
          category: "Lịch sử",
          price: 189000,
          stock: 80,
          sold: 156,
          isActive: true,
          description: "Lược sử loài người từ thời kỳ đồ đá đến hiện đại",
          createdAt: "2024-01-03",
        },
        {
          key: "4",
          id: "4",
          title: "7 Thói Quen Hiệu Quả",
          author: "Stephen Covey",
          category: "Kỹ năng sống",
          price: 95000,
          stock: 5,
          sold: 142,
          isActive: true,
          description: "Bảy thói quen để đạt được hiệu quả cao trong cuộc sống",
          createdAt: "2024-01-04",
        },
        {
          key: "5",
          id: "5",
          title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
          author: "Rosie Nguyễn",
          category: "Kỹ năng sống",
          price: 68000,
          stock: 0,
          sold: 128,
          isActive: false,
          description: "Những bài học về tuổi trẻ và phát triển bản thân",
          createdAt: "2024-01-05",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true });
    setFileList([]);
    setIsModalOpen(true);
  };

  const handleEdit = (record: Product) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    if (record.image) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: record.image,
        },
      ]);
    }
    setIsModalOpen(true);
  };

  const handleViewDetail = (record: Product) => {
    setSelectedProduct(record);
    setIsDetailModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    message.success("Đã xóa sản phẩm");
  };

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      if (editingProduct) {
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id ? { ...p, ...values, key: p.key } : p
          )
        );
        message.success("Cập nhật sản phẩm thành công");
      } else {
        const newProduct: Product = {
          key: Date.now().toString(),
          id: Date.now().toString(),
          ...values,
          sold: 0,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setProducts([newProduct, ...products]);
        message.success("Thêm sản phẩm thành công");
      }
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.author.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && product.isActive) ||
      (statusFilter === "inactive" && !product.isActive) ||
      (statusFilter === "low_stock" && product.stock < 10) ||
      (statusFilter === "out_stock" && product.stock === 0);
    return matchSearch && matchCategory && matchStatus;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive).length;
  const lowStockProducts = products.filter((p) => p.stock < 10 && p.stock > 0).length;
  const outOfStockProducts = products.filter((p) => p.stock === 0).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const columns: ColumnsType<Product> = [
    {
      title: "Sản phẩm",
      key: "product",
      width: 350,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image
            src={record.image || "/placeholder-book.jpg"}
            alt={record.title}
            width={50}
            height={70}
            style={{ objectFit: "cover", borderRadius: 4 }}
            fallback="/placeholder-book.jpg"
          />
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.title}</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>{record.author}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      width: 130,
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 120,
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <span style={{ fontWeight: 600, color: "#52c41a" }}>
          {price.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      width: 100,
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) => (
        <Tag color={stock === 0 ? "red" : stock < 10 ? "orange" : "green"}>
          {stock} quyển
        </Tag>
      ),
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      width: 100,
      sorter: (a, b) => a.sold - b.sold,
      render: (sold) => <span style={{ fontWeight: 500 }}>{sold}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      width: 120,
      render: (isActive) => (
        <Tag color={isActive ? "success" : "error"}>
          {isActive ? "Đang bán" : "Ngừng bán"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
            style={{ padding: 0 }}
          >
            Xem
          </Button>
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
            <Button type="link" danger icon={<DeleteOutlined />} style={{ padding: 0 }}>
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
          Quản lý thông tin sản phẩm và tồn kho
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Tổng sản phẩm"
              value={totalProducts}
              prefix={<ShoppingOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Đang bán"
              value={activeProducts}
              prefix={<ShoppingOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Sắp hết hàng"
              value={lowStockProducts}
              prefix={<InboxOutlined style={{ color: "#fa8c16" }} />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Hết hàng"
              value={outOfStockProducts}
              prefix={<InboxOutlined style={{ color: "#ff4d4f" }} />}
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
              placeholder="Tìm tên sách, tác giả..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ width: 150 }}
              options={[
                { label: "Tất cả danh mục", value: "all" },
                { label: "Kỹ năng sống", value: "Kỹ năng sống" },
                { label: "Văn học", value: "Văn học" },
                { label: "Lịch sử", value: "Lịch sử" },
              ]}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 150 }}
              options={[
                { label: "Tất cả", value: "all" },
                { label: "Đang bán", value: "active" },
                { label: "Ngừng bán", value: "inactive" },
                { label: "Sắp hết hàng", value: "low_stock" },
                { label: "Hết hàng", value: "out_stock" },
              ]}
            />
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
            Thêm sản phẩm
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} sản phẩm`,
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setFileList([]);
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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tác giả"
                name="author"
                rules={[{ required: true, message: "Vui lòng nhập tác giả" }]}
              >
                <Input placeholder="Nhập tên tác giả" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="category"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select
                  placeholder="Chọn danh mục"
                  options={[
                    { label: "Kỹ năng sống", value: "Kỹ năng sống" },
                    { label: "Văn học", value: "Văn học" },
                    { label: "Lịch sử", value: "Lịch sử" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giá bán"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <InputNumber
                  placeholder="Nhập giá"
                  style={{ width: "100%" }}
                  min={0}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  addonAfter="đ"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số lượng"
                name="stock"
                rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
              >
                <InputNumber
                  placeholder="Nhập số lượng"
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>

          <Form.Item label="Hình ảnh">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              maxCount={1}
            >
              {fileList.length === 0 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải ảnh</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item label="Trạng thái" name="isActive" valuePropName="checked">
            <Switch checkedChildren="Đang bán" unCheckedChildren="Ngừng bán" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                {editingProduct ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết sản phẩm"
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={null}
        width={700}
      >
        {selectedProduct && (
          <div style={{ marginTop: 24 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Image
                src={selectedProduct.image || "/placeholder-book.jpg"}
                alt={selectedProduct.title}
                width={150}
                height={200}
                style={{ objectFit: "cover", borderRadius: 8 }}
                fallback="/placeholder-book.jpg"
              />
            </div>

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card bordered={false} style={{ background: "#f0f5ff" }}>
                  <Statistic
                    title="Giá bán"
                    value={selectedProduct.price}
                    suffix="đ"
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: "#1890ff", fontSize: 20 }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{ background: "#f6ffed" }}>
                  <Statistic
                    title="Tồn kho"
                    value={selectedProduct.stock}
                    suffix="quyển"
                    prefix={<InboxOutlined />}
                    valueStyle={{ color: "#52c41a", fontSize: 20 }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{ background: "#fff7e6" }}>
                  <Statistic
                    title="Đã bán"
                    value={selectedProduct.sold}
                    suffix="quyển"
                    prefix={<ShoppingOutlined />}
                    valueStyle={{ color: "#fa8c16", fontSize: 20 }}
                  />
                </Card>
              </Col>
            </Row>

            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Tên sách">
                <strong>{selectedProduct.title}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Tác giả">{selectedProduct.author}</Descriptions.Item>
              <Descriptions.Item label="Danh mục">
                <Tag color="blue">{selectedProduct.category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                {selectedProduct.description || "Chưa có mô tả"}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">{selectedProduct.createdAt}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={selectedProduct.isActive ? "success" : "error"}>
                  {selectedProduct.isActive ? "Đang bán" : "Ngừng bán"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
}