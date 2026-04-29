import React from 'react';
import { GlassCard } from './Shared';
import { products, selectors } from '../data/quotationData';
import { formatCurrency, formatDate } from '../utils/formatters';

export const LiveBudgetMonitor: React.FC = () => {
  const officialTotal = selectors.totalQuotationValue();

  const monitoredProducts = products.map(product => {
    const reviewedPrice = product.currentReviewedPrice;
    const effectivePrice = reviewedPrice ?? product.pricePerKg;
    const effectiveTotal = effectivePrice * product.quantityKg;
    const diffPercent = reviewedPrice ? ((effectivePrice - product.pricePerKg) / product.pricePerKg) * 100 : 0;
    const impact = effectiveTotal - product.totalValue;

    return {
      ...product,
      effectivePrice,
      effectiveTotal,
      diffPercent,
      impact,
      hasChanged: reviewedPrice !== null,
      note: product.reviewNote || 'لا يوجد تغيير سعري معتمد حاليًا'
    };
  });

  const monitoredTotal = monitoredProducts.reduce((sum, product) => sum + product.effectiveTotal, 0);
  const totalImpact = monitoredTotal - officialTotal;
  const hasActiveChanges = monitoredProducts.some(product => product.hasChanged);

  const formatSignedCurrency = (value: number) => {
    if (value === 0) return '0 ج.م';
    return `${value > 0 ? '+' : '-'}${formatCurrency(Math.abs(value))} ج.م`;
  };

  return (
    <div className="my-16 no-print animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <span className="w-1 h-6 bg-gold-primary rounded-full"></span>
          مراقبة الميزانية الحية (Live Budget Monitor)
        </h3>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-tech/10 border border-accent-tech/30 rounded-full">
          <span className={`w-2 h-2 rounded-full ${hasActiveChanges ? 'bg-accent-warning animate-pulse' : 'bg-accent-positive'}`}></span>
          <span className="text-xs font-en text-accent-tech font-bold uppercase tracking-wider">
            {hasActiveChanges ? 'Price Change Detected' : 'No Active Changes'}
          </span>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden">
        {hasActiveChanges ? (
          <>
            <div className="p-4 md:p-6 bg-black/40 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-1">Impact Analysis Dashboard</h4>
                <p className="text-xs text-text-secondary max-w-xl leading-relaxed">
                  هذه الشاشة تعرض أي مراجعات سعرية معتمدة بعد إصدار العرض وتوضح أثرها على الميزانية.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 items-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary mb-1">Official Contract</span>
                  <span className="font-mono-num font-bold text-sm text-text-primary">{formatCurrency(officialTotal)} ج.م</span>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary mb-1">Current Monitored Total</span>
                  <span className="font-mono-num font-bold text-sm text-accent-positive">{formatCurrency(monitoredTotal)} ج.م</span>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary mb-1">Net Impact</span>
                  <span className={`font-mono-num font-bold text-sm ${totalImpact === 0 ? 'text-accent-positive' : 'text-accent-negative'}`}>
                    {formatSignedCurrency(totalImpact)}
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="bg-white/[0.02] border-b border-white/10 text-xs text-text-secondary font-en">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium text-center">Official Price</th>
                    <th className="px-4 py-3 font-medium text-center text-accent-positive">Current Reviewed Price</th>
                    <th className="px-4 py-3 font-medium text-center">Variance</th>
                    <th className="px-4 py-3 font-medium text-left">Impact (EGP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {monitoredProducts.map(product => (
                    <tr key={product.id} className={`transition-colors ${product.hasChanged ? 'bg-accent-warning/5' : 'hover:bg-white/[0.02]'}`}>
                      <td className="px-4 py-3">
                        <span className="font-bold text-text-primary block font-en">{product.nameEn}</span>
                        <span className="text-[10px] text-text-secondary">
                          {product.hasChanged && product.reviewedAt ? `${product.note} - ${formatDate(product.reviewedAt)}` : product.note}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-mono-num text-text-secondary">
                        {formatCurrency(product.pricePerKg)}
                      </td>
                      <td className={`px-4 py-3 text-center font-mono-num font-bold ${product.hasChanged ? 'text-accent-warning' : 'text-text-primary'}`}>
                        {formatCurrency(product.effectivePrice)}
                      </td>
                      <td className="px-4 py-3 text-center font-mono-num">
                        {product.hasChanged ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-accent-negative/20 text-accent-negative border border-accent-negative/30">
                            {product.diffPercent > 0 ? '+' : ''}{product.diffPercent.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-accent-positive text-xs">No change</span>
                        )}
                      </td>
                      <td className={`px-4 py-3 text-left font-mono-num font-bold ${product.hasChanged ? 'text-accent-negative' : 'text-text-secondary'}`}>
                        {formatSignedCurrency(product.impact)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-accent-positive/10 border border-accent-positive/20 text-accent-positive flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg text-text-primary font-bold">الأسعار ثابتة</p>
            <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
              لا توجد مراجعات سعرية نشطة منذ إصدار العرض الرسمي. إجمالي العرض محتفظ بقيمته الأصلية.
            </p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
