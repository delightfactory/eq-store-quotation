import React from 'react';
import { GlassCard, AnimatedNumber } from './Shared';
import { selectors, products } from '../data/quotationData';

interface KpiCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  isCurrency?: boolean;
  className?: string;
  valueClassName?: string;
  /** highlight this as the primary KPI */
  primary?: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  subValue,
  isCurrency = false,
  className = '',
  valueClassName = '',
  primary = false,
}) => (
  <GlassCard
    corners={primary}
    className={`flex flex-col p-4 sm:p-5 ${primary ? 'cyan-glow' : ''} ${className}`}
  >
    {/* Cyan top accent for primary card */}
    {primary && <div className="command-line w-full mb-4 -mx-0 rounded-t-xl" />}

    <span className="text-[10px] sm:text-xs text-text-muted mb-2 leading-tight uppercase tracking-wider font-en">
      {label}
    </span>
    <div className="flex items-baseline gap-1 relative z-10">
      {typeof value === 'number' ? (
        <AnimatedNumber
          value={value}
          isCurrency={isCurrency}
          className={`text-xl sm:text-2xl font-bold text-text-primary ${primary ? 'text-gradient-cyan text-3xl sm:text-4xl' : ''} ${valueClassName}`}
        />
      ) : (
        <span
          className={`text-base sm:text-lg font-bold text-text-primary break-words leading-tight
            ${typeof value === 'string' && value.match(/^[0-9]+/) ? 'font-mono-num' : ''}
            ${valueClassName}`}
        >
          {value}
        </span>
      )}
      {subValue && (
        <span className={`text-xs ml-1 ${primary ? 'text-cyan-primary' : 'text-text-muted'}`}>
          {subValue}
        </span>
      )}
    </div>
  </GlassCard>
);

export const ExecutiveMetrics: React.FC = () => {
  const topValueProduct = selectors.topProductByValue();
  const topQuantityProduct = selectors.topProductByQuantity();

  return (
    <div className="my-12 animate-fade-in-up" style={{ animationDelay: '50ms' }}>

      {/* Section header */}
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <span className="w-1 h-6 bg-cyan-primary/60 rounded-full" />
        مؤشرات العرض الرئيسية
        <span className="text-[10px] font-en uppercase tracking-widest text-text-muted ml-2">
          KPI Dashboard
        </span>
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <KpiCard
          label="Total Quotation Value"
          value={selectors.totalQuotationValue()}
          subValue="ج.م"
          isCurrency={true}
          primary
          className="col-span-2 md:col-span-1 lg:col-span-1"
        />
        <KpiCard
          label="Total Quantity"
          value={selectors.totalQuantity()}
          subValue="كجم"
        />
        <KpiCard
          label="Product Lines"
          value={products.length}
        />
        <KpiCard
          label="Highest Value"
          value={topValueProduct.nameEn}
        />
        <KpiCard
          label="Largest Volume"
          value={topQuantityProduct.nameEn}
        />
        <KpiCard
          label="Validity Period"
          value="3 أيام عمل"
        />
      </div>
    </div>
  );
};
