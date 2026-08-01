import type { ImageSlotData } from '../types/content';

export const imageSlotContent = {
  locale: 'en',
  placeholderLabel: 'IMAGE SLOT',
  uploadLabel: 'Upload',
  recommendedLabel: 'Recommended',
  fileLabel: 'File',
  riskyExampleLabel: 'RISKY EXAMPLE',
  saferVersionLabel: 'SAFER VERSION',
  shownLabel: 'WHAT IT SHOWS',
  takeawayLabel: 'THE POINT',
  registryPath: 'public/examples/generated/README.md',
} as const;

// Runtime assets live at public/examples/generated/<fileName>. Keep `available` unset until the
// reviewed WebP exists at that exact path so production never requests planned or missing media.
export const imageSlots = [
  {
    id: 'image-slot-01',
    sectionId: 'blind-spots',
    label: 'IMAGE SLOT 01',
    fileName: 'toolbox-model-hierarchy.webp',
    description:
      'A neutral model hierarchy with scripts, media, nested asset IDs, and package dependencies clearly marked for inspection.',
    caption: {
      shown: 'A model tree with six types of nested scripts, media, asset IDs, and packages.',
      takeaway: 'Inspect the complete hierarchy, not only the geometry visible in the scene.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Annotated hierarchy of a third-party model showing descendants that need review.',
    available: true,
    safetyNotes:
      'Use a fictional hierarchy. Do not include executable malicious code, real creator names, or private project identifiers.',
  },
  {
    id: 'image-slot-02',
    sectionId: 'blind-spots',
    label: 'IMAGE SLOT 02',
    fileName: 'hidden-decal-example.webp',
    description:
      'A safe room prop comparison that reveals a small hidden decal when the object is inspected closely.',
    caption: {
      shown: 'The same room prop before and after zooming in on a hidden leaf decal.',
      takeaway: 'Even a tiny nested texture can introduce separate content or rights risk.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Room prop with an inspection callout pointing to a previously hidden decal.',
    available: true,
    safetyNotes:
      'Use harmless fictional artwork in the decal. Do not reproduce moderated, offensive, or rights-unclear imagery.',
  },
  {
    id: 'image-slot-03',
    sectionId: 'blind-spots',
    label: 'IMAGE SLOT 03',
    fileName: 'ai-poster-risk.webp',
    description:
      'A fictional AI-generated poster with suspicious pseudo-text, QR-like shapes, and background details highlighted for review.',
    caption: {
      shown: 'An AI poster with pseudo-text, a QR-like square, and watermark-like marks.',
      takeaway: 'Review the final pixels: a harmless prompt does not guarantee a safe asset.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Fictional generated poster with callouts around pseudo-text and ambiguous graphic details.',
    available: true,
    safetyNotes:
      'Do not include a usable URL, handle, QR code, real person, real brand, watermark, or sexualized character.',
  },
  {
    id: 'image-slot-04',
    sectionId: 'blind-spots',
    label: 'IMAGE SLOT 04',
    fileName: 'ai-poster-reviewed.webp',
    description:
      'The safer version of the fictional poster with generated typography removed and manually written fictional copy.',
    caption: {
      shown: 'A cleaned poster with manually set copy and ambiguous marks removed.',
      takeaway: 'Replace generated text and inspect the final exported image.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Reviewed fictional poster with clear manually written text and simplified background details.',
    available: true,
    safetyNotes:
      'Keep all names, marks, dates, and event language fictional. Pair with image-slot-03 at the same crop and scale.',
  },
  {
    id: 'image-slot-05',
    sectionId: 'blind-spots',
    label: 'IMAGE SLOT 05',
    fileName: 'character-framing-comparison.webp',
    description:
      'The same clearly adult character shown in a low-angle tight crop that needs review and in a neutral full-body frame with lower contextual risk.',
    caption: {
      shown: 'The same adult character in a tight low-angle crop and a neutral full-body view.',
      takeaway: 'Framing and pose can change risk even when the clothing stays the same.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Fully clothed adult character shown in a low-angle tight crop labeled needs review and a neutral full-body view labeled lower risk.',
    available: true,
    safetyNotes:
      'Use a clearly adult, fully clothed fictional character. Keep the negative example mild and non-explicit; never sexualize or ambiguously age a minor.',
  },
  {
    id: 'image-slot-06',
    sectionId: 'blind-spots',
    label: 'IMAGE SLOT 06',
    fileName: 'ip-lookalike-comparison.webp',
    description:
      'A source character, an overly close copy, and a meaningfully original fictional redesign shown side by side.',
    caption: {
      shown:
        'A source hero, a near-copy repeating its helmet, cape, star, and satchel, and a distinct redesign.',
      takeaway: 'Change the complete identity, not only one color or accessory.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Three-panel character comparison showing a fictional source, an overly close copy, and a distinct original redesign.',
    available: true,
    safetyNotes:
      'Do not use a real protected character, celebrity, athlete, streamer, club identity, product silhouette, or trademark.',
  },
  {
    id: 'image-slot-07',
    sectionId: 'blind-spots',
    label: 'IMAGE SLOT 07',
    fileName: 'maturity-questionnaire.webp',
    description:
      'A current Maturity & Compliance questionnaire view or a clearly labeled neutral educational reconstruction.',
    caption: {
      shown: 'A maturity questionnaire with newly added experience features marked for re-check.',
      takeaway: 'Update and resubmit answers after player-facing content changes.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Content maturity questionnaire with changed experience features marked for re-review.',
    available: true,
    safetyNotes:
      'Use a current owner-captured image only when permitted. Remove account data and IDs, and do not imply Roblox endorsement.',
  },
  {
    id: 'image-slot-08',
    sectionId: 'appeals',
    label: 'IMAGE SLOT 08',
    fileName: 'moderation-notice.webp',
    description:
      'A redacted moderation notice showing where to find the action category, affected ID, date, and appeal route.',
    caption: {
      shown: 'A redacted notice with the action, affected asset ID, date, and appeal route.',
      takeaway: 'Base the appeal on the notice facts, not on a guess about the reason.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Redacted moderation notice with callouts for the affected asset ID and appeal instructions.',
    available: true,
    safetyNotes:
      'Use an owned, fully redacted notice or a neutral mockup. Remove usernames, emails, IDs, and moderated imagery.',
  },
  {
    id: 'image-slot-09',
    sectionId: 'blind-spots',
    label: 'IMAGE SLOT 09',
    fileName: 'paid-random-item-odds.webp',
    description:
      'A fictional paid random item purchase panel with numerical outcomes, total probability, and an active luck modifier update.',
    caption: {
      shown:
        'Reward odds before purchase, including the 100% total and an active ×2 luck modifier.',
      takeaway: 'Show the real current probabilities and update them for every modifier.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Fictional random reward interface showing numerical odds that update with a luck modifier.',
    available: true,
    safetyNotes:
      'Use fictional items and currency. Ensure displayed example probabilities total 100% and avoid Roblox branding.',
  },
  {
    id: 'image-slot-10',
    sectionId: 'blind-spots',
    label: 'IMAGE SLOT 10',
    fileName: 'filtered-user-sign.webp',
    description:
      'A safe user-created sign flow showing submission, server-side filtering, player-visible output, report, and removal controls.',
    caption: {
      shown:
        'Player text passes through a server filter, then display, report, removal, and audit controls.',
      takeaway: 'Filter before display and provide a complete moderation path.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Diagram of player text moving through filtering before appearing on an in-game sign.',
    available: true,
    safetyNotes:
      'Use harmless sample text and fictional players. Do not include personal information or examples of filter evasion.',
  },
  {
    id: 'image-slot-11',
    sectionId: 'blind-spots',
    label: 'IMAGE SLOT 11',
    fileName: 'advertising-integration.webp',
    description:
      'A fictional in-experience advertising integration with clear disclosure and review checkpoints.',
    caption: {
      shown: 'A paid placement passing disclosure, audience, and approval checkpoints.',
      takeaway: 'Treat sponsored integration as advertising, not ordinary scenery.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Fictional advertising integration mockup with disclosure, eligibility, and approval checkpoints.',
    available: true,
    safetyNotes:
      'Use a fictional brand and destination. Do not include a real URL, partial link, QR code, advertiser, or campaign data.',
  },
  {
    id: 'image-slot-12',
    sectionId: 'appeals',
    label: 'IMAGE SLOT 12',
    fileName: 'appeal-form.webp',
    description:
      'A redacted appeal form or neutral reconstruction showing the factual fields needed for a concise review request.',
    caption: {
      shown: 'An appeal form with fields for the item, ID, correction, and supporting evidence.',
      takeaway: 'A concise factual appeal is easier to verify.',
    },
    resolution: { width: 1600, height: 1600 },
    alt: 'Appeal form mockup with fields for the moderated item, account, ID, corrections, and review request.',
    available: true,
    safetyNotes:
      'Remove personal data and real case identifiers. Do not present the mockup as an official form or imply a guaranteed result.',
  },
] as const satisfies readonly ImageSlotData[];

export type ImageSlotId = (typeof imageSlots)[number]['id'];
export type ImageSlotFileName = (typeof imageSlots)[number]['fileName'];
