"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Handle login logic here
    }, 1500);
  };

  return (
    <main style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif" }} className="min-h-screen bg-white">
      <div className="min-h-screen flex">
        {/* LEFT SIDE - FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-blue-600">Hubio</h1>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  required
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-blue-600"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 text-gray-700 font-medium">
                <span className="text-lg">🔵</span>
                Continue with Google
              </button>
              <button className="w-full border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 text-gray-700 font-medium">
                <span className="text-lg">💳</span>
                Continue with Apple
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold transition"
              >
                Sign up
              </Link>
            </p>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - VISUAL */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 flex-col items-center justify-center p-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>

          <div className="relative z-10 text-center">
            {/* Illustration */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-600 text-4xl">
                💰
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Manage Your Finances
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Take control of your money with Hubio's powerful financial dashboard and smart insights.
            </p>

            {/* Features */}
            <div className="space-y-4 mt-12">
              <div className="flex items-center gap-3 justify-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
                  ✓
                </div>
                <span className="text-gray-700 font-medium">Real-time account monitoring</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
                  ✓
                </div>
                <span className="text-gray-700 font-medium">Smart budget planning tools</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
                  ✓
                </div>
                <span className="text-gray-700 font-medium">Secure & encrypted transactions</span>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-12 bg-white/50 backdrop-blur rounded-2xl p-6 max-w-md">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-3">
                "Hubio has completely transformed how I manage my finances. It's intuitive, secure, and incredibly powerful."
              </p>
              <p className="font-semibold text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-600">Financial Advisor</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        form {
          animation: fadeIn 0.5s ease-out;
        }

        input:focus {
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        @media (max-width: 1024px) {
          .hidden {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}