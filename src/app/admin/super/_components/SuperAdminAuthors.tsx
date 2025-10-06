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
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserOutlined,
  BookOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { TextArea } = Input;

type Author = {
  key: string;
  id: string;
  name: string;
  bio?: string;
  nationality?: string;
  avatar?: string;
  productCount: number;
  isActive: boolean;
  createdAt: string;
};

type AuthorFormValues = {
  name: string;
  bio?: string;
  nationality?: string;
  avatar?: string;
  isActive: boolean;
};

export default function SuperAdminAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = () => {
    setLoading(true);
    setTimeout(() => {
      setAuthors([
        {
          key: "1",
          id: "1",
          name: "Dale Carnegie",
          bio: "Nhà văn và diễn giả người Mỹ",
          nationality: "Mỹ",
          productCount: 12,
          isActive: true,
          createdAt: "2024-01-01",
        },
        {
          key: "2",
          id: "2",
          name: "Paulo Coelho",
          bio: "Nhà văn người Brazil",
          nationality: "Brazil",
          productCount: 8,
          isActive: true,
          createdAt: "2024-01-02",
        },
        {
          key: "3",
          id: "3",
          name: "Yuval Noah Harari",
          bio: "Sử học và nhà văn người Israel",
          nationality: "Israel",
          productCount: 5,
          isActive: true,
          createdAt: "2024-01-03",
        },
        {
          key: "4",
          id: "4",
          name: "Rosie Nguyễn",
          bio: "Tác giả sách kỹ năng người Việt",
          nationality: "Việt Nam",
          productCount: 3,
          isActive: true,
          createdAt: "2024-01-04",
        },
        {
          key: "5",
          id: "5",
          name: "Stephen Covey",
          bio: "Tác giả và diễn giả người Mỹ",
          nationality: "Mỹ",
          productCount: 7,
          isActive: true,
          createdAt: "2024-01-05",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleAddNew = () => {
    setEditingAuthor(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true });
    setIsModalOpen(true);
  };

  const handleEdit = (record: Author) => {
    setEditingAuthor(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setAuthors(authors.filter((a) => a.id !== id));
    message.success("Đã xóa tác giả");
  };

  const handleToggleStatus = (record: Author) => {
    const newStatus = !record.isActive;
    setAuthors(
      authors.map((a) =>
        a.id === record.id ? { ...a, isActive: newStatus } : a
      )
    );
    message.success(newStatus ? "Đã kích hoạt tác giả" : "Đã ẩn tác giả");
  };

  const handleSubmit = async (values: AuthorFormValues) => {
    try {
      if (editingAuthor) {
        setAuthors(
          authors.map((a) =>
            a.id === editingAuthor.id ? { ...a, ...values } : a
          )
        );
        message.success("Cập nhật tác giả thành công");
      } else {
        const newAuthor: Author = {
          key: Date.now().toString(),
          id: Date.now().toString(),
          ...values,
          productCount: 0,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setAuthors([newAuthor, ...authors]);
        message.success("Thêm tác giả thành công");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalProducts = authors.reduce((sum, a) => sum + a.productCount, 0);
  const activeCount = authors.filter((a) => a.isActive).length;

  const columns: ColumnsType<Author> = [
    {
      title: "Tác giả",
      key: "author",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar
            style={{ backgroundColor: "#52c41a" }}
            icon={<UserOutlined />}
            size={40}
            src={record.avatar}
          />
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.name}</div>
            {record.nationality && (
              <Tag color="blue" style={{ fontSize: 11 }}>
                {record.nationality}
              </Tag>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Tiểu sử",
      dataIndex: "bio",
      key: "bio",
      ellipsis: true,
      render: (text) => text || <span style={{ color: "#8c8c8c" }}>Chưa có tiểu sử</span>,
    },
    {
      title: "Số tác phẩm",
      dataIndex: "productCount",
      key: "productCount",
      width: 120,
      sorter: (a, b) => a.productCount - b.productCount,
      render: (count) => (
        <Tag color="cyan" icon={<BookOutlined />}>
          {count} quyển
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
            title="Xóa tác giả"
            description="Bạn có chắc muốn xóa tác giả này?"
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
          Quản lý tác giả
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0 }}>
          Quản lý thông tin tác giả trong hệ thống
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng tác giả"
              value={authors.length}
              prefix={<UserOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Đang hiển thị"
              value={activeCount}
              valueStyle={{ color: "#696cff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng tác phẩm"
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
            placeholder="Tìm kiếm tác giả..."
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
            style={{ background: "#52c41a" }}
          >
            Thêm tác giả
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredAuthors}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} tác giả`,
          }}
        />
      </Card>

      <Modal
        title={editingAuthor ? "Chỉnh sửa tác giả" : "Thêm tác giả mới"}
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
            label="Tên tác giả"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}
          >
            <Input placeholder="Nhập tên tác giả" />
          </Form.Item>

          <Form.Item label="Quốc tịch" name="nationality">
            <Input placeholder="Nhập quốc tịch" />
          </Form.Item>

          <Form.Item label="Tiểu sử" name="bio">
            <TextArea rows={4} placeholder="Nhập tiểu sử tác giả" />
          </Form.Item>

          <Form.Item label="Ảnh đại diện" name="avatar">
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
              <Button type="primary" htmlType="submit" style={{ background: "#52c41a" }}>
                {editingAuthor ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}