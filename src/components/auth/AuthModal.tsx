import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Lock, Mail, User, Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    loginAsDemoAdmin,
    loginAsDemoCustomer,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    if (authModalMode === 'login') {
      const res = await login(email, password);
      if (!res.success) {
        setErrorMsg(res.error || 'Failed to sign in. Please verify credentials.');
      }
    } else {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        setIsSubmitting(false);
        return;
      }
      const res = await register(email, password, name);
      if (!res.success) {
        setErrorMsg(res.error || 'Failed to register. Please try another email.');
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#EED9DF] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header gradient banner */}
        <div className="bg-gradient-to-r from-[#520B1E] via-[#701A33] to-[#8B2C47] text-white px-6 py-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 text-rose-200 text-xs font-semibold uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grace Beauty Store</span>
          </div>

          <h3 className="font-serif text-2xl font-bold">
            {authModalMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h3>
          <p className="text-xs text-rose-100 mt-1">
            {authModalMode === 'login'
              ? 'Access your orders, saved addresses, and clinical formulations.'
              : 'Join Grace Beauty Store for member-only access and orders tracking.'}
          </p>

          {/* Tab selector */}
          <div className="flex p-1 bg-black/20 rounded-full mt-4 text-xs font-medium">
            <button
              onClick={() => {
                setAuthModalMode('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-1.5 rounded-full transition-all text-center ${
                authModalMode === 'login' ? 'bg-white text-[#701A33] font-bold shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthModalMode('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-1.5 rounded-full transition-all text-center ${
                authModalMode === 'register' ? 'bg-white text-[#701A33] font-bold shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-[#55424B] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aisha Sharma"
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FDF7F8] border border-[#EED9DF] text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#55424B] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FDF7F8] border border-[#EED9DF] text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#55424B] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FDF7F8] border border-[#EED9DF] text-xs text-[#1E0A12] focus:outline-none focus:border-[#701A33]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-full bg-[#701A33] hover:bg-[#520B1E] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
            >
              <span>{authModalMode === 'login' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Switcher for fast testing */}
          <div className="pt-3 border-t border-[#F2E1E6]">
            <p className="text-[11px] text-[#7A646E] text-center mb-2 font-medium">
              ⚡ Instant 1-Click Testing Accounts:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-semibold text-center transition-colors flex items-center justify-center space-x-1"
              >
                <Shield className="w-3.5 h-3.5 text-amber-700" />
                <span>Demo Admin</span>
              </button>
              <button
                type="button"
                onClick={loginAsDemoCustomer}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#701A33] text-[11px] font-semibold text-center transition-colors flex items-center justify-center space-x-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#701A33]" />
                <span>Demo Customer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
