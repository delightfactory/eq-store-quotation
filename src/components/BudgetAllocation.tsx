import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { GlassCard } from './Shared';
import { selectors } from '../data/quotationData';
import { formatCurrency } from '../utils/formatters';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      labelAr: string;
      value: number;
      percentage: number;
    }
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="bg-bg-elevated border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-sm font-bold text-text-primary mb-1">{data.labelAr}</p>
        <p className="text-xs text-text-secondary">
          القيمة: <span className="font-mono-num font-bold text-gold-primary">{formatCurrency(data.value)} ج.م</span>
        </p>
        <p className="text-xs text-text-secondary mt-1">
          النسبة: <span className="font-mono-num">{data.percentage.toFixed(1)}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export const BudgetAllocation: React.FC = () => {
  const allocationData = selectors.categoryAllocation();

  return (
    <div className="my-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <span className="w-1 h-6 bg-gold-primary rounded-full"></span>
        توزيع الميزانية حسب التصنيفات
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="col-span-1 lg:col-span-1 flex flex-col justify-center items-center h-[350px]">
          <div className="w-full h-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-text-primary font-bold">
                  {allocationData.length}
                </text>
                <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" className="fill-text-secondary text-xs">
                  تصنيفات
                </text>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        
        <GlassCard className="col-span-1 lg:col-span-2 flex flex-col justify-center">
          <div className="space-y-4 mb-6">
            {allocationData.map((category) => (
              <div key={category.categoryId} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></span>
                    <span className="text-text-primary">{category.labelAr}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="font-mono-num text-xs sm:text-base text-text-secondary">{formatCurrency(category.value)} ج.م</span>
                    <span className="font-mono-num text-xs sm:text-base font-bold w-10 sm:w-12 text-left">{category.percentage.toFixed(1)}%</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${category.percentage}%`, 
                      backgroundColor: category.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white/5 border border-white/5 rounded-xl border-r-2 border-r-gold-primary">
            <h4 className="text-sm font-bold text-text-primary mb-2">Strategic Insight</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              يعكس التوزيع الاستراتيجي للميزانية أولوية استثمارية واضحة في الفئات ذات التأثير الأعلى في السوق (العناية الخارجية والملمعات)، مع الحفاظ على تغطية شاملة تلبي احتياجات العملاء. تم موازنة المنتجات المتميزة (Premium) لتشكل قوة بيعية مربحة دون إرهاق الميزانية الكلية.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
