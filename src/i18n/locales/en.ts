import { appealContent } from '../../content/appeals';
import {
  auditAnswerOptions,
  auditDisclaimer,
  auditInterface,
  auditOutcomeCopy,
  auditQuestions,
} from '../../content/audit';
import { caseStudies } from '../../content/cases';
import { highRiskTopics } from '../../content/highRiskTopics';
import { imageSlotContent, imageSlots } from '../../content/imageSlots';
import { navigationContent, navigationItems, riskBandLabels } from '../../content/navigation';
import { pageInterface } from '../../content/page';
import { policyLayers } from '../../content/policyLayers';
import {
  releaseChecklistContent,
  releaseChecklistItems,
  releaseWorkflow,
} from '../../content/releaseChecklist';
import { responsibilityContent, responsibilityItems } from '../../content/responsibility';
import { scenarios } from '../../content/scenarios';
import {
  finalActions,
  heroActions,
  riskBandOrder,
  sectionCopy,
  sectionDefinitions,
} from '../../content/sections';
import { sources } from '../../content/sources';
import {
  auditAnswerLabels,
  auditOutcomeLabels,
  evidenceLabels,
  riskBandLabels as compactRiskBandLabels,
  uiCopy,
} from '../../content/ui';
import {
  escalationInterface,
  escalationSteps,
  heroInspectionContent,
  sourceGroupLabels,
} from '../../content/visuals';
import type {
  AppealContent,
  AuditAnswer,
  AuditQuestionData,
  CaseStudyData,
  EscalationStep,
  EvidenceType,
  HighRiskTopic,
  ImageSlotData,
  PolicyGroup,
  PolicyLayer,
  ResponsibilityItem,
  RiskBand,
  Scenario,
  SectionDefinition,
  SectionId,
  Source,
} from '../../types/content';

export type Locale = 'en' | 'ru';

type LocalizedField<Key extends PropertyKey, Value> = Key extends 'locale'
  ? Locale
  : Key extends 'sectionId'
    ? SectionId
    : Key extends 'riskBand' | 'band'
      ? RiskBand
      : Key extends 'riskBandOrder'
        ? readonly RiskBand[]
        : Key extends 'evidenceType'
          ? EvidenceType
          : Key extends 'policyGroup'
            ? PolicyGroup
            : Key extends 'value'
              ? Value extends AuditAnswer
                ? AuditAnswer
                : Localized<Value>
              : Key extends 'severity'
                ? 'standard' | 'critical'
                : Key extends 'imagePresentation'
                  ? 'comparison' | 'gallery'
                  : Key extends 'action'
                    ? 'share'
                    : Localized<Value>;

type Localized<T> = T extends Source
  ? Source
  : T extends Scenario
    ? Scenario
    : T extends HighRiskTopic
      ? HighRiskTopic
      : T extends CaseStudyData
        ? CaseStudyData
        : T extends AuditQuestionData
          ? AuditQuestionData
          : T extends ImageSlotData
            ? ImageSlotData
            : T extends PolicyLayer
              ? PolicyLayer
              : T extends ResponsibilityItem
                ? ResponsibilityItem
                : T extends AppealContent
                  ? AppealContent
                  : T extends EscalationStep
                    ? EscalationStep
                    : T extends SectionDefinition
                      ? SectionDefinition
                      : T extends readonly (infer Item)[]
                        ? readonly Localized<Item>[]
                        : T extends object
                          ? {
                              readonly [Key in keyof T]: LocalizedField<Key, T[Key]>;
                            }
                          : T extends string
                            ? string
                            : T extends number
                              ? number
                              : T;

export const enContent = {
  locale: 'en',
  language: {
    switcherLabel: 'Choose language',
    currentLanguageLabel: 'Current language',
    switchToLanguageLabel: 'Switch language to',
    englishLabel: 'English',
    russianLabel: 'Русский',
    changedToEnglish: 'Language changed to English.',
    changedToRussian: 'Язык изменён на русский.',
  },
  seo: {
    title: 'Before You Publish — A Roblox Developer Safety Guide',
    description:
      'A visual guide to Roblox moderation, asset safety, intellectual property, content maturity, advertising, user-generated content, and safer release workflows.',
  },
  navigation: {
    items: navigationItems,
    content: navigationContent,
    riskBandLabels,
  },
  sections: {
    definitions: sectionDefinitions,
    copy: sectionCopy,
    riskBandOrder,
    heroActions,
    finalActions,
  },
  page: pageInterface,
  ui: {
    evidenceLabels,
    riskBandLabels: compactRiskBandLabels,
    auditAnswerLabels,
    auditOutcomeLabels,
    copy: uiCopy,
  },
  visuals: {
    heroInspection: heroInspectionContent,
    escalationSteps,
    escalationInterface,
    sourceGroupLabels,
  },
  responsibility: {
    content: responsibilityContent,
    items: responsibilityItems,
  },
  policies: policyLayers,
  release: {
    content: releaseChecklistContent,
    items: releaseChecklistItems,
    workflow: releaseWorkflow,
  },
  scenarios,
  highRiskTopics,
  cases: caseStudies,
  audit: {
    answerOptions: auditAnswerOptions,
    questions: auditQuestions,
    outcomeCopy: auditOutcomeCopy,
    disclaimer: auditDisclaimer,
    interface: auditInterface,
  },
  appeals: appealContent,
  images: {
    content: imageSlotContent,
    slots: imageSlots,
  },
  sources,
} as const;

export type GuideContent = Localized<typeof enContent>;
