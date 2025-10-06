// src/app/admin/super/inventory/page.tsx
import { redirect } from "next/navigation";
import SuperAdminLayout from "../_components/SuperAdminLayout";
import SuperAdminInventory from "../_components/SuperAdminInventory";
import { getAuthenticatedUser } from "@/lib/auth";
import { SUPER_ADMIN_ROLE } from "@/lib/roles";

export default async function InventoryPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.role !== SUPER_ADMIN_ROLE) {
    redirect("/");
  }

  return (
    <SuperAdminLayout>
      <SuperAdminInventory />
    </SuperAdminLayout>
  );
}