'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: 'user-001',
      name: form.name || 'Alex Morgan',
      email: form.email || 'alex@limixi.com',
      role: form.role,
      avatar: '👤',
    });
    router.push('/profile');
  };

  return (
    <main className="min-h-screen pt-24 pb-24 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FF6A00]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#8A5CFF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl font-black tracking-wider bg-gradient-to-r from-white to-[#FF6A00] bg-clip-text text-transparent">LIMIXI</span>
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />
          </Link>
          <h1 className="text-2xl font-black">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'register' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h1>
          <p className="text-sm text-white/40 mt-1">
            {mode === 'login' && 'Sign in to your LIMIXI account'}
            {mode === 'register' && 'Join the premium marketplace'}
            {mode === 'forgot' && 'Enter your email to reset password'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8">
          {/* Social Login */}
          {mode !== 'forgot' && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-semibold text-white/60 hover:bg-white/[0.08] hover:text-white transition-all">
                  <span>🍎</span> Apple
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-semibold text-white/60 hover:bg-white/[0.08] hover:text-white transition-all">
                  <span>🔵</span> Google
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-xs text-white/30 font-semibold">OR</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name - Register only */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00]/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00]/50 transition-colors"
                placeholder="name@example.com"
              />
            </div>

            {/* Password - Not for forgot mode */}
            {mode !== 'forgot' && (
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00]/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Role - Register only */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2">Account Type</label>
                <select
                  value={form.role}
                  onChange={e => setForm({...form, role: e.target.value})}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors [&>option]:bg-[#0a0b10]"
                >
                  <option value="customer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
            )}

            {/* Forgot Password Link */}
            {mode === 'login' && (
              <div className="text-right">
                <button type="button" onClick={() => setMode('forgot')} className="text-xs text-[#00D4FF] hover:text-[#00D4FF]/80 font-semibold transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm shadow-[0_0_25px_rgba(255,106,0,0.3)] hover:shadow-[0_0_40px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300"
            >
              {mode === 'login' && 'Sign In'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot' && 'Send Reset Link'}
            </button>
          </form>

          {/* Mode Switch */}
          <div className="text-center mt-6">
            {mode === 'login' && (
              <p className="text-sm text-white/40">
                Don&apos;t have an account?{' '}
                <button onClick={() => setMode('register')} className="text-[#00D4FF] font-bold hover:underline">Sign Up</button>
              </p>
            )}
            {mode === 'register' && (
              <p className="text-sm text-white/40">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-[#00D4FF] font-bold hover:underline">Sign In</button>
              </p>
            )}
            {mode === 'forgot' && (
              <p className="text-sm text-white/40">
                Remember your password?{' '}
                <button onClick={() => setMode('login')} className="text-[#00D4FF] font-bold hover:underline">Sign In</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
