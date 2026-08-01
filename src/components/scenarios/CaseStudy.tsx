import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

import { useLocale } from '../../i18n/LocaleContext';
import type { CaseStudyData, ImageSlotData, Source } from '../../types/content';
import { EvidenceBadge } from '../layout/EvidenceBadge';
import { SourceLink } from '../sources/SourceLink';
import { ImageSlot } from './ImageSlot';

interface CaseStudyProps {
  caseStudy: CaseStudyData;
  sources: readonly Source[];
  imageSlots: readonly ImageSlotData[];
}

export function CaseStudy({ caseStudy, sources, imageSlots }: CaseStudyProps) {
  const { content } = useLocale();
  const uiCopy = content.ui.copy;
  const [expanded, setExpanded] = useState(false);
  const regionId = useId();
  const relatedSources = sources.filter((source) => caseStudy.sourceIds.includes(source.id));
  const imageSlot = imageSlots.find((slot) => slot.id === caseStudy.imageSlotId);

  const fields = [
    [uiCopy.caseFields.context, caseStudy.context],
    [uiCopy.caseFields.added, caseStudy.whatWasAdded],
    [uiCopy.caseFields.harmless, caseStudy.whySeemedHarmless],
    [uiCopy.caseFields.happened, caseStudy.whatHappened],
    [uiCopy.caseFields.changed, caseStudy.whatChanged],
    [uiCopy.caseFields.prevention, caseStudy.prevention],
  ] as const;

  return (
    <article className="mb-4 rounded-[1.75rem] border border-white/10 bg-white/6 p-5 text-white shadow-[0_16px_42px_rgba(8,18,13,.12)] sm:p-7">
      <div className="grid gap-6 md:grid-cols-[6rem_minmax(0,1fr)_auto] md:items-start">
        <p className="w-fit rounded-xl bg-white/9 px-3 py-2 text-xs font-extrabold tracking-[0.05em] text-white uppercase">
          {uiCopy.caseLabel} {caseStudy.index}
        </p>
        <div>
          <h3 className="max-w-[20ch] text-3xl leading-none font-black tracking-[-0.04em] sm:text-4xl">
            {caseStudy.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68">{caseStudy.context}</p>
        </div>
        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
          <EvidenceBadge type={caseStudy.evidenceType} inverse />
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/7 px-4 text-sm font-bold transition-colors hover:bg-white/12"
            aria-expanded={expanded}
            aria-controls={regionId}
            onClick={() => {
              setExpanded((current) => !current);
            }}
          >
            {expanded ? uiCopy.hideDetails : uiCopy.showDetails}
            <ChevronDown
              aria-hidden="true"
              className={`size-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      <div id={regionId} hidden={!expanded} className="mt-7">
        <div className="grid gap-3 md:grid-cols-2">
          {fields.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-5">
              <p className="text-xs font-extrabold tracking-[0.055em] text-white uppercase">
                {label}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/76">{value}</p>
            </div>
          ))}
        </div>

        <p className="mt-3 rounded-2xl border border-white/10 bg-white/8 p-5 text-sm leading-6 text-white/76">
          {caseStudy.disclaimer}
        </p>

        {imageSlot ? <ImageSlot className="mt-6 max-w-xl" slot={imageSlot} /> : null}

        {relatedSources.length ? (
          <footer className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {relatedSources.map((source) => (
              <SourceLink key={source.id} source={source} inverse />
            ))}
          </footer>
        ) : null}
      </div>
    </article>
  );
}
