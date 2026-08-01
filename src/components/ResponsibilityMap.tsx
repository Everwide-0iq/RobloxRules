import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { useLocale } from '../i18n/LocaleContext';
import type { ResponsibilityItem } from '../types/content';
import { EvidenceBadge } from './layout/EvidenceBadge';
import { SourceLink } from './sources/SourceLink';

export function ResponsibilityMap() {
  const { content } = useLocale();
  const responsibilityContent = content.responsibility.content;
  const responsibilityItems = content.responsibility.items;
  const sources = content.sources;
  const [selectedItemId, setSelectedItemId] = useState<ResponsibilityItem['id']>(
    () => responsibilityItems[0]?.id ?? '',
  );
  const instanceId = useId();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedItem =
    responsibilityItems.find((item) => item.id === selectedItemId) ?? responsibilityItems[0];
  const relatedSources = responsibilityContent.sourceIds.flatMap((sourceId) => {
    const source = sources.find((candidate) => candidate.id === sourceId);
    return source ? [source] : [];
  });
  const panelId = `${instanceId}-responsibility-panel`;

  if (!selectedItem) return null;

  function selectByIndex(index: number) {
    const item = responsibilityItems[index];

    if (!item) {
      return;
    }

    setSelectedItemId(item.id);
    buttonRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % responsibilityItems.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + responsibilityItems.length) % responsibilityItems.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = responsibilityItems.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectByIndex(nextIndex);
  }

  return (
    <section
      className="overflow-hidden rounded-[2rem] border border-ink/9 bg-white/78 text-ink shadow-[0_20px_55px_rgba(55,66,58,.11)]"
      aria-describedby={`${instanceId}-responsibility-prompt`}
    >
      <div className="grid border-b border-ink/8 lg:grid-cols-[minmax(0,0.88fr)_minmax(20rem,1.12fr)]">
        <div className="border-b border-ink/8 bg-paper/46 p-5 sm:p-7 lg:border-r lg:border-b-0">
          <p
            id={`${instanceId}-responsibility-prompt`}
            className="max-w-xl text-sm leading-6 text-ink/70"
          >
            {responsibilityContent.detailPrompt}
          </p>

          <div
            className="mt-6 flex snap-x gap-2.5 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0"
            role="tablist"
            aria-orientation="horizontal"
          >
            {responsibilityItems.map((item, index) => {
              const selected = item.id === selectedItemId;
              const tabId = `${instanceId}-responsibility-${item.id}`;

              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    buttonRefs.current[index] = node;
                  }}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  className={`min-h-12 min-w-[9rem] snap-start rounded-xl border px-3 py-3 text-left text-sm font-bold transition-[background-color,color,transform] focus-visible:z-10 sm:min-w-0 ${
                    selected
                      ? 'border-ink bg-ink text-white shadow-sm'
                      : 'border-ink/8 bg-white/72 hover:-translate-y-0.5 hover:bg-white'
                  }`}
                  onClick={() => {
                    setSelectedItemId(item.id);
                  }}
                  onKeyDown={(event) => {
                    handleKeyDown(event, index);
                  }}
                >
                  <span
                    className={`mr-2 text-xs font-black ${
                      selected ? 'text-risk-green' : 'text-ink/70'
                    }`}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${instanceId}-responsibility-${selectedItem.id}`}
          tabIndex={0}
          className="relative p-6 sm:p-9"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/8 pb-4">
            <span className="text-sm font-extrabold tracking-[0.06em] uppercase">
              {responsibilityContent.centerLabel}
            </span>
            <EvidenceBadge type={responsibilityContent.evidenceType} />
          </div>

          <h3 className="mt-8 text-4xl leading-none font-black tracking-[-0.045em] sm:text-5xl">
            {selectedItem.label}
          </h3>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink/8 bg-paper/62 p-4 sm:p-5">
              <dt className="text-xs font-extrabold tracking-[0.06em] text-ink/70 uppercase">
                {responsibilityContent.riskLabel}
              </dt>
              <dd className="mt-3 text-sm leading-6 text-ink/72">{selectedItem.risk}</dd>
            </div>
            <div className="rounded-2xl border border-ink/8 bg-paper/62 p-4 sm:p-5">
              <dt className="text-xs font-extrabold tracking-[0.06em] text-ink/70 uppercase">
                {responsibilityContent.ownerLabel}
              </dt>
              <dd className="mt-3 text-sm leading-6 font-semibold">{selectedItem.owner}</dd>
            </div>
            <div className="rounded-2xl border border-ink/8 bg-paper/62 p-4 sm:col-span-2 sm:p-5">
              <dt className="text-xs font-extrabold tracking-[0.06em] text-ink/70 uppercase">
                {responsibilityContent.reviewLabel}
              </dt>
              <dd className="mt-3 max-w-2xl text-sm leading-6 text-ink/72">
                {selectedItem.review}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {relatedSources.length > 0 ? (
        <footer className="flex flex-wrap gap-x-6 gap-y-2 bg-paper/35 px-5 py-4 sm:px-7">
          {relatedSources.map((source) => (
            <SourceLink key={source.id} source={source} />
          ))}
        </footer>
      ) : null}
    </section>
  );
}
