import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

import { useLocale } from '../i18n/LocaleContext';
import type { PolicyLayer } from '../types/content';
import { EvidenceBadge } from './layout/EvidenceBadge';
import { SourceLink } from './sources/SourceLink';

export function PolicyLayers() {
  const { content } = useLocale();
  const policyLayers = content.policies;
  const sources = content.sources;
  const [expandedId, setExpandedId] = useState<PolicyLayer['id']>(() => policyLayers[0]?.id ?? '');
  const instanceId = useId();

  return (
    <div className="relative isolate grid gap-3">
      {policyLayers.map((layer) => {
        const expanded = layer.id === expandedId;
        const triggerId = `${instanceId}-policy-trigger-${layer.id}`;
        const panelId = `${instanceId}-policy-panel-${layer.id}`;
        const relatedSources = layer.sourceIds.flatMap((sourceId) => {
          const source = sources.find((candidate) => candidate.id === sourceId);
          return source ? [source] : [];
        });

        return (
          <article
            key={layer.id}
            className={`relative overflow-hidden rounded-[1.5rem] border border-ink/9 text-ink transition-[transform,box-shadow] focus-within:ring-3 focus-within:ring-ink/65 focus-within:ring-inset ${
              expanded
                ? 'z-10 bg-white/88 shadow-[0_16px_38px_rgba(55,66,58,.11)]'
                : 'bg-white/58 hover:-translate-y-0.5 hover:bg-white/78'
            }`}
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                className="grid min-h-20 w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 p-4 text-left focus-visible:outline-none sm:grid-cols-[3rem_minmax(12rem,0.72fr)_minmax(12rem,1fr)_auto] sm:gap-5 sm:p-6"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => {
                  setExpandedId(layer.id);
                }}
              >
                <span
                  className="grid size-8 place-items-center rounded-full bg-paper text-xs font-black"
                  aria-hidden="true"
                >
                  {layer.index}
                </span>
                <span className="text-xl leading-tight font-black tracking-[-0.035em] sm:text-2xl">
                  {layer.title}
                </span>
                <span className="col-span-2 col-start-2 text-sm leading-6 text-ink/68 sm:col-span-1 sm:col-start-auto">
                  {layer.summary}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!expanded}
              className="border-t border-ink/8"
            >
              <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                <div>
                  <EvidenceBadge type={layer.evidenceType} />
                  <p className="mt-5 max-w-3xl text-base leading-7 text-ink/76">{layer.detail}</p>
                </div>

                {relatedSources.length > 0 ? (
                  <div className="flex flex-col items-start gap-1">
                    {relatedSources.map((source) => (
                      <SourceLink key={source.id} source={source} />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
