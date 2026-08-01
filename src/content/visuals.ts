import type { EscalationStep, PolicyGroup } from '../types/content';

export const heroInspectionContent = {
  fileLabel: 'ASSET / POSTER_07.WEBP',
  statusLabel: 'PRE-PUBLISH INSPECTION',
  layers: [
    { id: 'source', label: 'Source', value: 'Recorded' },
    { id: 'content', label: 'Content', value: 'Reviewing' },
    { id: 'context', label: 'Context', value: 'Pending' },
  ],
  actionLabel: 'PUBLISH',
  lockLabel: '3 checks before release',
} as const;

export const escalationSteps = [
  {
    id: 'asset-review',
    label: 'Asset review',
    detail:
      'An uploaded or referenced asset receives attention through proactive or reactive moderation.',
  },
  {
    id: 'asset-removal',
    label: 'Asset removal',
    detail:
      'The asset may become unavailable when moderation finds a violation or while review is pending.',
  },
  {
    id: 'experience-review',
    label: 'Experience review',
    detail: 'Related places, metadata, or dependencies may need a wider inspection.',
  },
  {
    id: 'experience-unavailable',
    label: 'Experience unavailable',
    detail: 'An experience can become unavailable while a moderation issue is addressed.',
  },
  {
    id: 'owner-attention',
    label: 'Owner or group attention',
    detail: 'Enforcement can consider who published the content and the context around it.',
  },
  {
    id: 'account-enforcement',
    label: 'Account-level enforcement',
    detail: 'Serious or repeated violations can result in action beyond one asset.',
  },
] as const satisfies readonly EscalationStep[];

export const escalationInterface = {
  scopeLabel: 'Possible scope',
  stepLabel: 'Step',
} as const;

export const sourceGroupLabels = {
  'platform-wide-standards': 'Platform-wide standards',
  'restricted-content': 'Restricted content',
  'content-maturity': 'Content maturity',
  advertising: 'Advertising',
  'intellectual-property': 'Intellectual property',
  monetization: 'Monetization',
  'user-generated-content': 'User-generated content',
  'moderation-and-appeals': 'Moderation and appeals',
  'asset-safety': 'Asset safety',
  'generative-ai': 'Generative AI',
} as const satisfies Record<PolicyGroup, string>;
