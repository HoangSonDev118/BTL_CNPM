import { NextResponse } from "next/server";

import { createSession, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const requestId = request.headers.get("x-request-id") ?? undefined;

  try {
    if (!email || !password) {
      return NextResponse.json(
        { message: "Vui long nhap email va mat khau." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "Thong tin dang nhap khong chinh xac." },
        { status: 401 }
      );
    }

    const valid = verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { message: "Thong tin dang nhap khong chinh xac." },
        { status: 401 }
      );
    }

    return createSession(user);
  } catch (error) {
    const serializedError =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : { message: String(error) };

    console.error("[auth/login] Failed to log user in", {
      email,
      requestId,
      error: serializedError,
    });

    return NextResponse.json(
      { message: "Dang nhap that bai. Vui long thu lai sau." },
      { status: 500 }
    );
  }
}
