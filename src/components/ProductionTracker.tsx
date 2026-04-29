import React, { useState } from 'react';
import { GlassCard } from './Shared';
import { productionStages, products } from '../data/quotationData';

export const ProductionTracker: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);

  // Logic preserved exactly
  const getProductStages = () =>
    productionStages.map((s) => ({ ...s, status: 'pending', date: 'لم يُحدد بعد' }));

  const stages = getProductStages();
  const completedCount = stages.filter((s) => s.status === 'completed').length;
  const inProgressCount = stages.filter((s) => s.status === 'in-progress').length;
  const progressPercent =
    ((completedCount + inProgressCount * 0.5) / stages.length) * 100;

  return (
    <div className="my-16 no-print animate-fade-in-up" style={{ animationDelay: '350ms' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <span className="w-1 h-6 bg-cyan-primary/60 rounded-full" />
          Manufacturing Flow Tracker
          <span className="text-[10px] font-en uppercase tracking-widest text-text-muted ml-2">
            Production Stages
          </span>
        </h3>

        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-sm"
          style={{
            background: 'rgba(0,212,255,0.06)',
            border: '1px solid rgba(0,212,255,0.25)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-primary status-pulse" />
          <span className="text-xs font-en text-cyan-primary font-bold uppercase tracking-wider">
            Interactive Prototype
          </span>
        </div>
      </div>

      <GlassCard className="p-6">
        {/* Controls & Progress */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          {/* Product selector */}
          <div className="w-full md:w-1/3">
            <label htmlFor="product-select" className="block text-[10px] text-text-muted mb-2 uppercase tracking-wider font-en">
              Select Product Track
            </label>
            <select
              id="product-select"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-bg-overlay border border-cyan-primary/15 rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-cyan-primary/40 focus:ring-1 focus:ring-cyan-primary/25 transition-all font-en"
              style={{ background: 'rgba(16,24,36,0.90)' }}
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nameEn} — {p.nameAr}
                </option>
              ))}
            </select>
          </div>

          {/* Overall progress */}
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted text-xs font-en uppercase tracking-wider">Overall Progress</span>
              <span className="font-mono-num font-bold text-cyan-primary">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-bg-overlay rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #0090B3, #00D4FF)',
                  boxShadow: '0 0 8px rgba(0,212,255,0.30)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Stage Grid */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
            {stages.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isInProgress = stage.status === 'in-progress';

              return (
                <div key={stage.id} className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 relative">
                  {/* Desktop connecting rail */}
                  {idx < stages.length - 1 && (
                    <div
                      className={`hidden md:block absolute top-[15px] left-[50%] w-full h-0.5 z-0`}
                      style={{
                        background: isCompleted
                          ? 'rgba(0,212,255,0.40)'
                          : 'rgba(255,255,255,0.05)',
                      }}
                    />
                  )}

                  {/* Stage circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-colors duration-300
                      ${
                        isCompleted
                          ? 'border-cyan-primary text-bg-base'
                          : isInProgress
                          ? 'border-cyan-primary text-cyan-primary'
                          : 'border-white/10 text-text-muted'
                      }`}
                    style={{
                      background: isCompleted
                        ? 'rgba(0,212,255,0.90)'
                        : isInProgress
                        ? 'rgba(0,212,255,0.08)'
                        : 'rgba(16,24,36,0.90)',
                      boxShadow: isCompleted
                        ? '0 0 10px rgba(0,212,255,0.35)'
                        : undefined,
                    }}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-xs font-mono font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Stage info */}
                  <div className="flex flex-col md:items-start w-full bg-white/[0.02] md:bg-transparent p-3 md:p-0 rounded-lg border border-white/5 md:border-none">
                    <span
                      className={`text-xs md:text-[11px] font-bold mb-1 leading-tight ${
                        isCompleted || isInProgress ? 'text-text-primary' : 'text-text-muted'
                      }`}
                    >
                      {stage.labelAr}
                    </span>
                    <span className="text-[10px] font-mono-num text-text-muted px-2 py-0.5 bg-black/30 rounded-sm inline-block md:mt-1 border border-white/5">
                      {stage.date}
                    </span>
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
