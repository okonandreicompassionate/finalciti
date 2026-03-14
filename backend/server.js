import express from "express";
import cors from "cors";
import testRoute from "./routes/testRoute.js";
import dashboardRoutes from "./routes/dashboard.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", testRoute);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});