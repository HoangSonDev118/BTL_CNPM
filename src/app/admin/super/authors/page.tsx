import { redirect } from "next/navigation";
import SuperAdminLayout from "../_components/SuperAdminLayout";
import SuperAdminAuthors from "../_components/SuperAdminAuthors";
import { getAuthenticatedUser } from "@/lib/auth";
import { SUPER_ADMIN_ROLE } from "@/lib/roles";

export default async function AuthorsPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.role !== SUPER_ADMIN_ROLE) {
    redirect("/");
  }

  return (
    <SuperAdminLayout>
      <SuperAdminAuthors />
    </SuperAdminLayout>
  );
}


