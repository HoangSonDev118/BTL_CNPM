<<<<<<< HEAD
import Link from "next/link";
import { redirect } from "next/navigation";

=======
import { redirect } from "next/navigation";
import StaffLayout from "./_components/StaffLayout";
import StaffDashboard from "./_components/StaffDashboard";
>>>>>>> 208fe48 (Cơ bản trang staff + books + home + category)
import { getAuthenticatedUser } from "@/lib/auth";
import { SUPER_ADMIN_ROLE } from "@/lib/roles";

export default async function StaffDashboardPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.role === SUPER_ADMIN_ROLE) {
    redirect("/admin");
  }

  if (user.role !== "STAFF") {
    redirect("/");
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#f5f7fb] px-4 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-3 rounded-3xl bg-white px-8 py-6 shadow-lg md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#a0a8c3]">Bảng điều khiển nhân viên</p>
            <h1 className="text-3xl font-semibold text-[#1f2937]">Xin chào, {user.name}</h1>
            <p className="text-sm text-[#64748b]">
              Bạn có thể truy cập các nghiệp vụ xử lý đơn hàng và quản lý sách khi chúng sẵn sàng.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Link
              href="/"
              className="rounded-xl border border-[#d6d9e6] px-5 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#03c3ec] hover:text-[#036b82]"
            >
              Về trang bán hàng
            </Link>
            <Link
              href="/admin/login"
              className="rounded-xl bg-[#03c3ec] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#0795bb]"
            >
              Đăng nhập quản trị
            </Link>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-dashed border-[#cbd5f5] bg-white/90 p-8 shadow-md">
            <h2 className="text-xl font-semibold text-[#1f2937]">Tác vụ sắp ra mắt</h2>
            <p className="mt-3 text-sm text-[#64748b]">
              Đội ngũ kỹ thuật đang hoàn thiện các tính năng xử lý đơn hàng và quản lý kho sách dành riêng cho nhân viên.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#475569]">
              <li>• Duyệt và cập nhật trạng thái đơn hàng.</li>
              <li>• Tạo mới, chỉnh sửa và ẩn/hiển thị sản phẩm.</li>
              <li>• Báo cáo nhanh tình trạng tồn kho.</li>
            </ul>
          </section>

          <section className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#03c3ec] via-[#4f46e5] to-[#4338ca] p-8 text-white shadow-xl">
            <div>
              <h2 className="text-xl font-semibold">Hướng dẫn nội bộ</h2>
              <p className="mt-3 text-sm text-white/80">
                Hãy đảm bảo bạn chỉ thao tác trên các đơn hàng hoặc đầu sách được phân công. Mọi hành động đều được ghi lại để đảm bảo an toàn dữ liệu.
              </p>
            </div>
            <Link
              href="/admin/login"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white/90 px-4 py-3 text-sm font-semibold text-[#1f2937] transition hover:bg-white"
            >
              Xem lại hướng dẫn chi tiết
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
=======
    <StaffLayout>
      <StaffDashboard />
    </StaffLayout>
  );
}
>>>>>>> 208fe48 (Cơ bản trang staff + books + home + category)
