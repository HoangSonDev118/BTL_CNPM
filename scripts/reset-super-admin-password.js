// TRANG NÀY ĐỂ RESET MẬT KHẨU SUPER ADMIN
// CHỈ DÙNG KHI QUÊN MẬT KHẨU ADMIN
// NÊN XÓA TRANG NÀY SAU KHI ĐÃ RESET XONG

const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");

// Ưu tiên dùng DATABASE_URL từ môi trường; nếu muốn ép URL thì mở comment bên dưới
const prisma = new PrismaClient({
  // datasources: {
  //   db: {
  //     url: "postgresql://postgres:ductoan6424@db.ssyepgonenhogixoyuki.supabase.co:5432/postgres",
  //   },
  // },
});

function hashPassword(password, salt) {
  const usedSalt = salt ?? crypto.randomBytes(16).toString("hex");
  const derived = crypto.pbkdf2Sync(password, usedSalt, 150000, 64, "sha512").toString("hex");
  return `${usedSalt}:${derived}`;
}

async function main() {
  console.log("\n🔄 Đang reset mật khẩu Super Admin...\n");

  // Tuỳ biến ở đây nếu muốn đổi mật khẩu mặc định
  const newPassword = "123";
  const newHash = hashPassword(newPassword);

  console.log("🔐 Mật khẩu mới (tạm thời):", newPassword);
  console.log("🔑 Hash (preview):", newHash.substring(0, 50) + "...");

  const email = "ndt06042004@gmail.com";

  const updated = await prisma.user.update({
    where: { email },
    data: { passwordHash: newHash },
  });

  console.log("\n✅ Đã reset mật khẩu thành công!");
  console.log("👤 Email:", updated.email);
  console.log("🧩 Quyền:", updated.role);
  console.log("\n➡️ Đăng nhập bằng thông tin sau:");
  console.log(`   Email: ${email}`);
  console.log(`   Mật khẩu: ${newPassword}\n`);
}

main()
  .catch((error) => {
    console.error("\n❌ Lỗi khi reset mật khẩu:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
