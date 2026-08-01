import { ArrowDown, ArrowRight } from 'lucide-react';

import { useLocale } from '../../i18n/LocaleContext';
import type { ImageSlotData } from '../../types/content';
import { ImageSlot } from './ImageSlot';

interface BeforeAfterProps {
  before: ImageSlotData;
  after: ImageSlotData;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfter({ before, after, beforeLabel, afterLabel }: BeforeAfterProps) {
  const { content } = useLocale();
  const resolvedBeforeLabel = beforeLabel ?? content.ui.copy.riskyExample;
  const resolvedAfterLabel = afterLabel ?? content.ui.copy.saferVersion;

  return (
    <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)]">
      <div>
        <p className="mb-2 text-xs font-extrabold tracking-[0.055em] text-ink/70 uppercase">
          {resolvedBeforeLabel}
        </p>
        <ImageSlot slot={before} />
      </div>
      <div
        className="grid size-10 place-items-center justify-self-center rounded-full border border-ink/10 bg-white/62"
        aria-hidden="true"
      >
        <ArrowDown className="size-4 sm:hidden" />
        <ArrowRight className="hidden size-4 sm:block" />
      </div>
      <div>
        <p className="mb-2 text-xs font-extrabold tracking-[0.055em] text-ink/70 uppercase">
          {resolvedAfterLabel}
        </p>
        <ImageSlot slot={after} />
      </div>
    </div>
  );
}
