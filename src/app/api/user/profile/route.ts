
// File: src/app/api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/user/profile - Lấy thông tin profile
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { message: "Vui lòng đăng nhập" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("[user/profile] GET Error:", error);
    return NextResponse.json(
      { message: "Không thể tải thông tin người dùng" },
      { status: 500 }
    );
  }
}

// PUT /api/user/profile - Cập nhật thông tin profile
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { message: "Vui lòng đăng nhập" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, phone } = body;

    // Validate
    if (!name) {
      return NextResponse.json(
        { message: "Vui lòng nhập họ tên" },
        { status: 400 }
      );
    }

    // Validate phone nếu có
    if (phone && !/^\d{9,11}$/.test(phone)) {
      return NextResponse.json(
        { message: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        phone: phone || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật thông tin thành công!",
    });
  } catch (error) {
    console.error("[user/profile] PUT Error:", error);
    return NextResponse.json(
      { message: "Không thể cập nhật thông tin. Vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
