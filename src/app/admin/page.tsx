import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import { SUPER_ADMIN_ROLE } from "@/lib/roles";

export default async function AdminPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Redirect based on role
  if (user.role === SUPER_ADMIN_ROLE) {
    redirect("/admin/super");
  }

  if (user.role === "STAFF") {
    redirect("/admin/staff");
  }

  // Default redirect for other roles
  redirect("/");
}
