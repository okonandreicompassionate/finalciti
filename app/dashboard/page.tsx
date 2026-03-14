"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CardItem = {
  number: string;
  status: string;
  balance: string;
  brand: string;
  bg: string;
};

type StatItem = {
  title: string;
  value: string;
  change: string;
  icon: string;
  iconBg: string;
  valueColor: string;
  negative: boolean;
};

type TransactionItem = {
  avatar: string;
  name: string;
  time: string;
  amount: string;
  income: boolean;
};

type ChartItem = {
  month_label: string;
  income_total: number;
  expense_total: number;
};

type DashboardData = {
  user: {
    id: number;
    full_name: string;
    email: string;
  };
  cards: CardItem[];
  stats: StatItem[];
  transactions: TransactionItem[];
  chart: ChartItem[];
  totalBalance: string;
};

const CHART_WIDTH = 900;
const CHART_HEIGHT = 300;
const LEFT_PAD = 50;
const RIGHT_PAD = 50;
const TOP_PAD = 40;
const BOTTOM_PAD = 60;
const GRAPH_HEIGHT = CHART_HEIGHT - TOP_PAD - BOTTOM_PAD;

function buildLinePath(values: number[], maxValue: number) {
  if (!values.length) return "";

  const usableWidth = CHART_WIDTH - LEFT_PAD - RIGHT_PAD;
  const stepX = values.length > 1 ? usableWidth / (values.length - 1) : 0;

  const points = values.map((value, index) => {
    const x = LEFT_PAD + stepX * index;
    const y =
      TOP_PAD + (GRAPH_HEIGHT - (value / Math.max(maxValue, 1)) * GRAPH_HEIGHT);
    return { x, y };
  });

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Monthly");
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navItems = useMemo(
    () => [
      { label: "Dashboard", icon: "📊", href: "/dashboard" },
      { label: "Budget Planner", icon: "💰", href: "/savings" },
      { label: "Transactions", icon: "💳", href: "/transactions" },
      { label: "Accounts", icon: "🏦", href: "/accounts" },
      { label: "Payments", icon: "📤", href: "/payments" },
      { label: "Reports", icon: "📈", href: "/notifications" },
    ],
    []
  );

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const storedUser =
          typeof window !== "undefined"
            ? localStorage.getItem("hubio_user")
            : null;

        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const email = parsedUser?.email || "demo@hubio.com";

        
          const res = await fetch(
  `https://end-g8il.onrender.com/api/dashboard/${encodeURIComponent(email)}`,
  {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to load dashboard");
        }

        setDashboardData(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const cards = dashboardData?.cards || [];
  const stats = dashboardData?.stats || [];
  const transactions = dashboardData?.transactions || [];
  const chart = dashboardData?.chart || [];
  const totalBalance = dashboardData?.totalBalance || "$0.00";
  const userName = dashboardData?.user?.full_name || "Frank Lin Pedro";
  const userAvatar = userName.charAt(0).toUpperCase() || "A";

  const filteredTransactions = transactions.filter((tx) =>
    `${tx.name} ${tx.time}`.toLowerCase().includes(search.toLowerCase())
  );

  const incomeValues = chart.map((item) => Number(item.income_total));
  const expenseValues = chart.map((item) => Number(item.expense_total));
  const maxChartValue = Math.max(...incomeValues, ...expenseValues, 1);

  const incomePath = buildLinePath(incomeValues, maxChartValue);
  const expensePath = buildLinePath(expenseValues, maxChartValue);

  const yAxisValues = [
    0,
    Math.round(maxChartValue * 0.25),
    Math.round(maxChartValue * 0.5),
    Math.round(maxChartValue * 0.75),
    Math.round(maxChartValue),
  ];

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f5f7fa",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
        }}
      >
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f5f7fa",
          color: "#cc0000",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #0066cc;
          --primary-dark: #004999;
          --primary-light: #0080ff;
          --secondary: #e8f1ff;
          --bg-dark: #f5f7fa;
          --bg-white: #ffffff;
          --text-primary: #1a1a1a;
          --text-secondary: #666666;
          --text-muted: #999999;
          --border: #e0e0e0;
          --border-light: #f0f0f0;
          --success: #00a651;
          --danger: #cc0000;
          --warning: #ff9900;
        }

        html,
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
            sans-serif;
          background: var(--bg-dark);
          color: var(--text-primary);
          line-height: 1.6;
        }

        .dashboard-root {
          display: flex;
          height: 100vh;
        }

        .sidebar {
          width: 260px;
          background: var(--bg-white);
          border-right: 1px solid var(--border);
          padding: 1.5rem;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 3px;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 2rem;
          letter-spacing: -0.5px;
          text-decoration: none;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.9rem;
          border-left: 3px solid transparent;
          background: transparent;
          border-top: none;
          border-right: none;
          border-bottom: none;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          color: var(--primary);
          background: var(--secondary);
        }

        .nav-item.active {
          color: var(--primary);
          background: var(--secondary);
          border-left-color: var(--primary);
        }

        .nav-icon {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          flex-shrink: 0;
        }

        .premium-card {
          margin-top: auto;
          padding: 1.25rem;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #f0f5ff 0%, #e8f1ff 100%);
          border: 1px solid var(--secondary);
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .premium-card:hover {
          border-color: var(--primary);
          background: linear-gradient(135deg, #e8f1ff 0%, #e0ebff 100%);
          box-shadow: 0 2px 8px rgba(0, 102, 204, 0.1);
        }

        .premium-badge {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .premium-title {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0.5rem 0;
          color: var(--text-primary);
        }

        .premium-subtitle {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .premium-btn {
          width: 100%;
          padding: 0.6rem;
          background: var(--primary);
          border: none;
          border-radius: 0.5rem;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.85rem;
        }

        .premium-btn:hover {
          background: var(--primary-dark);
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.2);
        }

        .main-content {
          margin-left: 260px;
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .main-content::-webkit-scrollbar {
          width: 8px;
        }

        .main-content::-webkit-scrollbar-track {
          background: var(--bg-dark);
        }

        .main-content::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 4px;
        }

        .header {
          padding: 1.25rem 2rem;
          background: var(--bg-white);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-dark);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 0.65rem 1rem;
          width: 300px;
          transition: all 0.2s ease;
        }

        .search-bar:focus-within {
          border-color: var(--primary);
          background: var(--bg-white);
          box-shadow: 0 2px 6px rgba(0, 102, 204, 0.1);
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          width: 100%;
          outline: none;
          font-size: 0.875rem;
        }

        .search-bar input::placeholder {
          color: var(--text-muted);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-btn {
          width: 36px;
          height: 36px;
          border-radius: 0.5rem;
          border: 1px solid var(--border);
          background: var(--bg-white);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-size: 1rem;
        }

        .header-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--secondary);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 0.5rem;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }

        .user-avatar:hover {
          background: var(--primary-dark);
        }

        .content {
          padding: 2rem;
          flex: 1;
          overflow-y: auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .page-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .cards-section {
          margin-bottom: 2.5rem;
        }

        .section-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cards-carousel {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          padding-bottom: 0.75rem;
          scroll-behavior: smooth;
        }

        .cards-carousel::-webkit-scrollbar {
          height: 4px;
        }

        .cards-carousel::-webkit-scrollbar-track {
          background: transparent;
        }

        .cards-carousel::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 2px;
        }

        .card {
          min-width: 320px;
          height: 200px;
          border-radius: 0.75rem;
          padding: 1.5rem;
          border: 1px solid var(--primary);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: white;
          box-shadow: 0 2px 8px rgba(0, 102, 204, 0.15);
          animation: fadeInUp 0.4s ease-out;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 102, 204, 0.25);
          border-color: var(--primary-light);
        }

        .card::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
          border-radius: 50%;
          transform: translate(40%, -40%);
        }

        .card:nth-child(2) {
          animation-delay: 0.05s;
        }

        .card:nth-child(3) {
          animation-delay: 0.1s;
        }

        .card:nth-child(4) {
          animation-delay: 0.15s;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          z-index: 2;
        }

        .card-number {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.5rem;
        }

        .card-number-value {
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .card-status {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.4rem 0.8rem;
          border-radius: 0.4rem;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          z-index: 2;
        }

        .card-balance {
          display: flex;
          flex-direction: column;
        }

        .card-balance-label {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.4rem;
        }

        .card-balance-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .card-brand {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .glass-card {
          background: var(--bg-white);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          animation: fadeInUp 0.5s ease-out;
        }

        .glass-card:hover {
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.1);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chart-container {
          position: relative;
          height: 280px;
          background: var(--bg-dark);
          border-radius: 0.5rem;
          padding: 1rem;
          margin-top: 1.5rem;
        }

        .chart-info {
          margin-bottom: 1.5rem;
        }

        .chart-balance {
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .chart-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .time-tabs {
          display: flex;
          gap: 0.5rem;
          background: var(--bg-dark);
          border-radius: 0.5rem;
          padding: 0.35rem;
          width: fit-content;
        }

        .time-tab {
          padding: 0.45rem 1rem;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          border-radius: 0.4rem;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .time-tab.active {
          background: var(--primary);
          color: white;
        }

        .time-tab:hover:not(.active) {
          color: var(--text-primary);
        }

        .chart-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05));
        }

        .chart-legend {
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .stat-card {
          background: var(--secondary);
          border: 1px solid #d4e5ff;
          border-radius: 0.75rem;
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.1);
        }

        .stat-content h3 {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 0.4rem;
        }

        .stat-value {
          font-size: 1.6rem;
          font-weight: 700;
        }

        .stat-change {
          font-size: 0.75rem;
          color: var(--success);
          margin-top: 0.25rem;
          font-weight: 500;
        }

        .stat-change.negative {
          color: var(--danger);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }

        .transactions-section {
          grid-column: 1 / -1;
        }

        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 400px;
          overflow-y: auto;
        }

        .transaction-list::-webkit-scrollbar {
          width: 6px;
        }

        .transaction-list::-webkit-scrollbar-track {
          background: var(--bg-dark);
        }

        .transaction-list::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 3px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg-dark);
          border: 1px solid var(--border-light);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .transaction-item:hover {
          background: var(--secondary);
          border-color: var(--primary);
        }

        .transaction-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .transaction-avatar {
          width: 40px;
          height: 40px;
          border-radius: 0.5rem;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1rem;
          color: white;
        }

        .transaction-avatar.income {
          background: var(--success);
        }

        .transaction-avatar.expense {
          background: #e8e8e8;
          color: var(--text-primary);
        }

        .transaction-details h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .transaction-details p {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .transaction-amount {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .transaction-amount.income {
          color: var(--success);
        }

        .transaction-amount.expense {
          color: var(--danger);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .transactions-section {
            grid-column: 1;
          }
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 240px;
          }

          .main-content {
            margin-left: 240px;
          }

          .search-bar {
            width: 250px;
          }

          .content {
            padding: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .main-content {
            margin-left: 0;
          }

          .search-bar {
            width: 100%;
            flex: 1;
          }

          .header {
            gap: 1rem;
            padding: 1rem;
          }

          .cards-carousel {
            gap: 1rem;
          }

          .card {
            min-width: 280px;
            height: 180px;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .dashboard-grid {
            gap: 1rem;
          }

          .card-title {
            font-size: 1.1rem;
            margin-bottom: 1rem;
          }

          .content {
            padding: 1rem;
          }

          .section-title {
            margin-bottom: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .header-actions {
            gap: 0.5rem;
          }

          .card {
            min-width: 100%;
            height: 160px;
            padding: 1.25rem;
          }

          .card-balance-value {
            font-size: 1.25rem;
          }

          .chart-balance {
            font-size: 1.75rem;
          }

          .page-title {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <div className="dashboard-root">
        <aside className="sidebar">
          <Link href="/" className="/">
            <img src="https://i.imgur.com/s0j9cDx.png" alt="logo" />
          </Link>

          <nav className="nav-menu">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`nav-item ${activeNav === item.label ? "active" : ""}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="premium-card">
            <div className="premium-badge">Premium</div>
            <div className="premium-title">Upgrade Account</div>
            <div className="premium-subtitle">
              Get advanced analytics and insights
            </div>
            <button className="premium-btn">Upgrade Now</button>
          </div>
        </aside>

        <div className="main-content">
          <header className="header">
            <div className="search-bar">
              <span style={{ fontSize: "1rem" }}>🔍</span>
              <input type="text" placeholder="Search transactions..." />
            </div>

            <div className="header-actions">
              <button className="header-btn" title="Notifications">
                🔔
              </button>
              <button className="header-btn" title="Settings">
                ⚙️
              </button>
              <div className="user-avatar" title="Profile">
                A
              </div>
            </div>
          </header>

          <div className="content">
            <div className="page-header">
              <h1 className="page-title">Welcome back,   <span className=" text-blue-700">Frank Lin Pedro</span>  </h1>
                  <div className="animate-fade-up mb-[22px] inline-flex items-center gap-[6px] rounded-full border border-blue-700/15 bg-blue-50 px-[14px] py-[5px] text-[11px] font-bold uppercase tracking-[0.05em] text-red-700">
                <span className="h-[7px] w-[6px] rounded-full bg-red-700" />
            Account frozen 
              </div>
              <p className="page-subtitle">
                Here&apos;s your financial overview for today
              </p>
            </div>

            <section className="cards-section">
              <h2 className="section-title">Payment Cards</h2>
              <div className="cards-carousel">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="card"
                    style={{ background: card.bg }}
                  >
                    <div className="card-header">
                      <div>
                        <div className="card-number">Card Number</div>
                        <div className="card-number-value">{card.number}</div>
                      </div>
                      <div className="card-status">{card.status}</div>
                    </div>

                    <div className="card-footer">
                      <div className="card-balance">
                        <div className="card-balance-label">Balance</div>
                        <div className="card-balance-value">{card.balance}</div>
                      </div>
                      <div className="card-brand">{card.brand}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="dashboard-grid">
              <div className="glass-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div className="chart-info">
                    <div className="chart-balance">$19,750,000.04</div>
                    <div className="chart-label">Total Balance</div>
                  </div>

                  <div className="time-tabs">
                    {["Monthly", "Weekly", "Daily"].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`time-tab ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="chart-container">
                  <svg
                    viewBox="0 0 900 300"
                    className="chart-svg"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="0"
                      y1="250"
                      x2="900"
                      y2="250"
                      stroke="#e0e0e0"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <line
                      x1="0"
                      y1="200"
                      x2="900"
                      y2="200"
                      stroke="#e0e0e0"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <line
                      x1="0"
                      y1="150"
                      x2="900"
                      y2="150"
                      stroke="#e0e0e0"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <line
                      x1="0"
                      y1="100"
                      x2="900"
                      y2="100"
                      stroke="#e0e0e0"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <line
                      x1="0"
                      y1="50"
                      x2="900"
                      y2="50"
                      stroke="#e0e0e0"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />

                    <text x="10" y="260" fontSize="12" fill="#999" textAnchor="start">
                      0
                    </text>
                    <text x="10" y="110" fontSize="12" fill="#999" textAnchor="start">
                      50K
                    </text>

                    <path
                      d="M 50 220 Q 100 160 150 140 T 250 100 T 350 120 T 450 80 T 550 140 T 650 60 T 750 100 T 850 40"
                      stroke="#0066cc"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M 50 240 Q 100 200 150 180 T 250 160 T 350 200 T 450 160 T 550 200 T 650 140 T 750 180 T 850 120"
                      stroke="#d0d0d0"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle cx="650" cy="60" r="5" fill="#0066cc" />

                    <text
                      x="50"
                      y="285"
                      fontSize="11"
                      fill="#999"
                      textAnchor="middle"
                    >
                      Jan
                    </text>
                    <text
                      x="150"
                      y="285"
                      fontSize="11"
                      fill="#999"
                      textAnchor="middle"
                    >
                      Feb
                    </text>
                    <text
                      x="250"
                      y="285"
                      fontSize="11"
                      fill="#999"
                      textAnchor="middle"
                    >
                      Mar
                    </text>
                    <text
                      x="350"
                      y="285"
                      fontSize="11"
                      fill="#999"
                      textAnchor="middle"
                    >
                      Apr
                    </text>
                    <text
                      x="450"
                      y="285"
                      fontSize="11"
                      fill="#999"
                      textAnchor="middle"
                    >
                      May
                    </text>
                    <text
                      x="550"
                      y="285"
                      fontSize="11"
                      fill="#999"
                      textAnchor="middle"
                    >
                      Jun
                    </text>
                    <text
                      x="650"
                      y="285"
                      fontSize="11"
                      fill="#999"
                      textAnchor="middle"
                    >
                      Jul
                    </text>
                    <text
                      x="750"
                      y="285"
                      fontSize="11"
                      fill="#999"
                      textAnchor="middle"
                    >
                      Aug
                    </text>
                    <text
                      x="850"
                      y="285"
                      fontSize="11"
                      fill="#999"
                      textAnchor="middle"
                    >
                      Sep
                    </text>
                  </svg>
                </div>

                <div className="chart-legend">
                  <div className="legend-item">
                    <div
                      className="legend-dot"
                      style={{ background: "#0066cc" }}
                    />
                    <span>Income</span>
                  </div>
                  <div className="legend-item">
                    <div
                      className="legend-dot"
                      style={{ background: "#d0d0d0" }}
                    />
                    <span>Expenses</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="card-title">Financial Summary</h3>
                <div className="stats-grid">
                  {stats.map((stat) => (
                    <div key={stat.title} className="stat-card">
                      <div className="stat-content">
                        <h3>{stat.title}</h3>
                        <div
                          className="stat-value"
                          style={{ color: stat.valueColor }}
                        >
                          {stat.value}
                        </div>
                        <div
                          className={`stat-change ${
                            stat.negative ? "negative" : ""
                          }`}
                        >
                          {stat.change}
                        </div>
                      </div>
                      <div
                        className="stat-icon"
                        style={{ background: stat.iconBg }}
                      >
                        {stat.icon}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card transactions-section">
                <h2 className="card-title">Recent Transactions</h2>
                <div className="transaction-list">
                  {transactions.map((tx, index) => (
                    <div key={`${tx.name}-${index}`} className="transaction-item">
                      <div className="transaction-info">
                        <div
                          className={`transaction-avatar ${
                            tx.income ? "income" : "expense"
                          }`}
                        >
                          {tx.avatar}
                        </div>
                        <div className="transaction-details">
                          <h4>{tx.name}</h4>
                          <p>{tx.time}</p>
                        </div>
                      </div>
                      <div
                        className={`transaction-amount ${
                          tx.income ? "income" : "expense"
                        }`}
                      >
                        {tx.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}