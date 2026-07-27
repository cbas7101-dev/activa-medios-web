import { db } from "./index";
import { user } from "./schema";

async function seed() {
  console.log("Seeding database...");

  const existingUsers = await db.select().from(user).limit(1);
  if (existingUsers.length > 0) {
    console.log("Users already exist — skipping seed");
    process.exit(0);
  }

  console.log("Seed complete. Create your admin user via POST /api/auth/setup");
  console.log("   Example:");
  console.log("   curl -X POST http://localhost:4321/api/auth/setup \\");
  console.log('     -H "Content-Type: application/json" \\');
  console.log('     -d \'{"email":"admin@activamedios.ec","password":"tu-password","name":"Admin"}\'');
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
