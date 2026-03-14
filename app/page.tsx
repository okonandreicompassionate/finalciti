"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 780);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navLinks = [
    { label: "Personal", href: "#" },
    { label: "Business", href: "#" },
    { label: "Investing", href: "#" },
    { label: "Loans", href: "#" },
    { label: "About", href: "#" },
  ];

  const features = [
    {
      icon: "💸",
      title: "Instant Transfers",
      text: "Send money anywhere in seconds. Zero fees on all domestic transfers, always.",
      bg: "bg-blue-50",
    },
    {
      icon: "📈",
      title: "Smart Investing",
      text: "Stocks, ETFs, and more in one place. Start investing with as little as $1.",
      bg: "bg-green-50",
    },
    {
      icon: "🔒",
      title: "Bank-Grade Security",
      text: "256-bit encryption, biometric login, and 24/7 fraud monitoring on every account.",
      bg: "bg-cyan-50",
    },
    {
      icon: "💳",
      title: "Premium Cards",
      text: "Virtual and physical cards with up to 5% cashback and no foreign transaction fees.",
      bg: "bg-blue-50",
    },
    {
      icon: "📊",
      title: "Spending Insights",
      text: "Automatic categorisation and monthly reports so you always know where you stand.",
      bg: "bg-orange-50",
    },
    {
      icon: "🏦",
      title: "High-Yield Savings",
      text: "Earn 4.85% APY — more than 10× the national average, with no minimums.",
      bg: "bg-green-50",
    },
  ];

  const steps = [
    {
      num: "1",
      title: "Create account",
      text: "Sign up with your email. No paperwork — your account is ready immediately.",
      cls: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      num: "2",
      title: "Verify identity",
      text: "Quick 2-minute ID check to keep your account secure and compliant.",
      cls: "bg-green-50 border-green-200 text-green-700",
    },
    {
      num: "3",
      title: "Fund your account",
      text: "Link your bank or deposit cash at any of 10,000+ locations nationwide.",
      cls: "bg-orange-50 border-orange-200 text-orange-600",
    },
    {
      num: "4",
      title: "Start banking",
      text: "Send, save, invest — your entire financial life in one beautiful app.",
      cls: "bg-violet-50 border-violet-200 text-violet-700",
    },
  ];

  const testimonials = [
    {
      initials: "AM",
      name: "Aaliyah M.",
      role: "Freelance Designer",
      text: `"Switched from my old bank and haven't looked back. Transfers are instant, and I actually understand my spending for the first time."`,
      avatar: "bg-blue-50 text-blue-700",
    },
    {
      initials: "DO",
      name: "David O.",
      role: "Software Engineer",
      text: `"The savings rate alone is incredible. Plus the card cashback on subscriptions has genuinely saved me hundreds since I joined."`,
      avatar: "bg-green-50 text-green-700",
    },
    {
      initials: "PS",
      name: "Priya S.",
      role: "Small Business Owner",
      text: `"Managing business and personal accounts together is a game-changer. The invoicing tools alone save me hours every single week."`,
      avatar: "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-white font-sans text-slate-900">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: "Plus Jakarta Sans", system-ui, sans-serif;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-fade-up {
          animation: fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .delay-1 {
          animation-delay: 0.08s;
        }

        .delay-2 {
          animation-delay: 0.17s;
        }

        .delay-3 {
          animation-delay: 0.26s;
        }

        .delay-4 {
          animation-delay: 0.35s;
        }

        .float-1 {
          animation: float 4.5s ease-in-out infinite;
        }

        .float-2 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 0.9s;
        }

        .float-3 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 1.8s;
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-6">
          
            
            <span className="text-[18px] font-extrabold tracking-[-0.01em] text-slate-900">
                  <Link href="/" className="/">
            <img src="https://i.imgur.com/s0j9cDx.png" alt="" />
          </Link>
            </span>
          

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-[2px] py-[6px] text-[14px] font-medium text-slate-600 transition hover:text-blue-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-[10px] md:flex">
            <Link
              href="/login"
              className="inline-block rounded-[10px] border-[1.5px] border-slate-300 bg-white px-[18px] py-[9px] text-[13px] font-semibold text-blue-700 transition hover:border-blue-700 hover:bg-blue-50"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-block rounded-[10px] bg-blue-700 px-[18px] py-[9px] text-[13px] font-bold text-white shadow-sm transition hover:bg-blue-800 hover:shadow-[0_4px_14px_rgba(26,86,219,0.25)]"
            >
              Open Account
            </Link>
          </div>

          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="border-none bg-transparent p-1 text-slate-600 md:hidden"
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
          )}
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            <div className="mb-[14px] flex flex-col">
              {["Personal", "Business", "Investing", "About"].map((item, idx, arr) => (
                <Link
                  key={item}
                  href="#"
                  className={`py-[11px] text-[14px] font-medium text-slate-600 ${
                    idx !== arr.length - 1 ? "border-b border-slate-200" : ""
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex gap-[10px]">
              <Link
                href="/login"
                className="flex-1 rounded-[10px] border-[1.5px] border-slate-300 bg-white px-4 py-[11px] text-center text-[13px] font-semibold text-blue-700"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex-1 rounded-[10px] bg-blue-700 px-4 py-[11px] text-center text-[13px] font-bold text-white"
              >
                Open Account
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#EBF2FF_0%,#F8FAFC_50%,#fff_100%)] px-6 pb-[90px] pt-[80px]">
        <div className="pointer-events-none absolute right-[-80px] top-[-60px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(26,86,219,0.07),transparent_65%)]" />

        <div className="mx-auto max-w-[1160px]">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Copy */}
            <div>
              <div className="animate-fade-up mb-[22px] inline-flex items-center gap-[6px] rounded-full border border-blue-700/15 bg-blue-50 px-[14px] py-[5px] text-[12px] font-bold uppercase tracking-[0.05em] text-blue-700">
                <span className="h-[6px] w-[6px] rounded-full bg-blue-700" />
                 Secure Banking 
              </div>

              <h1 className="animate-fade-up delay-1 mb-[18px] text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-slate-900">
                Banking you can
                <br />
                <span className="text-blue-700">actually trust.</span>
              </h1>

              <p className="animate-fade-up delay-2 mb-8 max-w-[440px] text-[17px] font-normal leading-[1.72] text-slate-600">
                Open an account in minutes. Send money instantly. Earn 4.85% APY on
                savings. Everything you need, in one secure place.
              </p>

              <div className="animate-fade-up delay-3 mb-9 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-block rounded-[10px] bg-blue-700 px-7 py-[13px] text-[15px] font-bold text-white shadow-sm transition hover:bg-blue-800 hover:shadow-[0_4px_14px_rgba(26,86,219,0.25)]"
                >
                  Get started for free
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-block rounded-[10px] border-[1.5px] border-slate-300 bg-white px-[22px] py-[13px] text-[15px] font-semibold text-blue-700 transition hover:border-blue-700 hover:bg-blue-50"
                >
                  See how it works
                </Link>
              </div>

              <div className="animate-fade-up delay-4 flex flex-wrap gap-5">
                {["No monthly fees", "Instant transfers", "4.2M+ customers"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-green-600">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden h-[420px] md:block">
              {/* Bank card */}
              <div className="float-1 absolute left-0 top-[14%] w-[285px] rounded-[18px] bg-[linear-gradient(135deg,#1E3A8A,#1A56DB)] px-6 py-[22px] shadow-[0_20px_48px_rgba(26,86,219,0.3)]">
                <div className="mb-7 flex items-center justify-between">
                  <span className="text-[15px] font-bold tracking-[-0.01em] text-white">
                    NorthBank
                  </span>
                  <div className="h-[20px] w-[30px] rounded-[4px] bg-[linear-gradient(135deg,#F59E0B,#FCD34D)]" />
                </div>

                <div className="mb-4 font-mono text-[14px] tracking-[0.18em] text-white/90">
                  4321 •••• •••• 8765
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="mb-[2px] text-[9px] uppercase tracking-[0.12em] text-white/50">
                      Card Holder
                    </div>
                    <div className="text-[13px] font-semibold text-white">Alex Johnson</div>
                  </div>
                  <div className="text-right">
                    <div className="mb-[2px] text-[9px] uppercase tracking-[0.12em] text-white/50">
                      Expires
                    </div>
                    <div className="text-[13px] text-white">09/28</div>
                  </div>
                </div>
              </div>

              {/* Balance widget */}
              <div className="float-2 absolute right-[4%] top-[4%] min-w-[180px] rounded-[14px] border border-slate-200/80 bg-white/90 px-[22px] py-[18px] shadow-[0_4px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-slate-600">
                  Total Balance
                </div>
                <div className="text-[27px] font-extrabold leading-[1.1] text-slate-900">
                  $24,850
                </div>
                <div className="mt-[7px] flex items-center gap-[5px]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 9l3-4 2 2 3-4"
                      stroke="#059669"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[12px] font-semibold text-green-600">
                    +3.2% this month
                  </span>
                </div>
              </div>

              {/* Activity */}
              <div className="float-1 absolute bottom-[22%] right-0 min-w-[210px] rounded-[14px] border border-slate-200/80 bg-white/90 px-5 py-4 shadow-[0_4px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl [animation-delay:.5s]">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-slate-600">
                  Recent Activity
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-amber-100 text-[13px]">
                      🎬
                    </div>
                    <span className="text-[13px] text-slate-900">Netflix</span>
                  </div>
                  <span className="text-[13px] font-bold text-red-600">–$15.99</span>
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-green-100 text-[13px]">
                      💼
                    </div>
                    <span className="text-[13px] text-slate-900">Salary</span>
                  </div>
                  <span className="text-[13px] font-bold text-green-600">+$4,200</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-blue-50">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6h8M7 3l3 3-3 3"
                          stroke="#1A56DB"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[13px] text-slate-900">Transfer</span>
                  </div>
                  <span className="text-[13px] font-bold text-slate-600">–$250</span>
                </div>
              </div>

              {/* Sent pill */}
              <div className="float-3 absolute bottom-[10%] left-[6%] flex items-center gap-[10px] rounded-[50px] border border-slate-200/80 bg-white/90 px-4 py-[10px] shadow-[0_4px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M2 6.5h9M7 3l4 3.5L7 10"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-[12px] font-bold text-slate-900">Sent $500</div>
                  <div className="text-[10px] text-slate-600">Instant · 0 fees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="border-y border-slate-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-center gap-8">
          <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-400">
            Trusted by
          </div>
          {["Forbes ✦", "TechCrunch ✦", "Bloomberg ✦", "WSJ ✦", "CNBC"].map((item) => (
            <div key={item} className="text-[15px] font-bold text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-[1160px] grid-cols-2 px-6 md:grid-cols-4">
          {[
            ["4.2M+", "Active Customers"],
            ["$18B+", "Processed Yearly"],
            ["4.85%", "Savings APY"],
            ["160+", "Countries"],
          ].map(([value, label], idx) => (
            <div
              key={label}
              className={`px-6 py-8 ${idx < 3 ? "md:border-r md:border-slate-200" : ""}`}
            >
              <div className="text-[2.2rem] font-extrabold leading-none text-blue-700">
                {value}
              </div>
              <div className="mt-1 text-[13px] font-medium text-slate-600">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-14 text-center">
            <div className="mb-[18px] inline-flex items-center gap-[6px] rounded-full border border-blue-700/15 bg-blue-50 px-[14px] py-[5px] text-[12px] font-bold tracking-[0.05em] text-blue-700">
              What We Offer
            </div>
            <h2 className="mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold tracking-[-0.02em] text-slate-900">
              Everything you need to manage
              <br />
              your money <span className="text-blue-700">confidently</span>
            </h2>
            <p className="mx-auto max-w-[480px] text-[16px] leading-[1.7] text-slate-600">
              Built around what real people actually need — not what banks typically
              offer.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[14px] border border-slate-200 bg-white p-6 transition duration-200 hover:border-blue-700 hover:shadow-[0_8px_28px_rgba(26,86,219,0.1)]"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-[12px] text-[22px] ${feature.bg}`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-[16px] font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-slate-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-y border-slate-200 bg-slate-50 px-6 py-24"
      >
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-14 text-center">
            <div className="mb-[18px] inline-flex items-center gap-[6px] rounded-full border border-blue-700/15 bg-blue-50 px-[14px] py-[5px] text-[12px] font-bold tracking-[0.05em] text-blue-700">
              How It Works
            </div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold tracking-[-0.02em] text-slate-900">
              Open your account in <span className="text-blue-700">3 minutes</span>
            </h2>
          </div>

          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.num}>
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 text-[15px] font-extrabold ${step.cls}`}
                >
                  {step.num}
                </div>
                <h3 className="mb-2 text-[16px] font-bold text-slate-900">{step.title}</h3>
                <p className="text-[13px] leading-[1.65] text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-14 text-center">
            <div className="mb-[18px] inline-flex items-center gap-[6px] rounded-full border border-blue-700/15 bg-blue-50 px-[14px] py-[5px] text-[12px] font-bold tracking-[0.05em] text-blue-700">
              Customer Reviews
            </div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold tracking-[-0.02em] text-slate-900">
              Rated <span className="text-blue-700">4.9/5</span> by over 90,000 customers
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-[14px] border border-slate-200 bg-white p-[26px] transition hover:shadow-[0_8px_28px_rgba(15,23,42,0.07)]"
              >
                <div className="mb-[14px] text-[14px] text-amber-500">★★★★★</div>
                <p className="mb-5 text-[14px] leading-[1.72] text-slate-600">{item.text}</p>

                <div className="flex items-center gap-[10px] border-t border-slate-200 pt-4">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold ${item.avatar}`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-400">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 px-6 py-20">
        <div className="mx-auto max-w-[1160px]">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="mb-[10px] text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.02em] text-white">
                Ready to get started?
              </h2>
              <p className="max-w-[420px] text-[16px] leading-[1.65] text-white/80">
                Join millions of users exploring a clean modern finance experience.
                Free to open, free to use.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="whitespace-nowrap rounded-[10px] bg-white px-7 py-[13px] text-[14px] font-bold text-blue-700 transition hover:-translate-y-0.5"
              >
                Open Free Account →
              </Link>
              <Link
                href="/login"
                className="whitespace-nowrap rounded-[10px] border-[1.5px] border-white/30 bg-white/10 px-[22px] py-[13px] text-[14px] font-semibold text-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50 px-6 pb-7 pt-14">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-10 grid gap-9 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
            <div>
           <Link href="/" className="/">
            <img src="https://i.imgur.com/s0j9cDx.png" alt="" />
          </Link>

              <p className="mb-[18px] max-w-[230px] text-[13px] leading-[1.7] text-slate-600">
                Modern banking for everyone. Secure, transparent, and built around you.
              </p>

              <div className="flex gap-2">
                {["in", "𝕏", "f"].map((item) => (
                  <div
                    key={item}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] border border-slate-200 text-[12px] font-bold text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {[
              {
                title: "Products",
                items: ["Checking", "Savings", "Credit Cards", "Investing", "Loans"],
              },
              {
                title: "Company",
                items: ["About Us", "Careers", "Press", "Blog"],
              },
              {
                title: "Support",
                items: ["Help Center", "Contact Us", "Security", "ATM Finder"],
              },
              {
                title: "Legal",
                items: ["Privacy Policy", "Terms of Use", "Disclosures", "Cookie Settings"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="mb-[14px] text-[12px] font-bold uppercase tracking-[0.06em] text-slate-900">
                  {section.title}
                </h4>
                {section.items.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="mb-[10px] block text-[13px] text-slate-600 transition hover:text-blue-700"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-[14px] border-t border-slate-200 pt-6">
            <p className="text-[12px] text-slate-400">
              © 2025 Citi Bank Demo. UI 
            </p>

            <div className="flex items-center gap-2">
              {["FDIC", "SSL 256", "PCI DSS"].map((item) => (
                <span
                  key={item}
                  className="rounded-[5px] border border-slate-200 px-[9px] py-[3px] text-[10px] tracking-[0.08em] text-slate-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}