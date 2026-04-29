import React from 'react';
import { GlassCard, AnimatedNumber } from './Shared';
import { selectors, products } from '../data/quotationData';

interface KpiCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  isCurrency?: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, value, subValue, isCurrency = false }) => (
  <GlassCard className="flex flex-col p-4 sm:p-5">
    <span className="text-xs sm:text-sm text-text-secondary mb-2 leading-tight">{label}</span>
    <div className="flex items-baseline gap-1">
      {typeof value === 'number' ? (
        <AnimatedNumber value={value} isCurrency={isCurrency} className="text-xl sm:text-2xl font-bold text-text-primary" />
      ) : (
        <span className={`text-lg sm:text-xl font-bold text-text-primary break-words leading-tight ${typeof value === 'string' && value.match(/^[0-9]+/) ? 'font-mono-num' : ''}`}>{value}</span>
      )}
      {subValue && <span className="text-xs text-text-secondary ml-1">{subValue}</span>}
    </div>
  </GlassCard>
);

export const ExecutiveMetrics: React.FC = () => {
  const topValueProduct = selectors.topProductByValue();
  const topQuantityProduct = selectors.topProductByQuantity();

  return (
    <div className="my-12 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <span className="w-1 h-6 bg-gold-primary rounded-full"></span>
        مؤشرات العرض الرئيسية
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <KpiCard 
          label="إجمالي العرض" 
          value={selectors.totalQuotationValue()} 
          subValue="ج.م" 
          isCurrency={true} 
        />
        <KpiCard 
          label="إجمالي الكميات" 
          value={selectors.totalQuantity()} 
          subValue="كجم" 
        />
        <KpiCard 
          label="عدد المنتجات" 
          value={products.length} 
        />
        <KpiCard 
          label="أعلى قيمة" 
          value={topValueProduct.nameEn} 
        />
        <KpiCard 
          label="أكبر كمية" 
          value={topQuantityProduct.nameEn} 
        />
        <KpiCard 
          label="صلاحية العرض" 
          value="3 أيام عمل" 
        />
      </div>
    </div>
  );
};
