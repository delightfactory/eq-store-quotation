import React, { useEffect, useState, useRef } from 'react';
import { formatCurrency, formatNumber } from '../utils/formatters';

/* ─────────────────────────────────────────────
   Reusable shimmer hook — attach to any element
   that should glow when it enters the viewport.
───────────────────────────────────────────── */
export function useCardShimmer<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);
  const hasRun = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          setActive(true);
          timerRef.current = setTimeout(() => setActive(false), 3000);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    ref,
    shimmerClass: `card-shimmer${active ? ' shimmer-active' : ''}`,
  };
}

/* ─────────────────────────────────────────────
   GlassCard — wraps children with HUD panel
   and automatic shimmer on viewport entry.
───────────────────────────────────────────── */
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  premium?: boolean;
  /** Add HUD corner brackets */
  corners?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  premium = false,
  corners = false,
}) => {
  const { ref, shimmerClass } = useCardShimmer<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`
        ${premium ? 'glass-panel-premium' : 'glass-panel'}
        ${corners ? 'hud-corners' : ''}
        ${shimmerClass}
        rounded-2xl p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────────
   AnimatedNumber — counts up on viewport entry.
───────────────────────────────────────────── */
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
  className = '',
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
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(ease * value));
            if (progress < 1) window.requestAnimationFrame(step);
            else setCount(value);
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={elementRef} className={`font-mono-num ${className}`}>
      {isCurrency ? formatCurrency(count) : formatNumber(count)}
    </span>
  );
};

/* ─────────────────────────────────────────────
   CategoryBadge
───────────────────────────────────────────── */
interface CategoryBadgeProps {
  color: string;
  label: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ color, label }) => (
  <span
    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
    style={{
      backgroundColor: `${color}18`,
      color,
      borderColor: `${color}35`,
    }}
  >
    {label}
  </span>
);

/** Cyan technical divider */
export const NeutralDivider = () => <div className="command-line w-full my-6" />;
