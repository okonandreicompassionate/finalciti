import { Pool } from "pg";

const db = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_nrEiM9hasJO3@ep-purple-breeze-a49xr1iv-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

export default db;