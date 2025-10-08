import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE /api/user/favorites/[bookId] - Xóa sách khỏi danh sách yêu thích
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ bookId: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { message: "Vui lòng đăng nhập" },
        { status: 401 }
      );
    }

    const { bookId } = await context.params;

    // Check if favorite exists
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: bookId,
        },
      },
    });

    if (!favorite) {
      return NextResponse.json(
        { message: "Sách không có trong danh sách yêu thích" },
        { status: 404 }
      );
    }

    // Delete favorite
    await prisma.favorite.delete({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: bookId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa khỏi danh sách yêu thích",
    });
  } catch (error) {
    console.error("[user/favorites/DELETE] Error:", error);
    return NextResponse.json(
      { message: "Không thể xóa khỏi danh sách yêu thích" },
      { status: 500 }
    );
  }
}