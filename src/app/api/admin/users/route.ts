import { NextResponse } from "next/server";

import {
  ForbiddenError,
  UnauthorizedError,
  asAuthUserRecord,
  authUserSelect,
  requireRole,
  toPublicUser,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    await requireRole("SUPER_ADMIN");

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: authUserSelect,
    });

    return NextResponse.json({
      users: users.map((user) => toPublicUser(asAuthUserRecord(user))),
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: "Vui lòng đăng nhập." }, { status: 401 });
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        { message: "Bạn không có quyền truy cập tài nguyên này." },
        { status: 403 }
      );
    }

    console.error("[admin/users] Failed to load users", { error });
    return NextResponse.json(
      { message: "Không thể tải dữ liệu quản trị. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
