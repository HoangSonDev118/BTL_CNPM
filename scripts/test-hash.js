const crypto = require("crypto");

const storedHash = "PASTE_FULL_HASH_HERE";
const testPassword = "123";

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  
  if (!salt || !hash) {
    console.log("❌ Invalid hash format!");
    console.log("Hash should be: salt:hash");
    console.log("Got:", stored.substring(0, 100));
    return false;
  }
  
  console.log("Salt:", salt);
  console.log("Stored hash:", hash.substring(0, 50) + "...");
  
  const derived = crypto
    .pbkdf2Sync(password, salt, 150000, 64, "sha512")
    .toString("hex");
  
  console.log("Computed hash:", derived.substring(0, 50) + "...");
  console.log("\n✅ Match:", derived === hash);
  
  return derived === hash;
}

console.log("\n🔐 Testing password verification for '123'\n");
verifyPassword(testPassword, storedHash);