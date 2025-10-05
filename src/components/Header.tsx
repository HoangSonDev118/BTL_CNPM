"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Dropdown, Input, MenuProps, Space, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faRightFromBracket,
  faSearch,
  faUser,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "@/contexts/AuthContext";

const { Search } = Input;

const Header = () => {
  const [open, setOpen] = useState(false);
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
      <div className="bg-[#fff8e7] w-full">
        <div className="w-[1200px] flex justify-between items-center h-[100px] gap-10 max-w-[1200px] m-auto">
          <div className="flex-2">
            <Link href="/">
              <img src="/logos/logo.svg" className="w-12" alt="CNPM Books" />
            </Link>
          </div>

          <div className="flex-6">
            <Search
              addonBefore={<FontAwesomeIcon icon={faSearch} />}
              placeholder="Nhập để tìm kiếm sản phẩm của bạn"
              enterButton="Tìm kiếm"
              size="large"
            />
          </div>

          <div className="text-2xl flex justify-end gap-5 items-center flex-2">
            <div>
              <Dropdown
                menu={{ items: accountMenu, onClick: handleMenuClick }}
                arrow={{ pointAtCenter: true }}
                placement="bottomRight"
                open={open}
                onOpenChange={(flag) => setOpen(flag)}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <div
                    className={`cursor-pointer transition-colors ${
                      open ? "text-[#96C8DD]" : "text-[#535353]"
                    }`}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="text-[16px] ml-2">
                      {loading ? "Đang tải..." : user ? user.name : "Tài khoản"}
                    </span>
                  </div>
                </a>
              </Dropdown>
            </div>
            <div className="border h-6 border-[#c1c1c1]" />
            <div>
              <FontAwesomeIcon
                icon={faBagShopping}
                className="cursor-pointer hover:text-[#96C8DD] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
      <nav className="w-[1200px] flex justify-center gap-10 items-center my-5 text-[16px]">
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
    </div>
  );
};

export default Header;
