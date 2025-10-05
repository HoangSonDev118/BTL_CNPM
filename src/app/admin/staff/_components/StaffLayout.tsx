// Layout chính với sidebar và header
"use client";

import { useState, useEffect } from "react";
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
} from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";

const { Header, Sider, Content } = Layout;

type StaffLayoutProps = {
  children: React.ReactNode;
};

export default function StaffLayout({ children }: StaffLayoutProps) {
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
      label: "Thông tin cá nhân",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      key: "/admin/staff",
      icon: <DashboardOutlined />,
      label: <Link href="/admin/staff">Dashboard</Link>,
    },
    {
      key: "/admin/staff/products",
      icon: <ShoppingOutlined />,
      label: <Link href="/admin/staff/products">Quản lý sản phẩm</Link>,
    },
    {
      key: "/admin/staff/orders",
      icon: <InboxOutlined />,
      label: <Link href="/admin/staff/orders">Quản lý đơn hàng</Link>,
    },
    {
      key: "/admin/staff/inventory",
      icon: <BarChartOutlined />,
      label: <Link href="/admin/staff/inventory">Báo cáo tồn kho</Link>,
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
          background: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {!collapsed ? (
            <Link href="/admin/staff" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src="/logos/logo.svg" alt="Logo" style={{ height: 32 }} />
              <span style={{ fontSize: 18, fontWeight: 600, color: "#696cff" }}>
                EnfantsBooks
              </span>
            </Link>
          ) : (
            <img src="/logos/logo.svg" alt="Logo" style={{ height: 32 }} />
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ borderRight: 0, marginTop: 16 }}
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
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Badge count={3} size="small">
              <Button
                type="text"
                icon={<BellOutlined style={{ fontSize: 18 }} />}
                style={{ width: 40, height: 40 }}
              />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  padding: "4px 12px",
                  borderRadius: 8,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Avatar
                  style={{ backgroundColor: "#696cff" }}
                  icon={<UserOutlined />}
                  size={36}
                />
                {!collapsed && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{user?.name}</span>
                    <span style={{ fontSize: 12, color: "#8c8c8c" }}>Nhân viên</span>
                  </div>
                )}
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