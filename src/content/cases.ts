import type { CaseStudyData } from '../types/content';
import { sourceIds } from './sources';

export const caseStudies = [
  {
    id: 'third-party-room-asset',
    index: '01',
    title: 'Third-party room asset',
    context: 'An anonymized cleaning experience used a community-made decorative room model.',
    whatWasAdded:
      'The model included nested images that were visible in the experience but had not been assessed as separate assets by the team.',
    whySeemedHarmless:
      'The room looked like ordinary set dressing, and the visible geometry received more attention than its descendants and embedded media.',
    whatHappened:
      'The experience received a moderation action. The team traced the issue to the unreviewed media inside the third-party model.',
    whatChanged:
      'The team removed the questionable assets, inspected every place and related surface, preserved the notice, and submitted a factual appeal. The experience was restored after review.',
    prevention:
      'Expand and inventory every third-party model before use. Review scripts, asset IDs, images, textures, sounds, UI, packages, and every place that contains a copy.',
    evidenceType: 'real-case',
    disclaimer:
      'This is one anonymized reported outcome, not a universal enforcement pattern. Restoration is not guaranteed in similar cases.',
    sourceIds: sourceIds(
      'toolbox',
      'third-party-asset-vulnerabilities',
      'content-moderation',
      'moderation-appeals',
    ),
  },
  {
    id: 'batch-of-ai-posters',
    index: '02',
    title: 'Batch of AI posters',
    context:
      'An anonymized developer generated a series of fictional posters to replace decorations that carried recognizable IP references.',
    whatWasAdded:
      'The generated images included ambiguous pseudo-typography that was not replaced or reviewed consistently before the batch was uploaded.',
    whySeemedHarmless:
      'The prompts described fictional events and brands, so the developer focused on the main subjects rather than the small generated marks.',
    whatHappened:
      'Several assets received similar moderation classifications connected to off-platform event direction, and the series of moderation actions affected the account.',
    whatChanged:
      "The developer stopped reusing the assets, documented the relevant IDs and notices, and submitted one factual appeal without claiming certainty about Roblox's internal interpretation.",
    prevention:
      'Generate artwork without typography, add fictional copy manually, inspect every export at full resolution, and release only a small set that has completed human review.',
    evidenceType: 'real-case',
    disclaimer:
      'The exact detector interpretation was not confirmed. This case demonstrates why generated typography must be manually reviewed.',
    sourceIds: sourceIds(
      'generative-ai',
      'terms-of-use',
      'community-standards',
      'advertising-standards',
      'moderation-appeals',
    ),
  },
  {
    id: 'ip-lookalike',
    index: '03',
    title: 'IP lookalike',
    context:
      'This illustrative review exercise follows a team designing an original arcade hero around a familiar action-character archetype.',
    whatWasAdded:
      'The draft changed the name and one color but retained a highly recognizable silhouette, outfit, emblem, signature tool, and promotional pose.',
    whySeemedHarmless:
      'The team believed removing the logo and misspelling the name made the design sufficiently different.',
    whatHappened:
      "A pre-publish rights review found that the character's overall identity still depended on the reference. No specific Roblox moderation outcome is asserted.",
    whatChanged:
      'The team rebuilt the silhouette, palette, clothing, symbols, story, equipment, and key art around its own world rather than one protected reference.',
    prevention:
      'Record provenance and permissions early. Review the whole identity, not a checklist of isolated changes, and obtain qualified advice when rights remain unclear.',
    evidenceType: 'practical-interpretation',
    disclaimer:
      'Illustrative composite, not a report of a specific Roblox moderation or DMCA decision. IP outcomes depend on the work, rights, use, context, and applicable law.',
    sourceIds: sourceIds('terms-of-use', 'dmca-guidelines', 'community-standards'),
  },
  {
    id: 'outdated-questionnaire',
    index: '04',
    title: 'Outdated questionnaire',
    context:
      'This illustrative release review follows an experience that already had a maturity label when a major social update shipped.',
    whatWasAdded:
      'The update introduced stronger fear, a private room inside a social hangout, and an AI character with cross-session memory.',
    whySeemedHarmless:
      'Each feature arrived in a different sprint, and the team treated the existing questionnaire as a one-time publishing task.',
    whatHappened:
      'The live build no longer matched several saved answers. This example does not claim a particular moderation consequence.',
    whatChanged:
      'The team reviewed the most mature content players could encounter, corrected and resubmitted the questionnaire, and added maturity review to its release gate.',
    prevention:
      'Map every content-changing release to the questionnaire. Recheck social, creation, AI, violence, blood, fear, language, gambling, and alcohol descriptors before publishing.',
    evidenceType: 'practical-interpretation',
    disclaimer:
      'Illustrative composite based on current questionnaire duties, not a report of a specific Roblox enforcement outcome or a prediction of the resulting label.',
    sourceIds: sourceIds(
      'content-maturity',
      'restricted-content-policy',
      'generative-ai',
      'creator-safety',
    ),
  },
] as const satisfies readonly CaseStudyData[];
