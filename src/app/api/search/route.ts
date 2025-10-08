import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get search parameters
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '16');
    const sortBy = searchParams.get('sortBy') || 'relevance';
    const categorySlug = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
    };

    if (query.trim()) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { author: { name: { contains: query, mode: 'insensitive' } } },
        { category: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }

    // Category filter
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
    let orderBy: any = { createdAt: 'desc' };
    
    switch (sortBy) {
      case 'relevance':
        orderBy = [
          { soldCount: 'desc' },
          { viewCount: 'desc' },
        ];
        break;
      case 'bestseller':
        orderBy = { soldCount: 'desc' };
        break;
      case 'popular':
        orderBy = { viewCount: 'desc' };
        break;
      case 'price-asc':
        orderBy = { price: 'asc' };
        break;
      case 'price-desc':
        orderBy = { price: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Fetch books with pagination
    const [books, total] = await Promise.all([
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
            orderBy: { order: 'asc' },
            take: 5,
          },
        },
      }),
      prisma.book.count({ where }),
    ]);

    let authors: any[] = [];
    let categories: any[] = [];

    if (query.trim() && !categorySlug && !minPrice && !maxPrice) {
      // Only fetch these for initial search (not when filtering)
      [authors, categories] = await Promise.all([
        prisma.author.findMany({
          where: { 
            name: { contains: query, mode: 'insensitive' }
          },
          include: {
            _count: {
              select: { books: true }
            }
          },
          take: 5
        }),
        prisma.category.findMany({
          where: { 
            name: { contains: query, mode: 'insensitive' }
          },
          include: {
            _count: {
              select: { books: true }
            }
          },
          take: 5
        })
      ]);
    }

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Transform books data
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
      query,
      books: transformedBooks,
      authors,
      categories,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error('[search/GET] Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Không thể tìm kiếm',
        error: error instanceof Error ? error.message : String(error),
        books: [],
        total: 0,
        page: 1,
        limit: 16,
        totalPages: 0,
      },
      { status: 500 }
    );
  }
}