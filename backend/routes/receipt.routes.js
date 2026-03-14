import express from "express";
import { saveReceipt } from "../controllers/receipt.controllers.js";

const router = express.Router();

// POST /api/receipt
router.post("/", saveReceipt);

export default router;
