import React from 'react';
import { GlassCard, CategoryBadge } from './Shared';
import { products, categories, selectors } from '../data/quotationData';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const OfficialQuotationTable: React.FC = () => {
  return (
    <div className="my-12 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <span className="w-1 h-6 bg-gold-primary rounded-full"></span>
        جدول المنتجات والكميات والأسعار
      </h3>

      <GlassCard className="p-0 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-sm text-right relative">
            <thead className="bg-bg-elevated border-b border-white/10 text-text-secondary sticky top-0 z-10 shadow-md">
              <tr>
                <th className="px-6 py-4 font-semibold w-12 text-center">م</th>
                <th className="px-6 py-4 font-semibold">المنتج</th>
                <th className="px-6 py-4 font-semibold">التصنيف</th>
                <th className="px-6 py-4 font-semibold text-center">الكمية</th>
                <th className="px-6 py-4 font-semibold text-center">سعر الكجم</th>
                <th className="px-6 py-4 font-semibold text-left">الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product, idx) => {
                const category = categories[product.categoryId as keyof typeof categories];
                return (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono-num text-text-secondary text-center">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-text-primary">{product.nameEn}</span>
                        <span className="text-xs text-text-secondary">{product.nameAr}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <CategoryBadge color={category.color} label={category.labelAr} />
                    </td>
                    <td className="px-6 py-4 text-center font-mono-num">
                      {formatNumber(product.quantityKg)} <span className="text-xs text-text-secondary">كجم</span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono-num">
                      {formatCurrency(product.pricePerKg)} <span className="text-xs text-text-secondary">ج</span>
                    </td>
                    <td className="px-6 py-4 text-left font-mono-num font-bold text-text-primary">
                      {formatCurrency(product.totalValue)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-black/60 border-t border-white/10">
              <tr>
                <td colSpan={3} className="px-6 py-5 font-bold text-text-primary">الإجمالي النهائي</td>
                <td className="px-6 py-5 text-center font-mono-num font-bold text-gold-primary">
                  {formatNumber(selectors.totalQuantity())} <span className="text-xs">كجم</span>
                </td>
                <td className="px-6 py-5 text-center text-text-secondary">—</td>
                <td className="px-6 py-5 text-left font-mono-num font-bold text-gold-primary text-lg">
                  {formatCurrency(selectors.totalQuotationValue())} <span className="text-sm">ج.م</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col divide-y divide-white/5">
          {products.map((product, idx) => {
            const category = categories[product.categoryId as keyof typeof categories];
            return (
              <div key={product.id} className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-xs font-mono-num text-text-secondary">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-text-primary">{product.nameEn}</span>
                      <span className="text-xs text-text-secondary">{product.nameAr}</span>
                    </div>
                  </div>
                  <CategoryBadge color={category.color} label={category.labelAr} />
                </div>
                
                <div className="grid grid-cols-3 gap-2 bg-black/30 p-3 rounded-lg mt-2">
                  <div className="flex flex-col text-center">
                    <span className="text-[10px] text-text-secondary mb-1">الكمية</span>
                    <span className="font-mono-num text-sm">{formatNumber(product.quantityKg)}</span>
                  </div>
                  <div className="flex flex-col text-center border-x border-white/5">
                    <span className="text-[10px] text-text-secondary mb-1">السعر</span>
                    <span className="font-mono-num text-sm">{formatCurrency(product.pricePerKg)}</span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-[10px] text-text-secondary mb-1">الإجمالي</span>
                    <span className="font-mono-num text-sm font-bold text-gold-primary">{formatCurrency(product.totalValue)}</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Mobile Total */}
          <div className="p-4 bg-black/60 flex flex-col gap-2 border-t border-gold-primary/30">
            <span className="text-sm text-text-secondary text-center">الإجمالي النهائي</span>
            <div className="flex justify-between items-center px-4">
              <span className="font-mono-num font-bold text-gold-primary">{formatNumber(selectors.totalQuantity())} كجم</span>
              <span className="font-mono-num font-bold text-gold-primary text-xl">{formatCurrency(selectors.totalQuotationValue())} ج.م</span>
            </div>
          </div>
        </div>

      </GlassCard>
      
      <div className="mt-4 flex flex-wrap gap-4 p-4 bg-white/5 border border-white/10 rounded-xl items-center justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-text-primary text-sm">
            <span className="w-2 h-2 rounded-full bg-accent-warning"></span>
            غير شامل ضريبة القيمة المضافة
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/10"></span>
          <span className="flex items-center gap-1.5 font-bold text-text-primary text-sm">
            <span className="w-2 h-2 rounded-full bg-accent-warning"></span>
            غير شامل التعبئة والتغليف
          </span>
        </div>
        <span className="font-en tracking-widest text-[10px] uppercase opacity-70 text-text-secondary border border-white/10 px-2 py-1 rounded bg-black/20">Confidential Commercial Document</span>
      </div>
    </div>
  );
};
