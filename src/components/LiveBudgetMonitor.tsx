import React from 'react';
import { GlassCard } from './Shared';
import { products, selectors } from '../data/quotationData';
import { formatCurrency, formatDate } from '../utils/formatters';

export const LiveBudgetMonitor: React.FC = () => {
  // ── All logic preserved exactly ──
  const officialTotal = selectors.totalQuotationValue();

  const monitoredProducts = products.map((product) => {
    const reviewedPrice = product.currentReviewedPrice;
    const effectivePrice = reviewedPrice ?? product.pricePerKg;
    const effectiveTotal = effectivePrice * product.quantityKg;
    const diffPercent = reviewedPrice
      ? ((effectivePrice - product.pricePerKg) / product.pricePerKg) * 100
      : 0;
    const impact = effectiveTotal - product.totalValue;

    return {
      ...product,
      effectivePrice,
      effectiveTotal,
      diffPercent,
      impact,
      hasChanged: reviewedPrice !== null,
      note: product.reviewNote || 'لا يوجد تغيير سعري معتمد حاليًا',
    };
  });

  const monitoredTotal = monitoredProducts.reduce((sum, p) => sum + p.effectiveTotal, 0);
  const totalImpact = monitoredTotal - officialTotal;
  const hasActiveChanges = monitoredProducts.some((p) => p.hasChanged);

  const formatSignedCurrency = (value: number) => {
    if (value === 0) return '0 ج.م';
    return `${value > 0 ? '+' : '-'}${formatCurrency(Math.abs(value))} ج.م`;
  };

  return (
    <div className="my-16 no-print animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <span className="w-1 h-6 bg-cyan-primary/60 rounded-full" />
          Live Financial Watch Panel
          <span className="text-[10px] font-en uppercase tracking-widest text-text-muted ml-2">
            Budget Monitor
          </span>
        </h3>

        {/* Status Badge */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-sm"
          style={{
            background: hasActiveChanges
              ? 'rgba(255,179,71,0.08)'
              : 'rgba(57,217,138,0.08)',
            border: `1px solid ${hasActiveChanges ? 'rgba(255,179,71,0.30)' : 'rgba(57,217,138,0.30)'}`,
            boxShadow: hasActiveChanges
              ? undefined
              : '0 0 12px rgba(57,217,138,0.10)',
          }}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              hasActiveChanges ? 'bg-accent-warning status-pulse' : 'bg-accent-positive'
            }`}
          />
          <span
            className={`text-xs font-en font-bold uppercase tracking-wider ${
              hasActiveChanges ? 'text-accent-warning' : 'text-accent-positive'
            }`}
          >
            {hasActiveChanges ? 'Price Change Detected' : 'No Active Changes'}
          </span>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden">
        {hasActiveChanges ? (
          <>
            {/* Summary Bar */}
            <div
              className="p-4 md:p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
              style={{ borderBottom: '1px solid rgba(0,212,255,0.12)', background: 'rgba(0,0,0,0.25)' }}
            >
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-1 font-en">
                  Impact Analysis Dashboard
                </h4>
                <p className="text-xs text-text-secondary max-w-xl leading-relaxed">
                  هذه الشاشة تعرض أي مراجعات سعرية معتمدة بعد إصدار العرض وتوضح أثرها على الميزانية.
                </p>
              </div>

              <div
                className="flex flex-wrap gap-4 items-center p-3 rounded-lg"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}
              >
                {[
                  { label: 'Official Contract', value: `${formatCurrency(officialTotal)} ج.م`, color: 'text-text-primary' },
                  { label: 'Monitored Total',   value: `${formatCurrency(monitoredTotal)} ج.م`, color: 'text-accent-positive' },
                  { label: 'Net Impact',        value: formatSignedCurrency(totalImpact),        color: totalImpact === 0 ? 'text-accent-positive' : 'text-accent-negative' },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    {i > 0 && <div className="w-px h-8 bg-white/10" />}
                    <div className="flex flex-col">
                      <span className="text-[10px] text-text-muted mb-1 font-en">{item.label}</span>
                      <span className={`font-mono-num font-bold text-sm ${item.color}`}>{item.value}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead
                  className="text-xs text-text-muted font-en"
                  style={{ background: 'rgba(0,212,255,0.02)', borderBottom: '1px solid rgba(0,212,255,0.10)' }}
                >
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium text-center">Official Price</th>
                    <th className="px-4 py-3 font-medium text-center text-accent-positive">Current Reviewed</th>
                    <th className="px-4 py-3 font-medium text-center">Variance</th>
                    <th className="px-4 py-3 font-medium text-left">Impact (EGP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {monitoredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className={`transition-colors ${
                        product.hasChanged ? 'bg-accent-warning/[0.04]' : 'hover:bg-cyan-soft/30'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className="font-bold text-text-primary block font-en">{product.nameEn}</span>
                        <span className="text-[10px] text-text-muted">
                          {product.hasChanged && product.reviewedAt
                            ? `${product.note} - ${formatDate(product.reviewedAt)}`
                            : product.note}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-mono-num text-text-muted">
                        {formatCurrency(product.pricePerKg)}
                      </td>
                      <td className={`px-4 py-3 text-center font-mono-num font-bold ${product.hasChanged ? 'text-accent-warning' : 'text-text-primary'}`}>
                        {formatCurrency(product.effectivePrice)}
                      </td>
                      <td className="px-4 py-3 text-center font-mono-num">
                        {product.hasChanged ? (
                          <span className="px-2 py-0.5 rounded-sm text-[10px] bg-accent-negative/15 text-accent-negative border border-accent-negative/25">
                            {product.diffPercent > 0 ? '+' : ''}
                            {product.diffPercent.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-accent-positive text-xs">No change</span>
                        )}
                      </td>
                      <td className={`px-4 py-3 text-left font-mono-num font-bold ${product.hasChanged ? 'text-accent-negative' : 'text-text-muted'}`}>
                        {formatSignedCurrency(product.impact)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* Empty / Stable State */
          <div className="flex flex-col items-center justify-center py-16 gap-5 text-center px-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(57,217,138,0.08)',
                border: '1px solid rgba(57,217,138,0.25)',
                boxShadow: '0 0 18px rgba(57,217,138,0.12)',
              }}
            >
              <svg className="w-8 h-8 text-accent-positive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-lg text-text-primary font-bold mb-2">الأسعار ثابتة</p>
              <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
                لا توجد مراجعات سعرية نشطة منذ إصدار العرض الرسمي. إجمالي العرض محتفظ بقيمته الأصلية.
              </p>
            </div>
            <div
              className="text-xs font-en text-text-muted px-4 py-2 rounded-sm"
              style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}
            >
              NET IMPACT = 0.00 EGP
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
