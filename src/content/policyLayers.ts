import type { PolicyLayer } from '../types/content';
import { sourceIds } from './sources';

export const policyLayers = [
  {
    id: 'community-standards',
    index: '01',
    title: 'Community Standards',
    summary: 'The platform-wide baseline for content and behavior.',
    detail:
      'These standards apply across Roblox. A maturity label can change who may access an experience, but it does not turn prohibited content into permitted content.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'content-moderation'),
  },
  {
    id: 'maturity-and-compliance',
    index: '02',
    title: 'Maturity & Compliance',
    summary: 'A disclosure and access layer, not a moderation approval stamp.',
    detail:
      'Answer for the most mature or extreme content a player can encounter. If an update changes an answer, update and resubmit the questionnaire. Uploaded assets can still be moderated independently of the label.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('content-maturity', 'creator-safety'),
  },
  {
    id: 'restricted-content',
    index: '03',
    title: 'Restricted Content Policy',
    summary: 'Limited allowances for age-checked 18+ experiences.',
    detail:
      'Restricted can permit defined mature themes, but it is not a blanket exception. Sexual content, extreme violence, and other continuing prohibitions remain out of bounds, and public-facing metadata must be appropriate for all ages.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('restricted-content-policy', 'community-standards', 'content-maturity'),
  },
  {
    id: 'creator-monetization-advertising',
    index: '04',
    title: 'Creator, monetization & advertising requirements',
    summary: 'Additional duties attach to what you publish and how it earns or promotes.',
    detail:
      'Creators remain responsible for rights in their UGC. Paid random items require accurate odds and per-player policy handling. Advertising Integrations have separate registration, approval, disclosure, audience, and technical requirements.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds(
      'terms-of-use',
      'paid-random-items',
      'policy-service',
      'advertising-standards',
      'advertising-integrations-terms',
    ),
  },
] as const satisfies readonly PolicyLayer[];
