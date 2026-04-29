import React, { useState } from 'react';
import { GlassCard, CategoryBadge } from './Shared';
import { products, categories } from '../data/quotationData';
import { formatCurrency, formatNumber } from '../utils/formatters';

const ProductCard: React.FC<{ product: typeof products[0], index: number }> = ({ product, index }) => {
  const [activeTab, setActiveTab] = useState<'role' | 'strengths' | 'reason'>('role');
  const category = categories[product.categoryId as keyof typeof categories];
  const isPremium = product.role === 'premium';

  return (
    <GlassCard premium={isPremium} className="flex flex-col h-full print-page-break-inside-avoid">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full border ${isPremium ? 'border-gold-primary/50 text-gold-primary bg-gold-primary/10' : 'border-white/10 text-text-secondary bg-white/5'} font-mono-num text-sm`}>
            {index + 1}
          </span>
          <div className="flex flex-col">
            <h4 className={`text-lg font-bold font-en tracking-wide ${isPremium ? 'text-gold-primary' : 'text-text-primary'}`}>
              {product.nameEn}
            </h4>
            <span className="text-sm text-text-secondary">{product.nameAr}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <CategoryBadge color={category.color} label={category.labelAr} />
          <span className="text-[10px] uppercase tracking-wider text-text-secondary px-2 py-0.5 rounded border border-white/10 bg-black/20">
            {product.roleLabelAr}
          </span>
        </div>
      </div>

      {/* Short Message */}
      <p className="text-sm text-text-primary leading-relaxed mb-5 pr-2 border-r-2 border-white/10">
        {product.shortMessage}
      </p>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2 bg-black/40 rounded-xl p-3 mb-5 border border-white/5">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-xs text-text-secondary mb-1">الكمية</span>
          <span className="font-mono-num text-sm font-semibold">{formatNumber(product.quantityKg)}</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center border-x border-white/5">
          <span className="text-xs text-text-secondary mb-1">سعر الكجم</span>
          <span className="font-mono-num text-sm font-semibold">{formatCurrency(product.pricePerKg)}</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-xs text-text-secondary mb-1">الإجمالي</span>
          <span className={`font-mono-num text-sm font-bold ${isPremium ? 'text-gold-primary' : ''}`}>
            {formatCurrency(product.totalValue)}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-auto">
        <div className="flex border-b border-white/10 mb-3" role="tablist" aria-label="تفاصيل المنتج">
          <button 
            role="tab"
            aria-selected={activeTab === 'role'}
            aria-controls={`panel-role-${product.id}`}
            id={`tab-role-${product.id}`}
            className={`flex-1 pb-2 text-xs font-semibold transition-colors border-b-2 focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-1 focus-visible:ring-offset-bg-base outline-none rounded-t-sm ${activeTab === 'role' ? 'border-gold-primary text-gold-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
            onClick={() => setActiveTab('role')}
          >
            الدور التجاري
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'strengths'}
            aria-controls={`panel-strengths-${product.id}`}
            id={`tab-strengths-${product.id}`}
            className={`flex-1 pb-2 text-xs font-semibold transition-colors border-b-2 focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-1 focus-visible:ring-offset-bg-base outline-none rounded-t-sm ${activeTab === 'strengths' ? 'border-gold-primary text-gold-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
            onClick={() => setActiveTab('strengths')}
          >
            نقاط القوة
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'reason'}
            aria-controls={`panel-reason-${product.id}`}
            id={`tab-reason-${product.id}`}
            className={`flex-1 pb-2 text-xs font-semibold transition-colors border-b-2 focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-1 focus-visible:ring-offset-bg-base outline-none rounded-t-sm ${activeTab === 'reason' ? 'border-gold-primary text-gold-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
            onClick={() => setActiveTab('reason')}
          >
            سبب الإدراج
          </button>
        </div>

        <div className="min-h-[140px] text-sm text-text-secondary leading-relaxed p-3 bg-white/[0.02] rounded-lg border border-white/5 transition-all duration-300 ease-in-out relative">
          {activeTab === 'role' && (
            <div role="tabpanel" id={`panel-role-${product.id}`} aria-labelledby={`tab-role-${product.id}`} className="animate-fade-in-up" tabIndex={0}>
              <p>{product.strategicRole}</p>
            </div>
          )}
          {activeTab === 'strengths' && (
            <div role="tabpanel" id={`panel-strengths-${product.id}`} aria-labelledby={`tab-strengths-${product.id}`} className="animate-fade-in-up" tabIndex={0}>
              <ul className="list-disc list-outside space-y-2 ml-4 mr-2">
                {product.keyStrengths.map((strength, i) => (
                  <li key={i} className="pl-1 text-sm">{strength}</li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'reason' && (
            <div role="tabpanel" id={`panel-reason-${product.id}`} aria-labelledby={`tab-reason-${product.id}`} className="animate-fade-in-up" tabIndex={0}>
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
    ? products.filter(p => p.categoryId === filter)
    : products;

  return (
    <div className="my-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <div className="mb-8 max-w-2xl">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
          <span className="w-1 h-6 bg-gold-primary rounded-full"></span>
          الرؤية الاستراتيجية لتوزيع المنتجات
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          تم تصميم هذه الدفعة لتخدم مرحلة الإطلاق الأولى بشكل متوازن. التركيز الأكبر تم توجيهه إلى المنتجات الأعلى تأثيرًا في قرار الشراء ودوران السوق، مع دعم خط الغسيل الخارجي ومنتجات المراكز التخصصية لتحقيق تنوع كافٍ دون تشتيت الميزانية.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="تصنيفات المنتجات">
          <button 
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gold-primary outline-none ${filter === null ? 'bg-gold-primary/20 text-gold-primary border border-gold-primary/30' : 'bg-white/5 text-text-secondary border border-white/10 hover:bg-white/10'}`}
            onClick={() => setFilter(null)}
            aria-pressed={filter === null}
          >
            عرض الكل ({products.length})
          </button>
          {Object.entries(categories).map(([id, cat]) => {
            const count = products.filter(p => p.categoryId === id).length;
            if (count === 0) return null;
            return (
              <button 
                key={id}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gold-primary outline-none ${filter === id ? 'bg-gold-primary/20 text-gold-primary border border-gold-primary/30' : 'bg-white/5 text-text-secondary border border-white/10 hover:bg-white/10'}`}
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
          <ProductCard key={product.id} product={product} index={products.findIndex(p => p.id === product.id)} />
        ))}
      </div>
    </div>
  );
};
