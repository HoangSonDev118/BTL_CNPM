import { NextResponse } from "next/server";
import crypto from "crypto";
import {
  createSession,
  hashPassword,
  readUsers,
  toPublicUser,
  writeUsers,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";
  const phone = phoneRaw ? phoneRaw : undefined;

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Vui lòng nhập đầy đủ tên, email và mật khẩu." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Email không hợp lệ." }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Mật khẩu cần tối thiểu 6 ký tự." },
      { status: 400 }
    );
  }

  const users = await readUsers();
  if (users.some((user) => user.email === email)) {
    return NextResponse.json(
      { message: "Email đã được sử dụng. Vui lòng đăng nhập." },
      { status: 409 }
    );
  }

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  return createSession(newUser);
}

export async function GET() {
  const users = await readUsers();
  return NextResponse.json({ users: users.map(toPublicUser) });
}
