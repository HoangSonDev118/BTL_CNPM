import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await params để lấy slug
    const { slug } = await params;

    // Fetch book by slug
    const book = await prisma.book.findUnique({
      where: {
        slug,
        isActive: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            slug: true,
            avatar: true,
            biography: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Không tìm thấy sách",
        },
        { status: 404 }
      );
    }

    // Increment view count (async, don't wait)
    prisma.book
      .update({
        where: { id: book.id },
        data: { viewCount: { increment: 1 } },
      })
      .catch((err) => console.error("Failed to increment view count:", err));

    // Transform data
    const transformedBook = {
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
    };

    return NextResponse.json({
      success: true,
      book: transformedBook,
    });
  } catch (error) {
    console.error("[books/[slug]/GET] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải thông tin sách",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}