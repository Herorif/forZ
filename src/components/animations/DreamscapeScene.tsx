import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const buildingHeights = [1.2, 0.8, 1.6, 1.0, 1.4, 0.9, 1.3, 1.1];

type DreamscapeSceneProps = {
  variant?: 'card' | 'full';
};

export function DreamscapeScene({ variant = 'card' }: DreamscapeSceneProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className={clsx(
        'dreamscape',
        prefersReducedMotion && 'dreamscape--static',
        variant === 'full' && 'dreamscape--full'
      )}
      aria-hidden="true"
    >
      <div className="dreamscape__inner">
        <div className="dreamscape__sky" />
        <div className="dreamscape__moon" />

        <div className="dreamscape__city">
          {buildingHeights.map((tier, index) => (
            <div
              key={index}
              className="dreamscape__building"
              style={{ '--tier': tier } as CSSProperties}
            />
          ))}
        </div>

        <div className="dreamscape__river" />
        <div className="dreamscape__boat dreamscape__boat--left" />
        <div className="dreamscape__boat dreamscape__boat--right" />

        <div className="dreamscape__table">
          <span className="dreamscape__candle" />
          <span className="dreamscape__candle" />
          <span className="dreamscape__candle" />
        </div>
      </div>
    </div>
  );
}
