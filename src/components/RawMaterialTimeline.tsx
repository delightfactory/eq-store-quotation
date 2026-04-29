import React from 'react';
import { GlassCard } from './Shared';
import { products } from '../data/quotationData';
import { formatDate } from '../utils/formatters';

export const RawMaterialTimeline: React.FC = () => {
  // Sort products by rawMaterialReview date (newest first)
  const sortedProducts = [...products].sort((a, b) => {
    return new Date(b.rawMaterialReview.date).getTime() - new Date(a.rawMaterialReview.date).getTime();
  });

  return (
    <div className="my-16 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
      <div className="mb-6 max-w-2xl">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
          <span className="w-1 h-6 bg-gold-primary rounded-full"></span>
          مراجعة تكلفة الخامات (شفافية التسعير)
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          هذا السجل يوضح آخر مراجعة لتكلفة الخامات عالميًا والمؤثرة على التسعير. لا يعني رصد زيادة في تكلفة الخامات أن السعر سيتغير فورًا بعد انتهاء صلاحية العرض، بل يوضح لك سبب المراجعة المستمرة وكيف نتحمل عنك عبء تقلبات السوق لأطول فترة ممكنة.
        </p>
        
        {/* Legend & Scroll Hint */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs bg-white/5 p-3 rounded-lg border border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-primary"></span>
              <span className="text-text-primary">استقرار أو انخفاض</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-warning"></span>
              <span className="text-text-primary">رصد زيادة في التكلفة</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-text-secondary">
            <span className="font-en text-[10px] uppercase tracking-wider">Scroll</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden relative">
        <div className="hidden md:block overflow-x-auto p-6 custom-scrollbar pb-8">
          <div className="relative">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 border-dashed"></div>
            
            <div className="flex gap-4 overflow-x-auto pb-6 pt-4 px-2 snap-x">
              {sortedProducts.map((product) => {
                const review = product.rawMaterialReview;
                const hasTrend = review.trend === 'up';
                
                return (
                  <div key={product.id} className="relative flex-none w-64 snap-start">
                    {/* Node on line */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-bg-base border-2 z-10 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                         style={{ borderColor: hasTrend ? 'var(--color-accent-warning)' : 'var(--color-gold-primary)' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: hasTrend ? 'var(--color-accent-warning)' : 'var(--color-gold-primary)' }}></div>
                    </div>
                    
                    {/* Content Top */}
                    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 pb-6 text-center w-full">
                      <span className="block text-xs font-mono-num text-text-secondary mb-1">
                        {formatDate(review.date)}
                      </span>
                      <span className="block font-bold text-sm text-text-primary">
                        {product.nameEn}
                      </span>
                    </div>
                    
                    {/* Content Bottom */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 pt-6 w-full text-center">
                      <div className={`text-xs p-2 rounded border inline-block max-w-[220px] text-left
                        ${hasTrend 
                          ? 'bg-accent-warning/10 border-accent-warning/30 text-accent-warning' 
                          : 'bg-white/5 border-white/10 text-text-secondary'}`}>
                        {hasTrend && (
                          <span className="block font-mono-num font-bold mb-1">
                            +{review.trendPercent}% Cost Impact
                          </span>
                        )}
                        <span className="text-[10px] leading-tight block" dir="rtl">{review.note}</span>
                      </div>
                    </div>
                    
                    {/* Invisible spacer to maintain height */}
                    <div className="h-48 w-full"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden p-4 space-y-6">
          <div className="relative border-r border-white/10 border-dashed mr-4 pr-6">
            {sortedProducts.map((product) => {
              const review = product.rawMaterialReview;
              const hasTrend = review.trend === 'up';
              
              return (
                <div key={product.id} className="relative mb-6 last:mb-0">
                  {/* Node */}
                  <div className="absolute top-1.5 -right-[31px] w-3 h-3 rounded-full bg-bg-base border-2 z-10 flex items-center justify-center"
                       style={{ borderColor: hasTrend ? 'var(--color-accent-warning)' : 'var(--color-gold-primary)' }}>
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: hasTrend ? 'var(--color-accent-warning)' : 'var(--color-gold-primary)' }}></div>
                  </div>
                  
                  <div className="flex flex-col gap-1 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-text-primary text-sm">{product.nameEn}</span>
                      <span className="text-xs font-mono-num text-text-secondary">
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
