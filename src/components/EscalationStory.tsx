import { useEffect, useRef, useState } from 'react';

import { useLocale } from '../i18n/LocaleContext';

interface EscalationStoryProps {
  disclaimer: string;
}

export function EscalationStory({ disclaimer }: EscalationStoryProps) {
  const { content } = useLocale();
  const { escalationInterface, escalationSteps } = content.visuals;
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (!visible) return;
        const nextIndex = Number((visible.target as HTMLElement).dataset['stepIndex']);
        if (Number.isInteger(nextIndex)) setActiveStep(nextIndex);
      },
      { rootMargin: '-28% 0px -48% 0px', threshold: [0.25, 0.6] },
    );

    const elements = stepRefs.current;
    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const selected = escalationSteps[activeStep] ?? escalationSteps[0];
  if (!selected) return null;

  return (
    <div className="grid gap-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)]">
        <div className="story-sticky self-start lg:sticky lg:top-32">
          <div
            data-escalation-sticky
            className="relative aspect-square max-w-xl overflow-hidden rounded-[2rem] border border-ink/8 bg-ink p-6 text-white shadow-[0_20px_55px_rgba(55,66,58,.16)] sm:p-9"
          >
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-16 size-72 rounded-full bg-risk-green/18 blur-3xl"
            />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-extrabold tracking-[0.055em] text-risk-green uppercase">
                <span>{escalationInterface.scopeLabel}</span>
                <span>
                  {String(activeStep + 1).padStart(2, '0')} /{' '}
                  {String(escalationSteps.length).padStart(2, '0')}
                </span>
              </div>
              <div>
                <p className="max-w-[14ch] text-4xl leading-[0.9] font-black tracking-[-0.05em] sm:text-6xl">
                  {selected.label}
                </p>
                <p className="mt-5 max-w-md text-base leading-7 text-white/74">{selected.detail}</p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/12">
                <div
                  className="h-full origin-left bg-risk-green transition-transform duration-500"
                  style={{
                    transform: `scaleX(${String((activeStep + 1) / escalationSteps.length)})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <ol className="grid gap-4">
          {escalationSteps.map((step, index) => (
            <li
              key={step.id}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              data-step-index={index}
              className={`relative flex min-h-48 flex-col justify-center rounded-[1.75rem] border p-6 transition-[background-color,box-shadow,transform] lg:min-h-[30vh] sm:p-8 ${
                activeStep === index
                  ? 'border-ink/10 bg-white/86 shadow-[0_16px_42px_rgba(55,66,58,.1)]'
                  : 'border-ink/7 bg-white/42'
              }`}
            >
              <p className="text-xs font-extrabold tracking-[0.055em] text-ink/70 uppercase">
                {escalationInterface.stepLabel} {index + 1}
              </p>
              <h3 className="mt-3 text-3xl leading-none font-black tracking-[-0.04em]">
                {step.label}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-6 text-ink/70">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      <p
        data-escalation-disclaimer
        className="rounded-2xl border border-ink/8 bg-white/58 p-5 text-sm leading-6 font-semibold"
      >
        {disclaimer}
      </p>
    </div>
  );
}
