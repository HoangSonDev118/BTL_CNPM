"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Dropdown, Input, MenuProps, Space, message, Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faRightFromBracket,
  faSearch,
  faUser,
  faGaugeHigh,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "@/contexts/AuthContext";

const { Search } = Input;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleMenuClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "logout") {
      await logout();
      message.success("Bạn đã đăng xuất thành công");
    }
    setOpen(false);
  };

  const adminMenuItems: MenuProps["items"] =
    user && (user.role === "SUPER_ADMIN" || user.role === "STAFF")
      ? [
          { type: "divider" as const },
          {
            key: "admin",
            icon: <FontAwesomeIcon icon={faGaugeHigh} />,
            label: (
              <Link className="text-[15px]" href={user.role === "SUPER_ADMIN" ? "/admin" : "/admin/staff"}>
                {user.role === "SUPER_ADMIN" ? "Trung tâm quản trị" : "Khu vực nhân viên"}
              </Link>
            ),
          },
        ]
      : [];

  const userMenuItems: MenuProps["items"] =
    user && user.role === "USER"
      ? [
          {
            key: "user-profile",
            icon: <FontAwesomeIcon icon={faUser} />,
            label: (
              <Link className="text-[15px]" href="/profile">
                Thông tin cá nhân & Đơn hàng
              </Link>
            ),
          },
        ]
      : [];

  const accountMenu: MenuProps["items"] = user
    ? [
        {
          key: "profile",
          label: (
            <div className="text-[15px]">
              Xin chào,
              <span className="ml-1 text-[#96C8DD]">{user.name}</span>
            </div>
          ),
          disabled: true,
        },
        ...userMenuItems,
        ...adminMenuItems,
        { type: "divider" as const },
        {
          key: "logout",
          label: <span className="text-[15px]">Đăng xuất</span>,
          icon: <FontAwesomeIcon icon={faRightFromBracket} />,
          danger: true,
        },
      ]
    : [
        {
          key: "login",
          label: (
            <Link className="text-[15px]" href="/auth/login">
              Đăng nhập
            </Link>
          ),
        },
        {
          key: "register",
          label: (
            <Link className="text-[15px]" href="/auth/register">
              Đăng ký
            </Link>
          ),
        },
      ];

  const catalogueMenu: MenuProps["items"] = [
    {
      key: "1",
      label: "Danh mục tổng hợp",
      children: [
        {
          key: "1-1",
          label: "Sách thiếu nhi",
        },
        {
          key: "1-2",
          label: "Truyện tranh",
        },
      ],
    },
    {
      key: "2",
      label: "Sách theo độ tuổi",
      children: [
        {
          key: "2-1",
          label: "0 - 5 tuổi",
        },
        {
          key: "2-2",
          label: "6 - 12 tuổi",
        },
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Header */}
      <div className="bg-[#fff8e7] w-full">
        <div className="max-w-[1200px] w-full mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-[80px] lg:h-[100px] gap-3 lg:gap-10">
            {/* Logo + Brand Name */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href="/">
                <img src="/logos/logo.svg" className="w-10 lg:w-12" alt="CNPM Books" />
              </Link>
              <Link href="/" className="hidden sm:block">
                <div className="text-[#e85757] font-extrabold text-lg lg:text-xl whitespace-nowrap">
                  Enfants <span className="text-[#6b6b6b] font-bold">Books</span>
                </div>
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:block flex-1 max-w-[500px] lg:max-w-[600px]">
              <Search
                addonBefore={<FontAwesomeIcon icon={faSearch} />}
                placeholder="Nhập để tìm kiếm sản phẩm của bạn"
                enterButton="Tìm kiếm"
                size="large"
              />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 lg:gap-5">
              {/* User Account Dropdown */}
              <div className="flex-shrink-0">
                <Dropdown
                  menu={{ items: accountMenu, onClick: handleMenuClick }}
                  arrow={{ pointAtCenter: true }}
                  placement="bottomRight"
                  open={open}
                  onOpenChange={(flag) => setOpen(flag)}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <div
                      className={`cursor-pointer transition-colors flex items-center gap-2 ${
                        open ? "text-[#96C8DD]" : "text-[#535353]"
                      }`}
                    >
                      <FontAwesomeIcon icon={faUser} className="text-xl lg:text-2xl" />
                      <span className="hidden lg:block text-[14px] xl:text-[16px] max-w-[100px] xl:max-w-[150px] truncate">
                        {loading ? "Đang tải..." : user ? user.name : "Tài khoản"}
                      </span>
                    </div>
                  </a>
                </Dropdown>
              </div>

              {/* Divider - Hidden on small screens */}
              <div className="hidden lg:block border h-6 border-[#c1c1c1]" />

              {/* Shopping Cart */}
              <div className="flex-shrink-0">
                <Link href="/cart">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="text-xl lg:text-2xl cursor-pointer hover:text-[#96C8DD] transition-colors"
                  />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-xl ml-2"
                onClick={() => setDrawerOpen(true)}
                aria-label="Menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <Search
              addonBefore={<FontAwesomeIcon icon={faSearch} />}
              placeholder="Tìm kiếm sản phẩm"
              enterButton="Tìm"
              size="middle"
            />
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex max-w-[1200px] w-full mx-auto justify-center gap-10 items-center my-5 text-[16px] px-6">
        <Link href="/" className="hover:text-[#96C8DD] transition-colors">
          Trang chủ
        </Link>

        <Dropdown menu={{ items: catalogueMenu }} arrow={{ pointAtCenter: true }}>
          <Space className="cursor-pointer hover:text-[#96C8DD] transition-colors">
            Danh mục sách
          </Space>
        </Dropdown>

        <span className="mx-10">
          <img src="/logos/logo.svg" className="w-12" alt="CNPM Books" />
        </span>

        <Link href="/books" className="hover:text-[#96C8DD] transition-colors">
          Sách đang ưu đãi
        </Link>

        <Link href="/contact" className="hover:text-[#96C8DD] transition-colors">
          Liên hệ
        </Link>
      </nav>

      {/* Mobile Drawer Navigation */}
      <Drawer
        title={
          <div className="flex items-center gap-3">
            <img src="/logos/logo.svg" className="w-10" alt="CNPM Books" />
            <div className="text-[#e85757] font-extrabold text-lg">
              Enfants <span className="text-[#6b6b6b] font-bold">Books</span>
            </div>
          </div>
        }
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
      >
        <div className="flex flex-col gap-4 text-[16px]">
          <Link 
            href="/" 
            className="py-3 border-b hover:text-[#96C8DD] transition-colors"
            onClick={() => setDrawerOpen(false)}
          >
            Trang chủ
          </Link>

          <div className="py-3 border-b">
            <div className="font-bold mb-2 text-[#6b6b6b]">Danh mục tổng hợp</div>
            <div className="pl-4 space-y-2">
              <div className="py-1 hover:text-[#96C8DD] cursor-pointer">Sách thiếu nhi</div>
              <div className="py-1 hover:text-[#96C8DD] cursor-pointer">Truyện tranh</div>
            </div>
          </div>

          <div className="py-3 border-b">
            <div className="font-bold mb-2 text-[#6b6b6b]">Sách theo độ tuổi</div>
            <div className="pl-4 space-y-2">
              <div className="py-1 hover:text-[#96C8DD] cursor-pointer">0 - 5 tuổi</div>
              <div className="py-1 hover:text-[#96C8DD] cursor-pointer">6 - 12 tuổi</div>
            </div>
          </div>

          <Link 
            href="/books" 
            className="py-3 border-b hover:text-[#96C8DD] transition-colors"
            onClick={() => setDrawerOpen(false)}
          >
            Sách đang ưu đãi
          </Link>

          <Link 
            href="/contact" 
            className="py-3 hover:text-[#96C8DD] transition-colors"
            onClick={() => setDrawerOpen(false)}
          >
            Liên hệ
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;