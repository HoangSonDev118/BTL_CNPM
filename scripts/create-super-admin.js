const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const readline = require("readline");

const prisma = new PrismaClient();

function hashPassword(password, salt) {
  const usedSalt = salt ?? crypto.randomBytes(16).toString("hex");
  const derived = crypto.pbkdf2Sync(password, usedSalt, 150000, 64, "sha512").toString("hex");
  return `${usedSalt}:${derived}`;
}

// Tạo interface để nhập dữ liệu từ console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log("\n╔════════════════════════════════════════════╗");
  console.log("║   🔐 TẠO TÀI KHOẢN SUPER ADMIN MỚI       ║");
  console.log("╚════════════════════════════════════════════╝\n");

  try {
    // Nhập thông tin từ người dùng
    const name = await askQuestion("👤 Nhập tên (Full Name): ");
    const email = await askQuestion("📧 Nhập email: ");
    const phone = await askQuestion("📱 Nhập số điện thoại (có thể bỏ qua): ");
    const password = await askQuestion("🔑 Nhập mật khẩu: ");
    const confirmPassword = await askQuestion("🔑 Xác nhận mật khẩu: ");

    console.log("\n");

    // Validate dữ liệu
    if (!name || !email || !password) {
      console.error("❌ Tên, email và mật khẩu là bắt buộc!");
      process.exit(1);
    }

    if (password !== confirmPassword) {
      console.error("❌ Mật khẩu xác nhận không khớp!");
      process.exit(1);
    }

    if (password.length < 6) {
      console.error("❌ Mật khẩu phải có ít nhất 6 ký tự!");
      process.exit(1);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("❌ Email không hợp lệ!");
      process.exit(1);
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      console.log("⚠️  Email này đã tồn tại trong hệ thống!");
      const update = await askQuestion("Bạn có muốn cập nhật tài khoản này thành Super Admin? (y/n): ");
      
      if (update.toLowerCase() === "y" || update.toLowerCase() === "yes") {
        const updatedUser = await prisma.user.update({
          where: { email: email.toLowerCase() },
          data: {
            name,
            phone: phone || null,
            passwordHash: hashPassword(password),
            role: "SUPER_ADMIN",
          },
        });

        console.log("\n✅ Cập nhật tài khoản thành công!");
        console.log("📋 Thông tin tài khoản:");
        console.log(`   ID: ${updatedUser.id}`);
        console.log(`   Tên: ${updatedUser.name}`);
        console.log(`   Email: ${updatedUser.email}`);
        console.log(`   Số điện thoại: ${updatedUser.phone || "Không có"}`);
        console.log(`   Quyền: ${updatedUser.role}`);
        console.log(`   Ngày tạo: ${updatedUser.createdAt.toLocaleString("vi-VN")}`);
      } else {
        console.log("\n❌ Hủy bỏ thao tác!");
      }
    } else {
      // Tạo tài khoản mới
      const newUser = await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          phone: phone || null,
          passwordHash: hashPassword(password),
          role: "SUPER_ADMIN",
        },
      });

      console.log("\n✅ Tạo tài khoản Super Admin thành công!");
      console.log("📋 Thông tin tài khoản:");
      console.log(`   ID: ${newUser.id}`);
      console.log(`   Tên: ${newUser.name}`);
      console.log(`   Email: ${newUser.email}`);
      console.log(`   Số điện thoại: ${newUser.phone || "Không có"}`);
      console.log(`   Quyền: ${newUser.role}`);
      console.log(`   Ngày tạo: ${newUser.createdAt.toLocaleString("vi-VN")}`);
    }

    console.log("\n➡️  Đăng nhập bằng thông tin sau:");
    console.log(`   Email: ${email}`);
    console.log(`   Mật khẩu: ${password}\n`);

    console.log("╔════════════════════════════════════════════╗");
    console.log("║   🎉 Hoàn tất!                            ║");
    console.log("╚════════════════════════════════════════════╝\n");
  } catch (error) {
    console.error("\n❌ Lỗi khi tạo tài khoản:", error);
    process.exit(1);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main();