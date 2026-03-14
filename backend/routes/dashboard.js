import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const userResult = await db.query(
      "SELECT id, full_name, email FROM users WHERE email = $1 LIMIT 1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    const cardsResult = await db.query(
      "SELECT id, card_number AS number, status, balance, brand, bg FROM cards WHERE user_id = $1 ORDER BY id ASC",
      [user.id]
    );

    const transactionsResult = await db.query(
      "SELECT avatar, name, time_label AS time, amount, income FROM transactions WHERE user_id = $1 ORDER BY id DESC LIMIT 10",
      [user.id]
    );

    const historyResult = await db.query(
      "SELECT month_label, income_total, expense_total FROM balance_history WHERE user_id = $1 ORDER BY id ASC",
      [user.id]
    );

    const incomeResult = await db.query(
      "SELECT COALESCE(SUM(amount), 0) AS total_income FROM transactions WHERE user_id = $1 AND income = true",
      [user.id]
    );

    const expenseResult = await db.query(
      "SELECT COALESCE(SUM(ABS(amount)), 0) AS total_expenses FROM transactions WHERE user_id = $1 AND income = false",
      [user.id]
    );

    const totalIncome = Number(incomeResult.rows[0].total_income);
    const totalExpenses = Number(expenseResult.rows[0].total_expenses);
    const savings = totalIncome - totalExpenses;

    res.json({
      user,
      cards: cardsResult.rows.map((card) => ({
        ...card,
        balance: `$${Number(card.balance).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      })),
      stats: [
        {
          title: "Total Income",
          value: `$${totalIncome.toLocaleString()}`,
          change: "↑ 12% from last month",
          icon: "📈",
          iconBg: "#00a651",
          valueColor: "#00a651",
          negative: false,
        },
        {
          title: "Total Expenses",
          value: `$${totalExpenses.toLocaleString()}`,
          change: "↓ 5% from last month",
          icon: "📊",
          iconBg: "#cc0000",
          valueColor: "#cc0000",
          negative: true,
        },
        {
          title: "Savings",
          value: `$${savings.toLocaleString()}`,
          change: "↑ 8% this month",
          icon: "💾",
          iconBg: "#0066cc",
          valueColor: "#0066cc",
          negative: false,
        },
      ],
      transactions: transactionsResult.rows.map((tx) => ({
        ...tx,
        amount: `${tx.income ? "+" : "-"}$${Math.abs(Number(tx.amount)).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      })),
      chart: historyResult.rows,
      totalBalance: `$${savings.toLocaleString()}`
    });
  } catch (error) {
    console.error("Dashboard route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;