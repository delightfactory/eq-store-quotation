import React, { useEffect, useState, useRef } from 'react';
import { formatCurrency, formatNumber } from '../utils/formatters';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  premium?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', premium = false }) => {
  return (
    <div className={`${premium ? 'glass-panel-premium' : 'glass-panel'} rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
};

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  isCurrency?: boolean;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  duration = 1200, 
  isCurrency = false,
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeProgress * value));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={elementRef} className={`font-mono-num ${className}`}>
      {isCurrency ? formatCurrency(count) : formatNumber(count)}
    </span>
  );
};

interface CategoryBadgeProps {
  color: string;
  label: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ color, label }) => {
  return (
    <span 
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
      style={{ 
        backgroundColor: `${color}15`, 
        color: color,
        borderColor: `${color}30`
      }}
    >
      {label}
    </span>
  );
};

export const GoldDivider = () => <div className="divider-gold w-full my-6" />;
