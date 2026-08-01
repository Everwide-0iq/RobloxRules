import type { ResponsibilityItem } from '../types/content';
import { sourceIds } from './sources';

export const responsibilityContent = {
  locale: 'en',
  centerLabel: 'YOUR EXPERIENCE',
  detailPrompt: 'Select a content source to review its risk, check, and owner.',
  riskLabel: 'Review focus',
  reviewLabel: 'What to check',
  ownerLabel: 'Review owner',
  evidenceType: 'best-practice',
  sourceIds: sourceIds(
    'terms-of-use',
    'toolbox',
    'third-party-asset-vulnerabilities',
    'text-filtering',
  ),
} as const;

export const responsibilityItems = [
  {
    id: 'images',
    label: 'Images',
    risk: 'Unreviewed text, recognizable identity, provenance, or small background details.',
    review:
      'Inspect the full-resolution image, embedded text, source record, rights, and final in-experience crop.',
    owner: 'Art lead + release reviewer',
  },
  {
    id: 'decals',
    label: 'Decals',
    risk: 'A decal can carry text, symbols, or imagery that is easy to miss on the model using it.',
    review:
      'Open every referenced decal separately and confirm its source, content, and placement.',
    owner: 'Environment artist + release reviewer',
  },
  {
    id: 'meshes',
    label: 'Meshes',
    risk: 'Third-party geometry may include unfamiliar dependencies, textures, or a recognizable protected design.',
    review:
      'Inspect geometry, texture references, embedded assets, provenance, and the complete silhouette.',
    owner: '3D lead + rights owner',
  },
  {
    id: 'models',
    label: 'Models',
    risk: 'Descendants can include scripts, asset IDs, sounds, interfaces, hidden parts, or packages.',
    review:
      'Isolate the model, inspect its full hierarchy and dependencies, and keep only reviewed content.',
    owner: 'Technical lead + content reviewer',
  },
  {
    id: 'audio',
    label: 'Audio',
    risk: 'Rights, spoken content, lyrics, metadata, and the full recording may differ from a short preview.',
    review:
      'Listen from start to finish and verify the recording, license, metadata, and intended context.',
    owner: 'Audio lead + rights owner',
  },
  {
    id: 'animations',
    label: 'Animations',
    risk: 'Ownership, source rigs, motion context, and bundled references can be overlooked.',
    review:
      'Verify provenance, inspect the complete motion on the final rig, and check every referenced asset.',
    owner: 'Animation lead + release reviewer',
  },
  {
    id: 'ui',
    label: 'UI',
    risk: 'Interface text, icons, links, purchase claims, and imported art can create separate review needs.',
    review:
      'Read every state, test every destination, verify claims, and inspect all icons and background images.',
    owner: 'Product designer + compliance reviewer',
  },
  {
    id: 'thumbnails',
    label: 'Thumbnails',
    risk: 'Promotional art can overstate the experience or contain text and imagery not reviewed in context.',
    review:
      'Check accuracy, rights, readable text, audience context, and every exported size before upload.',
    owner: 'Marketing artist + experience owner',
  },
  {
    id: 'icons',
    label: 'Icons',
    risk: 'A small crop can preserve a recognizable identity, symbol, or misleading visual claim.',
    review:
      'Inspect the uncropped source and final crop at every display size, including app-scale previews.',
    owner: 'Brand designer + release reviewer',
  },
  {
    id: 'plugins',
    label: 'Plugins',
    risk: 'Editor tools can introduce code, dependencies, settings, or content changes beyond the visible task.',
    review:
      'Verify the publisher and permissions, inspect changes, and review generated or inserted instances.',
    owner: 'Technical lead',
  },
  {
    id: 'user-input',
    label: 'User input',
    risk: 'Players may expose unsafe text, personal information, or reconstructed content to other users.',
    review:
      'Verify filtering, visibility, reporting, removal, permissions, and an appropriate audit trail.',
    owner: 'Engineering lead + safety owner',
  },
  {
    id: 'contractor-work',
    label: 'Contractor work',
    risk: 'Delivery does not by itself establish ownership, permission, or the provenance of every dependency.',
    review:
      'Keep the agreement, source files, license terms, asset list, and written confirmation of third-party materials.',
    owner: 'Producer + rights owner',
  },
  {
    id: 'ai-generated-content',
    label: 'AI-generated content',
    risk: 'Generated details may include pseudo-text, identity cues, watermarks, ambiguous context, or familiar designs.',
    review:
      'Inspect at full resolution, replace generated typography, verify rights, and review every edge and background detail.',
    owner: 'Art lead + release reviewer',
  },
] as const satisfies readonly ResponsibilityItem[];

export type ResponsibilityItemId = (typeof responsibilityItems)[number]['id'];
