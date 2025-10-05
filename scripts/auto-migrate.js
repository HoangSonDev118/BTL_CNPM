const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Script tự động chạy migrations
 * - Kiểm tra kết nối DB
 * - Kiểm tra tình trạng migrations
 * - Baseline nếu DB không trống
 * - Deploy migrations mới
 * - Generate Prisma Client
 */

const MIGRATIONS_DIR = path.join(__dirname, "..", "prisma", "migrations");
const SCHEMA_PATH = path.join(__dirname, "..", "prisma", "schema.prisma");

function runCommand(command, options = {}) {
  try {
    console.log(`\n🔄 Chạy lệnh: ${command}`);
    const output = execSync(command, {
      encoding: "utf-8",
      stdio: "pipe",
      ...options,
    });
    console.log(output);
    return { success: true, output };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stderr: error.stderr?.toString() || "",
      stdout: error.stdout?.toString() || "",
    };
  }
}

function getMigrationFolders() {
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    console.log("⚠️  Không tìm thấy thư mục migrations");
    return [];
  }
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => {
      const fullPath = path.join(MIGRATIONS_DIR, file);
      return fs.statSync(fullPath).isDirectory() && file !== "migration_lock.toml";
    })
    .sort();
}

async function main() {
  console.log("\n╔════════════════════════════════════════════╗");
  console.log("║   🚀 Bắt đầu quy trình Auto Migration     ║");
  console.log("╚════════════════════════════════════════════╝\n");

  // Bỏ qua migrate khi chạy trong Vercel build (hoặc khi set cờ SKIP_DB_MIGRATION)
  if (process.env.VERCEL === "1" || process.env.SKIP_DB_MIGRATION === "true") {
    console.log("⚠️  Đang chạy trong môi trường build của Vercel");
    console.log("⏭️  Bỏ qua bước migrate database...");
    console.log("💡 Sau khi deploy xong hãy chạy migrate thủ công\n");

    console.log("🔨 Đang generate Prisma Client...");
    const generateResult = runCommand(`npx prisma generate --schema="${SCHEMA_PATH}"`);

    if (generateResult.success) {
      console.log("✅ Generate Prisma Client thành công!\n");
      console.log("╔════════════════════════════════════════════╗");
      console.log("║   🎉 Build hoàn tất                        ║");
      console.log("╚════════════════════════════════════════════╝\n");
      return;
    } else {
      console.error("❌ Generate Prisma Client thất bại");
      console.error("Lỗi:", generateResult.stderr);
      process.exit(1);
    }
  }

  // 1) Kiểm tra tồn tại schema
  if (!fs.existsSync(SCHEMA_PATH)) {
    console.error("❌ Không tìm thấy file schema tại:", SCHEMA_PATH);
    process.exit(1);
  }

  // 2) Test kết nối DB
  console.log("📡 BƯỚC 1: Kiểm tra kết nối cơ sở dữ liệu...");
  const connectionTest = runCommand(`npx prisma db execute --schema="${SCHEMA_PATH}" --stdin`, {
    input: "SELECT 1;",
  });

  if (!connectionTest.success) {
    console.log("⚠️  Test kết nối trực tiếp thất bại, thử validate schema...");
    const validateResult = runCommand(`npx prisma validate --schema="${SCHEMA_PATH}"`);

    if (!validateResult.success) {
      console.error("\n❌ Validate schema thất bại!");
      console.error("💡 Kiểm tra biến môi trường DATABASE_URL trong file .env");
      console.error('\nĐịnh dạng gợi ý:');
      console.error('DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres"');
      console.error("\n⚠️  Ghi chú: nếu cổng 5432 bị chặn, hãy thử bật VPN hoặc mở cổng");
      process.exit(1);
    }
    console.log("✅ Schema hợp lệ");
  } else {
    console.log("✅ Kết nối cơ sở dữ liệu OK");
  }
  console.log("");

  // 3) Kiểm tra trạng thái migrations
  console.log("📋 BƯỚC 2: Kiểm tra trạng thái migrations...");
  const statusResult = runCommand(`npx prisma migrate status --schema="${SCHEMA_PATH}"`);

  const statusOutput = statusResult.stdout || "";
  const statusError = statusResult.stderr || "";

  if (statusOutput.includes("Database schema is not empty") || statusError.includes("P3005")) {
    console.log("\n⚠️  Database không trống. Cần baseline...\n");

    const migrations = getMigrationFolders();

    if (migrations.length === 0) {
      console.log("✅ Không có migration nào cần xử lý\n");
    } else {
      console.log(`📦 Tìm thấy ${migrations.length} migration:`);
      migrations.forEach((m, i) => console.log(`   ${i + 1}. ${m}`));
      console.log("");

      // Mark tất cả migration hiện có là "đã áp dụng"
      for (const migration of migrations) {
        console.log(`🔧 Đánh dấu đã áp dụng: ${migration}`);
        const resolveResult = runCommand(
          `npx prisma migrate resolve --applied "${migration}" --schema="${SCHEMA_PATH}"`
        );

        if (resolveResult.success) {
          console.log(`   ✅ ${migration} đã được đánh dấu`);
        } else {
          if (
            resolveResult.stderr.includes("already been applied") ||
            resolveResult.stdout.includes("already been applied")
          ) {
            console.log(`   ⏭️  ${migration} đã áp dụng trước đó, bỏ qua`);
          } else {
            console.error(`   ❌ Không thể resolve ${migration}`);
            console.error("   Lỗi:", resolveResult.stderr || resolveResult.error);
          }
        }
      }
      console.log("");
    }
  } else if (
    statusOutput.includes("No pending migrations") ||
    statusOutput.includes("Database schema is up to date")
  ) {
    console.log("✅ Database đã khớp schema, không còn pending migrations!\n");
  } else if (statusOutput.includes("pending migration")) {
    console.log("⚠️  Có migrations đang chờ áp dụng\n");
  }

  // 4) Deploy migrations
  console.log("📤 BƯỚC 3: Deploy migrations...");
  const deployResult = runCommand(`npx prisma migrate deploy --schema="${SCHEMA_PATH}"`);

  const deployOutput = deployResult.stdout || "";
  const deployError = deployResult.stderr || "";

  if (deployResult.success) {
    console.log("✅ Deploy migrations thành công!\n");
  } else {
    if (deployOutput.includes("No pending migrations") || deployError.includes("No pending migrations")) {
      console.log("✅ Không có migration mới để deploy\n");
    } else {
      console.error("❌ Deploy migrations thất bại");
      console.error("Lỗi:", deployError || deployResult.error);

      if (deployError.includes("Can't reach database") || deployError.includes("Connection refused")) {
        console.error("\n💡 Gợi ý khắc phục:");
        console.error("   1) Kiểm tra kết nối mạng / VPN (cổng 5432 có thể bị chặn)");
        console.error("   2) Kiểm tra biến DATABASE_URL trong .env");
        console.error("   3) Đảm bảo database server đang chạy");
      }

      process.exit(1);
    }
  }

  // 5) Generate Prisma Client
  console.log("🔨 BƯỚC 4: Generate Prisma Client...");
  const generateResult = runCommand(`npx prisma generate --schema="${SCHEMA_PATH}"`);

  if (generateResult.success) {
    console.log("✅ Generate Prisma Client thành công!\n");
  } else {
    console.error("❌ Generate Prisma Client thất bại");
    console.error("Lỗi:", generateResult.stderr);
    process.exit(1);
  }

  console.log("╔════════════════════════════════════════════╗");
  console.log("║   🎉 Quy trình Migration đã hoàn tất!     ║");
  console.log("╚════════════════════════════════════════════╝\n");
}

main().catch((error) => {
  console.error("\n❌ Lỗi không mong muốn trong quá trình migration:", error);
  process.exit(1);
});
