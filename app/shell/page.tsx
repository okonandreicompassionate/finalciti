"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/accounts", label: "Accounts" },
  { href: "/transactions", label: "Transactions" },
  { href: "/cards", label: "Cards" },
  { href: "/payments", label: "Payments" },
  { href: "/savings", label: "Savings" },
  { href: "/notifications", label: "Alerts" },
  { href: "/profile", label: "Profile" },
];

export default function AppShell({ title, subtitle, children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-[9px]">
            <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-blue-700">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 9h10M9 4v10"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-[18px] font-extrabold tracking-[-0.01em] text-slate-900">
              NorthBank
            </span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/notifications"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Notifications
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                AJ
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900">Alex Johnson</p>
                <p className="text-xs text-slate-500">Premium Account</p>
              </div>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-xl border border-slate-200 bg-white p-2 md:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M3 6h16M3 11h16M3 16h16" />
            </svg>
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="hidden min-h-[calc(100vh-64px)] w-[260px] border-r border-slate-200 bg-white px-4 py-6 md:block">
          <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-blue-700">
              Demo account
            </p>
            <p className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-slate-900">
              $24,850.00
            </p>
            <p className="mt-1 text-sm text-slate-600">Main Balance</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-blue-700 text-white"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-900">Need help?</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Support, account safety tips, and demo mode info all in one place.
            </p>
            <Link
              href="/profile"
              className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-slate-200"
            >
              View settings
            </Link>
          </div>
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-slate-950/25 md:hidden" onClick={() => setMobileOpen(false)}>
            <div
              className="h-full w-[280px] border-r border-slate-200 bg-white p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-blue-700">
                  Demo account
                </p>
                <p className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-slate-900">
                  $24,850.00
                </p>
                <p className="mt-1 text-sm text-slate-600">Main Balance</p>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? "bg-blue-700 text-white"
                          : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.08em] text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-700" />
              NorthBank Demo
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-slate-900">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{subtitle}</p>
            ) : null}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}