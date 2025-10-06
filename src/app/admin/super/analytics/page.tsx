import { redirect } from "next/navigation";
import SuperAdminLayout from "../_components/SuperAdminLayout";
import SuperAdminAnalytics from "../_components/SuperAdminAnalytics";
import { getAuthenticatedUser } from "@/lib/auth";
import { SUPER_ADMIN_ROLE } from "@/lib/roles";

export default async function AnalyticsPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.role !== SUPER_ADMIN_ROLE) {
    redirect("/");
  }

  return (
    <SuperAdminLayout>
        <SuperAdminAnalytics />
    </SuperAdminLayout>
  );
}