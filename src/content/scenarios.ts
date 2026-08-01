import type { Scenario } from '../types/content';
import { sourceIds } from './sources';

export const scenarios = [
  {
    id: 'toolbox-model',
    letter: 'A',
    title: 'Toolbox model',
    eyebrow: 'The asset looked decorative',
    riskBand: 'review',
    summary:
      'Toolbox includes both Roblox-made and community-made assets. A model can carry far more than the geometry visible in the viewport.',
    assumption: 'It is in the Toolbox, so the whole model has already been cleared for my project.',
    whatCanGoWrong:
      'A legitimate-looking model can include scripts, nested media, unexpected asset references, or package behavior that the team never reviewed. Roblox warns that moderation is not guaranteed to remove every malicious script.',
    example:
      'A developer adds a decorative bedroom model, checks the bed and walls in the viewport, but never expands its descendants or reviews the images on a hidden SurfaceGui.',
    saferMove:
      'Treat third-party models as untrusted source material. Disable execution while inspecting, expand every descendant, and keep only the geometry and assets your team has actually reviewed.',
    evidenceType: 'best-practice',
    sourceIds: sourceIds(
      'toolbox',
      'third-party-asset-vulnerabilities',
      'creator-store',
      'asset-moderation',
    ),
    inspectionPoints: [
      'Scripts and required modules',
      'Asset IDs, decals, textures, and sounds',
      'SurfaceGui and other nested UI',
      'Hidden, transparent, or distant parts',
      'Packages and update behavior',
      'Context created by the complete scene',
    ],
    imageSlotIds: ['image-slot-01', 'image-slot-02'],
    imagePresentation: 'gallery',
  },
  {
    id: 'ai-generated-poster',
    letter: 'B',
    title: 'AI-generated poster',
    eyebrow: 'The prompt was harmless',
    riskBand: 'review',
    summary:
      'AI-generated is still content. The final pixels, not the intent behind the prompt, are what the team needs to inspect.',
    assumption:
      'The image is fictional and generated from scratch, so it must be original and compliant.',
    whatCanGoWrong:
      'Generated typography can resemble a URL, handle, watermark, or real event promotion. Background faces, reflections, clothing, brands, or character details can introduce separate policy, maturity, privacy, or IP concerns.',
    example:
      'A fictional space-race poster contains a QR-like square and blurred text that resembles a social handle when viewed at full resolution.',
    saferMove:
      'Generate the composition without text, replace all typography manually, inspect the full-resolution image edge to edge, and publish only the reviewed final export.',
    evidenceType: 'best-practice',
    sourceIds: sourceIds(
      'generative-ai',
      'terms-of-use',
      'community-standards',
      'dmca-guidelines',
      'advertising-standards',
    ),
    inspectionPoints: [
      'Pseudo-text, handles, URLs, dates, and event language',
      'QR-like patterns and watermarks',
      'Recognizable characters, people, products, or brands',
      'Apparent age, clothing, pose, and framing',
      'Screens, reflections, edges, and background faces',
    ],
    workflow: [
      'Generate the visual without text.',
      'Remove every piece of generated typography.',
      'Add manually written fictional copy.',
      'Inspect at full resolution.',
      'Review edges, screens, clothing, reflections, and background faces.',
      'Start with a small, reviewed release set.',
    ],
    imageSlotIds: ['image-slot-03', 'image-slot-04'],
    imagePresentation: 'comparison',
  },
  {
    id: 'fictional-event-poster',
    letter: 'C',
    title: 'Fictional event poster',
    eyebrow: 'Decoration can read like promotion',
    riskBand: 'review',
    summary:
      'A fictional poster can shift from world-building into off-platform direction when its copy, symbols, and calls to action point elsewhere.',
    assumption: 'It is just set dressing, so the wording cannot matter.',
    whatCanGoWrong:
      'A time or date is not automatically a violation, but combined with a real platform name, handle, URL, partial link, or QR code, the composition can become an external call to action.',
    example:
      'A poster for an in-world concert says “Live Friday — 8 PM” beside a social icon and a scannable-looking square.',
    saferMove:
      'Keep fictional promotion self-contained inside the experience. Remove platform names, handles, URLs, partial links, QR codes, and instructions to continue elsewhere.',
    evidenceType: 'practical-interpretation',
    sourceIds: sourceIds('community-standards', 'advertising-standards'),
    comparison: {
      lowerRisk: 'SKYJACKS\nA NEW ADVENTURE',
      needsReview: 'LIVE FRIDAY — 8 PM',
      highRisk: 'Watch on YouTube\nJoin our Discord\n@username\nexample.com\nScan to enter',
    },
  },
  {
    id: 'stylized-characters',
    letter: 'D',
    title: 'Stylized and anime characters',
    eyebrow: 'Style is not the policy issue',
    riskBand: 'review',
    summary:
      'Anime and other stylized art are not prohibited by style alone. Risk comes from the complete depiction and its context.',
    assumption:
      'Because the character is fictional and stylized, age and sexualization concerns do not apply.',
    whatCanGoWrong:
      'Apparent age, clothing, pose, framing, emphasized body areas, setting, and intended context can combine into a depiction that requires a different review than any one detail in isolation.',
    example:
      'A young-looking fantasy character has ordinary clothing, but the camera crop and pose turn an otherwise neutral design into a concerning presentation.',
    saferMove:
      'Use age-unambiguous, non-sexualized designs and neutral presentation. Review the full composition, not only the character sheet or art style.',
    evidenceType: 'practical-interpretation',
    sourceIds: sourceIds('community-standards', 'restricted-content-policy', 'content-maturity'),
    inspectionPoints: [
      'Apparent age',
      'Clothing and coverage',
      'Pose and expression',
      'Camera framing',
      'Emphasized body areas',
      'Environment and narrative context',
    ],
    imageSlotIds: ['image-slot-05'],
  },
  {
    id: 'ip-lookalikes',
    letter: 'E',
    title: 'Intellectual-property lookalikes',
    eyebrow: 'One changed detail is rarely a rights review',
    riskBand: 'review',
    summary:
      'Removing a logo or changing a color does not resolve every copyright, trademark, publicity, or permission question.',
    assumption:
      'The name is misspelled and the colors are different, so the reference is legally safe.',
    whatCanGoWrong:
      'A recognizable silhouette, outfit, symbol set, face, product shape, story, or presentation can still create an IP or publicity concern. That is a risk review, not an automatic DMCA conclusion.',
    example:
      "A fictional sports star uses a nearly identical uniform, signature pose, merchandise design, and one-letter variation of a real athlete's name.",
    saferMove:
      'Change the identity, not one detail: silhouette, name, colors, outfit, story, symbols, and presentation. If the rights remain unclear, do not publish until they are verified.',
    evidenceType: 'practical-interpretation',
    sourceIds: sourceIds('terms-of-use', 'dmca-guidelines', 'community-standards'),
    inspectionPoints: [
      'Characters and recognizable archetypes',
      'Names, faces, and public personas',
      'Uniforms, merchandise, and symbols',
      'Product silhouettes and trade dress',
      'Film frames, memes, and source images',
      'Rights and license records',
    ],
    imageSlotIds: ['image-slot-06'],
  },
  {
    id: 'content-maturity-mismatch',
    letter: 'F',
    title: 'Content maturity mismatch',
    eyebrow: 'The questionnaire can become stale',
    riskBand: 'review',
    summary:
      'Maturity answers describe the current experience. A correct answer from the last release may be wrong after the next one.',
    assumption: 'The experience already has a label, so the questionnaire is finished.',
    whatCanGoWrong:
      'A new mechanic, scene, social feature, AI interaction, or stronger presentation can change one or more answers. Roblox requires changed answers to be updated and resubmitted.',
    example:
      'An update adds a private bedroom to a social hangout and extended AI conversations, while the team ships with the old questionnaire unchanged.',
    saferMove:
      'Reopen the questionnaire during every release review. Answer for the most mature or extreme content a player can encounter; let Roblox determine the resulting label.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds(
      'content-maturity',
      'restricted-content-policy',
      'generative-ai',
      'creator-safety',
    ),
    inspectionPoints: [
      'Violence, blood, fear, and crude humor',
      'Gambling-related imagery or unplayable gambling',
      'Alcohol and stronger language',
      'Social hangouts and private spaces',
      'Free-form user creation',
      'Generative and extended AI interaction',
    ],
    imageSlotIds: ['image-slot-07'],
  },
  {
    id: 'user-generated-content',
    letter: 'G',
    title: 'User-generated content',
    eyebrow: 'A safe prompt can still produce unsafe output',
    riskBand: 'review',
    summary:
      'Any feature that lets players compose content creates a moderation surface, even when the input is not a normal chat box.',
    assumption:
      'Pet names, room labels, drawings, and generated responses are not chat, so chat safety does not apply.',
    whatCanGoWrong:
      'Players may expose personal information, reconstruct prohibited words or images, or publish content that other users cannot report or remove. Roblox places responsibility for uncontrolled displayed text on the developer.',
    example:
      'A custom sign uses a button-based keyboard. The resulting message is shown to the whole server without passing through the supported text-filtering flow.',
    saferMove:
      'Filter submitted text before display, constrain creation where practical, and give the system clear reporting, removal, and audit paths before enabling public sharing.',
    evidenceType: 'best-practice',
    sourceIds: sourceIds('text-filtering', 'creator-safety', 'generative-ai'),
    inspectionPoints: [
      'Can another player see the content?',
      'Is user-visible text filtered after submission?',
      'Can the content be reported and removed?',
      'Is there enough context for an internal audit?',
      'Can users reconstruct prohibited content from allowed parts?',
      'Could the feature expose personal information?',
    ],
    imageSlotIds: ['image-slot-10'],
  },
  {
    id: 'paid-random-items',
    letter: 'H',
    title: 'Paid random items',
    eyebrow: 'Indirect payment still counts',
    riskBand: 'review',
    summary:
      'A random reward can be paid even when the final interaction uses gems, tickets, eggs, keys, or another in-experience item.',
    assumption:
      'The wheel costs gems rather than Robux, so paid-random-item requirements do not apply.',
    whatCanGoWrong:
      'If users can purchase that currency with Robux, the random outcome can be a paid random item. Odds must be actual and numerical, modifiers must update them, and some users cannot access the mechanic or trade paid items.',
    example:
      "A premium-currency egg shows static base odds while an active x2 Luck item changes the server's real outcome distribution.",
    saferMove:
      'Disclose every final outcome and its current numerical probability before purchase. Use current PolicyService information for the specific player and enforce the returned restrictions.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('paid-random-items', 'policy-service', 'community-standards'),
    inspectionPoints: [
      'Direct Robux spins',
      'Random rewards bought with purchasable currency',
      'Paid keys, eggs, tickets, and combination items',
      'Luck, pity, rate-up, and drop modifiers',
      'ArePaidRandomItemsRestricted',
      'IsPaidItemTradingAllowed',
    ],
    imageSlotIds: ['image-slot-09'],
  },
  {
    id: 'advertising-integrations',
    letter: 'I',
    title: 'Advertising integrations',
    eyebrow: 'A brand placement can change policy layers',
    riskBand: 'review',
    summary:
      'A fictional decorative brand, a real unpaid reference, Roblox-served advertising, and a developer-placed paid integration are not the same thing.',
    assumption:
      'The ad is part of the environment, so it can be handled like ordinary set dressing.',
    whatCanGoWrong:
      'Advertising Integrations changed materially in 2026. Developer-placed advertising outside Roblox-native ad services requires eligibility, registration, prior approval, asset review, disclosures, audience controls, and the required Roblox API.',
    example:
      "A studio places a sponsor's billboard directly in an experience, measures engagement with a third-party service, and exposes it before campaign assets are approved.",
    saferMove:
      'Classify the placement before production. For an Advertising Integration, follow the current Terms and Standards, register the campaign, obtain approval, use Roblox-required tools, and avoid third-party ad or measurement calls.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds(
      'advertising-standards',
      'advertising-integrations-terms',
      'community-standards',
    ),
    inspectionPoints: [
      'Fictional decorative brand',
      'Real brand reference',
      'Compensated promotion or call to action',
      'Roblox-served advertising',
      'Developer-placed Advertising Integration',
      'Registration, approval, disclosure, and audience gating',
    ],
    imageSlotIds: ['image-slot-11'],
  },
] as const satisfies readonly Scenario[];
