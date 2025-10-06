// src/app/admin/super/_components/SuperAdminLayout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Menu, Avatar, Dropdown, Badge, Button, message } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  InboxOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";

const { Header, Sider, Content } = Layout;

type SuperAdminLayoutProps = {
  children: React.ReactNode;
};

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      message.success("Đăng xuất thành công");
      router.push("/admin/login");
    } catch (error) {
      message.error("Đăng xuất thất bại");
    }
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <span style={{ whiteSpace: "nowrap" }}>Thông tin cá nhân</span>,
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: <span style={{ whiteSpace: "nowrap" }}>Cài đặt hệ thống</span>,
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span style={{ whiteSpace: "nowrap" }}>Đăng xuất</span>,
    },
  ];

  const menuItems = [
    {
      key: "/admin/super",
      icon: <DashboardOutlined />,
      label: <Link href="/admin/super">Dashboard</Link>,
    },
    {
      key: "products",
      icon: <ShoppingOutlined />,
      label: "Quản lý sản phẩm",
      children: [
        {
          key: "/admin/super/products",
          label: <Link href="/admin/super/products">Danh sách sản phẩm</Link>,
        },
        {
          key: "/admin/super/categories",
          label: <Link href="/admin/super/categories">Danh mục</Link>,
        },
        {
          key: "/admin/super/authors",
          label: <Link href="/admin/super/authors">Tác giả</Link>,
        },
      ],
    },
    {
      key: "/admin/super/orders",
      icon: <InboxOutlined />,
      label: <Link href="/admin/super/orders">Quản lý đơn hàng</Link>,
    },
    {
      key: "users",
      icon: <TeamOutlined />,
      label: "Quản lý người dùng",
      children: [
        {
          key: "/admin/super/customers",
          label: <Link href="/admin/super/customers">Khách hàng</Link>,
        },
        {
          key: "/admin/super/staff",
          label: <Link href="/admin/super/staff">Nhân viên</Link>,
        },
      ],
    },
    {
      key: "/admin/super/inventory",
      icon: <BarChartOutlined />,
      label: <Link href="/admin/super/inventory">Báo cáo tồn kho</Link>,
    },
    {
      key: "/admin/super/analytics",
      icon: <BarChartOutlined />,
      label: <Link href="/admin/super/analytics">Thống kê & Báo cáo</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "linear-gradient(180deg, #1a1d2e 0%, #16192b 100%)",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {!collapsed ? (
            <Link href="/admin/super" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CrownOutlined style={{ fontSize: 28, color: "#ffd700" }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
                Super Admin
              </span>
            </Link>
          ) : (
            <CrownOutlined style={{ fontSize: 28, color: "#ffd700" }} />
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ 
            borderRight: 0, 
            marginTop: 16,
            background: "transparent",
          }}
          theme="dark"
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.2s" }}>
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
            position: "sticky",
            top: 0,
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 40,
              height: 40,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 16, whiteSpace: "nowrap", overflow: "hidden", flexShrink: 0, maxWidth: "100%", height: 40 }}>
            <Badge count={5} size="small">
              <Button
                type="text"
                icon={<BellOutlined style={{ fontSize: 18 }} />}
                style={{ width: 40, height: 40, minWidth: 40 }}
              />
            </Badge>
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: ({ key }) => {
                  if (key === "logout") handleLogout();
                },
              }}
              placement="bottomRight"
              arrow
              trigger={["click"]}
              overlayStyle={{ minWidth: 200 }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  padding: "4px 12px",
                  borderRadius: 8,
                  transition: "all 0.2s",
                  height: 40,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Avatar
                  style={{ background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)", color: "#000" }}
                  icon={<CrownOutlined />}
                  size={32}
                />
                <div style={{ display: "flex", flexDirection: "column", maxWidth: 140, minWidth: 0, lineHeight: 1 }}>
                  <span title={user?.name} style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1 }}>
                    {user?.name}
                  </span>
                  <span style={{ fontSize: 12, color: "#8c8c8c", whiteSpace: "nowrap", lineHeight: 1 }}>Super Admin</span>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#f5f5f9",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}