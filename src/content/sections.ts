import type { EvidenceType, RiskBand, SectionDefinition, SectionId } from '../types/content';
import { sourceIds } from './sources';

interface SectionStatement {
  text: string;
  evidenceType: EvidenceType;
  sourceIds: readonly string[];
}

interface SectionCopyEntry {
  eyebrow: string;
  title: string;
  intro: string;
  statement: SectionStatement | null;
  disclaimer: string | null;
}

export const sectionDefinitions = [
  {
    id: 'start',
    number: '01',
    label: 'The moment before Publish',
    shortLabel: 'Start',
    riskBand: 'lower-risk',
    nav: true,
  },
  {
    id: 'responsibility',
    number: '02',
    label: 'Responsibility layer',
    shortLabel: 'Responsibility',
    riskBand: 'lower-risk',
    nav: true,
  },
  {
    id: 'policy-layers',
    number: '03',
    label: 'Four policy layers',
    shortLabel: 'Policy layers',
    riskBand: 'lower-risk',
    nav: false,
  },
  {
    id: 'lower-risk',
    number: '04',
    label: 'Safer by design',
    shortLabel: 'Lower Risk',
    riskBand: 'lower-risk',
    nav: true,
  },
  {
    id: 'blind-spots',
    number: '05',
    label: 'Looks harmless',
    shortLabel: 'Blind Spots',
    riskBand: 'review',
    nav: true,
  },
  {
    id: 'risk-escalation',
    number: '06',
    label: 'Risk escalation',
    shortLabel: 'Escalation',
    riskBand: 'high-risk',
    nav: false,
  },
  {
    id: 'high-risk',
    number: '07',
    label: 'Do not publish',
    shortLabel: 'High Risk',
    riskBand: 'high-risk',
    nav: true,
  },
  {
    id: 'cases',
    number: '08',
    label: 'Case studies',
    shortLabel: 'Cases',
    riskBand: 'high-risk',
    nav: true,
  },
  {
    id: 'audit',
    number: '09',
    label: 'Five-minute audit',
    shortLabel: 'Audit',
    riskBand: 'high-risk',
    nav: true,
  },
  {
    id: 'appeals',
    number: '10',
    label: 'Something was moderated',
    shortLabel: 'Appeals',
    riskBand: 'recovery',
    nav: true,
  },
  {
    id: 'final',
    number: '11',
    label: 'Build boldly. Publish carefully.',
    shortLabel: 'Final',
    riskBand: 'recovery',
    nav: false,
  },
  {
    id: 'sources',
    number: '12',
    label: 'Official sources',
    shortLabel: 'Sources',
    riskBand: 'recovery',
    nav: true,
  },
] as const satisfies readonly SectionDefinition[];

