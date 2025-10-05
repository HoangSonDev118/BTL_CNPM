// File path: src/app/api/staff/products/route.ts

import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/staff/products - Lấy danh sách sản phẩm
export async function GET(request: NextRequest) {
  try {
    await requireRole(["STAFF", "SUPER_ADMIN"]);

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { author: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (category && category !== "all") {
      where.categoryId = category;
    }

    if (status === "active") {
      where.isActive = true;
    } else if (status === "inactive") {
      where.isActive = false;
    }

    const products = await prisma.book.findMany({
      where,
      include: {
        author: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      products: products.map((p) => ({
        id: p.id,
        title: p.title,
        author: p.author.name,
        category: p.category.name,
        price: Number(p.price),
        stock: p.stock,
        isActive: p.isActive,
        coverImage: p.coverImage,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Không thể tải danh sách sản phẩm" },
      { status: 500 }
    );
  }
}

// POST /api/staff/products - Tạo sản phẩm mới
export async function POST(request: NextRequest) {
  try {
    await requireRole(["STAFF", "SUPER_ADMIN"]);

    const body = await request.json();
    const {
      title,
      authorId,
      categoryId,
      description,
      price,
      originalPrice,
      stock,
      isActive,
      coverImage,
    } = body;

    // Validate required fields
    if (!title || !authorId || !categoryId || !price) {
      return NextResponse.json(
        { message: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    const product = await prisma.book.create({
      data: {
        title,
        slug: `${slug}-${Date.now()}`,
        description,
        price,
        originalPrice,
        stock: stock || 0,
        isActive: isActive ?? true,
        coverImage,
        authorId,
        categoryId,
      },
      include: {
        author: true,
        category: true,
      },
    });

    return NextResponse.json(
      {
        message: "Tạo sản phẩm thành công",
        product: {
          id: product.id,
          title: product.title,
          author: product.author.name,
          category: product.category.name,
          price: Number(product.price),
          stock: product.stock,
          isActive: product.isActive,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Không thể tạo sản phẩm" },
      { status: 500 }
    );
  }
}

