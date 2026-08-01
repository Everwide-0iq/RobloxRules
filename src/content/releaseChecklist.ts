import type { ReleaseChecklistItem } from '../types/content';
import { sourceIds } from './sources';

export const releaseChecklistContent = {
  locale: 'en',
  eyebrow: 'PRE-PUBLISH CHECK',
  title: 'Ready for a human review?',
  intro: 'Complete the checks as a team before the release owner presses Publish.',
  checkedLabel: 'Reviewed',
  uncheckedLabel: 'Not reviewed',
  progressLabel: 'Checklist progress',
  progressUnit: 'checks reviewed',
  resetLabel: 'Reset checklist',
  result: 'Ready for a human review — not guaranteed approval.',
  disclaimer:
    'This checklist reduces avoidable blind spots. It does not replace the applicable Roblox policies or guarantee a moderation outcome.',
  evidenceType: 'best-practice',
  sourceIds: sourceIds(
    'terms-of-use',
    'third-party-asset-vulnerabilities',
    'generative-ai',
    'text-filtering',
    'content-maturity',
  ),
} as const;

export const releaseChecklistItems = [
  {
    id: 'ownership-and-licensing',
    label: 'We own or licensed every asset.',
  },
  {
    id: 'generated-text',
    label: 'Generated text has been manually reviewed.',
  },
  {
    id: 'toolbox-descendants',
    label: 'Toolbox descendants have been inspected.',
  },
  {
    id: 'embedded-media',
    label: 'Images, textures, sounds, and animations were checked.',
  },
  {
    id: 'all-places',
    label: 'Every place in the experience was reviewed.',
  },
  {
    id: 'metadata',
    label: 'Metadata matches the actual experience.',
  },
  {
    id: 'user-text',
    label: 'User-generated text is filtered before another player sees it.',
  },
  {
    id: 'maturity-questionnaire',
    label: 'The Maturity & Compliance answers are current.',
  },
  {
    id: 'second-reviewer',
    label: 'A second person reviewed the release.',
  },
] as const satisfies readonly ReleaseChecklistItem[];

export const releaseWorkflow = [
  {
    id: 'create-or-license',
    label: 'Create or license',
    detail: 'Start with original work or permission your team can document.',
  },
  {
    id: 'record-source',
    label: 'Record the source',
    detail: 'Keep the creator, license, contract, and dependency trail with the asset.',
  },
  {
    id: 'inspect-asset',
    label: 'Inspect the asset',
    detail: 'Open the full file, hierarchy, media, scripts, text, and runtime states.',
  },
  {
    id: 'test-staging',
    label: 'Test in staging',
    detail: 'Review the candidate build away from the live release path.',
  },
  {
    id: 'review-experience',
    label: 'Review the whole experience',
    detail: 'Check every place, dependency, metadata surface, and player-facing state.',
  },
  {
    id: 'update-questionnaire',
    label: 'Update the questionnaire',
    detail: 'Recheck every answer affected by the current release.',
  },
  {
    id: 'publish',
    label: 'Publish deliberately',
    detail: 'Release only the frozen candidate that completed the review gate.',
  },
  {
    id: 'verify-build',
    label: 'Verify the published build',
    detail: 'Inspect the live experience and public metadata before announcing it.',
  },
] as const;

export type ReleaseChecklistItemId = (typeof releaseChecklistItems)[number]['id'];
