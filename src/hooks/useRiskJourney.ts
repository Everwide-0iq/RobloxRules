import { createContext, useContext, useEffect, useMemo } from 'react';
import { useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react';

import type { RiskBand } from '../types/content';

// Motion requires concrete colors for interpolation. Keep these values aligned with index.css.
const CREAM = '#f7f0e3';
const SAGE = '#b8c8a9';
const BUTTER = '#e7d59a';
const PEACH = '#e4af87';
const TERRACOTTA = '#ce806f';
const DUSTY_PLUM = '#6f4e63';
const DEEP_FOREST = '#1b2c24';

const COLOR_STOPS = [0, 0.18, 0.36, 0.52, 0.7, 0.84, 1];
const BACKGROUND_COLORS = [CREAM, SAGE, BUTTER, PEACH, TERRACOTTA, DUSTY_PLUM, DEEP_FOREST];

const REDUCED_MOTION_PALETTE = {
  'lower-risk': { accent: DUSTY_PLUM, background: CREAM, foreground: DEEP_FOREST },
  review: { accent: DEEP_FOREST, background: BUTTER, foreground: DEEP_FOREST },
  'high-risk': { accent: BUTTER, background: DUSTY_PLUM, foreground: CREAM },
  recovery: { accent: SAGE, background: DEEP_FOREST, foreground: CREAM },
} as const satisfies Record<RiskBand, { accent: string; background: string; foreground: string }>;

export interface RiskJourneyValue {
  accentColor: MotionValue<string>;
  activeBand: RiskBand;
  backgroundColor: MotionValue<string>;
  foregroundColor: MotionValue<string>;
  prefersReducedMotion: boolean;
  scrollYProgress: MotionValue<number>;
}

export const RiskJourneyContext = createContext<RiskJourneyValue | null>(null);

export function useRiskJourneyController(
  scrollYProgress: MotionValue<number>,
  activeBand: RiskBand,
): RiskJourneyValue {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const continuousBackground = useTransform(scrollYProgress, COLOR_STOPS, BACKGROUND_COLORS);
  const continuousForeground = useTransform<number, string>(scrollYProgress, (progress) =>
    progress < 0.78 ? DEEP_FOREST : CREAM,
  );
  const continuousAccent = useTransform<number, string>(scrollYProgress, (progress) => {
    if (progress < 0.78) return DUSTY_PLUM;
    return progress < 0.9 ? BUTTER : SAGE;
  });

  const reducedBackground = useMotionValue<string>(REDUCED_MOTION_PALETTE[activeBand].background);
  const reducedForeground = useMotionValue<string>(REDUCED_MOTION_PALETTE[activeBand].foreground);
  const reducedAccent = useMotionValue<string>(REDUCED_MOTION_PALETTE[activeBand].accent);

  useEffect(() => {
    const nextPalette = REDUCED_MOTION_PALETTE[activeBand];
    reducedBackground.set(nextPalette.background);
    reducedForeground.set(nextPalette.foreground);
    reducedAccent.set(nextPalette.accent);
  }, [activeBand, reducedAccent, reducedBackground, reducedForeground]);

  return useMemo(
    () => ({
      accentColor: prefersReducedMotion ? reducedAccent : continuousAccent,
      activeBand,
      backgroundColor: prefersReducedMotion ? reducedBackground : continuousBackground,
      foregroundColor: prefersReducedMotion ? reducedForeground : continuousForeground,
      prefersReducedMotion,
      scrollYProgress,
    }),
    [
      activeBand,
      continuousAccent,
      continuousBackground,
      continuousForeground,
      prefersReducedMotion,
      reducedAccent,
      reducedBackground,
      reducedForeground,
      scrollYProgress,
    ],
  );
}

export function useRiskJourney(): RiskJourneyValue {
  const journey = useContext(RiskJourneyContext);
  if (!journey) throw new Error('useRiskJourney must be used inside ScrollRiskField.');
  return journey;
}
