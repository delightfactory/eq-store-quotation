import React, { useState } from 'react';
import { GlassCard } from './Shared';
import { productionStages, products } from '../data/quotationData';

export const ProductionTracker: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);

  const getProductStages = (productId: string) => {
    return productionStages.map(s => ({ ...s, status: 'pending', date: 'TBD' }));
  };

  const stages = getProductStages(selectedProductId);
  const completedCount = stages.filter(s => s.status === 'completed').length;
  const inProgressCount = stages.filter(s => s.status === 'in-progress').length;
  const progressPercent = ((completedCount + (inProgressCount * 0.5)) / stages.length) * 100;

  return (
    <div className="my-16 no-print animate-fade-in-up" style={{ animationDelay: '350ms' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <span className="w-1 h-6 bg-gold-primary rounded-full"></span>
          متابعة مراحل التصنيع (Production Progress Tracker)
        </h3>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-tech/10 border border-accent-tech/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-accent-tech animate-pulse"></span>
          <span className="text-xs font-en text-accent-tech font-bold uppercase tracking-wider">Interactive Prototype</span>
        </div>
      </div>

      <GlassCard className="p-6">
        {/* Top Controls & Progress */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="w-full md:w-1/3">
            <label htmlFor="product-select" className="block text-xs text-text-secondary mb-2">Select Product Track</label>
            <select 
              id="product-select"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-bg-elevated border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all font-en"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.nameEn} - {p.nameAr}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Overall Progress</span>
              <span className="font-mono-num font-bold text-gold-primary">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gold-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line for mobile, horizontal for desktop */}
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-white/5 md:hidden"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-4 relative z-10">
            {stages.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isInProgress = stage.status === 'in-progress';
              
              return (
                <div key={stage.id} className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 relative">
                  {/* Desktop connecting line */}
                  {idx < stages.length - 1 && (
                    <div className={`hidden md:block absolute top-[15px] left-[50%] w-full h-0.5 z-0 ${isCompleted ? 'bg-gold-primary' : 'bg-white/5'}`}></div>
                  )}
                  
                  {/* Status Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-colors duration-300
                    ${isCompleted ? 'bg-gold-primary border-gold-primary text-bg-base' : 
                      isInProgress ? 'bg-bg-elevated border-gold-primary text-gold-primary animate-pulse' : 
                      'bg-bg-elevated border-white/10 text-text-secondary'}`}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-xs font-mono-num font-bold">{idx + 1}</span>
                    )}
                  </div>
                  
                  {/* Stage Info */}
                  <div className="flex flex-col md:items-start w-full bg-white/[0.02] md:bg-transparent p-3 md:p-0 rounded-lg border border-white/5 md:border-none">
                    <span className={`text-xs md:text-[11px] font-bold mb-1 leading-tight ${isCompleted || isInProgress ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {stage.labelAr}
                    </span>
                    <span className="text-[10px] font-mono-num text-text-secondary px-2 py-0.5 bg-black/30 rounded inline-block md:mt-1 border border-white/5">
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
