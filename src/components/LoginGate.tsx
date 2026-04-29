import React, { useState, useEffect, useRef } from 'react';
import { GlassCard } from './Shared';

interface LoginGateProps {
  children: React.ReactNode;
}

export const LoginGate: React.FC<LoginGateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('eq_auth') === 'true';
  });
  const [isChecking] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated && !isChecking && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [isAuthenticated, isChecking]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Note: simple hardcoded auth gate for prototype/demo phase – not a secure backend system.
    if (username.trim() === 'eqstore' && password === '500') {
      sessionStorage.setItem('eq_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.');
      setPassword('');
      if (usernameRef.current) usernameRef.current.focus();
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) return <>{children}</>;

  return (
    <div
      className="min-h-screen bg-bg-base command-grid flex items-center justify-center p-4 relative overflow-hidden"
      dir="rtl"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-primary/[0.05] blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />

      {/* Secure Access Card */}
      <GlassCard corners className="w-full max-w-md p-8 relative z-10 animate-fade-in-up">

        {/* Header */}
        <div className="text-center mb-8">
          {/* Lock icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-soft border border-cyan-primary/25 mb-6 cyan-glow">
            <svg className="w-8 h-8 text-cyan-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-1">Secure Command Access</h1>
          <p className="text-xs text-text-secondary leading-relaxed mt-2">
            Confidential EQ Store Proposal — authorized personnel only.
          </p>

          {/* Status chips */}
          <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-en text-accent-warning px-2 py-1 bg-accent-warning/10 border border-accent-warning/20 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-warning status-pulse" />
              Confidential Document
            </span>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-en text-cyan-primary px-2 py-1 bg-cyan-soft border border-cyan-primary/20 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-primary status-pulse" />
              Secure Session
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div
              className="p-3 bg-accent-negative/10 border border-accent-negative/20 rounded-lg text-accent-negative text-sm text-center font-medium animate-fade-in-up"
              style={{ animationDuration: '0.2s' }}
            >
              {error}
            </div>
          )}

          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-semibold text-text-secondary pr-1" htmlFor="username">
              اسم المستخدم
            </label>
            <input
              ref={usernameRef}
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/40 border border-cyan-primary/15 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan-primary/50 focus:ring-1 focus:ring-cyan-primary/30 transition-all font-en"
              placeholder="Username"
              dir="ltr"
              autoComplete="off"
            />
          </div>

          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-semibold text-text-secondary pr-1" htmlFor="password">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-cyan-primary/15 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan-primary/50 focus:ring-1 focus:ring-cyan-primary/30 transition-all font-en tracking-widest"
              placeholder="••••••"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-primary/90 to-cyan-secondary hover:from-cyan-primary hover:to-cyan-secondary/90 text-bg-base font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(0,212,255,0.18)] hover:shadow-[0_0_32px_rgba(0,212,255,0.32)] mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-primary/60 focus:ring-offset-2 focus:ring-offset-bg-base"
          >
            عرض المستند
          </button>
        </form>

        {/* Footer – Brand Logos */}
        <div className="mt-8 border-t border-cyan-primary/10 pt-6 flex items-center justify-between gap-4">

          {/* Left: Delight Factory */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[9px] text-text-muted uppercase tracking-widest font-en">Issued By</span>
            <img
              src="/delight-logo.png"
              alt="Delight Factory"
              className="h-8 object-contain"
              style={{ filter: 'brightness(1.1)' }}
            />
            <span className="text-[10px] font-semibold text-text-secondary">Delight Factory</span>
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-cyan-primary/15" />

          {/* Right: Tech Edge */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[9px] text-text-muted uppercase tracking-widest font-en">Powered By</span>
            <img
              src="/techedge-logo.png"
              alt="Tech Edge"
              className="h-8 w-8 object-contain rounded-md"
              style={{ filter: 'brightness(1.1)' }}
            />
            <span className="text-[10px] font-semibold text-cyan-primary/80 font-en">Tech Edge</span>
          </div>

        </div>
      </GlassCard>
    </div>
  );
};
