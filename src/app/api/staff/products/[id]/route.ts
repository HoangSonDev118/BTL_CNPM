import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PATCH /api/staff/products/[id] - Cập nhật sản phẩm
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["STAFF", "SUPER_ADMIN"]);

    const { id } = await context.params;
    const body = await request.json();

    const product = await prisma.book.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.book.update({
      where: { id },
      data: {
        ...body,
        price: body.price ? Number(body.price) : undefined,
        originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      },
      include: {
        author: true,
        category: true,
      },
    });

    return NextResponse.json({
      message: "Cập nhật sản phẩm thành công",
      product: {
        id: updatedProduct.id,
        title: updatedProduct.title,
        author: updatedProduct.author.name,
        category: updatedProduct.category.name,
        price: Number(updatedProduct.price),
        stock: updatedProduct.stock,
        isActive: updatedProduct.isActive,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Không thể cập nhật sản phẩm" },
      { status: 500 }
    );
  }
}

// DELETE /api/staff/products/[id] - Xóa sản phẩm
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["STAFF", "SUPER_ADMIN"]);

    const { id } = await context.params;

    const product = await prisma.book.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Không thể xóa sản phẩm" },
      { status: 500 }
    );
  }
}