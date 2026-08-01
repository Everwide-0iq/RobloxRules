import type { HighRiskTopic } from '../types/content';
import { sourceIds } from './sources';

export const highRiskTopics = [
  {
    id: 'sexual-content',
    title: 'Sexual content',
    shortRule: 'Do not publish sexually explicit or sexually suggestive content or behavior.',
    whyItMatters:
      "Roblox's baseline prohibition continues to apply in Restricted experiences. An 18+ label is not permission for sexual content.",
    example:
      'An otherwise non-explicit scene includes dialogue and animation that clearly turn it into a sexual encounter.',
    mistakenAssumption: 'Restricted means adult sexual content is allowed.',
    saferAlternative:
      'Remove sexual behavior and implication. If the experience uses permitted non-sexual romantic themes, classify and present them within the current maturity rules.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'restricted-content-policy'),
  },
  {
    id: 'sexualization-of-minors',
    title: 'Sexualization of minors or young-looking characters',
    shortRule:
      'Never sexualize a minor; treat an age-ambiguous or young-looking depiction as requiring the most cautious review.',
    whyItMatters:
      'Roblox prohibits sexualizing minors in any way. With stylized characters, apparent age is a contextual judgment, so an adult label in a design file is not enough on its own.',
    example:
      'A fictional character is described by the artist as an adult but appears very young and is presented with sexualized posing and framing.',
    mistakenAssumption:
      "A fictional biography or anime style settles the character's apparent age.",
    saferAlternative:
      'Use age-unambiguous, non-sexualized character design, clothing, posing, framing, and context. Do not use prohibited imagery as a negative example.',
    evidenceType: 'practical-interpretation',
    sourceIds: sourceIds('community-standards', 'restricted-content-policy'),
  },
  {
    id: 'nudity-or-arousal',
    title: 'Nudity or content made for sexual arousal',
    shortRule: 'Do not publish nudity, partial nudity, or content produced for sexual arousal.',
    whyItMatters:
      'The Restricted Content Policy keeps this prohibition in place for 18+ Restricted experiences as well as the rest of Roblox.',
    example:
      'A character asset relies on minimal coverage and a presentation designed to sexualize the body rather than serve the story.',
    mistakenAssumption: 'Restricted permits nudity if every intended player is an adult.',
    saferAlternative:
      'Redesign the asset with clear coverage and a neutral purpose, pose, camera, and presentation.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'restricted-content-policy'),
  },
  {
    id: 'implied-sexual-activity',
    title: 'Implied sexual activity',
    shortRule: 'Do not depict, imply, or explicitly describe sexual acts.',
    whyItMatters:
      'A scene does not need nudity to fall within the sexual-content prohibition; animation, audio, dialogue, setting, and framing can create the implication together.',
    example:
      'A closed-door scene uses suggestive sound, dialogue, and camera movement to communicate an act that is never shown directly.',
    mistakenAssumption: 'If the camera cuts away, the implied act is automatically acceptable.',
    saferAlternative:
      'Remove the sexual implication. Use a neutral transition or non-sexual relationship beat that does not rely on suggestive cues.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('restricted-content-policy', 'community-standards'),
  },
  {
    id: 'off-platform-direction',
    title: 'Prohibited off-platform direction',
    shortRule:
      'Do not direct users to external websites or services outside Roblox-approved features and surfaces.',
    whyItMatters:
      'Community Standards restrict attempts to move users off-platform. Approved Social Links and approved advertising are separate, controlled paths rather than a general exception.',
    example:
      'An in-world help board tells players to continue a support conversation on an external messaging service.',
    mistakenAssumption: 'A link is allowed when it is useful rather than promotional.',
    saferAlternative:
      'Keep the flow on Roblox or use an eligible Roblox Social Links or approved advertising surface exactly as its current rules allow.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'advertising-standards'),
  },
  {
    id: 'unapproved-links-and-qr',
    title: 'Unapproved URLs, partial links, and QR codes',
    shortRule:
      'Do not hide off-platform direction inside a URL, partial link, handle, QR code, or scannable substitute.',
    whyItMatters:
      'Roblox restricts external direction generally, and Advertising Standards expressly prohibit unapproved URLs, partial links, QR codes, and destinations in ads.',
    example:
      'A poster omits “.com” but combines a recognizable domain fragment with “scan to enter” and a working QR code.',
    mistakenAssumption:
      'Removing the protocol or one part of the domain makes the direction acceptable.',
    saferAlternative:
      'Remove the direction entirely, or use the relevant Roblox-approved feature and destination without encoding a workaround in the artwork.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'advertising-standards'),
  },
  {
    id: 'moderation-evasion',
    title: 'Attempts to evade moderation',
    shortRule:
      'Do not conceal policy-violating elements or build features intended to bypass safety systems.',
    whyItMatters:
      'Community Standards separately prohibit attempts to evade Roblox safety and security systems, including hidden violative asset elements.',
    example:
      'A texture swaps to a prohibited version only after a particular command or player joins the server.',
    mistakenAssumption: 'Content is acceptable if automated review does not see the hidden state.',
    saferAlternative:
      "Remove the violative content and hidden trigger. Make every runtime state available to the team's normal pre-publish review.",
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'content-moderation'),
  },
  {
    id: 'prohibited-reupload',
    title: 'Re-uploading prohibited content',
    shortRule: 'Do not re-upload removed content to bypass an enforcement decision.',
    whyItMatters:
      'Roblox prohibits evading enforcement and describes systems that look for the same or similar content after removal. Re-uploading is not an appeal path.',
    example:
      'After an image is removed, a developer crops it slightly and uploads the same content under a new asset ID.',
    mistakenAssumption: 'A new ID or tiny edit creates a clean moderation record.',
    saferAlternative:
      'Preserve the notice, remove or genuinely correct the content, inspect related assets, and use the appeal route shown by Roblox when appropriate.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'content-moderation', 'moderation-appeals'),
  },
  {
    id: 'scams-and-robux-claims',
    title: 'Scams and misleading Robux claims',
    shortRule: 'Do not use deceptive schemes, phishing, or false offers of free Robux.',
    whyItMatters:
      'Misleading links and schemes undermine account security and platform trust. Advertising Standards specifically reject free-Robux claims used to entice engagement.',
    example:
      'A reward screen imitates a Roblox system dialog and promises free Robux after the player follows an external step.',
    mistakenAssumption: 'A disclaimer in small print fixes an intentionally misleading main claim.',
    saferAlternative:
      'Describe only real in-experience rewards, use original interface language, and keep every requirement and outcome clear before the player acts.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'advertising-standards'),
  },
  {
    id: 'prohibited-substances',
    title: 'Prohibited drugs, tobacco, and vaping content',
    shortRule:
      'Do not depict or promote prohibited illegal or regulated drugs, tobacco, vaping, or their paraphernalia.',
    whyItMatters:
      'Restricted experiences have a narrow allowance for alcohol, not a general allowance for drugs, tobacco, vaping, or smoking paraphernalia.',
    example:
      'An 18+ bar scene adds a branded vaping device because the team assumes all regulated substances share the alcohol exception.',
    mistakenAssumption: 'Restricted allows every adult-only substance reference.',
    saferAlternative:
      'Limit the scene to content explicitly allowed by the current Restricted policy and remove prohibited substances and paraphernalia.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'restricted-content-policy'),
  },
  {
    id: 'personal-information',
    title: 'Dangerous handling of personal information',
    shortRule:
      'Do not expose, request, or route personal information in ways Roblox policy does not allow.',
    whyItMatters:
      'Community Standards restrict sharing and requesting personal information based on age, and user-created text or media can become an unintended collection channel.',
    example:
      'A custom profile board asks players for an external handle, phone number, and real-world location, then displays the answers publicly.',
    mistakenAssumption: 'It is safe because players choose what to type.',
    saferAlternative:
      'Do not request unnecessary personal data. Constrain inputs, filter user-visible text, and keep identity and contact flows inside approved Roblox systems.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'text-filtering', 'creator-safety'),
  },
  {
    id: 'unfiltered-text',
    title: 'Unfiltered user-visible text',
    shortRule: 'Filter text you do not explicitly control before displaying it to other users.',
    whyItMatters:
      'Default chat filtering does not automatically cover every TextBox, sign, pet name, custom keyboard, stored string, or external response shown by an experience.',
    example:
      'A player names a pet through a custom menu and the raw name is copied into a world-space label for everyone to see.',
    mistakenAssumption: 'All text inside Roblox is filtered automatically.',
    saferAlternative:
      "After submission, use the supported TextService flow with the author's UserId and display the appropriate filtered result.",
    evidenceType: 'official-rule',
    sourceIds: sourceIds('text-filtering', 'creator-safety'),
  },
  {
    id: 'inaccurate-maturity-information',
    title: 'Intentionally inaccurate maturity information',
    shortRule: 'Answer the Maturity & Compliance Questionnaire accurately and keep it current.',
    whyItMatters:
      'The label controls audience access and regional compliance. Roblox states that intentional misrepresentation can lead to moderation consequences.',
    example:
      'A team answers for an older build after adding stronger violence because it wants to preserve the previous audience reach.',
    mistakenAssumption: 'The questionnaire is marketing metadata that can be optimized for reach.',
    saferAlternative:
      'Answer for the most mature or extreme content players can encounter and resubmit whenever an update changes an answer.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('content-maturity', 'creator-safety'),
  },
  {
    id: 'intellectual-property',
    title: 'Serious intellectual-property risk',
    shortRule:
      'Publish only content you created or are fully authorized to use and license to Roblox.',
    whyItMatters:
      'Credit, no monetization, online availability, a physical purchase, or lack of intent does not by itself prevent copyright infringement.',
    example:
      'A team redraws a recognizable film character, changes one color, and assumes the altered image is now original.',
    mistakenAssumption: 'Attribution or a small visual change replaces permission.',
    saferAlternative:
      'Use an original identity or obtain and record the necessary rights for every component. Ask qualified counsel when a legal question remains.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('terms-of-use', 'dmca-guidelines', 'community-standards'),
  },
  {
    id: 'harmful-ugc-systems',
    title: 'Harmful user-generated systems',
    shortRule: 'Do not ship a public creation surface without controls for foreseeable misuse.',
    whyItMatters:
      'Players can combine allowed text, shapes, clothing, poses, and imported content into prohibited results. Roblox recommends designing UGC reach and permissions with misuse in mind.',
    example:
      'A public drawing wall has no review queue, report action, removal tool, rate limit, or way to identify the submitted canvas.',
    mistakenAssumption:
      'The player, not the feature owner, carries all responsibility for generated content.',
    saferAlternative:
      'Use filtering and proportionate controls such as preset options, limited reach, trusted access, pre-moderation, reporting, removal, and an audit trail.',
    evidenceType: 'best-practice',
    sourceIds: sourceIds('creator-safety', 'text-filtering', 'generative-ai'),
  },
  {
    id: 'political-and-sensitive-events',
    title: 'Political figures and real-world sensitive events',
    shortRule:
      'Do not publish prohibited depictions or promotion of political figures, political entities, or real-world sensitive events.',
    whyItMatters:
      'Current Community Standards restrict defined political content and content that recreates, glorifies, mocks, or commercially exploits specified sensitive events.',
    example:
      'A fictional disaster event copies the date, victims, location, and recognizable imagery of a recent real-world tragedy to sell an in-experience item.',
    mistakenAssumption: 'Calling a real event fictional removes the policy context.',
    saferAlternative:
      'Create a clearly original fictional conflict or disaster without identifiable real people, events, campaigns, slogans, victims, or commercial exploitation.',
    evidenceType: 'official-rule',
    sourceIds: sourceIds('community-standards', 'advertising-standards'),
  },
] as const satisfies readonly HighRiskTopic[];
