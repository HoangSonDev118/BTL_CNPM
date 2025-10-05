import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Prisma, type User as PrismaUser } from "@prisma/client";

import { prisma } from "./prisma";
import { isAdminRole, SUPER_ADMIN_ROLE, isRole, type Role } from "./roles";

export type AuthUserRecord = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  passwordHash: string;
  role: Role;
  createdAt: Date;
};

export type PublicUser = Omit<AuthUserRecord, "passwordHash">;

const TOKEN_COOKIE = "auth_token";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

const authUserSelection = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    name: true,
    email: true,
    phone: true,
    passwordHash: true,
    role: true,
    createdAt: true,
  },
});

export const authUserSelect = authUserSelection.select;

type PrismaAuthUser = Prisma.UserGetPayload<typeof authUserSelection>;
type PrismaUserLike = PrismaAuthUser | PrismaUser;

export function asAuthUserRecord(user: PrismaUserLike): AuthUserRecord {
  const role = isRole(user.role) ? user.role : "USER";
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    passwordHash: user.passwordHash,
    role,
    createdAt: user.createdAt,
  };
}

export function toPublicUser(user: AuthUserRecord): PublicUser {
  // loại bỏ passwordHash khi trả về client
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

export function hashPassword(password: string, salt?: string) {
  const usedSalt = salt ?? crypto.randomBytes(16).toString("hex");
  const derived = crypto
    .pbkdf2Sync(password, usedSalt, 150000, 64, "sha512")
    .toString("hex");
  return `${usedSalt}:${derived}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt] = stored.split(":");
  if (!salt) return false;
  const verify = hashPassword(password, salt);
  return verify === stored;
}

function base64UrlEncode(input: string) {
  return Buffer.from(input).toString("base64url");
}

function signJwt(payload: Record<string, unknown>, ttlSeconds = TOKEN_TTL_SECONDS) {
  const header = { alg: "HS256", typ: "JWT" } as const;
  const issuedAt = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: issuedAt, exp: issuedAt + ttlSeconds };
  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
    JSON.stringify(body)
  )}`;
  const secret = process.env.AUTH_SECRET ?? "insecure-dev-secret";
  const signature = crypto.createHmac("sha256", secret).update(unsignedToken).digest("base64url");
  return `${unsignedToken}.${signature}`;
}

function decodeSegment<T>(segment: string): T {
  return JSON.parse(Buffer.from(segment, "base64url").toString("utf8")) as T;
}

export type TokenPayload = {
  userId: string;
  iat: number;
  exp: number;
};

export function verifyJwt(token: string): TokenPayload {
  const [headerSegment, payloadSegment, signatureSegment] = token.split(".");
  if (!headerSegment || !payloadSegment || !signatureSegment) {
    throw new Error("Token malformed");
  }

  const unsignedToken = `${headerSegment}.${payloadSegment}`;
  const secret = process.env.AUTH_SECRET ?? "insecure-dev-secret";
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(unsignedToken)
    .digest("base64url");

  const actualBuffer = Buffer.from(signatureSegment);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (actualBuffer.length !== expectedBuffer.length) {
    throw new Error("Token signature mismatch");
  }
  if (!crypto.timingSafeEqual(actualBuffer, expectedBuffer)) {
    throw new Error("Token signature mismatch");
  }

  const payload = decodeSegment<TokenPayload>(payloadSegment);
  if (payload.exp <= Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }
  return payload;
}

export async function createSession(user: AuthUserRecord) {
  const token = signJwt({ userId: user.id });
  const response = NextResponse.json({ user: toPublicUser(user) });
  response.cookies.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: TOKEN_TTL_SECONDS,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export function destroySessionResponse() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(TOKEN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export async function getAuthenticatedUser(): Promise<PublicUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  if (!token) return null;

  try {
    const payload = verifyJwt(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: authUserSelect,
    });
    return user ? toPublicUser(asAuthUserRecord(user)) : null;
  } catch {
    return null;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function requireAuthenticatedUser() {
  const user = await getAuthenticatedUser();
  if (!user) throw new UnauthorizedError();
  return user;
}

export async function requireRole(role: Role | Role[]) {
  const user = await requireAuthenticatedUser();
  const allowedRoles = Array.isArray(role) ? role : [role];
  if (!allowedRoles.includes(user.role)) throw new ForbiddenError();
  return user;
}

export function isAdmin(user: PublicUser | null): boolean {
  return !!user && isAdminRole(user.role);
}

export function isSuperAdmin(user: PublicUser | null): boolean {
  return user?.role === SUPER_ADMIN_ROLE;
}
