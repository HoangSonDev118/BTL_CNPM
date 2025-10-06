// File: src/app/admin/super/_components/SuperAdminCategories.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Modal,
  Form,
  Switch,
  message,
  Popconfirm,
  Statistic,
  Row,
  Col,
  Avatar,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  AppstoreOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { TextArea } = Input;

type Category = {
  key: string;
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
  isActive: boolean;
  createdAt: string;
};

type CategoryFormValues = {
  name: string;
  description?: string;
  isActive: boolean;
};

export default function SuperAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setLoading(true);
    setTimeout(() => {
      setCategories([
        {
          key: "1",
          id: "1",
          name: "Sách kỹ năng",
          slug: "sach-ky-nang",
          description: "Sách về phát triển bản thân và kỹ năng mềm",
          productCount: 156,
          isActive: true,
          createdAt: "2024-01-01",
        },
        {
          key: "2",
          id: "2",
          name: "Tiểu thuyết",
          slug: "tieu-thuyet",
          description: "Các tác phẩm văn học tiểu thuyết",
          productCount: 234,
          isActive: true,
          createdAt: "2024-01-01",
        },
        {
          key: "3",
          id: "3",
          name: "Khoa học",
          slug: "khoa-hoc",
          description: "Sách khoa học phổ thông",
          productCount: 89,
          isActive: true,
          createdAt: "2024-01-02",
        },
        {
          key: "4",
          id: "4",
          name: "Thiếu nhi",
          slug: "thieu-nhi",
          description: "Sách dành cho trẻ em",
          productCount: 178,
          isActive: true,
          createdAt: "2024-01-03",
        },
        {
          key: "5",
          id: "5",
          name: "Kinh tế",
          slug: "kinh-te",
          description: "Sách về kinh tế và kinh doanh",
          productCount: 92,
          isActive: false,
          createdAt: "2024-01-04",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true });
    setIsModalOpen(true);
  };

  const handleEdit = (record: Category) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    message.success("Đã xóa danh mục");
  };

  const handleToggleStatus = (record: Category) => {
    const newStatus = !record.isActive;
    setCategories(
      categories.map((c) =>
        c.id === record.id ? { ...c, isActive: newStatus } : c
      )
    );
    message.success(newStatus ? "Đã kích hoạt danh mục" : "Đã ẩn danh mục");
  };

  const handleSubmit = async (values: CategoryFormValues) => {
    try {
      if (editingCategory) {
        setCategories(
          categories.map((c) =>
            c.id === editingCategory.id
              ? { ...c, ...values, slug: generateSlug(values.name) }
              : c
          )
        );
        message.success("Cập nhật danh mục thành công");
      } else {
        const newCategory: Category = {
          key: Date.now().toString(),
          id: Date.now().toString(),
          ...values,
          slug: generateSlug(values.name),
          productCount: 0,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setCategories([newCategory, ...categories]);
        message.success("Thêm danh mục thành công");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalProducts = categories.reduce((sum, c) => sum + c.productCount, 0);
  const activeCount = categories.filter((c) => c.isActive).length;

  const columns: ColumnsType<Category> = [
    {
      title: "Danh mục",
      key: "category",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar
            style={{ backgroundColor: "#696cff" }}
            icon={<AppstoreOutlined />}
            size={40}
          />
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.name}</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>{record.slug}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text) => text || <span style={{ color: "#8c8c8c" }}>Chưa có mô tả</span>,
    },
    {
      title: "Số sản phẩm",
      dataIndex: "productCount",
      key: "productCount",
      width: 120,
      sorter: (a, b) => a.productCount - b.productCount,
      render: (count) => (
        <Tag color="blue" icon={<BookOutlined />}>
          {count} SP
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      width: 120,
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleStatus(record)}
          checkedChildren="Hiện"
          unCheckedChildren="Ẩn"
        />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
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
            title="Xóa danh mục"
            description="Bạn có chắc muốn xóa danh mục này?"
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
          Quản lý danh mục
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0 }}>
          Quản lý danh mục sản phẩm trong hệ thống
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng danh mục"
              value={categories.length}
              prefix={<AppstoreOutlined style={{ color: "#696cff" }} />}
              valueStyle={{ color: "#696cff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Đang hiển thị"
              value={activeCount}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng sản phẩm"
              value={totalProducts}
              prefix={<BookOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
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
          <Input
            placeholder="Tìm kiếm danh mục..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
            style={{ background: "#696cff" }}
          >
            Thêm danh mục
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredCategories}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} danh mục`,
          }}
        />
      </Card>

      <Modal
        title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <TextArea rows={4} placeholder="Nhập mô tả danh mục" />
          </Form.Item>

          <Form.Item label="Hiển thị" name="isActive" valuePropName="checked">
            <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" style={{ background: "#696cff" }}>
                {editingCategory ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}