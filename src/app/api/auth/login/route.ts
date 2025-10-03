import { NextResponse } from "next/server";
import { createSession, readUsers, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { message: "Vui lòng nhập email và mật khẩu." },
      { status: 400 }
    );
  }

  const users = await readUsers();
  const user = users.find((entry) => entry.email === email);
  if (!user) {
    return NextResponse.json(
      { message: "Thông tin đăng nhập không chính xác." },
      { status: 401 }
    );
  }

  const valid = verifyPassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { message: "Thông tin đăng nhập không chính xác." },
      { status: 401 }
    );
  }

  return createSession(user);
}
