try {
  console.log("🚀 Starting app...");

  require('./.next/standalone/server.js');
  
  console.log("✅ server.js completed"); // This won’t be called if it crashes internally
} catch (error) {
  console.error("❌ Failed to start app:", error);
  process.exit(1);
}
