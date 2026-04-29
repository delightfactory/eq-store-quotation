import React from 'react';
import { GlassCard, CategoryBadge } from './Shared';
import { products, categories, selectors } from '../data/quotationData';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const OfficialQuotationTable: React.FC = () => {
  return (
    <div className="my-12 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <span className="w-1 h-6 bg-cyan-primary/60 rounded-full" />
        جدول المنتجات والكميات والأسعار
        <span className="text-[10px] font-en uppercase tracking-widest text-text-muted ml-2">
          Terminal Table
        </span>
      </h3>

      <GlassCard className="p-0 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-sm text-right relative">
            <thead
              className="text-text-muted sticky top-0 z-10"
              style={{
                background: 'rgba(8, 13, 22, 0.97)',
                borderBottom: '1px solid rgba(0, 212, 255, 0.18)',
              }}
            >
              <tr>
                <th className="px-6 py-4 font-mono font-medium text-xs tracking-wider text-center w-16">#</th>
                <th className="px-6 py-4 font-medium text-xs tracking-wider">المنتج</th>
                <th className="px-6 py-4 font-medium text-xs tracking-wider">التصنيف</th>
                <th className="px-6 py-4 font-medium text-xs tracking-wider text-center">الكمية</th>
                <th className="px-6 py-4 font-medium text-xs tracking-wider text-center">سعر الكجم</th>
                <th className="px-6 py-4 font-medium text-xs tracking-wider text-left">الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {products.map((product, idx) => {
                const category = categories[product.categoryId as keyof typeof categories];
                const rowNum = String(idx + 1).padStart(3, '0');
                return (
                  <tr
                    key={product.id}
                    className="hover:bg-cyan-soft/40 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-mono text-text-muted text-center text-xs">
                      #{rowNum}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-text-primary">{product.nameEn}</span>
                        <span className="text-xs text-text-muted">{product.nameAr}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <CategoryBadge color={category.color} label={category.labelAr} />
                    </td>
                    <td className="px-6 py-4 text-center font-mono-num text-text-secondary">
                      {formatNumber(product.quantityKg)}
                      <span className="text-xs text-text-muted mr-1">كجم</span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono-num text-text-secondary">
                      {formatCurrency(product.pricePerKg)}
                      <span className="text-xs text-text-muted mr-1">ج</span>
                    </td>
                    <td className="px-6 py-4 text-left font-mono-num font-bold text-text-primary">
                      {formatCurrency(product.totalValue)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot
              style={{
                background: 'rgba(0, 212, 255, 0.04)',
                borderTop: '1px solid rgba(0, 212, 255, 0.20)',
              }}
            >
              <tr>
                <td colSpan={3} className="px-6 py-5 font-bold text-text-primary">
                  الإجمالي النهائي
                </td>
                <td className="px-6 py-5 text-center font-mono-num font-bold text-cyan-primary">
                  {formatNumber(selectors.totalQuantity())}
                  <span className="text-xs font-normal text-text-muted mr-1">كجم</span>
                </td>
                <td className="px-6 py-5 text-center text-text-muted">—</td>
                <td className="px-6 py-5 text-left font-mono-num font-bold text-cyan-primary text-lg">
                  {formatCurrency(selectors.totalQuotationValue())}
                  <span className="text-sm font-normal text-text-muted mr-1">ج.م</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col divide-y divide-white/[0.04]">
          {products.map((product, idx) => {
            const category = categories[product.categoryId as keyof typeof categories];
            const rowNum = String(idx + 1).padStart(3, '0');
            return (
              <div key={product.id} className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-sm bg-cyan-soft border border-cyan-primary/20 text-xs font-mono text-cyan-primary">
                      #{rowNum}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-text-primary">{product.nameEn}</span>
                      <span className="text-xs text-text-muted">{product.nameAr}</span>
                    </div>
                  </div>
                  <CategoryBadge color={category.color} label={category.labelAr} />
                </div>

                <div className="grid grid-cols-3 gap-2 bg-bg-overlay/60 border border-cyan-primary/10 p-3 rounded-lg mt-1">
                  <div className="flex flex-col text-center">
                    <span className="text-[10px] text-text-muted mb-1 font-en">Qty</span>
                    <span className="font-mono-num text-sm">{formatNumber(product.quantityKg)}</span>
                  </div>
                  <div className="flex flex-col text-center border-x border-white/5">
                    <span className="text-[10px] text-text-muted mb-1 font-en">Price/kg</span>
                    <span className="font-mono-num text-sm">{formatCurrency(product.pricePerKg)}</span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-[10px] text-text-muted mb-1 font-en">Total</span>
                    <span className="font-mono-num text-sm font-bold text-cyan-primary">
                      {formatCurrency(product.totalValue)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Mobile Total */}
          <div
            className="p-4 flex flex-col gap-2"
            style={{
              background: 'rgba(0, 212, 255, 0.04)',
              borderTop: '1px solid rgba(0, 212, 255, 0.20)',
            }}
          >
            <span className="text-xs text-text-muted text-center uppercase tracking-wider font-en">
              Final Total
            </span>
            <div className="flex justify-between items-center px-2">
              <span className="font-mono-num font-bold text-cyan-primary">
                {formatNumber(selectors.totalQuantity())} كجم
              </span>
              <span className="font-mono-num font-bold text-cyan-primary text-xl">
                {formatCurrency(selectors.totalQuotationValue())} ج.م
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Footer notice */}
      <div className="mt-4 flex flex-wrap gap-4 p-4 bg-bg-overlay/50 border border-cyan-primary/10 rounded-xl items-center justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-text-primary text-sm">
            <span className="w-2 h-2 rounded-full bg-accent-warning" />
            غير شامل ضريبة القيمة المضافة
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/10" />
          <span className="flex items-center gap-1.5 font-bold text-text-primary text-sm">
            <span className="w-2 h-2 rounded-full bg-accent-warning" />
            غير شامل التعبئة والتغليف
          </span>
        </div>
        <span className="font-en tracking-widest text-[9px] uppercase text-text-muted border border-cyan-primary/15 px-2 py-1 rounded-sm bg-cyan-soft">
          Confidential Commercial Document
        </span>
      </div>
    </div>
  );
};
