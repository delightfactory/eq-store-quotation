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
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="hud-panel rounded-lg p-3 shadow-xl text-right">
        <p className="text-sm font-bold text-text-primary mb-1">{data.labelAr}</p>
        <p className="text-xs text-text-secondary">
          القيمة:{' '}
          <span className="font-mono-num font-bold text-cyan-primary">
            {formatCurrency(data.value)} ج.م
          </span>
        </p>
        <p className="text-xs text-text-secondary mt-1">
          النسبة:{' '}
          <span className="font-mono-num">{data.percentage.toFixed(1)}%</span>
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
        <span className="w-1 h-6 bg-cyan-primary/60 rounded-full" />
        توزيع الميزانية حسب التصنيفات
        <span className="text-[10px] font-en uppercase tracking-widest text-text-muted ml-2">
          Budget Allocation
        </span>
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Donut Chart */}
        <GlassCard className="col-span-1 flex flex-col justify-center items-center h-[320px] p-4">
          <div className="w-full h-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={64}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.9} />
                  ))}
                </Pie>
                {/* Center label */}
                <text
                  x="50%"
                  y="47%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#EEF7FA"
                  fontSize={22}
                  fontWeight="bold"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {allocationData.length}
                </text>
                <text
                  x="50%"
                  y="57%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#9FB3BF"
                  fontSize={11}
                >
                  تصنيفات
                </text>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Progress Bars */}
        <GlassCard className="col-span-1 lg:col-span-2 flex flex-col justify-center">
          <div className="space-y-4 mb-6">
            {allocationData.map((category) => (
              <div key={category.categoryId} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-text-primary">{category.labelAr}</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-mono-num text-xs sm:text-sm text-text-secondary">
                      {formatCurrency(category.value)} ج.م
                    </span>
                    <span className="font-mono-num text-xs sm:text-sm font-bold w-10 sm:w-12 text-left text-text-primary">
                      {category.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Dashboard Gauge Bar */}
                <div className="w-full h-1.5 bg-bg-overlay rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color,
                      boxShadow: `0 0 6px ${category.color}60`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Strategic insight panel */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(0,212,255,0.04)',
              border: '1px solid rgba(0,212,255,0.14)',
              borderRight: '2px solid rgba(0,212,255,0.45)',
            }}
          >
            <h4 className="text-xs font-en font-bold text-cyan-primary mb-2 uppercase tracking-wider">
              Strategic Insight
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              يعكس التوزيع الاستراتيجي للميزانية أولوية استثمارية واضحة في الفئات ذات التأثير الأعلى في السوق (العناية الخارجية والملمعات)، مع الحفاظ على تغطية شاملة تلبي احتياجات العملاء. تم موازنة المنتجات المتميزة (Premium) لتشكل قوة بيعية مربحة دون إرهاق الميزانية الكلية.
            </p>
          </div>
        </GlassCard>

      </div>
    </div>
  );
};
