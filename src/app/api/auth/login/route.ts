import { NextResponse } from "next/server";
import {
  asAuthUserRecord,
  authUserSelect,
  createSession,
  verifyPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isRole, type Role } from "@/lib/roles";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const requestId = request.headers.get("x-request-id") ?? undefined;
  const requireRoleInput = body.requireRole;
  
  // LOG 1: Request info
  console.log('[LOGIN] Attempt:', {
    email,
    hasPassword: !!password,
    passwordLength: password.length,
    requireRole: requireRoleInput,
    requestId
  });

  try {
    if (!email || !password) {
      console.log('[LOGIN] ❌ Missing credentials');
      return NextResponse.json(
        { message: "Vui long nhap email va mat khau." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: authUserSelect,
    });
    
    // LOG 2: User found?
    if (!user) {
      console.log('[LOGIN] ❌ User not found:', email);
      return NextResponse.json(
        { message: "Thong tin dang nhap khong chinh xac." },
        { status: 401 }
      );
    }
    
    console.log('[LOGIN] ✅ User found:', {
      email: user.email,
      role: user.role,
      hashPreview: user.passwordHash?.substring(0, 50) + '...',
      hashLength: user.passwordHash?.length
    });

    const authUser = asAuthUserRecord(user);
    
    // LOG 3: Password verification
    console.log('[LOGIN] Verifying password...');
    console.log('[LOGIN] Input password length:', password.length);
    console.log('[LOGIN] Stored hash format:', authUser.passwordHash.split(':').length === 2 ? 'salt:hash (correct)' : 'INVALID FORMAT');
    
    const valid = verifyPassword(password, authUser.passwordHash);
    console.log('[LOGIN] Password valid:', valid);
    
    if (!valid) {
      console.log('[LOGIN] ❌ Password mismatch');
      return NextResponse.json(
        { message: "Thong tin dang nhap khong chinh xac." },
        { status: 401 }
      );
    }

    const requireRoles = Array.isArray(requireRoleInput)
      ? requireRoleInput.filter((role: unknown): role is Role => isRole(role))
      : isRole(requireRoleInput)
        ? [requireRoleInput]
        : [];

    // LOG 4: Role check
    console.log('[LOGIN] Role check:', {
      userRole: authUser.role,
      requireRoles,
      hasRequiredRoles: requireRoles.length > 0,
      passed: requireRoles.length === 0 || requireRoles.includes(authUser.role)
    });

    if (requireRoles.length > 0 && !requireRoles.includes(authUser.role)) {
      console.log('[LOGIN] ❌ Insufficient role - User has:', authUser.role, 'Required one of:', requireRoles);
      return NextResponse.json(
        { message: "Tai khoan nay khong co du quyen de truy cap khu vuc yeu cau." },
        { status: 403 }
      );
    }

    console.log('[LOGIN] ✅ Login successful - Creating session');
    return createSession(authUser);
    
  } catch (error) {
    const serializedError =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : { message: String(error) };

    console.error('[LOGIN] ❌ Exception occurred:', {
      email,
      requestId,
      error: serializedError
    });
    
    return NextResponse.json(
      { message: "Dang nhap that bai. Vui long thu lai sau." },
      { status: 500 }
    );
  }
}