import { BadgeCheck, BookOpenCheck, FlaskConical, ShieldCheck } from 'lucide-react';

import { useLocale } from '../../i18n/LocaleContext';
import type { EvidenceType } from '../../types/content';

interface EvidenceBadgeProps {
  type: EvidenceType;
  inverse?: boolean;
}

const iconByType = {
  'official-rule': BookOpenCheck,
  'practical-interpretation': FlaskConical,
  'real-case': BadgeCheck,
  'best-practice': ShieldCheck,
} as const;

export function EvidenceBadge({ type, inverse = false }: EvidenceBadgeProps) {
  const { content } = useLocale();
  const evidenceLabels = content.ui.evidenceLabels;
  const Icon = iconByType[type];

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 rounded-xl border px-3 py-1.5 text-[0.7rem] font-extrabold tracking-[0.055em] uppercase ${
        inverse ? 'border-white/20 bg-white/10 text-white' : 'border-ink/10 bg-white/68 text-ink/72'
      }`}
    >
      <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
      {evidenceLabels[type]}
    </span>
  );
}
