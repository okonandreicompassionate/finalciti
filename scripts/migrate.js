import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import db from "../backend/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsPath = path.join(__dirname, "../migrations");

async function runMigrations() {
  try {
    const files = fs.readdirSync(migrationsPath).sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsPath, file), "utf8");

      console.log(`Running migration: ${file}`);

      await db.query(sql);
    }

    console.log("✅ All migrations finished");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

runMigrations();