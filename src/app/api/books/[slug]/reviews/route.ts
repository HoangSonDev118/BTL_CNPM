import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";

// GET /api/books/[slug]/reviews - Lấy danh sách reviews của sách
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    // Find book by slug
    const book = await prisma.book.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy sách" },
        { status: 404 }
      );
    }

    // Get reviews with user info
    const reviews = await prisma.review.findMany({
      where: {
        bookId: book.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate average rating
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    // Transform reviews
    const transformedReviews = reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt.toISOString(),
      user: {
        id: review.user.id,
        name: review.user.name,
      },
    }));

    return NextResponse.json({
      success: true,
      reviews: transformedReviews,
      stats: {
        total: reviews.length,
        averageRating: Math.round(avgRating * 10) / 10,
      },
    });
  } catch (error) {
    console.error("[reviews/GET] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải danh sách đánh giá",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// POST /api/books/[slug]/reviews - Tạo review mới
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Vui lòng đăng nhập để đánh giá" },
        { status: 401 }
      );
    }

    const { slug } = await context.params;
    const body = await request.json();
    const { rating, comment } = body;

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Đánh giá phải từ 1 đến 5 sao" },
        { status: 400 }
      );
    }

    if (!comment || comment.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập nội dung đánh giá" },
        { status: 400 }
      );
    }

    if (comment.trim().length > 1000) {
      return NextResponse.json(
        { success: false, message: "Nội dung đánh giá không được vượt quá 1000 ký tự" },
        { status: 400 }
      );
    }

    // Find book
    const book = await prisma.book.findUnique({
      where: { slug },
      select: { id: true, title: true },
    });

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy sách" },
        { status: 404 }
      );
    }

    // Check if user already reviewed this book
    const existingReview = await prisma.review.findFirst({
      where: {
        bookId: book.id,
        userId: user.id,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, message: "Bạn đã đánh giá sách này rồi" },
        { status: 409 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment: comment.trim(),
        bookId: book.id,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Đánh giá của bạn đã được gửi thành công",
        review: {
          id: review.id,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt.toISOString(),
          user: {
            id: review.user.id,
            name: review.user.name,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[reviews/POST] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Không thể gửi đánh giá. Vui lòng thử lại sau",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// PUT /api/books/[slug]/reviews?reviewId=xxx - Cập nhật review
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Vui lòng đăng nhập" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get("reviewId");

    if (!reviewId) {
      return NextResponse.json(
        { success: false, message: "Thiếu reviewId" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { rating, comment } = body;

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Đánh giá phải từ 1 đến 5 sao" },
        { status: 400 }
      );
    }

    if (!comment || comment.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập nội dung đánh giá" },
        { status: 400 }
      );
    }

    if (comment.trim().length > 1000) {
      return NextResponse.json(
        { success: false, message: "Nội dung đánh giá không được vượt quá 1000 ký tự" },
        { status: 400 }
      );
    }

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy đánh giá" },
        { status: 404 }
      );
    }

    if (existingReview.userId !== user.id) {
      return NextResponse.json(
        { success: false, message: "Bạn không có quyền chỉnh sửa đánh giá này" },
        { status: 403 }
      );
    }

    // Update review
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating: parseInt(rating),
        comment: comment.trim(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật đánh giá thành công",
      review: {
        id: updatedReview.id,
        rating: updatedReview.rating,
        comment: updatedReview.comment,
        createdAt: updatedReview.createdAt.toISOString(),
        updatedAt: updatedReview.updatedAt.toISOString(),
        user: {
          id: updatedReview.user.id,
          name: updatedReview.user.name,
        },
      },
    });
  } catch (error) {
    console.error("[reviews/PUT] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Không thể cập nhật đánh giá",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// DELETE /api/books/[slug]/reviews?reviewId=xxx - Xoá review
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Vui lòng đăng nhập" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get("reviewId");

    if (!reviewId) {
      return NextResponse.json(
        { success: false, message: "Thiếu reviewId" },
        { status: 400 }
      );
    }

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy đánh giá" },
        { status: 404 }
      );
    }

    if (existingReview.userId !== user.id) {
      return NextResponse.json(
        { success: false, message: "Bạn không có quyền xoá đánh giá này" },
        { status: 403 }
      );
    }

    // Delete review
    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json({
      success: true,
      message: "Đã xoá đánh giá thành công",
    });
  } catch (error) {
    console.error("[reviews/DELETE] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Không thể xoá đánh giá",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}