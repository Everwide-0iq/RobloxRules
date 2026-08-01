import type { AppealContent } from '../types/content';
import { sourceIds } from './sources';

export const appealContent = {
  intro:
    'A moderation notice is a signal to slow down, preserve the facts, and review the full release surface. Do not guess at an internal detector or rush the same content back online.',
  immediateSteps: [
    'Do not immediately re-upload the same or slightly altered content.',
    'Save the complete moderation notice and note when it arrived.',
    'Record the account, asset ID, experience ID, and affected place where relevant.',
    'Read the exact violation category and the appeal route shown in the notice.',
    'Check related assets, duplicates, packages, and dependencies.',
    'Inspect every place inside the experience, not only the starting place.',
    'Review icons, thumbnails, videos, badges, descriptions, and promotional assets.',
    'Remove or isolate questionable content where doing so is appropriate and preserves evidence.',
    'Prepare one concise, factual appeal with the requested identifiers.',
    'Keep a dated record of the appeal and any response.',
  ],
  structureTitle: 'A factual appeal should make the review easy to follow',
  structureFields: [
    'What was moderated and the violation category shown in the notice',
    'The account username',
    'The asset ID, experience ID, or Roblox link requested for the content',
    'Why the decision may deserve a second review',
    'What related content has already been isolated, removed, or corrected',
    'A clear request for review without speculating about internal moderation systems',
  ],
  thesis: 'Appeal the decision, not the existence of the rules.',
  limits: [
    'Use the route in the moderation notification: eligible matters may go through Violations & Appeals or the Roblox Support form.',
    'The standard deadline is 30 days after the moderation action; EU users have six months for an initial moderation action.',
    'Only the account owner may appeal, using a valid email address for the account where the Support form applies.',
    'Once a moderation has been reviewed, Roblox says it will not review duplicate appeals for the same action on an account.',
    'Some short, already-expired consequences may no longer have a practical appeal path.',
    'An appeal does not guarantee reversal, account restoration, or restoration of moderated content.',
  ],
  disclaimer:
    'Follow the current instructions in your Roblox moderation notice. Policy wording and available appeal routes may change; this page was last checked August 1, 2026.',
  sourceIds: sourceIds('moderation-appeals', 'content-moderation'),
} as const satisfies AppealContent;
