import { LifeBuoy, PackageCheck, Search, ShieldAlert } from 'lucide-react';

import { useRiskJourney } from '../hooks/useRiskJourney';
import { useLocale } from '../i18n/LocaleContext';

const stepIcons = [PackageCheck, Search, ShieldAlert, LifeBuoy] as const;

export function ReleaseQuest() {
  const { content } = useLocale();
  const { activeBand } = useRiskJourney();
  const steps = content.page.journeySteps;
  const copy = content.page.releaseQuest;
  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.band === activeBand),
  );

  return (
    <section
      data-release-quest
      className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/76 p-5 shadow-[0_18px_50px_rgba(55,66,58,.1)] backdrop-blur-sm sm:p-7"
      aria-labelledby="release-quest-title"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-20 size-64 rounded-full bg-risk-lime/45 blur-3xl"
      />
      <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(14rem,0.34fr)] md:items-end">
        <div>
          <p className="text-xs font-extrabold tracking-[0.1em] text-risk-crimson uppercase">
            {copy.eyebrow}
          </p>
          <h2
            id="release-quest-title"
            className="mt-3 max-w-[22ch] text-2xl leading-tight font-black tracking-[-0.04em] sm:text-3xl"
          >
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/68">{copy.intro}</p>
        </div>
        <div className="rounded-2xl border border-ink/8 bg-paper/72 p-4">
          <div className="flex items-center justify-between gap-4 text-xs font-extrabold text-ink/68">
            <span>{copy.currentLabel}</span>
            <span>
              {activeIndex + 1}/{steps.length}
            </span>
          </div>
          <progress
            className="mt-3 h-2 w-full"
            value={activeIndex + 1}
            max={steps.length}
            aria-label={copy.exploredLabel}
          />
          <p className="mt-2 text-xs font-bold text-ink/58">{copy.exploredLabel}</p>
        </div>
      </div>

      <ol className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = stepIcons[index] ?? Search;
          const completed = index < activeIndex;
          const active = index === activeIndex;
          const status = completed
            ? copy.completedLabel
            : active
              ? copy.activeLabel
              : copy.upcomingLabel;

          return (
            <li key={step.band}>
              <a
                data-quest-step={step.band}
                data-quest-state={completed ? 'completed' : active ? 'active' : 'upcoming'}
                className={`group flex h-full min-h-44 flex-col rounded-2xl border p-4 transition-[transform,background-color,border-color,box-shadow] hover:-translate-y-1 focus-visible:-translate-y-1 sm:p-5 ${
                  active
                    ? 'border-ink bg-ink text-white shadow-[0_14px_30px_rgba(27,44,36,.18)]'
                    : completed
                      ? 'border-risk-green bg-risk-lime/72 text-ink'
                      : 'border-ink/8 bg-paper/68 text-ink hover:border-ink/18 hover:bg-white/72'
                }`}
                href={`#${step.sectionId}`}
                aria-current={active ? 'step' : undefined}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`grid size-10 place-items-center rounded-xl ${
                      active ? 'bg-white/12 text-risk-green' : 'bg-white/72 text-ink'
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[0.64rem] font-extrabold tracking-[0.04em] uppercase ${
                      active ? 'bg-risk-green text-ink' : 'bg-white/76 text-ink/62'
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <div className="mt-auto pt-6">
                  <p className={`text-xs font-black ${active ? 'text-white/55' : 'text-ink/48'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 text-xl font-black tracking-[-0.03em]">{step.label}</h3>
                  <p
                    className={`mt-2 text-sm leading-5 ${active ? 'text-white/68' : 'text-ink/64'}`}
                  >
                    {step.detail}
                  </p>
                </div>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
