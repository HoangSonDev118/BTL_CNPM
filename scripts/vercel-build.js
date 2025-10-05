// const { execSync } = require('child_process');

// /**
//  * Vercel build script
//  * - Skip database migration trong build time
//  * - Chỉ generate Prisma Client
//  */

// function runCommand(command) {
//   try {
//     console.log(`\n🔄 Running: ${command}`);
//     const output = execSync(command, {
//       encoding: 'utf-8',
//       stdio: 'inherit'
//     });
//     return true;
//   } catch (error) {
//     console.error(`\n❌ Command failed: ${command}`);
//     console.error(error.message);
//     return false;
//   }
// }

// async function main() {
//   console.log('\n╔════════════════════════════════════════════╗');
//   console.log('║   🚀 Vercel Build Process Started         ║');
//   console.log('╚════════════════════════════════════════════╝\n');

//   // Chỉ generate Prisma Client, không chạy migration
//   console.log('🔨 Generating Prisma Client...');
//   const generateSuccess = runCommand('npx prisma generate');
  
//   if (!generateSuccess) {
//     console.error('\n❌ Failed to generate Prisma Client');
//     process.exit(1);
//   }

//   console.log('\n✅ Prisma Client generated successfully!');
//   console.log('\n💡 Note: Database migrations should be run manually via:');
//   console.log('   1. Vercel Dashboard → Settings → Environment Variables');
//   console.log('   2. Add DATABASE_URL');
//   console.log('   3. Run: npx prisma migrate deploy\n');

//   console.log('╔════════════════════════════════════════════╗');
//   console.log('║   🎉 Build Process Completed!             ║');
//   console.log('╚════════════════════════════════════════════╝\n');
// }

// main().catch(error => {
//   console.error('\n❌ Build process failed:', error);
//   process.exit(1);
// });   