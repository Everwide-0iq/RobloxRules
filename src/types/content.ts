export type EvidenceType =
  'official-rule' | 'practical-interpretation' | 'real-case' | 'best-practice';

export type RiskBand = 'lower-risk' | 'review' | 'high-risk' | 'recovery';

export type SectionId =
  | 'start'
  | 'responsibility'
  | 'policy-layers'
  | 'lower-risk'
  | 'blind-spots'
  | 'risk-escalation'
  | 'high-risk'
  | 'cases'
  | 'audit'
  | 'appeals'
  | 'final'
  | 'sources';

export type PolicyGroup =
  | 'platform-wide-standards'
  | 'restricted-content'
  | 'content-maturity'
  | 'advertising'
  | 'intellectual-property'
  | 'monetization'
  | 'user-generated-content'
  | 'moderation-and-appeals'
  | 'asset-safety'
  | 'generative-ai';

export interface Source {
  id: string;
  title: string;
  url: string;
  policyGroup: PolicyGroup;
  description: string;
  lastChecked: string;
  official: true;
  supports: readonly string[];
}

export interface NavigationItem {
  label: string;
  sectionId: SectionId;
}

export interface SectionDefinition {
  id: SectionId;
  number: string;
  label: string;
  shortLabel: string;
  riskBand: RiskBand;
  nav: boolean;
}

export interface ResponsibilityItem {
  id: string;
  label: string;
  risk: string;
  review: string;
  owner: string;
}

export interface PolicyLayer {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  evidenceType: EvidenceType;
  sourceIds: readonly string[];
}

export interface ScenarioComparison {
  lowerRisk: string;
  needsReview: string;
  highRisk: string;
}

export interface Scenario {
  id: string;
  letter: string;
  title: string;
  eyebrow: string;
  riskBand: 'review' | 'high-risk';
  summary: string;
  assumption: string;
  whatCanGoWrong: string;
  example: string;
  saferMove: string;
  evidenceType: EvidenceType;
  sourceIds: readonly string[];
  inspectionPoints?: readonly string[];
  workflow?: readonly string[];
  comparison?: ScenarioComparison;
  imageSlotIds?: readonly string[];
  imagePresentation?: 'comparison' | 'gallery';
}

export interface HighRiskTopic {
  id: string;
  title: string;
  shortRule: string;
  whyItMatters: string;
  example: string;
  mistakenAssumption: string;
  saferAlternative: string;
  evidenceType: EvidenceType;
  sourceIds: readonly string[];
}

export interface CaseStudyData {
  id: string;
  index: string;
  title: string;
  context: string;
  whatWasAdded: string;
  whySeemedHarmless: string;
  whatHappened: string;
  whatChanged: string;
  prevention: string;
  evidenceType: EvidenceType;
  disclaimer: string;
  sourceIds: readonly string[];
  imageSlotId?: string;
}

export type AuditCategoryId =
  | 'ownership-and-licensing'
  | 'visual-assets'
  | 'ai-generated-content'
  | 'toolbox-models'
  | 'audio-and-animations'
  | 'experience-metadata'
  | 'maturity-and-compliance'
  | 'user-generated-content'
  | 'advertising'
  | 'monetization'
  | 'external-direction'
  | 'release-process';

export type AuditAnswer = 'reviewed' | 'needs-review' | 'unsure';

export type AuditOutcome = 'lower-risk-profile' | 'review-required' | 'high-risk-items-found';

export interface AuditQuestionData {
  id: string;
  categoryId: AuditCategoryId;
  category: string;
  prompt: string;
  detail: string;
  unresolvedRisk: string;
  nextAction: string;
  severity: 'standard' | 'critical';
  relatedSectionId: SectionId;
}

export interface ReleaseChecklistItem {
  id: string;
  label: string;
}

export interface ImageSlotData {
  id: string;
  sectionId: SectionId;
  label: string;
  fileName: string;
  description: string;
  caption: {
    shown: string;
    takeaway: string;
  };
  resolution: {
    width: number;
    height: number;
  };
  alt: string;
  safetyNotes: string;
  available?: boolean;
}

export interface AppealContent {
  intro: string;
  immediateSteps: readonly string[];
  structureTitle: string;
  structureFields: readonly string[];
  thesis: string;
  limits: readonly string[];
  disclaimer: string;
  sourceIds: readonly string[];
}

export interface EscalationStep {
  id: string;
  label: string;
  detail: string;
}
