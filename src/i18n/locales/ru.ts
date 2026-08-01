import type { GuideContent } from './en';
import { ruCore } from './ru-core';
import { ruRisks } from './ru-risks';
import { ruSupport } from './ru-support';

export const ruContent = {
  ...ruCore,
  ...ruRisks,
  ...ruSupport,
} satisfies GuideContent;
