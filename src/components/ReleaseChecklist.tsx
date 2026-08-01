import { Check, RotateCcw } from 'lucide-react';
import { useId, useState } from 'react';

import { useLocale } from '../i18n/LocaleContext';
import type { ReleaseChecklistItem } from '../types/content';
import { EvidenceBadge } from './layout/EvidenceBadge';

export function ReleaseChecklist() {
  const { content } = useLocale();
  const releaseChecklistContent = content.release.content;
  const releaseChecklistItems = content.release.items;
  const [checkedIds, setCheckedIds] = useState<ReadonlySet<ReleaseChecklistItem['id']>>(
    () => new Set<ReleaseChecklistItem['id']>(),
  );
  const titleId = useId();
  const checkedCount = checkedIds.size;
  const complete = checkedCount === releaseChecklistItems.length;

  function toggleItem(itemId: ReleaseChecklistItem['id']) {
    setCheckedIds((current) => {
      const next = new Set(current);

      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }

      return next;
    });
  }

  return (
    <section
      className="overflow-hidden rounded-[2rem] border border-ink/9 bg-white/78 text-ink shadow-[0_20px_55px_rgba(55,66,58,.11)]"
      aria-labelledby={titleId}
    >
      <header className="grid gap-6 border-b border-ink/8 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div>
          <p className="text-sm font-extrabold tracking-[0.06em] text-ink/70 uppercase">
            {releaseChecklistContent.eyebrow}
          </p>
          <h3
            id={titleId}
            className="mt-4 max-w-[14ch] text-4xl leading-[0.95] font-black tracking-[-0.05em] sm:text-5xl"
          >
            {releaseChecklistContent.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink/70">
            {releaseChecklistContent.intro}
          </p>
        </div>
        <EvidenceBadge type={releaseChecklistContent.evidenceType} />
      </header>

      <div className="border-b border-ink/8 bg-paper/35 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-extrabold text-ink/70">
            {checkedCount}/{releaseChecklistItems.length} {releaseChecklistContent.progressUnit}
          </p>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-ink/9 bg-white/72 px-4 text-sm font-bold transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
            disabled={checkedCount === 0}
            onClick={() => {
              setCheckedIds(new Set<ReleaseChecklistItem['id']>());
            }}
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            {releaseChecklistContent.resetLabel}
          </button>
        </div>
        <progress
          className="mt-4 h-2 w-full accent-ink"
          value={checkedCount}
          max={releaseChecklistItems.length}
          aria-label={releaseChecklistContent.progressLabel}
        />
      </div>

      <fieldset aria-labelledby={titleId}>
        <legend className="sr-only">{releaseChecklistContent.title}</legend>
        <div className="grid gap-3 p-4 md:grid-cols-2 sm:p-6">
          {releaseChecklistItems.map((item, index) => {
            const checked = checkedIds.has(item.id);

            return (
              <label
                key={item.id}
                className={`group grid min-h-24 grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-3 rounded-2xl border p-4 transition-colors sm:p-5 ${
                  checked
                    ? 'border-risk-green bg-risk-lime'
                    : 'border-ink/8 bg-paper/48 hover:bg-paper/78'
                }`}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  onChange={() => {
                    toggleItem(item.id);
                  }}
                />
                <span
                  className={`grid size-10 place-items-center rounded-xl border transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ink ${
                    checked
                      ? 'border-ink bg-ink text-risk-green'
                      : 'border-ink/45 bg-white text-transparent'
                  }`}
                  aria-hidden="true"
                >
                  <Check className="size-5" strokeWidth={3} />
                </span>
                <span>
                  <span className="block text-sm leading-6 font-semibold">{item.label}</span>
                  <span className="mt-2 block text-xs font-bold opacity-70">
                    {String(index + 1).padStart(2, '0')} ·{' '}
                    {checked
                      ? releaseChecklistContent.checkedLabel
                      : releaseChecklistContent.uncheckedLabel}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <footer className="grid gap-4 border-t border-ink/8 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.5fr)]">
        <p
          className={`text-lg leading-7 font-black tracking-[-0.02em] ${
            complete ? 'text-ink' : 'text-ink/35'
          }`}
          aria-live="polite"
        >
          {complete ? releaseChecklistContent.result : null}
        </p>
        <p className="text-xs leading-5 text-ink/70">{releaseChecklistContent.disclaimer}</p>
      </footer>
    </section>
  );
}
