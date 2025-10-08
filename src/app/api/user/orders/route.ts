import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/user/orders - Lấy danh sách đơn hàng của user
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { message: "Vui lòng đăng nhập" },
        { status: 401 }
      );
    }

    // Fetch orders
    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          include: {
            book: {
              select: {
                id: true,
                title: true,
                coverImage: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform data
    const transformedOrders = orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt.toISOString(),
      total: Number(order.total),
      status: order.status,
      items: order.items.map((item) => ({
        id: item.id,
        bookId: item.book.id,
        bookTitle: item.book.title,
        bookImage: item.book.coverImage,
        quantity: item.quantity,
        price: Number(item.price),
      })),
    }));

    return NextResponse.json({
      success: true,
      orders: transformedOrders,
    });
  } catch (error) {
    console.error("[user/orders] Error:", error);
    return NextResponse.json(
      { message: "Không thể tải danh sách đơn hàng" },
      { status: 500 }
    );
  }
}