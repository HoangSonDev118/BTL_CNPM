// File: src/app/api/user/change-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, verifyPassword, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/user/change-password - Đổi mật khẩu
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { message: "Vui lòng đăng nhập" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Validate
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "Mật khẩu mới phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    // Get user with password hash
    const userWithPassword = await prisma.user.findUnique({
      where: { id: user.id },
      select: { passwordHash: true },
    });

    if (!userWithPassword?.passwordHash) {
      return NextResponse.json(
        { message: "Không tìm thấy thông tin người dùng" },
        { status: 404 }
      );
    }

    // Verify current password
    const isValidPassword = verifyPassword(currentPassword, userWithPassword.passwordHash);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Mật khẩu hiện tại không đúng" },
        { status: 401 }
      );
    }

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashPassword(newPassword),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Đổi mật khẩu thành công!",
    });
  } catch (error) {
    console.error("[user/change-password] Error:", error);
    return NextResponse.json(
      { message: "Không thể đổi mật khẩu. Vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}