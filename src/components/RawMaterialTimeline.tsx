import React from 'react';
import { GlassCard } from './Shared';
import { products } from '../data/quotationData';
import { formatDate } from '../utils/formatters';

export const RawMaterialTimeline: React.FC = () => {
  // Sort products by rawMaterialReview date (newest first) – logic unchanged
  const sortedProducts = [...products].sort(
    (a, b) =>
      new Date(b.rawMaterialReview.date).getTime() -
      new Date(a.rawMaterialReview.date).getTime()
  );

  const getNodeColor = (hasTrend: boolean) =>
    hasTrend ? 'var(--color-accent-warning)' : 'var(--color-accent-positive)';

  return (
    <div className="my-16 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
      <div className="mb-6 max-w-2xl">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
          <span className="w-1 h-6 bg-cyan-primary/60 rounded-full" />
          مراجعة تكلفة الخامات (شفافية التسعير)
          <span className="text-[10px] font-en uppercase tracking-widest text-text-muted ml-2">
            Supply Chain Signal
          </span>
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          هذا السجل يوضح آخر مراجعة لتكلفة الخامات عالميًا والمؤثرة على التسعير. لا يعني رصد زيادة في تكلفة الخامات أن السعر سيتغير فورًا بعد انتهاء صلاحية العرض، بل يوضح لك سبب المراجعة المستمرة وكيف نتحمل عنك عبء تقلبات السوق لأطول فترة ممكنة.
        </p>

        {/* Legend & Scroll Hint */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 text-xs p-3 rounded-lg"
          style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}
        >
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-positive" />
              <span className="text-text-secondary">استقرار أو انخفاض</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-warning" />
              <span className="text-text-secondary">رصد زيادة في التكلفة</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-text-muted">
            <span className="font-en text-[10px] uppercase tracking-wider">Scroll</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden relative">
        {/* Scroll fade overlays */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg-elevated to-transparent pointer-events-none z-20" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg-elevated to-transparent pointer-events-none z-20" />

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block overflow-x-auto p-6 custom-scrollbar pb-8 relative">
          <div className="relative">
            {/* Horizontal rail – cyan tinted */}
            <div
              className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2"
              style={{ background: 'rgba(0,212,255,0.15)' }}
            />

            <div className="flex gap-4 overflow-x-auto pb-6 pt-4 px-2 snap-x">
              {sortedProducts.map((product) => {
                const review = product.rawMaterialReview;
                const hasTrend = review.trend === 'up';
                const nodeColor = getNodeColor(hasTrend);

                return (
                  <div key={product.id} className="relative flex-none w-64 snap-start">
                    {/* Timeline node */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-bg-base border-2 z-10 flex items-center justify-center"
                      style={{
                        borderColor: nodeColor,
                        boxShadow: `0 0 8px ${nodeColor}50`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: nodeColor }} />
                    </div>

                    {/* Top: date + name */}
                    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 pb-6 text-center w-full">
                      <span className="block text-xs font-mono-num text-text-muted mb-1">
                        {formatDate(review.date)}
                      </span>
                      <span className="block font-bold text-sm text-text-primary">{product.nameEn}</span>
                    </div>

                    {/* Bottom: note card */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 pt-6 w-full text-center">
                      <div
                        className="text-xs p-2 rounded-sm inline-block max-w-[220px] text-left"
                        style={
                          hasTrend
                            ? {
                                background: 'rgba(255,179,71,0.08)',
                                border: '1px solid rgba(255,179,71,0.28)',
                                color: 'var(--color-accent-warning)',
                              }
                            : {
                                background: 'rgba(0,212,255,0.04)',
                                border: '1px solid rgba(0,212,255,0.12)',
                                color: 'var(--color-text-secondary)',
                              }
                        }
                      >
                        {hasTrend && (
                          <span className="block font-mono-num font-bold mb-1">
                            +{review.trendPercent}% Cost Impact
                          </span>
                        )}
                        <span className="text-[10px] leading-tight block" dir="rtl">
                          {review.note}
                        </span>
                      </div>
                    </div>

                    {/* Height spacer */}
                    <div className="h-48 w-full" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden p-4 space-y-6">
          <div
            className="relative border-r border-dashed mr-4 pr-6"
            style={{ borderColor: 'rgba(0,212,255,0.18)' }}
          >
            {sortedProducts.map((product) => {
              const review = product.rawMaterialReview;
              const hasTrend = review.trend === 'up';
              const nodeColor = getNodeColor(hasTrend);

              return (
                <div key={product.id} className="relative mb-6 last:mb-0">
                  {/* Node */}
                  <div
                    className="absolute top-1.5 -right-[31px] w-3 h-3 rounded-full bg-bg-base border-2 z-10"
                    style={{
                      borderColor: nodeColor,
                      boxShadow: `0 0 6px ${nodeColor}50`,
                    }}
                  />

                  <div
                    className="flex flex-col gap-1 p-3 rounded-lg"
                    style={{ background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.10)' }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-text-primary text-sm">{product.nameEn}</span>
                      <span className="text-xs font-mono-num text-text-muted">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    {hasTrend && (
                      <span className="text-xs font-mono-num font-bold text-accent-warning">
                        +{review.trendPercent}%
                      </span>
                    )}
                    <span className="text-xs text-text-secondary mt-1">{review.note}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
