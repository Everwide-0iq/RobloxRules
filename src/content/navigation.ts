import type { NavigationItem, RiskBand } from '../types/content';

export const navigationItems = [
  { label: 'Start', sectionId: 'start' },
  { label: 'Responsibility', sectionId: 'responsibility' },
  { label: 'Lower Risk', sectionId: 'lower-risk' },
  { label: 'Blind Spots', sectionId: 'blind-spots' },
  { label: 'High Risk', sectionId: 'high-risk' },
  { label: 'Cases', sectionId: 'cases' },
  { label: 'Audit', sectionId: 'audit' },
  { label: 'Appeals', sectionId: 'appeals' },
  { label: 'Sources', sectionId: 'sources' },
] as const satisfies readonly NavigationItem[];

export type NavigationItemId = (typeof navigationItems)[number]['sectionId'];

export const navigationContent = {
  locale: 'en',
  brand: 'Before You Publish',
  desktopLabel: 'Primary navigation',
  mobileLabel: 'Mobile navigation',
  menuButtonLabel: 'Open guide navigation',
  closeMenuLabel: 'Close guide navigation',
  currentZoneLabel: 'Current risk zone',
  mobileProgressLabel: 'Guide progress',
  skipLinkLabel: 'Skip to guide',
  auditAction: {
    label: 'Run the audit',
    sectionId: 'audit',
  },
} as const;

export const riskBandLabels = {
  'lower-risk': 'LOWER RISK',
  review: 'REVIEW',
  'high-risk': 'HIGH RISK',
  recovery: 'RECOVERY',
} as const satisfies Record<RiskBand, string>;
