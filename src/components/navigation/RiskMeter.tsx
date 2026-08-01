import { motion } from 'motion/react';

import { useRiskJourney } from '../../hooks/useRiskJourney';
import type { RiskBand } from '../../types/content';

export interface RiskMeterProps {
  ariaLabel: string;
  bands: readonly RiskBand[];
  className?: string;
  labels: Readonly<Record<RiskBand, string>>;
}

export function RiskMeter({ ariaLabel, bands, className = '', labels }: RiskMeterProps) {
  const { activeBand, scrollYProgress } = useRiskJourney();

  return (
    <aside className={className} aria-label={ariaLabel} data-active-risk-band={activeBand}>
      <span className="sr-only" aria-live="polite">
        {labels[activeBand]}
      </span>

      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 bg-ink/10 xl:hidden"
        aria-hidden="true"
      >
        <motion.div className="h-full origin-left bg-ink" style={{ scaleX: scrollYProgress }} />
      </div>

      <div className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 rounded-[1.5rem] border border-ink/10 bg-paper/90 px-4 py-3 text-ink shadow-[0_14px_38px_rgba(45,56,49,.14)] backdrop-blur-md xl:block">
        <div className="relative py-2">
          <div className="absolute top-2 bottom-2 left-[0.3125rem] w-px bg-current/20" />
          <motion.div
            className="absolute top-2 bottom-2 left-[0.3125rem] w-px origin-top bg-current"
            style={{ scaleY: scrollYProgress }}
          />

          <ol className="relative grid gap-7">
            {bands.map((band) => {
              const isActive = band === activeBand;

              return (
                <li
                  key={band}
                  className={`flex items-center gap-3 text-xs font-extrabold tracking-[0.04em] uppercase transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-70'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span
                    className={`size-2.5 rounded-full border border-current ${
                      isActive ? 'bg-current' : 'bg-transparent'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{labels[band]}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </aside>
  );
}
