export const ROLES = ["USER", "STAFF", "SUPER_ADMIN"] as const;

export type Role = (typeof ROLES)[number];

export const ADMIN_ROLES = ["STAFF", "SUPER_ADMIN"] as const satisfies readonly Role[];

export const SUPER_ADMIN_ROLE = "SUPER_ADMIN" as const;

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && ROLES.some((role) => role === value);
}

export function isAdminRole(value: unknown): value is (typeof ADMIN_ROLES)[number] {
  return typeof value === "string" && ADMIN_ROLES.some((role) => role === value);
}
