import type { AuditAnswer, AuditQuestionData, AuditOutcome } from '../types/content';

export const auditAnswerOptions = [
  {
    value: 'reviewed',
    label: 'Reviewed',
    description: 'Checked against the current build, with evidence available.',
  },
  {
    value: 'needs-review',
    label: 'Needs review',
    description: 'A known item is still unresolved before release.',
  },
  {
    value: 'unsure',
    label: 'Unsure',
    description: 'Ownership, behavior, or policy impact has not been confirmed.',
  },
] as const satisfies readonly {
  value: AuditAnswer;
  label: string;
  description: string;
}[];

export const auditQuestions = [
  {
    id: 'ownership-and-licensing',
    categoryId: 'ownership-and-licensing',
    category: 'Ownership and licensing',
    prompt: 'Can you show the source or permission for every asset in this release?',
    detail:
      'Include contractor work, purchased packs, music, fonts, reference images, third-party models, brand material, and every component inside a composite asset.',
    unresolvedRisk:
      'The experience may include content the team is not authorized to publish or license to Roblox.',
    nextAction:
      'Pause the affected asset. Record its creator, source, license, permissions, and any required attribution or usage limits; replace it if those rights cannot be verified.',
    severity: 'critical',
    relatedSectionId: 'blind-spots',
  },
  {
    id: 'visual-assets',
    categoryId: 'visual-assets',
    category: 'Visual assets',
    prompt:
      'Were all images, textures, meshes, UI surfaces, thumbnails, and icons reviewed at full detail?',
    detail:
      'Check every place and inspect edges, screens, reflections, background figures, transparent parts, embedded images, and small typography—not only the main viewport composition.',
    unresolvedRisk:
      'A small or nested visual element may introduce a policy, maturity, privacy, external-direction, or IP issue.',
    nextAction:
      'Create a visual asset inventory, inspect original-resolution files and in-experience presentation, then remove or replace anything the reviewer cannot confidently classify.',
    severity: 'standard',
    relatedSectionId: 'blind-spots',
  },
  {
    id: 'ai-generated-content',
    categoryId: 'ai-generated-content',
    category: 'AI-generated content',
    prompt: 'Did a human review every AI-generated output that will reach players?',
    detail:
      'Review final pixels and text for pseudo-links, watermarks, recognizable people or characters, brands, apparent age, suggestive presentation, privacy, maturity, and factual or legal errors.',
    unresolvedRisk:
      "A harmless prompt can still produce output that is inaccurate, inappropriate, rights-unclear, or inconsistent with the experience's maturity.",
    nextAction:
      'Remove generated typography, inspect the full-resolution output, verify provenance and rights, and regenerate or redesign every unresolved element before upload.',
    severity: 'standard',
    relatedSectionId: 'blind-spots',
  },
  {
    id: 'toolbox-models',
    categoryId: 'toolbox-models',
    category: 'Toolbox models',
    prompt: 'Was every third-party model expanded and inspected beyond its visible geometry?',
    detail:
      'Review scripts, required modules, asset IDs, decals, textures, sounds, UI, hidden parts, packages, capabilities, and update behavior while execution is contained.',
    unresolvedRisk:
      'The model may contain a backdoor, remote dependency, embedded media, or runtime behavior that the team has never reviewed.',
    nextAction:
      'Disable or contain execution, inspect every descendant and dependency, and keep only the parts whose behavior and provenance the team understands.',
    severity: 'critical',
    relatedSectionId: 'blind-spots',
  },
  {
    id: 'audio-and-animations',
    categoryId: 'audio-and-animations',
    category: 'Audio and animations',
    prompt: 'Were the rights and full playback of every sound and animation reviewed?',
    detail:
      'Check underlying music rights, lyrics, spoken words, metadata, imported keyframes, suggestive motion, event markers, and the context created when audio and animation play together.',
    unresolvedRisk:
      'A licensed-looking file may lack the required rights, while a harmless clip can create prohibited meaning when synchronized with a scene.',
    nextAction:
      'Verify ownership and clearances, play each asset from start to finish in context, and replace any file with unclear rights or unresolved content.',
    severity: 'standard',
    relatedSectionId: 'responsibility',
  },
  {
    id: 'experience-metadata',
    categoryId: 'experience-metadata',
    category: 'Experience metadata',
    prompt:
      'Do the title, description, icons, thumbnails, videos, badges, and promotional assets match the current experience?',
    detail:
      'Metadata should not mislead, bypass policy, or hide mature content. Public-facing information for a Restricted experience must remain appropriate for all ages.',
    unresolvedRisk:
      'Players and Roblox may receive an inaccurate or non-compliant representation of the experience before they enter it.',
    nextAction:
      'Compare every public surface with the published build, remove misleading or mature presentation, and make the description and imagery accurate.',
    severity: 'standard',
    relatedSectionId: 'policy-layers',
  },
  {
    id: 'maturity-and-compliance',
    categoryId: 'maturity-and-compliance',
    category: 'Maturity & Compliance',
    prompt:
      'Do the current answers reflect the most mature or extreme content a player can encounter?',
    detail:
      'Recheck every answer after changes to violence, blood, fear, humor, gambling imagery, alcohol, language, social spaces, user creation, media, paid trading, or AI interaction.',
    unresolvedRisk:
      'An outdated or intentionally inaccurate questionnaire can misstate audience access and regional compliance.',
    nextAction:
      'Review the complete current experience, correct every changed answer, and resubmit the questionnaire before release. Do not choose the resulting label yourself.',
    severity: 'critical',
    relatedSectionId: 'policy-layers',
  },
  {
    id: 'user-generated-content',
    categoryId: 'user-generated-content',
    category: 'User-generated content',
    prompt:
      'Can player-created content be safely filtered, constrained, reported, traced, and removed?',
    detail:
      'Include pet names, signs, status text, custom keyboards, drawings, room labels, avatar editors, assembled imagery, uploads, and generative AI responses.',
    unresolvedRisk:
      'Players may expose personal information or reconstruct prohibited text, imagery, poses, or combinations without an effective response path.',
    nextAction:
      'Filter submitted text before display and add proportionate creation limits, reporting, removal, moderation context, and reach controls before public sharing.',
    severity: 'critical',
    relatedSectionId: 'blind-spots',
  },
  {
    id: 'advertising',
    categoryId: 'advertising',
    category: 'Advertising',
    prompt:
      'Has every real-brand placement been classified and handled under the correct advertising path?',
    detail:
      'Separate fictional decoration, an unpaid real-brand reference, Roblox-served ads, and developer-placed Advertising Integrations. Check compensation, calls to action, approvals, disclosures, audience gating, and APIs.',
    unresolvedRisk:
      'A placement treated as ordinary decoration may actually require registration, prior approval, Roblox tools, disclosure, and audience controls.',
    nextAction:
      'Identify the placement type and campaign owner. For an Advertising Integration, stop exposure until current eligibility, registration, approval, asset review, disclosures, and technical requirements are complete.',
    severity: 'critical',
    relatedSectionId: 'blind-spots',
  },
  {
    id: 'monetization',
    categoryId: 'monetization',
    category: 'Monetization',
    prompt:
      'Do paid random items show true current odds and enforce per-player policy restrictions?',
    detail:
      'Trace Robux and every purchasable currency into eggs, wheels, keys, chests, upgrades, combinations, pity systems, luck boosts, rate-ups, drops, and trading.',
    unresolvedRisk:
      'Users may see incomplete or stale odds, access a restricted random purchase, or trade a paid item when PolicyService says they are ineligible.',
    nextAction:
      'List every final outcome, verify probabilities total 100%, update displayed odds for active modifiers, and enforce current PolicyService results for each player.',
    severity: 'critical',
    relatedSectionId: 'blind-spots',
  },
  {
    id: 'external-direction',
    categoryId: 'external-direction',
    category: 'External direction',
    prompt:
      'Is the release free of unapproved URLs, partial links, handles, QR codes, and off-platform calls to action?',
    detail:
      'Inspect generated text, posters, audio, UI, descriptions, signs, support instructions, brand creative, and stylized or broken-up link forms.',
    unresolvedRisk:
      'A visual or instruction may direct users outside Roblox without an approved Social Links or advertising path.',
    nextAction:
      'Remove the off-platform direction or move it to the exact Roblox-approved feature and eligible audience permitted by the current policy.',
    severity: 'critical',
    relatedSectionId: 'high-risk',
  },
  {
    id: 'release-process',
    categoryId: 'release-process',
    category: 'Release process',
    prompt:
      'Did this exact release complete staging, second-person review, and post-publish verification?',
    detail:
      'Review every place, runtime state, asset dependency, metadata surface, questionnaire change, and player-facing flow—not only the starting place in Studio.',
    unresolvedRisk:
      "A reviewed source build can diverge from the published experience, or an unchecked place and late asset can bypass the team's normal gate.",
    nextAction:
      'Freeze the candidate build, run the checklist with a second reviewer, publish deliberately, and verify the live version and all public metadata before announcing it.',
    severity: 'standard',
    relatedSectionId: 'lower-risk',
  },
] as const satisfies readonly AuditQuestionData[];

