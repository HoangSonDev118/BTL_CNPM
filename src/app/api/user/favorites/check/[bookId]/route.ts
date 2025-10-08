import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/user/favorites/check/[bookId] - Kiểm tra sách có trong danh sách yêu thích không
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ bookId: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json({
        success: true,
        isFavorite: false,
      });
    }

    const { bookId } = await context.params;

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: bookId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      isFavorite: !!favorite,
    });
  } catch (error) {
    console.error("[user/favorites/check] Error:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "Không thể kiểm tra trạng thái yêu thích",
        isFavorite: false,
      },
      { status: 500 }
    );
  }
}