import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * API lấy sách cho các showcase đặc biệt
 * - featured: Sản phẩm nổi bật
 * - bestseller: Sản phẩm bán chạy
 * - promotion: Sản phẩm ưu đãi (có giảm giá)
 */
export async function GET(request: Request) {
  try {
    const limit = 6; // Mỗi showcase lấy 6 sản phẩm

    // 1. Sản phẩm nổi bật (isFeatured = true)
    const featuredBooks = await prisma.book.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
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
        images: {
          orderBy: { order: "asc" },
          take: 3,
        },
      },
    });

    // 2. Sản phẩm bán chạy (soldCount cao nhất)
    const bestsellerBooks = await prisma.book.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        soldCount: "desc",
      },
      take: limit,
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
        images: {
          orderBy: { order: "asc" },
          take: 3,
        },
      },
    });

    // 3. Sản phẩm ưu đãi (có originalPrice > price)
    const promotionBooks = await prisma.book.findMany({
      where: {
        isActive: true,
        originalPrice: {
          not: null,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
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
        images: {
          orderBy: { order: "asc" },
          take: 3,
        },
      },
    });

    // Transform function
    const transformBook = (book: any) => {
      const discount = book.originalPrice
        ? Math.round(
            ((parseFloat(book.originalPrice) - parseFloat(book.price)) /
              parseFloat(book.originalPrice)) *
              100
          )
        : 0;

      return {
        id: book.id,
        title: book.title,
        slug: book.slug,
        description: book.description,
        price: book.price.toString(),
        originalPrice: book.originalPrice?.toString(),
        discount,
        stock: book.stock,
        coverImage: book.coverImage,
        isFeatured: book.isFeatured,
        viewCount: book.viewCount,
        soldCount: book.soldCount,
        author: book.author,
        category: book.category,
        images: book.images,
      };
    };

    return NextResponse.json({
      success: true,
      data: {
        featured: featuredBooks.map(transformBook),
        bestseller: bestsellerBooks.map(transformBook),
        promotion: promotionBooks.map(transformBook),
      },
    });
  } catch (error) {
    console.error("[showcase/GET] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải danh sách showcase",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}