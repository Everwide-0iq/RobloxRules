import { ChevronDown, OctagonAlert } from 'lucide-react';
import { useId, useState } from 'react';

import { useLocale } from '../i18n/LocaleContext';
import type { HighRiskTopic, Source } from '../types/content';
import { EvidenceBadge } from './layout/EvidenceBadge';
import { SourceLink } from './sources/SourceLink';

interface HighRiskDirectoryProps {
  topics: readonly HighRiskTopic[];
  sources: readonly Source[];
}

function HighRiskRow({
  topic,
  sources,
  index,
}: {
  topic: HighRiskTopic;
  sources: readonly Source[];
  index: number;
}) {
  const { content } = useLocale();
  const uiCopy = content.ui.copy;
  const [expanded, setExpanded] = useState(false);
  const regionId = useId();
  const relatedSources = sources.filter((source) => topic.sourceIds.includes(source.id));

  const fields = [
    [uiCopy.highRiskFields.rule, topic.shortRule],
    [uiCopy.highRiskFields.why, topic.whyItMatters],
    [uiCopy.highRiskFields.example, topic.example],
    [uiCopy.highRiskFields.assumption, topic.mistakenAssumption],
    [uiCopy.highRiskFields.alternative, topic.saferAlternative],
  ] as const;

  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 text-white sm:px-5">
      <button
        type="button"
        className="grid min-h-20 w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 py-4 text-left sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-6"
        aria-expanded={expanded}
        aria-controls={regionId}
        onClick={() => {
          setExpanded((current) => !current);
        }}
      >
        <span className="grid size-9 place-items-center rounded-full bg-white/9 text-xs font-black text-white">
          {index + 1}
        </span>
        <span className="text-lg leading-tight font-black tracking-[-0.025em] sm:text-xl">
          {topic.title}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      <div id={regionId} hidden={!expanded} className="pb-6 sm:pl-[4.25rem]">
        <div className="grid gap-3 md:grid-cols-2">
          {fields.map(([label, value], fieldIndex) => (
            <div
              key={label}
              className={`rounded-2xl border border-white/10 bg-white/6 p-5 ${
                fieldIndex === fields.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              <p className="text-xs font-extrabold tracking-[0.055em] text-white uppercase">
                {label}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/88">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <EvidenceBadge type={topic.evidenceType} inverse />
          {relatedSources.map((source) => (
            <SourceLink key={source.id} source={source} inverse />
          ))}
        </div>
      </div>
    </article>
  );
}

export function HighRiskDirectory({ topics, sources }: HighRiskDirectoryProps) {
  const { content } = useLocale();

  return (
    <div>
      <div className="mb-5 flex items-center gap-3 text-sm font-extrabold tracking-[0.05em] text-white/88 uppercase">
        <OctagonAlert aria-hidden="true" className="size-4 text-risk-yellow" />
        {topics.length} {content.ui.copy.releaseBlockers}
      </div>
      <div className="grid gap-3">
        {topics.map((topic, index) => (
          <HighRiskRow key={topic.id} topic={topic} sources={sources} index={index} />
        ))}
      </div>
    </div>
  );
}
