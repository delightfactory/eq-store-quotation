import React from 'react';
import { GlassCard, AnimatedNumber } from './Shared';
import { quotationMeta, issuer, client, selectors } from '../data/quotationData';
import { formatDate } from '../utils/formatters';

export const QuotationHero: React.FC = () => {
  return (
    <div className="py-8 animate-fade-in-up">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-text-secondary uppercase tracking-widest font-en flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-positive"></span>
              Official Quotation Locked
            </span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-text-secondary uppercase tracking-widest font-en flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-tech animate-pulse"></span>
              Live Audit Trail Active
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            عرض تصنيع منتجات عناية سيارات
          </h1>
          <h2 className="text-sm md:text-base text-text-secondary font-en mt-2 leading-relaxed max-w-xl">
            Interactive Commercial & Production Intelligence Platform.<br/>
            <span className="text-white">Digital Experience by Tech Edge.</span>
          </h2>
        </div>
        
        <div className="flex flex-col items-start lg:items-end p-4 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-gold-primary"></div>
          <span className="text-xs text-text-secondary uppercase tracking-wider font-en mb-3">Issued By</span>
          <img src="/delight-logo.png" alt={issuer.nameEn} className="h-10 object-contain mb-3" />
          <span className="text-sm font-bold text-text-primary text-center lg:text-right">{issuer.name}</span>
        </div>
      </div>

      <GlassCard premium className="relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gold-primary mb-2">مقدم إلى</span>
            <span className="text-3xl font-bold text-white mb-6">{client.name}</span>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-md text-xs">
                {quotationMeta.deliveryType}
              </span>
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-md text-xs">
                {quotationMeta.deliveryScope}
              </span>
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-md text-xs text-gold-primary border-gold-primary/30">
                إصدار {quotationMeta.version}
              </span>
            </div>

            <div className="space-y-2 text-sm text-text-secondary">
              <p className="flex justify-between max-w-xs">
                <span>تاريخ الإصدار:</span> 
                <span className="text-text-primary">{formatDate(quotationMeta.issueDate)}</span>
              </p>
              <p className="flex justify-between max-w-xs">
                <span>الصلاحية:</span> 
                <span className="text-text-primary">{quotationMeta.validityText}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-r border-white/10 pt-6 md:pt-0 md:pr-8">
            <span className="text-sm text-text-secondary mb-2">إجمالي قيمة العرض الرسمي</span>
            <div className="flex items-baseline gap-2 mb-4">
              <AnimatedNumber 
                value={selectors.totalQuotationValue()} 
                isCurrency={true} 
                className="text-4xl md:text-5xl lg:text-6xl text-gradient-gold"
              />
              <span className="text-xl text-gold-primary">ج.م</span>
            </div>
            
            <div className="flex flex-col gap-1 text-sm items-start md:items-end text-text-secondary bg-black/30 p-3 rounded-lg border border-white/5">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-warning"></span>
                غير شامل ضريبة القيمة المضافة
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-warning"></span>
                غير شامل التعبئة والتغليف
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