export const sectionCopy = {
  start: {
    eyebrow: 'INDEPENDENT DEVELOPER SAFETY GUIDE',
    title: 'Before You Publish',
    intro:
      'A practical visual guide to moderation, intellectual property, content maturity, asset safety, and the mistakes developers often discover too late.',
    statement: {
      text: 'Intent matters. But moderation can only evaluate what was actually published.',
      evidenceType: 'practical-interpretation',
      sourceIds: sourceIds('content-moderation', 'asset-moderation'),
    },
    disclaimer:
      'Independent educational resource. Not affiliated with or endorsed by Roblox Corporation.',
  },
  responsibility: {
    eyebrow: 'RESPONSIBILITY',
    title: 'If it ships inside your experience, it deserves a review.',
    intro:
      'A release includes more than the files your core team created. Trace images, models, audio, plugins, contractor work, generated content, and player input back to an owner and a review step.',
    statement: {
      text: '“Found in the Toolbox” is not the same as “reviewed by your team.”',
      evidenceType: 'best-practice',
      sourceIds: sourceIds('toolbox', 'third-party-asset-vulnerabilities', 'terms-of-use'),
    },
    disclaimer: null,
  },
  'policy-layers': {
    eyebrow: 'POLICY LAYERS',
    title: 'Four policy layers. One release.',
    intro:
      'Review platform-wide standards, maturity classification, Restricted limits, and creator, monetization, and advertising requirements as distinct layers. Passing one layer does not replace the others.',
    statement: {
      text: 'A maturity label describes who may access an experience. It does not certify every asset as compliant.',
      evidenceType: 'practical-interpretation',
      sourceIds: sourceIds(
        'community-standards',
        'content-maturity',
        'restricted-content-policy',
        'advertising-standards',
      ),
    },
    disclaimer: 'Policy wording may change. Check the linked official sources.',
  },
  'lower-risk': {
    eyebrow: 'SAFER BY DESIGN',
    title: 'Safety starts before the upload.',
    intro:
      'Build review into the release path: record ownership, inspect dependencies and embedded media, test in staging, refresh experience information, ask for a second review, and verify the published build.',
    statement: {
      text: 'Ready for a human review — not guaranteed approval.',
      evidenceType: 'best-practice',
      sourceIds: sourceIds(
        'terms-of-use',
        'third-party-asset-vulnerabilities',
        'content-maturity',
        'text-filtering',
      ),
    },
    disclaimer: null,
  },
  'blind-spots': {
    eyebrow: 'LOOKS HARMLESS',
    title: 'Small details create large blind spots.',
    intro:
      'A decorative model, generated poster, familiar silhouette, outdated questionnaire, or unreviewed player input can carry a different risk than the team expects. Open each example to inspect the assumption and the safer move.',
    statement: {
      text: 'Review the final asset, its source, its dependencies, and the context in which players will encounter it.',
      evidenceType: 'best-practice',
      sourceIds: sourceIds(
        'toolbox',
        'generative-ai',
        'dmca-guidelines',
        'content-maturity',
        'text-filtering',
        'paid-random-items',
        'advertising-standards',
      ),
    },
    disclaimer: null,
  },
  'risk-escalation': {
    eyebrow: 'BLAST RADIUS',
    title: 'One questionable asset can have a larger blast radius than expected.',
    intro:
      'Follow a possible path from an individual asset review to wider experience or account attention. The sequence explains scope, not a prediction of what will happen in a specific case.',
    statement: {
      text: 'A moderation outcome can affect more than the asset itself.',
      evidenceType: 'practical-interpretation',
      sourceIds: sourceIds('content-moderation', 'asset-moderation'),
    },
    disclaimer:
      'Not every incident follows this path. Enforcement depends on the content, severity, context, history, and the applicable policy.',
  },
  'high-risk': {
    eyebrow: 'HIGH RISK',
    title: 'Do not publish what your team cannot responsibly defend.',
    intro:
      'Stop the release when content, rights, user safety, external direction, monetization, or experience information may conflict with an applicable rule. Remove, redesign, or verify the issue before publishing.',
    statement: {
      text: 'Restricted access is not permission to publish content that remains prohibited by platform-wide standards.',
      evidenceType: 'official-rule',
      sourceIds: sourceIds('community-standards', 'restricted-content-policy'),
    },
    disclaimer:
      'Use safe abstractions and neutral mockups here. Do not reproduce prohibited content as an example.',
  },
  cases: {
    eyebrow: 'CASE STUDIES',
    title: 'The detail that looked harmless was never reviewed separately.',
    intro:
      'These anonymized situations show how teams found a missed dependency, generated detail, identity cue, or stale questionnaire answer. A case is evidence of one outcome, not a universal enforcement rule.',
    statement: {
      text: 'Use each case to improve the workflow, not to predict a moderation result.',
      evidenceType: 'best-practice',
      sourceIds: sourceIds(),
    },
    disclaimer: 'Outcomes vary. A similar change or appeal does not guarantee restoration.',
  },
  audit: {
    eyebrow: 'FIVE-MINUTE AUDIT',
    title: 'Pause the release. Check the blind spots.',
    intro:
      'Answer each question with Reviewed, Needs review, or Unsure. The result highlights unfinished work and links back to the relevant guidance without sending your answers anywhere.',
    statement: {
      text: 'A lower-risk profile means the listed checks were reviewed. It is not a moderation guarantee.',
      evidenceType: 'best-practice',
      sourceIds: sourceIds(),
    },
    disclaimer:
      'This audit cannot guarantee moderation approval. It helps identify areas that deserve a manual review.',
  },
  appeals: {
    eyebrow: 'RECOVERY',
    title: 'Something was moderated. Slow down and preserve the facts.',
    intro:
      'Read the notice, record the relevant IDs, inspect related content, and use the appeal route Roblox provides. Avoid immediately uploading the same content again while the issue is unresolved.',
    statement: {
      text: 'Appeal the decision, not the existence of the rules.',
      evidenceType: 'best-practice',
      sourceIds: sourceIds('moderation-appeals'),
    },
    disclaimer:
      'An appeal triggers another review but does not guarantee reversal, restoration, or a particular response.',
  },
  final: {
    eyebrow: 'RETURN TO BUILDING',
    title: 'Build boldly. Publish carefully.',
    intro:
      'Great experiences are not created by avoiding every idea. They are created by understanding responsibility before pressing Publish.',
    statement: {
      text: 'Caution should make your workflow stronger, not your ideas smaller.',
      evidenceType: 'best-practice',
      sourceIds: sourceIds(),
    },
    disclaimer: null,
  },
  sources: {
    eyebrow: 'OFFICIAL SOURCES',
    title: 'Read the rules at the source.',
    intro:
      'Use the directory to open the current Roblox documentation behind the guide. Each entry records its policy group, the claims it supports, and when it was last checked.',
    statement: null,
    disclaimer: 'Sources last checked August 1, 2026. Policy wording may change.',
  },
} as const satisfies Record<SectionId, SectionCopyEntry>;

export const riskBandOrder = [
  'lower-risk',
  'review',
  'high-risk',
  'recovery',
] as const satisfies readonly RiskBand[];

export const heroActions = [
  { id: 'start-guide', label: 'Start the guide', sectionId: 'responsibility' },
  { id: 'run-audit', label: 'Run a 5-minute audit', sectionId: 'audit' },
] as const;

export const finalActions = [
  { id: 'run-audit', label: 'Run the audit', sectionId: 'audit' },
  {
    id: 'review-checklist',
    label: 'Review the checklist',
    sectionId: 'lower-risk',
  },
  {
    id: 'read-policies',
    label: 'Read official policies',
    sectionId: 'sources',
  },
  { id: 'share', label: 'Share with your team', action: 'share' },
] as const;
