import React, { useState } from 'react';
import { GlassCard, CategoryBadge } from './Shared';
import { products, categories } from '../data/quotationData';
import { formatCurrency, formatNumber } from '../utils/formatters';

const ProductCard: React.FC<{ product: typeof products[0]; index: number }> = ({
  product,
  index,
}) => {
  const [activeTab, setActiveTab] = useState<'role' | 'strengths' | 'reason'>('role');
  const category = categories[product.categoryId as keyof typeof categories];
  const isPremium = product.role === 'premium';

  return (
    <GlassCard
      premium={isPremium}
      className={`flex flex-col h-full print-page-break-inside-avoid relative overflow-hidden
        ${isPremium ? 'group' : ''}`}
    >
      {/* Premium edge highlight on hover */}
      {isPremium && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-sm border font-mono text-xs
              ${isPremium
                ? 'border-cyan-primary/40 text-cyan-primary bg-cyan-soft'
                : 'border-white/10 text-text-muted bg-white/5'
              }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col">
            <h4
              className={`text-base font-bold font-en tracking-wide ${
                isPremium ? 'text-cyan-primary' : 'text-text-primary'
              }`}
            >
              {product.nameEn}
            </h4>
            <span className="text-sm text-text-muted">{product.nameAr}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <CategoryBadge color={category.color} label={category.labelAr} />
          <span className="text-[10px] uppercase tracking-wider text-text-muted px-2 py-0.5 rounded-sm border border-white/10 bg-black/20">
            {product.roleLabelAr}
          </span>
        </div>
      </div>

      {/* Short Message */}
      <p
        className="text-sm text-text-secondary leading-relaxed mb-5 pr-3"
        style={{ borderRight: '2px solid rgba(0,212,255,0.20)' }}
      >
        {product.shortMessage}
      </p>

      {/* KPI Row */}
      <div
        className="grid grid-cols-3 gap-0 rounded-xl mb-5 overflow-hidden"
        style={{ border: '1px solid rgba(0,212,255,0.10)' }}
      >
        <div className="flex flex-col items-center justify-center text-center py-3 px-2 bg-bg-overlay/50">
          <span className="text-[10px] text-text-muted mb-1 font-en">Qty</span>
          <span className="font-mono-num text-sm font-semibold">{formatNumber(product.quantityKg)}</span>
        </div>
        <div
          className="flex flex-col items-center justify-center text-center py-3 px-2 bg-bg-overlay/50"
          style={{ borderLeft: '1px solid rgba(0,212,255,0.10)', borderRight: '1px solid rgba(0,212,255,0.10)' }}
        >
          <span className="text-[10px] text-text-muted mb-1 font-en">Price/kg</span>
          <span className="font-mono-num text-sm font-semibold">{formatCurrency(product.pricePerKg)}</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center py-3 px-2 bg-bg-overlay/50">
          <span className="text-[10px] text-text-muted mb-1 font-en">Total</span>
          <span className={`font-mono-num text-sm font-bold ${isPremium ? 'text-cyan-primary' : 'text-text-primary'}`}>
            {formatCurrency(product.totalValue)}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-auto">
        <div
          className="flex mb-3"
          role="tablist"
          aria-label="تفاصيل المنتج"
          style={{ borderBottom: '1px solid rgba(0,212,255,0.12)' }}
        >
          {(['role', 'strengths', 'reason'] as const).map((tab) => {
            const labels = { role: 'الدور التجاري', strengths: 'نقاط القوة', reason: 'سبب الإدراج' };
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab}-${product.id}`}
                id={`tab-${tab}-${product.id}`}
                className={`flex-1 py-2 min-h-[40px] text-xs font-semibold transition-colors border-b-2 focus-visible:ring-2 focus-visible:ring-cyan-primary focus-visible:ring-offset-1 focus-visible:ring-offset-bg-base outline-none rounded-t-sm
                  ${isActive
                    ? 'border-cyan-primary text-cyan-primary'
                    : 'border-transparent text-text-muted hover:text-text-primary'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        <div className="min-h-[160px] text-sm text-text-secondary leading-relaxed p-3 bg-bg-overlay/30 rounded-lg border border-white/5">
          {activeTab === 'role' && (
            <div
              role="tabpanel"
              id={`panel-role-${product.id}`}
              aria-labelledby={`tab-role-${product.id}`}
              className="animate-fade-in-up"
              tabIndex={0}
            >
              <p>{product.strategicRole}</p>
            </div>
          )}
          {activeTab === 'strengths' && (
            <div
              role="tabpanel"
              id={`panel-strengths-${product.id}`}
              aria-labelledby={`tab-strengths-${product.id}`}
              className="animate-fade-in-up"
              tabIndex={0}
            >
              <ul className="list-disc list-outside space-y-2 ml-4 mr-2">
                {product.keyStrengths.map((strength, i) => (
                  <li key={i} className="pl-1 text-sm">{strength}</li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'reason' && (
            <div
              role="tabpanel"
              id={`panel-reason-${product.id}`}
              aria-labelledby={`tab-reason-${product.id}`}
              className="animate-fade-in-up"
              tabIndex={0}
            >
              <p>{product.inclusionReason}</p>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export const ProductCards: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredProducts = filter
    ? products.filter((p) => p.categoryId === filter)
    : products;

  return (
    <div className="my-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <div className="mb-8 max-w-2xl">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
          <span className="w-1 h-6 bg-cyan-primary/60 rounded-full" />
          الرؤية الاستراتيجية لتوزيع المنتجات
          <span className="text-[10px] font-en uppercase tracking-widest text-text-muted ml-2">
            Tech Brief Cards
          </span>
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          تم تصميم هذه الدفعة لتخدم مرحلة الإطلاق الأولى بشكل متوازن. التركيز الأكبر تم توجيهه إلى المنتجات الأعلى تأثيرًا في قرار الشراء ودوران السوق، مع دعم خط الغسيل الخارجي ومنتجات المراكز التخصصية لتحقيق تنوع كافٍ دون تشتيت الميزانية.
        </p>

        {/* Command Filter Chips */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="تصنيفات المنتجات">
          <button
            className={`px-4 py-2 min-h-[36px] rounded-sm text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-primary outline-none border
              ${filter === null
                ? 'bg-cyan-soft text-cyan-primary border-cyan-primary/40 shadow-[0_0_12px_rgba(0,212,255,0.12)]'
                : 'bg-white/5 text-text-muted border-white/10 hover:border-cyan-primary/25 hover:text-text-primary'
              }`}
            onClick={() => setFilter(null)}
            aria-pressed={filter === null}
          >
            عرض الكل ({products.length})
          </button>
          {Object.entries(categories).map(([id, cat]) => {
            const count = products.filter((p) => p.categoryId === id).length;
            if (count === 0) return null;
            return (
              <button
                key={id}
                className={`px-4 py-2 min-h-[36px] rounded-sm text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-primary outline-none border
                  ${filter === id
                    ? 'bg-cyan-soft text-cyan-primary border-cyan-primary/40 shadow-[0_0_12px_rgba(0,212,255,0.12)]'
                    : 'bg-white/5 text-text-muted border-white/10 hover:border-cyan-primary/25 hover:text-text-primary'
                  }`}
                onClick={() => setFilter(id)}
                aria-pressed={filter === id}
              >
                {cat.labelAr} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            index={products.findIndex((p) => p.id === product.id)}
          />
        ))}
      </div>
    </div>
  );
};
