import { ArrowRight, Check, Layers3, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';

import { useLocale } from '../i18n/LocaleContext';

const STORAGE_KEY = 'before-you-publish-field-deck-v1';

const toneStyles: Record<string, string> = {
  risky: 'border-risk-red/55 bg-risk-red/16 text-ink',
  review: 'border-risk-yellow bg-risk-yellow/28 text-ink',
  safe: 'border-risk-green bg-risk-lime/72 text-ink',
};

const defaultToneStyle = 'border-white/12 bg-white/8 text-white';

function getToneStyle(tone: string): string {
  return toneStyles[tone] ?? defaultToneStyle;
}

function readCollectedIds(validIds: ReadonlySet<string>): ReadonlySet<string> {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');

    if (!Array.isArray(parsed)) return new Set<string>();

    return new Set(parsed.filter((id): id is string => typeof id === 'string' && validIds.has(id)));
  } catch {
    return new Set<string>();
  }
}

function storeCollectedIds(ids: ReadonlySet<string>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // Progress still works for the current session when storage is unavailable.
  }
}

export function ReleaseSimulator() {
  const { content } = useLocale();
  const copy = content.page.releaseSimulator;
  const decisions = copy.decisions;
  const validDecisionIds = useMemo(
    () => new Set(decisions.map((decision) => decision.id)),
    [decisions],
  );
  const [activeDecisionId, setActiveDecisionId] = useState(decisions[0]?.id ?? '');
  const [selectedOptionIds, setSelectedOptionIds] = useState<Readonly<Record<string, string>>>({});
  const [collectedIds, setCollectedIds] = useState<ReadonlySet<string>>(() =>
    readCollectedIds(validDecisionIds),
  );
  const activeDecision =
    decisions.find((decision) => decision.id === activeDecisionId) ?? decisions[0];
  const selectedOption = activeDecision?.options.find(
    (option) => option.id === selectedOptionIds[activeDecision.id],
  );
  const complete = collectedIds.size === decisions.length;
  const nextDecision = activeDecision
    ? (decisions.find(
        (decision) => decision.id !== activeDecision.id && !collectedIds.has(decision.id),
      ) ?? decisions[(decisions.indexOf(activeDecision) + 1) % decisions.length])
    : undefined;

  if (!activeDecision) return null;
  const currentDecision = activeDecision;

  function selectOption(optionId: string) {
    setSelectedOptionIds((current) => ({ ...current, [currentDecision.id]: optionId }));

    if (optionId !== currentDecision.correctOptionId) return;

    setCollectedIds((current) => {
      const next = new Set(current);
      next.add(currentDecision.id);
      storeCollectedIds(next);
      return next;
    });
  }

  function resetDeck() {
    const empty = new Set<string>();
    setCollectedIds(empty);
    setSelectedOptionIds({});
    setActiveDecisionId(decisions[0]?.id ?? '');
    storeCollectedIds(empty);
  }

  return (
    <section
      data-release-simulator
      data-collected-count={collectedIds.size}
      className="overflow-hidden rounded-[2rem] border border-ink/10 bg-[#203129] text-white shadow-[0_24px_65px_rgba(27,44,36,.2)]"
      aria-labelledby="release-simulator-title"
    >
      <header className="grid gap-6 border-b border-white/12 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-xs font-extrabold tracking-[0.1em] text-risk-green uppercase">
            {copy.eyebrow}
          </p>
          <h3
            id="release-simulator-title"
            className="mt-3 max-w-[18ch] text-3xl leading-[0.95] font-black tracking-[-0.045em] sm:text-4xl"
          >
            {copy.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68">{copy.intro}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-white/12 bg-white/7 px-4 py-3">
            <p className="text-[0.65rem] font-extrabold tracking-[0.08em] text-white/48 uppercase">
              {copy.deckLabel}
            </p>
            <p className="mt-1 text-sm font-black">
              {collectedIds.size}/{decisions.length} {copy.collectedLabel}
            </p>
          </div>
          <button
            type="button"
            data-deck-reset
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/12 bg-white/7 px-4 text-sm font-bold transition-colors hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-35"
            disabled={collectedIds.size === 0}
            onClick={resetDeck}
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            {copy.resetLabel}
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[minmax(15rem,0.36fr)_minmax(0,0.64fr)]">
        <div className="border-b border-white/12 bg-black/8 p-4 sm:p-5 lg:border-r lg:border-b-0">
          <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {decisions.map((decision, index) => {
              const active = decision.id === activeDecision.id;
              const collected = collectedIds.has(decision.id);

              return (
                <li key={decision.id}>
                  <button
                    type="button"
                    data-decision-card={decision.id}
                    data-card-collected={collected}
                    className={`group flex min-h-28 w-full flex-col rounded-2xl border p-4 text-left transition-[transform,background-color,border-color] hover:-translate-y-0.5 ${
                      active
                        ? 'border-risk-green bg-risk-green/14'
                        : collected
                          ? 'border-risk-green/32 bg-white/8'
                          : 'border-white/10 bg-white/5 hover:bg-white/9'
                    }`}
                    aria-pressed={active}
                    onClick={() => {
                      setActiveDecisionId(decision.id);
                    }}
                  >
                    <span className="flex w-full items-start justify-between gap-3">
                      <span className="text-[0.62rem] font-extrabold tracking-[0.07em] text-white/48 uppercase">
                        {decision.cardLabel}
                      </span>
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full border ${
                          collected
                            ? 'border-risk-green bg-risk-green text-ink'
                            : 'border-white/14 text-white/58'
                        }`}
                        aria-hidden="true"
                      >
                        {collected ? (
                          <Check className="size-3.5" strokeWidth={3} />
                        ) : (
                          <span className="text-[0.62rem] font-black">{index + 1}</span>
                        )}
                      </span>
                    </span>
                    <span className="mt-auto pt-4 text-base leading-5 font-black">
                      {decision.title}
                    </span>
                    <span className="mt-1 text-xs font-semibold text-white/48">
                      {collected ? copy.outcomeLabels.safe : copy.availableLabel}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="p-5 sm:p-7 lg:p-8">
          <div className="flex items-center gap-3 text-xs font-extrabold tracking-[0.08em] text-risk-green uppercase">
            <Layers3 aria-hidden="true" className="size-4" />
            {copy.chooseLabel}
          </div>
          <h4 className="mt-5 max-w-[28ch] text-2xl leading-tight font-black tracking-[-0.035em] sm:text-3xl">
            {activeDecision.prompt}
          </h4>

          <div className="mt-7 grid gap-3" role="group" aria-label={copy.chooseLabel}>
            {activeDecision.options.map((option, index) => {
              const selected = option.id === selectedOption?.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  data-decision-option={option.id}
                  data-option-tone={option.tone}
                  className={`grid min-h-16 grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border p-4 text-left text-sm leading-5 font-semibold transition-[background-color,border-color,transform] hover:translate-x-1 sm:p-5 ${
                    selected
                      ? getToneStyle(option.tone)
                      : 'border-white/12 bg-white/6 text-white hover:bg-white/10'
                  }`}
                  aria-pressed={selected}
                  onClick={() => {
                    selectOption(option.id);
                  }}
                >
                  <span
                    className={`grid size-8 place-items-center rounded-full border text-xs font-black ${
                      selected
                        ? 'border-ink/20 bg-white/55 text-ink'
                        : 'border-white/16 text-white/58'
                    }`}
                    aria-hidden="true"
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 min-h-28">
            {selectedOption ? (
              <div
                className={`rounded-2xl border p-5 ${getToneStyle(selectedOption.tone)}`}
                role="status"
                aria-live="polite"
              >
                <p className="text-xs font-extrabold tracking-[0.07em] uppercase">
                  {copy.outcomeLabels[selectedOption.tone as keyof typeof copy.outcomeLabels]}
                </p>
                <p className="mt-2 text-sm leading-6">{selectedOption.result}</p>
                {selectedOption.id === activeDecision.correctOptionId &&
                nextDecision &&
                !complete ? (
                  <button
                    type="button"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink px-4 text-sm font-black text-white transition-transform hover:translate-x-1"
                    onClick={() => {
                      setActiveDecisionId(nextDecision.id);
                    }}
                  >
                    {copy.nextLabel}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {complete ? (
        <footer
          data-deck-complete
          className="border-t border-risk-green/25 bg-risk-green/14 p-5 sm:p-7"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-risk-green text-ink">
              <Check aria-hidden="true" className="size-5" strokeWidth={3} />
            </span>
            <div>
              <p className="text-lg font-black tracking-[-0.02em]">{copy.completeTitle}</p>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-white/68">{copy.completeBody}</p>
            </div>
          </div>
        </footer>
      ) : null}
    </section>
  );
}
