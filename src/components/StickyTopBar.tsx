import React from 'react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { quotationMeta, selectors } from '../data/quotationData';

export const StickyTopBar: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="sticky top-0 z-50 glass-panel border-b border-white/5 rounded-none px-4 py-3 sm:px-6 shadow-xl no-print animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        
        {/* Left side (Issuer/Tech Edge on desktop) */}
        <div className="hidden lg:flex flex-col">
          <span className="text-[10px] text-text-secondary uppercase tracking-widest font-en">Powered by Tech Edge</span>
          <span className="text-sm font-bold text-text-primary">Delight Factory</span>
        </div>

        {/* Center Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <a href="#hero" className="text-text-secondary hover:text-gold-primary transition-colors">نظرة عامة</a>
          <a href="#quotation" className="text-text-secondary hover:text-gold-primary transition-colors">العرض المالي</a>
          <a href="#products" className="text-text-secondary hover:text-gold-primary transition-colors">المنتجات</a>
          <a href="#simulation" className="text-text-secondary hover:text-gold-primary transition-colors">المحاكاة</a>
          <a href="#tracker" className="text-text-secondary hover:text-gold-primary transition-colors">تتبع الإنتاج</a>
        </nav>

        {/* Right side (Totals & Print) */}
        <div className="flex flex-1 md:flex-none justify-between md:justify-end items-center w-full md:w-auto gap-4">
          <div className="flex flex-col items-end">
            <span className="hidden md:inline-flex text-[10px] text-text-secondary bg-white/5 px-2 py-0.5 rounded-sm border border-white/10 mb-1">الإصدار {quotationMeta.version} - معتمد</span>
            <span className="text-base md:text-lg font-mono-num text-gradient-gold">
              {formatCurrency(selectors.totalQuotationValue())} <span className="text-xs text-gold-primary">ج.م</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-3">
              <span className="text-xs text-text-secondary">صالح حتى</span>
              <span className="text-xs font-semibold text-text-primary">{formatDate(quotationMeta.computedExpiryDate)}</span>
            </div>
            
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors text-text-primary flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="hidden sm:inline">طباعة / PDF</span>
            </button>

            <button 
              onClick={() => {
                sessionStorage.removeItem('eq_auth');
                window.location.reload();
              }}
              className="p-2 bg-accent-negative/10 hover:bg-accent-negative/20 border border-accent-negative/20 rounded-lg text-accent-negative transition-all focus-visible:ring-2 focus-visible:ring-accent-negative outline-none no-print ml-2 mr-2"
              title="تسجيل الخروج وإغلاق الجلسة"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
