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
    
    // Note: This is a very simple hardcoded auth gate for the prototype/demo phase.
    // It is not a secure backend authentication system.
    if (username.trim() === 'eqstore' && password === '500') {
      sessionStorage.setItem('eq_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.');
      setPassword(''); // Clear password field on error
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <GlassCard className="w-full max-w-md p-8 relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
            <svg className="w-8 h-8 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-text-primary mb-2">تسجيل الدخول للعرض</h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            هذا العرض يحتوي على بيانات تجارية وتسعيرية سرية. يرجى إدخال بيانات الدخول المعتمدة للوصول.
          </p>
          
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-warning animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest font-en text-accent-warning">Confidential Document</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 bg-accent-negative/10 border border-accent-negative/20 rounded-lg text-accent-negative text-sm text-center font-medium animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
              {error}
            </div>
          )}

          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-semibold text-text-secondary pr-1" htmlFor="username">اسم المستخدم</label>
            <input 
              ref={usernameRef}
              id="username"
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all font-en"
              placeholder="Username"
              dir="ltr"
              autoComplete="off"
            />
          </div>

          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-semibold text-text-secondary pr-1" htmlFor="password">كلمة المرور</label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all font-en tracking-widest"
              placeholder="••••••"
              dir="ltr"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-gold-primary to-gold-primary/80 hover:from-gold-primary/90 hover:to-gold-primary/70 text-bg-base font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] mt-2 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:ring-offset-2 focus:ring-offset-bg-base"
          >
            عرض المستند
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center justify-center gap-1 border-t border-white/5 pt-6">
          <span className="text-[10px] text-text-secondary uppercase tracking-widest font-en">Powered by Tech Edge</span>
          <span className="text-xs font-bold text-text-primary">Delight Factory</span>
        </div>
      </GlassCard>
    </div>
  );
};
