import React from 'react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { quotationMeta, selectors } from '../data/quotationData';

export const StickyTopBar: React.FC = () => {
  const handlePrint = () => window.print();

  return (
    <div
      className="sticky top-0 z-50 no-print animate-fade-in-up"
      style={{
        background: 'linear-gradient(180deg, rgba(6,10,16,0.97) 0%, rgba(8,13,22,0.95) 100%)',
        borderBottom: '1px solid rgba(0,212,255,0.14)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
      }}
    >
      {/* Cyan command line at very top */}
      <div className="command-line w-full" />

      <div className="px-4 py-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">

          {/* System Owner – Desktop */}
          <div className="hidden lg:flex flex-col">
            <span className="text-[9px] text-cyan-primary/70 uppercase tracking-widest font-en">System Owner</span>
            <span className="text-sm font-bold text-text-primary">Delight Factory</span>
            <span className="text-[9px] text-text-muted font-en">Powered by Tech Edge</span>
          </div>

          {/* Center Navigation – Desktop */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
            {[
              { href: '#hero',       label: 'نظرة عامة' },
              { href: '#quotation',  label: 'العرض المالي' },
              { href: '#products',   label: 'المنتجات' },
              { href: '#simulation', label: 'المحاكاة' },
              { href: '#tracker',    label: 'تتبع الإنتاج' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-text-secondary hover:text-cyan-primary transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Total + Secure Session + Actions */}
          <div className="flex flex-1 md:flex-none justify-between md:justify-end items-center w-full md:w-auto gap-3">

            {/* Secure session indicator (desktop) */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-cyan-soft border border-cyan-primary/20 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-primary status-pulse" />
              <span className="text-[9px] uppercase tracking-widest font-en text-cyan-primary">Secure Session</span>
            </div>

            {/* Financial Total */}
            <div className="flex flex-col items-end">
              <span className="hidden md:inline-flex text-[9px] text-text-muted bg-white/5 px-2 py-0.5 rounded-sm border border-white/8 mb-0.5">
                الإصدار {quotationMeta.version} — معتمد
              </span>
              <span className="text-base md:text-lg font-mono-num text-gradient-gold">
                {formatCurrency(selectors.totalQuotationValue())}
                <span className="text-xs text-cyan-primary/80 mr-1">ج.م</span>
              </span>
            </div>

            {/* Expiry + Print + Logout */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-3">
                <span className="text-[10px] text-text-muted">صالح حتى</span>
                <span className="text-xs font-semibold text-text-primary">
                  {formatDate(quotationMeta.computedExpiryDate)}
                </span>
              </div>

              <button
                onClick={handlePrint}
                className="px-3 py-2 bg-white/5 hover:bg-cyan-soft border border-white/10 hover:border-cyan-primary/30 rounded-lg text-sm transition-colors text-text-secondary hover:text-cyan-primary flex items-center gap-2"
                title="طباعة / تصدير PDF"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span className="hidden sm:inline text-xs">طباعة / PDF</span>
              </button>

              <button
                onClick={() => {
                  sessionStorage.removeItem('eq_auth');
                  window.location.reload();
                }}
                className="p-2 bg-accent-negative/10 hover:bg-accent-negative/20 border border-accent-negative/20 rounded-lg text-accent-negative transition-all focus-visible:ring-2 focus-visible:ring-accent-negative outline-none no-print"
                title="تسجيل الخروج وإغلاق الجلسة"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
