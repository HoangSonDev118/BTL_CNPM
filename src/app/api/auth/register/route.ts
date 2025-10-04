import { NextResponse } from "next/server";

import { createSession, hashPassword, toPublicUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";
  const phone = phoneRaw ? phoneRaw : undefined;
  const requestId = request.headers.get("x-request-id") ?? undefined;

  try {
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Vui long nhap day du ten, email va mat khau." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Email khong hop le." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Mat khau can toi thieu 6 ky tu." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email da duoc su dung. Vui long dang nhap." },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash: hashPassword(password),
      },
    });

    return createSession(newUser);
  } catch (error) {
    const serializedError =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : { message: String(error) };

    console.error("[auth/register] Failed to register user", {
      email,
      requestId,
      error: serializedError,
    });

    return NextResponse.json(
      { message: "Dang ky that bai. Vui long thu lai sau." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ users: users.map(toPublicUser) });
}