export const auditOutcomeCopy = {
  'lower-risk-profile': {
    label: 'LOWER RISK PROFILE',
    description:
      'Every area was marked reviewed. Keep the evidence with the release and complete a final human check before publishing.',
  },
  'review-required': {
    label: 'REVIEW REQUIRED',
    description:
      'One or more areas still need attention. Follow the listed actions before treating this release as ready for review.',
  },
  'high-risk-items-found': {
    label: 'HIGH-RISK ITEMS FOUND',
    description:
      'A critical area is unresolved. Pause the affected feature or asset until the team can verify and correct it.',
  },
} as const satisfies Record<AuditOutcome, { label: string; description: string }>;

export const auditDisclaimer =
  'This audit cannot guarantee moderation approval. It helps identify areas that deserve a manual review.';

export const auditInterface = {
  progressLabel: 'Audit progress',
  questionLabel: 'Question',
  ofLabel: 'of',
  resultAction: 'See audit result',
  resultEyebrow: 'Audit result',
  previousAction: 'Previous',
  nextAction: 'Next question',
  answeredLabel: 'answered',
  changeAnswers: 'Review answers',
  resetAction: 'Reset audit',
  findingsTitle: 'Items to resolve',
  nextActionLabel: 'Suggested next action',
  sectionActionLabel: 'Review this topic',
  completeTitle: 'All listed areas were marked reviewed',
  completeAction:
    'Keep the evidence with the release, complete the team checklist, and run a final human review before publishing.',
} as const;
