import Link from "next/link";
import { redirect } from "next/navigation";

import AdminUserOverview from "./_components/AdminUserOverview";
import { getAuthenticatedUser } from "@/lib/auth";
import { SUPER_ADMIN_ROLE } from "@/lib/roles";

export default async function AdminPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.role === "STAFF") {
    redirect("/admin/staff");
  }

  if (user.role !== SUPER_ADMIN_ROLE) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3 rounded-3xl bg-white px-8 py-6 shadow-lg md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#a0a8c3]">Bảng điều khiển</p>
            <h1 className="text-3xl font-semibold text-[#1f2937]">Xin chào, {user.name}</h1>
            <p className="text-sm text-[#64748b]">
              Quản lý người dùng, phân quyền và các nghiệp vụ quan trọng trong hệ thống CNPM Books.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Link
              href="/"
              className="rounded-xl border border-[#d6d9e6] px-5 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#696cff] hover:text-[#3730a3]"
            >
              Về trang bán hàng
            </Link>
            <Link
              href="/auth/login"
              className="rounded-xl bg-[#696cff] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#5a5dcf]"
            >
              Đăng nhập người dùng
            </Link>
          </div>
        </header>

        <AdminUserOverview />
      </div>
    </div>
  );
}
