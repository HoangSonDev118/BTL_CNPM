"use client";

import { useEffect, useState } from "react";

import { Alert, Card, Spin, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { Role } from "@/lib/roles";

const { Title, Paragraph, Text } = Typography;

type UserRow = {
  key: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};

const ROLE_MAP: Record<Role, { color: string; label: string }> = {
  USER: { color: "green", label: "Người dùng" },
  STAFF: { color: "volcano", label: "Nhân viên" },
  SUPER_ADMIN: { color: "geekblue", label: "Super Admin" },
};

export default function AdminUserOverview() {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/users", {
          credentials: "include",
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          const message = (data as { message?: string }).message ?? "Có cáic con cặc";
          throw new Error(message);
        }

        const data = (await response.json()) as {
          users: { id: string; name: string; email: string; role: Role; createdAt: string }[];
        };

        if (!isMounted) return;
        setRows(
          data.users.map((user) => ({
            key: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: new Date(user.createdAt).toLocaleString("vi-VN"),
          }))
        );
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        const error = err as Error;
        setError(error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const columns: ColumnsType<UserRow> = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role: UserRow["role"]) => {
        const meta = ROLE_MAP[role];
        return <Tag color={meta.color}>{meta.label}</Tag>;
      },
    },
    {
      title: "Tạo lúc",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div className="space-y-6">
      <Card bordered={false} className="bg-gradient-to-r from-[#eef1ff] via-white to-[#f2fbff]">
        <div className="flex flex-col gap-2">
          <Title level={4} className="!mb-0 text-[#1f2937]">
            Tình trạng truy cập
          </Title>
          <Paragraph className="!mb-0 text-[#6b7280]">
            Tất cả thao tác quan trọng đều yêu cầu vai trò quản trị. Các tài khoản không đủ quyền sẽ bị từ chối ngay từ phía máy chủ.
          </Paragraph>
          <Text className="text-sm text-[#475569]">
            Hãy bật xác thực đa yếu tố khi tính năng sẵn sàng để gia tăng bảo mật cho phiên đăng nhập.
          </Text>
        </div>
      </Card>

      <Card bordered={false} title="Danh sách người dùng" className="shadow-lg">
        {error ? (
          <Alert type="error" showIcon message="Không thể tải danh sách" description={error} />
        ) : (
          <Spin spinning={loading} tip="Đang tải danh sách người dùng...">
            <Table
              columns={columns}
              dataSource={rows}
              pagination={{ pageSize: 5, showSizeChanger: false }}
              size="middle"
              rowKey="key"
            />
          </Spin>
        )}
      </Card>
    </div>
  );
}
