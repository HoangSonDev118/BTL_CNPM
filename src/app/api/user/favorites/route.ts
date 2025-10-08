import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/user/favorites - Lấy danh sách sách yêu thích
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { message: "Vui lòng đăng nhập" },
        { status: 401 }
      );
    }

    // Fetch favorites with book details
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: user.id,
      },
      include: {
        book: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
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
    const transformedFavorites = favorites.map((favorite) => ({
      id: favorite.book.id,
      title: favorite.book.title,
      slug: favorite.book.slug,
      coverImage: favorite.book.coverImage,
      price: favorite.book.price.toString(),
      originalPrice: favorite.book.originalPrice?.toString() || null,
      author: favorite.book.author,
      category: favorite.book.category,
      soldCount: favorite.book.soldCount,
      viewCount: favorite.book.viewCount,
      isFeatured: favorite.book.isFeatured,
      addedAt: favorite.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      favorites: transformedFavorites,
    });
  } catch (error) {
    console.error("[user/favorites] Error:", error);
    return NextResponse.json(
      { message: "Không thể tải danh sách yêu thích" },
      { status: 500 }
    );
  }
}

// GET /api/user/favorites/ids - Lấy danh sách ID sách yêu thích (để check nhanh)
export async function HEAD(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json({ favoriteIds: [] });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      select: { bookId: true },
    });

    return NextResponse.json({
      favoriteIds: favorites.map(f => f.bookId),
    });
  } catch (error) {
    return NextResponse.json({ favoriteIds: [] });
  }
}

// POST /api/user/favorites - Toggle sách vào/ra danh sách yêu thích
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
    const { bookId } = body;

    if (!bookId) {
      return NextResponse.json(
        { message: "Thiếu thông tin bookId" },
        { status: 400 }
      );
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { id: true, title: true },
    });

    if (!book) {
      return NextResponse.json(
        { message: "Không tìm thấy sách" },
        { status: 404 }
      );
    }

    // Check if already in favorites
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: bookId,
        },
      },
    });

    if (existingFavorite) {
      // Remove from favorites
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
        action: "removed",
        message: `Đã xóa "${book.title}" khỏi danh sách yêu thích`,
      });
    }

    // Add to favorites
    await prisma.favorite.create({
      data: {
        userId: user.id,
        bookId: bookId,
      },
    });

    return NextResponse.json({
      success: true,
      action: "added",
      message: `Đã thêm "${book.title}" vào danh sách yêu thích`,
    });
  } catch (error) {
    console.error("[user/favorites] POST Error:", error);
    return NextResponse.json(
      { message: "Không thể thực hiện thao tác" },
      { status: 500 }
    );
  }
}