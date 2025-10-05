const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function hashPassword(password, salt) {
  const usedSalt = salt ?? crypto.randomBytes(16).toString("hex");
  const derived = crypto.pbkdf2Sync(password, usedSalt, 150000, 64, "sha512").toString("hex");
  return `${usedSalt}:${derived}`;
}

async function main() {
  console.log(" Khởi tạo cấu trúc DB cơ bản (User, Role)...\n");

  // Bật extension cần thiết (nếu có)
  await prisma.$executeRawUnsafe('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
  console.log("✅ Đã bật/kiểm tra extension pgcrypto");

  // Tạo enum Role nếu chưa có
  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
        CREATE TYPE "Role" AS ENUM ('USER', 'STAFF', 'SUPER_ADMIN');
      END IF;
    END $$;
  `);
  console.log("✅ Enum \"Role\" đã sẵn sàng");

  // Tạo bảng User nếu chưa có
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "passwordHash" TEXT NOT NULL,
      "role" "Role" NOT NULL DEFAULT 'USER',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("✅ Bảng \"User\" đã sẵn sàng");

  // Unique index cho email
  await prisma.$executeRawUnsafe(
    'CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");'
  );
  console.log("✅ Unique index cho email đã sẵn sàng");

  // Đảm bảo cột role đúng kiểu/DEFAULT/NOT NULL
  await prisma.$executeRawUnsafe(
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" "Role" NOT NULL DEFAULT 'USER';`
  );
  await prisma.$executeRawUnsafe(
    `ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role" USING "role"::"Role";`
  );
  await prisma.$executeRawUnsafe(
    `ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';`
  );
  await prisma.$executeRawUnsafe(
    `ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL;`
  );
  console.log("✅ Cột \"role\" được đảm bảo đúng cấu hình");

  // Seed Super Admin mặc định
  const defaultSuperAdmin = {
    email: "ndt060402004@gmail.com",
    name: "Default Super Admin",
    passwordHash: hashPassword("123"),
  };

  await prisma.user.upsert({
    where: { email: defaultSuperAdmin.email },
    update: {
      name: defaultSuperAdmin.name,
      passwordHash: defaultSuperAdmin.passwordHash,
      role: "SUPER_ADMIN",
    },
    create: {
      name: defaultSuperAdmin.name,
      email: defaultSuperAdmin.email,
      passwordHash: defaultSuperAdmin.passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  console.log("✅ Super Admin mặc định đã được đảm bảo tồn tại (email: ndt060402004@gmail.com)\n");
  console.log("🎉 Khởi tạo DB hoàn tất!\n");
}

main().catch((e) => {
  console.error("❌ Lỗi khi khởi tạo DB:", e);
  process.exit(1);
});
