import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "16");
    const featured = searchParams.get("featured") === "true";
    const categorySlug = searchParams.get("category");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

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

    // Price filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice);
      }
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

    // Fetch books with pagination
    const [books, total, categories] = await Promise.all([
      prisma.book.findMany({
        where,
        orderBy,
        skip,
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
      }),
      prisma.book.count({ where }),
      prisma.category.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
        },
        orderBy: {
          name: "asc",
        },
      }),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

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
      total,
      page,
      limit,
      totalPages,
      categories,
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