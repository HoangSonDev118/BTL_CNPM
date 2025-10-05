import { redirect } from "next/navigation";
import StaffLayout from "../_components/StaffLayout";
import StaffOrders from "../_components/StaffOrders";
import { getAuthenticatedUser } from "@/lib/auth";
import { SUPER_ADMIN_ROLE } from "@/lib/roles";

export default async function OrdersPage() {
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
    <StaffLayout>
      <StaffOrders />
    </StaffLayout>
  );
}