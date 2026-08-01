import type { AuditAnswer, AuditOutcome, EvidenceType, RiskBand } from '../types/content';

export const evidenceLabels = {
  'official-rule': 'Official rule',
  'practical-interpretation': 'Practical interpretation',
  'real-case': 'Real case',
  'best-practice': 'Best practice',
} as const satisfies Record<EvidenceType, string>;

export const riskBandLabels = {
  'lower-risk': 'Lower risk',
  review: 'Review',
  'high-risk': 'High risk',
  recovery: 'Recovery',
} as const satisfies Record<RiskBand, string>;

export const auditAnswerLabels = {
  reviewed: 'Reviewed',
  'needs-review': 'Needs review',
  unsure: 'Unsure',
} as const satisfies Record<AuditAnswer, string>;

export const auditOutcomeLabels = {
  'lower-risk-profile': 'LOWER RISK PROFILE',
  'review-required': 'REVIEW REQUIRED',
  'high-risk-items-found': 'HIGH-RISK ITEMS FOUND',
} as const satisfies Record<AuditOutcome, string>;

export const uiCopy = {
  skipToContent: 'Skip to content',
  menu: 'Menu',
  closeMenu: 'Close menu',
  runAudit: 'Run the audit',
  currentZone: 'Current zone',
  progress: 'Guide progress',
  showDetails: 'Open dossier',
  hideDetails: 'Close dossier',
  viewOfficialSource: 'View official source',
  opensInNewTab: 'opens in a new tab',
  officialSource: 'Official Roblox source',
  sourceChecked: 'Last checked',
  missingImage: 'Image placeholder',
  uploadInstruction: 'Upload',
  recommendedSize: 'Recommended',
  expectedFile: 'File',
  riskyExample: 'Risky example',
  saferVersion: 'Safer version',
  caseLabel: 'Case',
  scenarioFields: {
    assumption: 'What developers assume',
    risk: 'What can go wrong',
    example: 'Example situation',
    saferMove: 'Safer move',
  },
  caseFields: {
    context: 'Context',
    added: 'What was added',
    harmless: 'Why it seemed harmless',
    happened: 'What happened',
    changed: 'What was changed',
    prevention: 'Prevention',
  },
  highRiskFields: {
    rule: 'Short rule',
    why: 'Why it matters',
    example: 'Example situation',
    assumption: 'Common mistaken assumption',
    alternative: 'Safer alternative',
  },
  sourcesDirectory: 'Official source directory',
  sourceGroupDescription: 'Policy group',
  releaseBlockers: 'release blockers',
  sourceSingular: 'source',
  sourceFew: 'sources',
  sourcePlural: 'sources',
  policyMayChange: 'Policy wording may change. Sources last checked August 1, 2026.',
} as const;
