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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import { useDarkMode } from "@/contexts/DarkModeContext";

const { Header, Sider, Content } = Layout;

type StaffLayoutProps = {
  children: React.ReactNode;
};

export default function StaffLayout({ children }: StaffLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
          background: isDarkMode ? "#1a1d2e" : "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          transition: "background 0.3s",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
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
          theme={isDarkMode ? "dark" : "light"}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.2s" }}>
        <Header
          style={{
            padding: "0 24px",
            background: isDarkMode ? "#1a1d2e" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            position: "sticky",
            top: 0,
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            transition: "background 0.3s",
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
              color: isDarkMode ? "#d1d5db" : undefined,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 16, whiteSpace: "nowrap", overflow: "hidden", flexShrink: 0, maxWidth: "100%", height: 40 }}>
            {/* Dark Mode Toggle */}
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />}
              onClick={toggleDarkMode}
              style={{ 
                width: 40, 
                height: 40, 
                minWidth: 40,
                fontSize: 18,
                color: isDarkMode ? "#fbbf24" : "#64748b",
              }}
              title={isDarkMode ? "Chế độ sáng" : "Chế độ tối"}
            />
            
            <Badge count={3} size="small">
              <Button
                type="text"
                icon={<BellOutlined style={{ fontSize: 18 }} />}
                style={{ 
                  width: 40, 
                  height: 40, 
                  minWidth: 40,
                  color: isDarkMode ? "#d1d5db" : undefined,
                }}
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
              overlayStyle={{ minWidth: 180 }}
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
                  e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.1)" : "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Avatar
                  style={{ backgroundColor: "#696cff" }}
                  icon={<UserOutlined />}
                  size={32}
                />
                {!collapsed && (
                  <div style={{ display: "flex", flexDirection: "column", maxWidth: 120, minWidth: 0, lineHeight: 1 }}>
                    <span
                      title={user?.name}
                      style={{ 
                        fontSize: 14, 
                        fontWeight: 500, 
                        whiteSpace: "nowrap", 
                        overflow: "hidden", 
                        textOverflow: "ellipsis", 
                        lineHeight: 1,
                        color: isDarkMode ? "#d1d5db" : undefined,
                      }}
                    >
                      {user?.name}
                    </span>
                    <span style={{ fontSize: 12, color: "#8c8c8c", whiteSpace: "nowrap", lineHeight: 1 }}>Nhân viên</span>
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
            background: isDarkMode ? "#16192b" : "#f5f5f9",
            transition: "background 0.3s",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}