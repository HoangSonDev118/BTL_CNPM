import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const featured = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") || "10");
    const categorySlug = searchParams.get("category");
    const sortBy = searchParams.get("sortBy") || "createdAt"; // createdAt, soldCount, viewCount, price

    // Build where clause
    const where: any = {
      isActive: true,
    };

    if (featured) {
      where.isFeatured = true;
    }

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      };
    }

    // Build orderBy
    let orderBy: any = { createdAt: "desc" };
    
    switch (sortBy) {
      case "bestseller":
        orderBy = { soldCount: "desc" };
        break;
      case "popular":
        orderBy = { viewCount: "desc" };
        break;
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    // Fetch books
    const books = await prisma.book.findMany({
      where,
      orderBy,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            slug: true,
            avatar: true,
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
          take: 5,
        },
      },
    });

    // Transform data
    const transformedBooks = books.map((book) => ({
      id: book.id,
      title: book.title,
      slug: book.slug,
      description: book.description,
      price: book.price.toString(),
      originalPrice: book.originalPrice?.toString(),
      stock: book.stock,
      publishYear: book.publishYear,
      publisher: book.publisher,
      pages: book.pages,
      language: book.language,
      isbn: book.isbn,
      coverImage: book.coverImage,
      isFeatured: book.isFeatured,
      viewCount: book.viewCount,
      soldCount: book.soldCount,
      author: book.author,
      category: book.category,
      images: book.images,
      createdAt: book.createdAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      books: transformedBooks,
      total: transformedBooks.length,
    });
  } catch (error) {
    console.error("[books/GET] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải danh sách sách",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}