import { BadgeCheck, ChevronDown } from 'lucide-react';

import { useLocale } from '../../i18n/LocaleContext';
import type { PolicyGroup, Source } from '../../types/content';

interface SourcesDirectoryProps {
  sources: readonly Source[];
}

const groupOrder: readonly PolicyGroup[] = [
  'platform-wide-standards',
  'restricted-content',
  'content-maturity',
  'advertising',
  'intellectual-property',
  'monetization',
  'user-generated-content',
  'moderation-and-appeals',
  'asset-safety',
  'generative-ai',
];

export function SourcesDirectory({ sources }: SourcesDirectoryProps) {
  const { content, locale } = useLocale();
  const sourceGroupLabels = content.visuals.sourceGroupLabels;
  const uiCopy = content.ui.copy;
  const pluralRules = new Intl.PluralRules(locale);

  return (
    <div className="grid gap-3">
      {groupOrder.map((group) => {
        const groupedSources = sources.filter((source) => source.policyGroup === group);
        if (!groupedSources.length) return null;

        return (
          <details
            key={group}
            className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 focus-within:ring-3 focus-within:ring-risk-yellow focus-within:ring-inset open:bg-white/7"
          >
            <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 p-5 focus-visible:outline-none sm:px-6 [&::-webkit-details-marker]:hidden">
              <h3
                id={`source-group-${group}`}
                className="text-xl font-black tracking-[-0.03em] text-white sm:text-2xl"
              >
                {sourceGroupLabels[group]}
              </h3>
              <span className="ml-auto text-xs font-bold text-white/72">
                {groupedSources.length}{' '}
                {pluralRules.select(groupedSources.length) === 'one'
                  ? uiCopy.sourceSingular
                  : pluralRules.select(groupedSources.length) === 'few'
                    ? uiCopy.sourceFew
                    : uiCopy.sourcePlural}
              </span>
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="grid gap-3 border-t border-white/8 p-4 md:grid-cols-2 sm:p-5">
              {groupedSources.map((source) => (
                <article
                  key={source.id}
                  className="flex min-h-60 flex-col justify-between rounded-2xl border border-white/8 bg-[#13221c]/44 p-5 sm:p-6"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-extrabold tracking-[0.05em] text-risk-green uppercase">
                      <BadgeCheck aria-hidden="true" className="size-3.5" />
                      {uiCopy.officialSource}
                    </div>
                    <h4 className="mt-5 max-w-[22ch] text-xl font-black tracking-[-0.025em] text-white">
                      {source.title}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-white/72">{source.description}</p>
                  </div>
                  <div className="mt-7 flex items-end justify-between gap-4 border-t border-white/16 pt-4">
                    <p className="text-xs leading-5 font-semibold text-white/72">
                      {uiCopy.sourceChecked}
                      <br />
                      {source.lastChecked}
                    </p>
                    <a
                      className="inline-flex min-h-11 items-center border-b border-risk-green text-sm font-bold text-risk-green hover:text-white"
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {uiCopy.viewOfficialSource}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}
