import type { Source } from '../types/content';

export const LAST_CHECKED = 'August 1, 2026' as const;

export const sources = [
  {
    id: 'community-standards',
    title: 'Roblox Community Standards',
    url: 'https://about.roblox.com/community-standards',
    policyGroup: 'platform-wide-standards',
    description:
      'The platform-wide baseline for permitted content and behavior, including intellectual property, external direction, advertising, paid items, and safety systems.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Community Standards apply across Roblox content and behavior.',
      'Enforcement can affect content and the accounts that created it.',
      'External direction, paid random items, advertising, and attempts to evade safety systems have specific requirements.',
    ],
  },
  {
    id: 'content-moderation',
    title: 'Content Moderation on Roblox',
    url: 'https://en.help.roblox.com/hc/en-us/articles/21416271342868-Content-Moderation-on-Roblox',
    policyGroup: 'moderation-and-appeals',
    description:
      'An overview of automated and human moderation, reports, consequence factors, and review of moderation decisions.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Uploaded assets and published or updated experiences can be evaluated by automated and human systems.',
      'Content that remains available can still be reviewed after a report.',
      'Consequences vary with severity, impact, history, and repeated violations.',
    ],
  },
  {
    id: 'restricted-content-policy',
    title: 'Restricted Content Policy',
    url: 'https://en.help.roblox.com/hc/en-us/articles/15869919570708-Restricted-Content-Policy',
    policyGroup: 'restricted-content',
    description:
      'The limited allowances and continuing prohibitions for age-checked Restricted experiences.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Restricted experiences are for age-checked creators and users who are at least 18.',
      'Restricted is not permission for sexual content, extreme violence, or other continuing prohibitions.',
      'Submitted assets remain subject to Community Standards and public-facing information must be appropriate for all ages.',
    ],
  },
  {
    id: 'advertising-standards',
    title: 'Advertising Standards',
    url: 'https://en.help.roblox.com/hc/en-us/articles/13722260778260-Advertising-Standards',
    policyGroup: 'advertising',
    description:
      'Current advertiser and publisher requirements, including disclosures, audience gating, destinations, rewarded ads, and Advertising Integrations.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Advertising must be identifiable, age-appropriate, and compliant with applicable Roblox policies and law.',
      'Unapproved URLs, partial links, QR codes, and destinations are restricted in advertising.',
      'Advertising Integration assets require review before audience exposure.',
    ],
  },
  {
    id: 'advertising-integrations-terms',
    title: 'Advertising Integrations Terms',
    url: 'https://en.help.roblox.com/hc/en-us/articles/47656162239124-Advertising-Integrations-Terms',
    policyGroup: 'advertising',
    description:
      'The terms for developer-placed advertising content outside Roblox-native advertising services, effective May 1, 2026.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Advertising Integrations require eligibility, registration, prior approval, and required Roblox APIs.',
      'Developers are responsible for integration content and required disclosures.',
      'Experiences may not make programmatic calls to third-party advertising or measurement services for an integration.',
    ],
  },
  {
    id: 'terms-of-use',
    title: 'Roblox Terms of Use',
    url: 'https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use',
    policyGroup: 'platform-wide-standards',
    description:
      'The contractual User and Creator Terms, including creator responsibility, rights in UGC, and use of Roblox AI Features, effective May 19, 2026.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Creators are responsible for their UGC and must have the necessary rights and permissions.',
      'Roblox AI Feature outputs can be unreliable and should be checked for legality and appropriateness.',
      'As between the user and Roblox, users retain only the rights they may have in prompts and outputs, to the extent permitted by law.',
    ],
  },
  {
    id: 'content-maturity',
    title: 'Content maturity and compliance',
    url: 'https://create.roblox.com/docs/production/promotion/content-maturity',
    policyGroup: 'content-maturity',
    description:
      'The current maturity labels, questionnaire workflow, access effects, descriptors, and duties to keep answers current.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'The current labels are Minimal, Mild, Moderate, and Restricted.',
      'Questionnaire answers must reflect the most mature or extreme content players can encounter.',
      'Answers must be updated and resubmitted when an experience update changes them.',
    ],
  },
  {
    id: 'creator-safety',
    title: 'How you can help us make Roblox safer',
    url: 'https://create.roblox.com/docs/safety',
    policyGroup: 'user-generated-content',
    description:
      'Creator guidance for safer experience design, UGC controls, text filtering, PolicyService, and keeping maturity information accurate.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Creators play an active role in maintaining a safe experience.',
      'Pre-moderation, limited reach, trusted-user access, and preset options are possible UGC safeguards.',
      'Public experiences need accurate Maturity & Compliance information.',
    ],
  },
  {
    id: 'text-filtering',
    title: 'Text filtering',
    url: 'https://create.roblox.com/docs/ui/text-filtering',
    policyGroup: 'user-generated-content',
    description:
      "The developer's responsibility for non-chat text and the supported filtering flow for user-visible strings.",
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Common Roblox chat output is automatically filtered.',
      'Developers must filter displayed text they do not explicitly control.',
      'Filtering should happen after submission and before text is displayed to other users.',
    ],
  },
  {
    id: 'paid-random-items',
    title: 'Paid random items policy guidelines',
    url: 'https://create.roblox.com/docs/production/monetization/paid-random-items',
    policyGroup: 'monetization',
    description:
      'The definition of paid random items, numerical odds disclosures, probability modifiers, and per-user policy treatments.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Indirect purchases through currency purchasable with Robux can be paid random items.',
      'All possible outcomes and actual numerical odds must be available before purchase.',
      'Active probability modifiers must be reflected in the odds shown to the user.',
    ],
  },
  {
    id: 'policy-service',
    title: 'PolicyService',
    url: 'https://create.roblox.com/docs/reference/engine/classes/PolicyService',
    policyGroup: 'monetization',
    description:
      'The current engine reference for retrieving policy information for an individual player.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'GetPolicyInfoForPlayerAsync returns per-player policy information.',
      'ArePaidRandomItemsRestricted is true when the player cannot interact with paid random item generators.',
      'Policy calls yield and should be handled as fallible operations.',
    ],
  },
  {
    id: 'generative-ai',
    title: 'Games with Generative AI',
    url: 'https://create.roblox.com/docs/generative-AI',
    policyGroup: 'generative-ai',
    description:
      'Rules and guidance for Roblox-provided and third-party generative AI used inside experiences.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'AI-generated content remains subject to Community Standards.',
      'Developers are responsible for third-party AI content delivered to users.',
      'AI interaction requires questionnaire disclosure and extended interactions require Restricted maturity.',
    ],
  },
  {
    id: 'dmca-guidelines',
    title: 'DMCA guidelines',
    url: 'https://create.roblox.com/docs/production/publishing/dmca-guidelines',
    policyGroup: 'intellectual-property',
    description:
      'General copyright information, common infringement misconceptions, notices, and counter-notices; not legal advice.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Credit, lack of monetization, online availability, or lack of intent does not by itself prevent infringement.',
      'Roblox responds to valid DMCA notices and maintains a repeat-infringer policy.',
      'A counter-notice is available when a removal resulted from mistake or misidentification.',
    ],
  },
  {
    id: 'moderation-appeals',
    title: 'Appeal Your Content or Account Moderation',
    url: 'https://en.help.roblox.com/hc/en-us/articles/360000245263-Appeal-Your-Content-or-Account-Moderation',
    policyGroup: 'moderation-and-appeals',
    description:
      'The available appeal routes, information to include, deadlines, duplicate-review limit, and regional rights.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'The moderation notice identifies the available appeal route.',
      'The standard appeal window is 30 days, while EU users receive six months.',
      'An appeal does not guarantee reversal, and duplicate appeals are not reviewed after a decision has been reviewed.',
    ],
  },
  {
    id: 'toolbox',
    title: 'Toolbox',
    url: 'https://create.roblox.com/docs/projects/assets/toolbox',
    policyGroup: 'asset-safety',
    description:
      'The Studio surface for Roblox and community assets, including how scripts are indicated and can be disabled on insertion.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Toolbox contains assets made by Roblox and by community members.',
      'Models and other assets can contain scripts.',
      'A creator can disable scripts when inserting an asset for inspection.',
    ],
  },
  {
    id: 'third-party-asset-vulnerabilities',
    title: 'Vulnerabilities from third-party assets',
    url: 'https://create.roblox.com/docs/scripting/security/third-party-vulnerabilities',
    policyGroup: 'asset-safety',
    description:
      "Roblox's security warning about backdoors in third-party Creator Store assets and practical inspection and containment measures.",
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Third-party Creator Store assets are a common source of malicious-script risk.',
      'Roblox moderation is not guaranteed to remove every malicious script.',
      'Ratings and popularity are useful signals but do not guarantee safety.',
    ],
  },
  {
    id: 'creator-store',
    title: 'Creator Store',
    url: 'https://create.roblox.com/docs/production/creator-store',
    policyGroup: 'asset-safety',
    description:
      'Creator Store asset sources, listing requirements, and restrictions intended to reduce malicious or opaque code.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Creator Store includes assets from Roblox and independent creators.',
      'Distributed assets must follow applicable rules and copyright requirements.',
      'Obfuscated code and several remote-loading patterns are restricted for listed assets.',
    ],
  },
  {
    id: 'asset-moderation',
    title: 'Assets',
    url: 'https://create.roblox.com/docs/projects/assets',
    policyGroup: 'asset-safety',
    description:
      'An overview of asset ownership, permissions, proactive and reactive moderation, and Studio asset-management surfaces.',
    lastChecked: LAST_CHECKED,
    official: true,
    supports: [
      'Roblox uses proactive and reactive asset moderation.',
      'An asset can be unavailable while moderation is pending or removed after a violation is found.',
      'Toolbox can insert community-created assets directly into an experience.',
    ],
  },
] as const satisfies readonly Source[];

export type SourceId = (typeof sources)[number]['id'];

export function sourceIds<const T extends readonly SourceId[]>(...ids: T): T {
  return ids;
}

export const sourceById = new Map(sources.map((source) => [source.id, source]));
