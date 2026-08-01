import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

import { useLocale } from '../../i18n/LocaleContext';
import type { ImageSlotData, Scenario, ScenarioComparison, Source } from '../../types/content';
import { EvidenceBadge } from '../layout/EvidenceBadge';
import { SourceLink } from '../sources/SourceLink';
import { BeforeAfter } from './BeforeAfter';
import { ImageSlot } from './ImageSlot';

interface ScenarioCardProps {
  scenario: Scenario;
  sources: readonly Source[];
  imageSlots: readonly ImageSlotData[];
  featured?: boolean;
}

export function ScenarioCard({
  scenario,
  sources,
  imageSlots,
  featured = false,
}: ScenarioCardProps) {
  const { content } = useLocale();
  const uiCopy = content.ui.copy;
  const [expanded, setExpanded] = useState(false);
  const regionId = useId();
  const relatedSources = sources.filter((source) => scenario.sourceIds.includes(source.id));
  const relatedSlots = imageSlots.filter(
    (slot) => scenario.imageSlotIds?.includes(slot.id) ?? false,
  );
  const comparisonLabels = {
    lowerRisk: content.ui.riskBandLabels['lower-risk'],
    needsReview: content.ui.auditAnswerLabels['needs-review'],
    highRisk: content.ui.riskBandLabels['high-risk'],
  } satisfies Record<keyof ScenarioComparison, string>;
  const comparisonEntries = scenario.comparison
    ? ([
        [comparisonLabels.lowerRisk, scenario.comparison.lowerRisk],
        [comparisonLabels.needsReview, scenario.comparison.needsReview],
        [comparisonLabels.highRisk, scenario.comparison.highRisk],
      ] as const)
    : [];

  return (
    <article
      data-scenario-id={scenario.id}
      className={`overflow-hidden rounded-[1.75rem] border border-ink/9 bg-white/78 text-ink shadow-[0_16px_42px_rgba(55,66,58,.1)] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-extrabold tracking-[0.05em] text-ink/70 uppercase">
            <span className="grid size-9 place-items-center rounded-full bg-paper text-ink">
              {scenario.letter}
            </span>
            <span className="hidden sm:inline">{scenario.eyebrow}</span>
          </div>
          <EvidenceBadge type={scenario.evidenceType} />
        </div>
        <h3 className="mt-7 max-w-[18ch] text-3xl leading-[1] font-black tracking-[-0.04em] sm:text-4xl">
          {scenario.title}
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/70">{scenario.summary}</p>
        <button
          type="button"
          className="mt-7 flex min-h-12 w-full items-center justify-between gap-4 rounded-xl bg-paper/72 px-4 text-left text-sm font-extrabold transition-colors hover:bg-paper"
          aria-expanded={expanded}
          aria-controls={regionId}
          onClick={() => {
            setExpanded((current) => !current);
          }}
        >
          <span>{expanded ? uiCopy.hideDetails : uiCopy.showDetails}</span>
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div id={regionId} hidden={!expanded}>
        <div className="grid gap-3 border-t border-ink/8 p-4 sm:p-5 md:grid-cols-2">
          {[
            [uiCopy.scenarioFields.assumption, scenario.assumption],
            [uiCopy.scenarioFields.risk, scenario.whatCanGoWrong],
            [uiCopy.scenarioFields.example, scenario.example],
            [uiCopy.scenarioFields.saferMove, scenario.saferMove],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-ink/8 bg-paper/55 p-5 md:p-6">
              <p className="text-xs font-extrabold tracking-[0.055em] text-ink/70 uppercase">
                {label}
              </p>
              <p className="mt-3 text-sm leading-6 text-ink/78">{value}</p>
            </div>
          ))}
        </div>

        {scenario.inspectionPoints?.length ? (
          <ul className="grid gap-2 border-t border-ink/8 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {scenario.inspectionPoints.map((point, index) => (
              <li key={point} className="flex gap-3 rounded-xl bg-paper/72 p-4 text-sm leading-5">
                <span className="text-xs font-black" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        {scenario.workflow?.length ? (
          <ol className="m-4 overflow-hidden rounded-2xl bg-ink text-white">
            {scenario.workflow.map((step, index) => (
              <li
                key={step}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/18 p-5 last:border-b-0"
              >
                <span className="text-xs font-black text-risk-green">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm leading-6">{step}</span>
              </li>
            ))}
          </ol>
        ) : null}

        {scenario.comparison ? (
          <div className="grid gap-3 border-t border-ink/8 p-4 sm:grid-cols-3">
            {comparisonEntries.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-ink/8 bg-paper/55 p-5">
                <p className="text-xs font-extrabold tracking-[0.055em] text-ink/70 uppercase">
                  {label}
                </p>
                <p className="mt-3 whitespace-pre-line text-sm leading-6 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        ) : null}

        {scenario.imagePresentation === 'comparison' &&
        relatedSlots.length === 2 &&
        relatedSlots[0] &&
        relatedSlots[1] ? (
          <div className="border-t border-ink/8 p-5 md:p-7">
            <BeforeAfter before={relatedSlots[0]} after={relatedSlots[1]} />
          </div>
        ) : relatedSlots.length > 1 ? (
          <div className="grid gap-4 border-t border-ink/8 p-5 sm:grid-cols-2 md:p-7">
            {relatedSlots.map((slot) => (
              <ImageSlot key={slot.id} slot={slot} />
            ))}
          </div>
        ) : relatedSlots[0] ? (
          <div className="max-w-2xl border-t border-ink/8 p-5 md:p-7">
            <ImageSlot slot={relatedSlots[0]} />
          </div>
        ) : null}

        {relatedSources.length ? (
          <footer className="flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/8 bg-paper/38 px-5 py-4 md:px-7">
            {relatedSources.map((source) => (
              <SourceLink key={source.id} source={source} />
            ))}
          </footer>
        ) : null}
      </div>
    </article>
  );
}
