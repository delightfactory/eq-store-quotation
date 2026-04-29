import React, { useState } from 'react';
import { GlassCard } from './Shared';
import { commercialTerms } from '../data/quotationData';

const AccordionItem: React.FC<{
  term: typeof commercialTerms[0];
  defaultOpen?: boolean;
}> = ({ term, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/[0.04] last:border-b-0 print-page-break-inside-avoid">
      <button
        id={`accordion-btn-${term.id}`}
        aria-controls={`accordion-panel-${term.id}`}
        className="w-full py-4 px-3 flex justify-between items-center text-right focus-visible:ring-2 focus-visible:ring-cyan-primary outline-none focus:bg-white/[0.02] rounded-t-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-text-primary text-sm md:text-base flex items-center gap-2">
          {term.priority && (
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-primary/70" />
          )}
          {term.title}
        </span>
        <svg
          className={`w-5 h-5 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
        <p className="p-4 pt-0 text-sm text-text-secondary leading-relaxed">
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
        {/* Graphite tone for the accent – less neon than technical sections */}
        <span className="w-1 h-6 bg-white/30 rounded-full" />
        الشروط التجارية والملاحظات
        <span className="text-[10px] font-en uppercase tracking-widest text-text-muted ml-2">
          Commercial Terms
        </span>
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Terms Accordion */}
        <div className="order-last lg:order-first lg:col-span-2 flex flex-col gap-6">

          {/* Summary Strip – formal graphite tone */}
          <div
            className="flex flex-wrap gap-4 p-4 rounded-xl"
            style={{ background: 'rgba(22,34,51,0.70)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-warning" />
              <span className="text-sm text-text-primary font-bold">غير شامل ضريبة القيمة المضافة</span>
            </div>
            <div className="w-px h-5 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-warning" />
              <span className="text-sm text-text-primary font-bold">غير شامل التعبئة والتغليف</span>
            </div>
            <div className="w-px h-5 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-positive" />
              <span className="text-sm text-text-primary font-bold">صلاحية العرض: 3 أيام عمل</span>
            </div>
          </div>

          {/* Accordion in graphite panel */}
          <GlassCard className="p-2">
            {commercialTerms.map((term, idx) => (
              <AccordionItem key={term.id} term={term} defaultOpen={idx < 4} />
            ))}
          </GlassCard>
        </div>

        {/* Next Steps */}
        <div className="order-first lg:order-last lg:col-span-1 space-y-4">
          <h4
            className="font-bold text-text-primary mb-4 pb-2 flex items-center gap-2"
            style={{ borderBottom: '1px solid rgba(0,212,255,0.14)' }}
          >
            <span className="w-px h-4 bg-cyan-primary/50" />
            الخطوات التالية
          </h4>

          {[
            {
              num: 1,
              title: 'اعتماد العرض المالي',
              desc: 'مراجعة وتأكيد الكميات والأسعار الواردة أعلاه للنسخة 1.0.',
            },
            {
              num: 2,
              title: 'اعتماد العينات',
              desc: 'تقييم عينات الإنتاج الأولية واعتماد المواصفات الفنية قبل بدء التشغيل.',
            },
            {
              num: 3,
              title: 'اعتماد العبوات والتعبئة',
              desc: 'الاتفاق على أشكال العبوات، الليبلات، والكراتين وإصدار عرض سعر مستقل لمستلزمات التعبئة.',
            },
          ].map((step) => (
            /* Wrap with div to apply border-left without touching GlassCard's typed props */
            <div key={step.num} style={{ borderLeft: '2px solid rgba(0,212,255,0.18)', borderRadius: '1rem' }}>
            <GlassCard
              className="p-5 flex gap-4 items-start hover:bg-white/[0.02] transition-colors cursor-default rounded-l-none"
            >
              <div className="w-8 h-8 rounded-sm bg-cyan-soft border border-cyan-primary/20 flex items-center justify-center shrink-0 font-mono text-sm text-cyan-primary font-bold">
                {step.num}
              </div>
              <div>
                <h5 className="font-bold text-sm mb-1 text-text-primary">{step.title}</h5>
                <p className="text-xs text-text-secondary">{step.desc}</p>
              </div>
            </GlassCard>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
