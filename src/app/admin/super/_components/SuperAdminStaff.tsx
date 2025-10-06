// src/app/admin/super/_components/SuperAdminStaff.tsx
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
  Select,
  Switch,
  message,
  Popconfirm,
  Descriptions,
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
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

type Staff = {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "STAFF" | "SUPER_ADMIN";
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  tasksCompleted?: number;
};

type StaffFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "STAFF" | "SUPER_ADMIN";
  isActive: boolean;
};

export default function SuperAdminStaff() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = () => {
    setLoading(true);
    // Mock data
    setTimeout(() => {
      setStaff([
        {
          key: "1",
          id: "1",
          name: "Nguyễn Văn Admin",
          email: "admin@bookstore.com",
          phone: "0900000001",
          role: "SUPER_ADMIN",
          isActive: true,
          createdAt: "2023-12-01",
          lastLogin: "2024-01-15 10:30",
          tasksCompleted: 0,
        },
        {
          key: "2",
          id: "2",
          name: "Trần Thị B",
          email: "tranb@bookstore.com",
          phone: "0900000002",
          role: "STAFF",
          isActive: true,
          createdAt: "2024-01-05",
          lastLogin: "2024-01-15 09:45",
          tasksCompleted: 45,
        },
        {
          key: "3",
          id: "3",
          name: "Lê Văn C",
          email: "levanc@bookstore.com",
          phone: "0900000003",
          role: "STAFF",
          isActive: true,
          createdAt: "2024-01-08",
          lastLogin: "2024-01-15 08:20",
          tasksCompleted: 32,
        },
        {
          key: "4",
          id: "4",
          name: "Phạm Thị D",
          email: "phamd@bookstore.com",
          phone: "0900000004",
          role: "STAFF",
          isActive: false,
          createdAt: "2024-01-10",
          lastLogin: "2024-01-12 16:00",
          tasksCompleted: 12,
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleAddNew = () => {
    setEditingStaff(null);
    form.resetFields();
    form.setFieldsValue({ role: "STAFF", isActive: true });
    setIsModalOpen(true);
  };

  const handleEdit = (record: Staff) => {
    setEditingStaff(record);
    form.setFieldsValue({ ...record, password: undefined });
    setIsModalOpen(true);
  };

  const handleViewDetail = (record: Staff) => {
    setSelectedStaff(record);
    setIsDetailModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id));
    message.success("Đã xóa nhân viên");
  };

  const handleToggleStatus = (record: Staff) => {
    const newStatus = !record.isActive;
    setStaff(
      staff.map((s) => (s.id === record.id ? { ...s, isActive: newStatus } : s))
    );
    message.success(
      newStatus ? "Đã kích hoạt tài khoản" : "Đã vô hiệu hóa tài khoản"
    );
  };

  const handleSubmit = async (values: StaffFormValues) => {
    try {
      if (editingStaff) {
        setStaff(
          staff.map((s) =>
            s.id === editingStaff.id ? { ...s, ...values, key: s.key } : s
          )
        );
        message.success("Cập nhật nhân viên thành công");
      } else {
        const newStaff: Staff = {
          key: Date.now().toString(),
          id: Date.now().toString(),
          ...values,
          createdAt: new Date().toISOString().split("T")[0],
          tasksCompleted: 0,
        };
        setStaff([newStaff, ...staff]);
        message.success("Thêm nhân viên thành công");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const filteredStaff = staff.filter((member) => {
    const matchSearch =
      member.name.toLowerCase().includes(searchText.toLowerCase()) ||
      member.email.toLowerCase().includes(searchText.toLowerCase());
    const matchRole = roleFilter === "all" || member.role === roleFilter;
    return matchSearch && matchRole;
  });

  const activeCount = staff.filter((s) => s.isActive).length;
  const inactiveCount = staff.filter((s) => !s.isActive).length;
  const superAdminCount = staff.filter((s) => s.role === "SUPER_ADMIN").length;

  const columns: ColumnsType<Staff> = [
    {
      title: "Nhân viên",
      key: "staff",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar
            size={40}
            style={{
              backgroundColor: record.role === "SUPER_ADMIN" ? "#ffd700" : "#1890ff",
              color: record.role === "SUPER_ADMIN" ? "#000" : "#fff",
            }}
            icon={<UserOutlined />}
          />
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.name}</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 120,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: 150,
      filters: [
        { text: "Super Admin", value: "SUPER_ADMIN" },
        { text: "Nhân viên", value: "STAFF" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => (
        <Tag color={role === "SUPER_ADMIN" ? "gold" : "blue"}>
          {role === "SUPER_ADMIN" ? "Super Admin" : "Nhân viên"}
        </Tag>
      ),
    },
    {
      title: "Công việc hoàn thành",
      dataIndex: "tasksCompleted",
      key: "tasksCompleted",
      width: 140,
      sorter: (a, b) => (a.tasksCompleted || 0) - (b.tasksCompleted || 0),
      render: (tasks) => (
        <Tag color="cyan">{tasks || 0} công việc</Tag>
      ),
    },
    {
      title: "Đăng nhập cuối",
      dataIndex: "lastLogin",
      key: "lastLogin",
      width: 150,
      render: (date) => date || <span style={{ color: "#8c8c8c" }}>Chưa đăng nhập</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      width: 120,
      render: (isActive) => (
        <Tag
          color={isActive ? "success" : "error"}
          icon={isActive ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        >
          {isActive ? "Hoạt động" : "Vô hiệu"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 220,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<UserOutlined />}
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
            title={record.isActive ? "Vô hiệu hóa" : "Kích hoạt"}
            description={
              record.isActive
                ? "Nhân viên sẽ không thể đăng nhập"
                : "Nhân viên có thể đăng nhập trở lại"
            }
            onConfirm={() => handleToggleStatus(record)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button
              type="link"
              danger={record.isActive}
              icon={record.isActive ? <LockOutlined /> : <UnlockOutlined />}
              style={{ padding: 0 }}
            >
              {record.isActive ? "Khóa" : "Mở"}
            </Button>
          </Popconfirm>
          {record.role !== "SUPER_ADMIN" && (
            <Popconfirm
              title="Xóa nhân viên"
              description="Bạn có chắc muốn xóa nhân viên này?"
              onConfirm={() => handleDelete(record.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button type="link" danger icon={<DeleteOutlined />} style={{ padding: 0 }}>
                Xóa
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
          Quản lý nhân viên
        </h1>
        <p style={{ color: "#8c8c8c", margin: 0 }}>
          Quản lý tài khoản và phân quyền nhân viên trong hệ thống
        </p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng nhân viên"
              value={staff.length}
              prefix={<TeamOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Đang hoạt động"
              value={activeCount}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Super Admin"
              value={superAdminCount}
              prefix={<UserOutlined style={{ color: "#ffd700" }} />}
              valueStyle={{ color: "#ffd700" }}
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
          <Space>
            <Input
              placeholder="Tìm tên, email..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
            <Select
              value={roleFilter}
              onChange={setRoleFilter}
              style={{ width: 150 }}
              options={[
                { label: "Tất cả vai trò", value: "all" },
                { label: "Super Admin", value: "SUPER_ADMIN" },
                { label: "Nhân viên", value: "STAFF" },
              ]}
            />
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
            style={{ background: "#1890ff" }}
          >
            Thêm nhân viên
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredStaff}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} nhân viên`,
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingStaff ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
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
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" disabled={!!editingStaff} />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: !editingStaff,
                message: "Vui lòng nhập mật khẩu",
              },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            ]}
          >
            <Input.Password
              placeholder={
                editingStaff ? "Để trống nếu không đổi mật khẩu" : "Nhập mật khẩu"
              }
            />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            <Select
              placeholder="Chọn vai trò"
              options={[
                { label: "Nhân viên", value: "STAFF" },
                { label: "Super Admin", value: "SUPER_ADMIN" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Kích hoạt" name="isActive" valuePropName="checked">
            <Switch checkedChildren="Có" unCheckedChildren="Không" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                {editingStaff ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title={<span style={{ fontSize: 18, fontWeight: 600 }}>Thông tin nhân viên</span>}
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={null}
        width={700}
      >
        {selectedStaff && (
          <div style={{ marginTop: 24 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar
                size={80}
                style={{
                  backgroundColor: selectedStaff.role === "SUPER_ADMIN" ? "#ffd700" : "#1890ff",
                  color: selectedStaff.role === "SUPER_ADMIN" ? "#000" : "#fff",
                }}
                icon={<UserOutlined />}
              />
              <h3 style={{ marginTop: 12, marginBottom: 4 }}>{selectedStaff.name}</h3>
              <Tag color={selectedStaff.role === "SUPER_ADMIN" ? "gold" : "blue"}>
                {selectedStaff.role === "SUPER_ADMIN" ? "Super Admin" : "Nhân viên"}
              </Tag>
            </div>

            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Email">{selectedStaff.email}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{selectedStaff.phone}</Descriptions.Item>
              <Descriptions.Item label="Ngày tạo tài khoản">
                {selectedStaff.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="Đăng nhập gần nhất">
                {selectedStaff.lastLogin || "Chưa đăng nhập"}
              </Descriptions.Item>
              <Descriptions.Item label="Công việc hoàn thành">
                {selectedStaff.tasksCompleted || 0} công việc
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag
                  color={selectedStaff.isActive ? "success" : "error"}
                  icon={selectedStaff.isActive ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                >
                  {selectedStaff.isActive ? "Đang hoạt động" : "Đã vô hiệu hóa"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
}