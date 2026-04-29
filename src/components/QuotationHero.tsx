import React from 'react';
import { GlassCard, AnimatedNumber, useCardShimmer } from './Shared';
import { quotationMeta, issuer, client, selectors } from '../data/quotationData';
import { formatDate } from '../utils/formatters';

export const QuotationHero: React.FC = () => {
  // Shimmer for the issuer card (not a GlassCard, so we hook manually)
  const { ref: issuerRef, shimmerClass } = useCardShimmer<HTMLDivElement>();

  return (
    <div className="py-8 animate-fade-in-up">

      {/* Top row: Title + Issuer badge */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-6 mb-8">

        {/* Left: Title block */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-1 bg-cyan-soft border border-cyan-primary/20 rounded-sm text-[10px] text-cyan-primary uppercase tracking-widest font-en flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-positive" />
              Official Quotation Locked
            </span>
            <span className="px-2.5 py-1 bg-cyan-soft border border-cyan-primary/20 rounded-sm text-[10px] text-cyan-primary uppercase tracking-widest font-en flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-primary status-pulse" />
              Live Audit Trail Active
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            كوتيشن تصنيع تفاعلي لـ EQ Store
          </h1>
          <h2 className="text-sm md:text-base text-text-secondary font-en mt-2 leading-relaxed max-w-xl">
            Interactive Commercial &amp; Production Intelligence Platform.
            <br />
            <span className="text-cyan-primary">Digital Command Experience by Tech Edge.</span>
          </h2>
        </div>

        {/*
          Issuer HUD Brand Card
          ─ Compact horizontal pill: [logo | divider | text]
          ─ Centered on mobile (self-center), aligned to start on desktop
          ─ shimmer applied via useCardShimmer hook
        */}
        <div
          ref={issuerRef}
          className={`
            self-center lg:self-auto
            flex items-center gap-3
            px-4 py-3
            hud-panel rounded-xl
            hud-corners
            w-auto
            ${shimmerClass}
          `}
          style={{ borderTop: '2px solid rgba(0,212,255,0.30)' }}
        >
          {/* Logo — no wrapper div, no background = no halo */}
          <img
            src="/delight-logo.png"
            alt={issuer.nameEn}
            className="h-9 w-9 object-contain shrink-0"
          />

          {/* Vertical divider */}
          <div className="w-px h-8 bg-cyan-primary/20 shrink-0" />

          {/* Label + Name */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] text-text-muted uppercase tracking-widest font-en leading-none">
              Issued By
            </span>
            <span className="text-xs font-bold text-text-primary leading-snug">
              {issuer.name}
            </span>
            <span className="text-[9px] text-text-muted font-en leading-none">
              {issuer.nameEn}
            </span>
          </div>
        </div>
      </div>

      {/* Command Brief Main Card */}
      <GlassCard premium corners className="relative overflow-hidden p-0">
        <div className="command-line w-full rounded-t-2xl" />

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">

          {/* Left: Client & Meta */}
          <div className="flex flex-col justify-center">
            <span className="text-xs text-text-muted mb-1 uppercase tracking-wider font-en">Proposal Recipient</span>
            <span className="text-3xl font-bold text-white mb-5">{client.name}</span>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-white/8 border border-cyan-primary/15 rounded-sm text-xs text-text-secondary">
                {quotationMeta.deliveryType}
              </span>
              <span className="px-3 py-1 bg-white/8 border border-cyan-primary/15 rounded-sm text-xs text-text-secondary">
                {quotationMeta.deliveryScope}
              </span>
              <span className="px-3 py-1 bg-cyan-soft border border-cyan-primary/30 rounded-sm text-xs font-bold text-cyan-primary">
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

          {/* Right: Total Value */}
          <div className="flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-r border-cyan-primary/10 pt-6 md:pt-0 md:pr-8">
            <span className="text-xs text-text-muted mb-2 uppercase tracking-wider font-en">Total Proposal Value</span>
            <div className="flex items-baseline gap-2 mb-4">
              <AnimatedNumber
                value={selectors.totalQuotationValue()}
                isCurrency={true}
                className="text-4xl md:text-5xl lg:text-6xl text-gradient-cyan"
              />
              <span className="text-xl text-cyan-primary">ج.م</span>
            </div>

            <div className="flex flex-col gap-1.5 text-xs items-start md:items-end text-text-secondary bg-black/30 p-3 rounded-lg border border-cyan-primary/10">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-warning" />
                غير شامل ضريبة القيمة المضافة
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-warning" />
                غير شامل التعبئة والتغليف
              </span>
            </div>
          </div>

        </div>
      </GlassCard>
    </div>
  );
};
