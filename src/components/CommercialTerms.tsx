import React, { useState } from 'react';
import { GlassCard } from './Shared';
import { commercialTerms } from '../data/quotationData';

const AccordionItem: React.FC<{ term: typeof commercialTerms[0], defaultOpen?: boolean }> = ({ term, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/5 last:border-b-0 print-page-break-inside-avoid">
      <button 
        id={`accordion-btn-${term.id}`}
        aria-controls={`accordion-panel-${term.id}`}
        className="w-full py-4 px-2 flex justify-between items-center text-right focus-visible:ring-2 focus-visible:ring-gold-primary outline-none focus:bg-white/[0.02] rounded-t-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-text-primary text-sm md:text-base flex items-center gap-2">
          {term.priority && <span className="w-1.5 h-1.5 rounded-full bg-gold-primary"></span>}
          {term.title}
        </span>
        <svg 
          className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        id={`accordion-panel-${term.id}`}
        role="region"
        aria-labelledby={`accordion-btn-${term.id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="p-4 pt-0 text-sm text-text-secondary leading-relaxed bg-white/[0.01] rounded-b-lg">
          {term.text}
        </p>
      </div>
    </div>
  );
};

export const CommercialTerms: React.FC = () => {
  return (
    <div className="my-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <span className="w-1 h-6 bg-gold-primary rounded-full"></span>
        الشروط التجارية والملاحظات
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Executive Summary Strip */}
          <div className="flex flex-wrap gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-warning"></span>
              <span className="text-sm text-text-primary font-bold">غير شامل ضريبة القيمة المضافة</span>
            </div>
            <div className="w-px h-5 bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-warning"></span>
              <span className="text-sm text-text-primary font-bold">غير شامل التعبئة والتغليف</span>
            </div>
            <div className="w-px h-5 bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-primary"></span>
              <span className="text-sm text-text-primary font-bold">صلاحية العرض: 3 أيام عمل</span>
            </div>
          </div>

          <GlassCard className="p-2">
            {commercialTerms.map((term, idx) => (
              <AccordionItem key={term.id} term={term} defaultOpen={idx < 4} />
            ))}
          </GlassCard>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <h4 className="font-bold text-text-primary mb-4 border-b border-white/10 pb-2">الخطوات التالية</h4>
          
          <GlassCard className="p-5 flex gap-4 items-start hover:bg-white/[0.02] transition-colors cursor-default border-l-2 border-l-transparent hover:border-l-gold-primary">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 font-mono-num text-sm">1</div>
            <div>
              <h5 className="font-bold text-sm mb-1 text-text-primary">اعتماد العرض المالي</h5>
              <p className="text-xs text-text-secondary">مراجعة وتأكيد الكميات والأسعار الواردة أعلاه للنسخة 1.0.</p>
            </div>
          </GlassCard>
          
          <GlassCard className="p-5 flex gap-4 items-start hover:bg-white/[0.02] transition-colors cursor-default border-l-2 border-l-transparent hover:border-l-gold-primary">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 font-mono-num text-sm">2</div>
            <div>
              <h5 className="font-bold text-sm mb-1 text-text-primary">اعتماد العينات</h5>
              <p className="text-xs text-text-secondary">تقييم عينات الإنتاج الأولية واعتماد المواصفات الفنية قبل بدء التشغيل.</p>
            </div>
          </GlassCard>
          
          <GlassCard className="p-5 flex gap-4 items-start hover:bg-white/[0.02] transition-colors cursor-default border-l-2 border-l-transparent hover:border-l-gold-primary">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 font-mono-num text-sm">3</div>
            <div>
              <h5 className="font-bold text-sm mb-1 text-text-primary">اعتماد العبوات والتعبئة</h5>
              <p className="text-xs text-text-secondary">الاتفاق على أشكال العبوات، الليبلات، والكراتين وإصدار عرض سعر مستقل لمستلزمات التعبئة.</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
