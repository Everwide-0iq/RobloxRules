import { Check, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';

import { useLocale } from '../i18n/LocaleContext';

export function HeroInspection() {
  const { content } = useLocale();
  const heroInspectionContent = content.visuals.heroInspection;

  return (
    <div
      className="relative mx-auto w-full max-w-[32rem] px-3 py-8 sm:px-5"
      aria-label={heroInspectionContent.statusLabel}
      data-hero-inspection
    >
      <div
        aria-hidden="true"
        className="absolute inset-[7%_12%_6%_2%] rotate-[-4deg] rounded-[2.5rem] bg-white/34"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[11%_2%_2%_12%] rotate-[3deg] rounded-[2.5rem] bg-risk-yellow/38"
      />

      <div className="relative overflow-hidden rounded-[2.25rem] border border-ink/10 bg-white/88 p-3 shadow-[0_24px_65px_rgba(55,66,58,.17)] backdrop-blur-sm sm:p-4">
        <div className="flex items-center justify-between gap-3 px-2 py-2 text-xs font-extrabold tracking-[0.055em] text-ink/70 uppercase sm:px-3">
          <span>{heroInspectionContent.fileLabel}</span>
          <Sparkles aria-hidden="true" className="size-4 text-ink/70" />
        </div>

        <div
          className="relative mt-2 min-h-[30rem] overflow-hidden rounded-[1.65rem] bg-[#33483f] p-5 text-white sm:aspect-[1.18] sm:min-h-0 sm:p-6"
          data-inspection-panel
        >
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-12 size-48 rounded-full bg-[#b9caa9]/28 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-8 size-52 rounded-full bg-[#e7cf97]/18 blur-2xl"
          />
          <div className="relative flex h-full flex-col justify-between" data-inspection-content>
            <div className="flex items-start justify-between gap-4">
              <p className="max-w-[16ch] text-xs leading-5 font-extrabold tracking-[0.07em] text-risk-green uppercase">
                {heroInspectionContent.statusLabel}
              </p>
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10">
                <ShieldCheck aria-hidden="true" className="size-6 text-risk-green" />
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {heroInspectionContent.layers.map((layer, index) => (
                <div key={layer.id} className="rounded-xl bg-white/9 p-3 backdrop-blur-sm">
                  <p className="text-[0.68rem] font-bold tracking-[0.04em] text-white/72 uppercase">
                    {layer.label}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-bold">
                    {index === 0 ? (
                      <Check aria-hidden="true" className="size-3.5 text-risk-green" />
                    ) : null}
                    {layer.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-2 pt-4 pb-1 sm:px-3">
          <div className="flex items-center gap-2 text-xs font-bold text-ink/70">
            <LockKeyhole aria-hidden="true" className="size-4" />
            {heroInspectionContent.lockLabel}
          </div>
          <span className="rounded-xl bg-risk-green px-5 py-3 text-xs font-black tracking-[0.06em] text-ink shadow-sm">
            {heroInspectionContent.actionLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
