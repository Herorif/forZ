import { useMemo } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import clsx from 'clsx';

type HeartFieldProps = {
  density?: number;
  variant?: 'blush' | 'aurora';
  className?: string;
};

const HEART_COLORS = {
  blush: ['#FF8FB1', '#FFB3C6', '#FFE0F0', '#FF6F91'],
  aurora: ['#B388EB', '#F7A8B8', '#C3F0CA', '#FFBF81'],
};

/**
 * Renders a swarm of floating hearts used across the app background layers.
 */
export function HeartField({ density = 28, variant = 'blush', className }: HeartFieldProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const hearts = useMemo(() => {
    return Array.from({ length: density }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${20 + Math.random() * 16}s`,
      size: `${12 + Math.random() * 18}px`,
      blur: Math.random() > 0.6 ? `${2 + Math.random() * 4}px` : '0px',
      opacity: 0.4 + Math.random() * 0.4,
      color: HEART_COLORS[variant][Math.floor(Math.random() * HEART_COLORS[variant].length)],
    }));
  }, [density, variant]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen',
        className
      )}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            width: heart.size,
            height: heart.size,
            filter: `blur(${heart.blur})`,
            opacity: heart.opacity,
            backgroundColor: heart.color,
          }}
        />
      ))}
    </div>
  );
}

