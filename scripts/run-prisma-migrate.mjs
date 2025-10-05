// import { spawnSync as nativeSpawnSync } from 'node:child_process';
// const isWindows = process.platform === 'win32';
// const command = 'npx';
// const args = ['--yes', 'prisma', 'migrate', 'deploy'];
// const result = nativeSpawnSync(command, args, {
//   stdio: 'pipe',
//   encoding: 'utf-8',
//   shell: isWindows,
// });

// if (result.stdout) {
//   process.stdout.write(result.stdout);
// }
// if (result.stderr) {
//   process.stderr.write(result.stderr);
// }

// if (result.error) {
//   console.error('\nFailed to run `prisma migrate deploy`:', result.error.message);
//   if (result.error.code === 'ENOENT') {
//     console.error('Could not locate `npx`. Ensure Node.js and npm are installed correctly.');
//   }
//   process.exit(1);
// }

// if (result.status === 0) {
//   process.exit(0);
// }

// const combinedOutput = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
// if (
//   /P1001/.test(combinedOutput) ||
//   /Can't reach database server/.test(combinedOutput) ||
//   /Network is unreachable/.test(combinedOutput)
// ) {
//   console.warn('\n⚠️  Skipping `prisma migrate deploy` because the database server is unreachable.');
//   console.warn('    Ensure the DATABASE_URL in your .env file points to an accessible database before running migrations.');
//   process.exit(0);
// }

// process.exit(result.status ?? 1);