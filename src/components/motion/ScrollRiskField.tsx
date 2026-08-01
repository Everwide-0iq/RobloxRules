import { useEffect, useState } from 'react';
import { motion, useScroll, type HTMLMotionProps } from 'motion/react';

import { RiskJourneyContext, useRiskJourneyController } from '../../hooks/useRiskJourney';
import { useTheme } from '../../theme/ThemeContext';
import type { RiskBand } from '../../types/content';

const riskBands = new Set<RiskBand>(['lower-risk', 'review', 'high-risk', 'recovery']);

function useSemanticRiskBand(): RiskBand {
  const [activeBand, setActiveBand] = useState<RiskBand>('lower-risk');

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('section[data-risk-band]')];
    if (!sections.length) return undefined;
    const visibleSections = new Map<Element, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleSections.set(entry.target, entry);
          else visibleSections.delete(entry.target);
        }

        const activationLine = window.innerHeight * 0.5;
        const activeEntry = [...visibleSections.values()].sort((first, second) => {
          const firstDistance = Math.abs(first.boundingClientRect.top - activationLine);
          const secondDistance = Math.abs(second.boundingClientRect.top - activationLine);

          return (
            firstDistance - secondDistance || second.intersectionRatio - first.intersectionRatio
          );
        })[0];
        if (!activeEntry) return;
        const value = (activeEntry.target as HTMLElement).dataset['riskBand'];
        if (riskBands.has(value as RiskBand)) setActiveBand(value as RiskBand);
      },
      { rootMargin: '-38% 0px -61% 0px', threshold: 0 },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return activeBand;
}

export interface ScrollRiskFieldProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
}

export function ScrollRiskField({
  children,
  className = '',
  style,
  ...rest
}: ScrollRiskFieldProps) {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  const activeBand = useSemanticRiskBand();
  const journey = useRiskJourneyController(scrollYProgress, activeBand);

  return (
    <RiskJourneyContext.Provider value={journey}>
      <motion.div
        {...rest}
        className={`min-h-dvh ${className}`.trim()}
        data-risk-band={journey.activeBand}
        style={{
          ...style,
          backgroundColor: theme === 'light' ? journey.backgroundColor : 'var(--color-paper)',
          color: theme === 'light' ? journey.foregroundColor : 'var(--color-ink)',
        }}
      >
        {children}
      </motion.div>
    </RiskJourneyContext.Provider>
  );
}
