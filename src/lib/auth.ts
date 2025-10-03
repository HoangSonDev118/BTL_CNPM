import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  createdAt: string;
};

export type PublicUser = Pick<StoredUser, "id" | "name" | "email" | "phone" | "createdAt">;

const USERS_FILE_PATH = path.join(process.cwd(), "data", "users.json");
const TOKEN_COOKIE = "auth_token";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

async function ensureDataFile() {
  await fs.mkdir(path.dirname(USERS_FILE_PATH), { recursive: true });
  try {
    await fs.access(USERS_FILE_PATH);
  } catch (error) {
    await fs.writeFile(USERS_FILE_PATH, "[]", "utf8");
  }
}

export async function readUsers(): Promise<StoredUser[]> {
  await ensureDataFile();
  const file = await fs.readFile(USERS_FILE_PATH, "utf8");
  return JSON.parse(file) as StoredUser[];
}

export async function writeUsers(users: StoredUser[]) {
  await ensureDataFile();
  await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2), "utf8");
}

export function toPublicUser(user: StoredUser): PublicUser {
  const { passwordHash: _password, ...rest } = user;
  return rest;
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
  if (!salt) {
    return false;
  }
  const verify = hashPassword(password, salt);
  return verify === stored;
}

function base64UrlEncode(input: string) {
  return Buffer.from(input).toString("base64url");
}

function signJwt(payload: Record<string, unknown>, ttlSeconds = TOKEN_TTL_SECONDS) {
  const header = { alg: "HS256", typ: "JWT" };
  const issuedAt = Math.floor(Date.now() / 1000);
  const body = {
    ...payload,
    iat: issuedAt,
    exp: issuedAt + ttlSeconds,
  };
  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
    JSON.stringify(body)
  )}`;
  const secret = process.env.AUTH_SECRET ?? "insecure-dev-secret";
  const signature = crypto
    .createHmac("sha256", secret)
    .update(unsignedToken)
    .digest("base64url");
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

export async function createSession(user: StoredUser) {
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
  if (!token) {
    return null;
  }

  try {
    const payload = verifyJwt(token);
    const users = await readUsers();
    const user = users.find((entry) => entry.id === payload.userId);
    return user ? toPublicUser(user) : null;
  } catch (error) {
    return null;
  }
}
