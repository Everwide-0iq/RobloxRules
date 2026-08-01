import { Check, LockKeyhole, ScanSearch, ShieldCheck, Sparkles } from 'lucide-react';

import { useLocale } from '../i18n/LocaleContext';

const markerPositions = [
  'top-[27%] left-[8%]',
  'top-[19%] right-[8%]',
  'right-[7%] bottom-[24%]',
] as const;

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
          className="relative mt-2 min-h-[31rem] overflow-hidden rounded-[1.65rem] bg-[#263c36] p-5 text-white sm:aspect-[1.04] sm:min-h-0 sm:p-6"
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
          <div className="relative flex h-full flex-col gap-4" data-inspection-content>
            <div className="flex items-start justify-between gap-4">
              <p className="max-w-[16ch] text-xs leading-5 font-extrabold tracking-[0.07em] text-risk-green uppercase">
                {heroInspectionContent.statusLabel}
              </p>
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10">
                <ShieldCheck aria-hidden="true" className="size-6 text-risk-green" />
              </span>
            </div>

            <div
              className="group relative min-h-52 flex-1 overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#08111f] shadow-[inset_0_0_0_1px_rgba(255,255,255,.025),0_16px_34px_rgba(4,10,17,.25)]"
              role="img"
              aria-label={`${heroInspectionContent.previewLabel}: ${heroInspectionContent.posterTitle}. ${heroInspectionContent.posterDetail}`}
              data-inspection-preview
            >
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                viewBox="0 0 640 360"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="poster-sky" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#0a1830" />
                    <stop offset="0.52" stopColor="#203f4a" />
                    <stop offset="1" stopColor="#755b48" />
                  </linearGradient>
                  <linearGradient id="poster-ground" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#253d3b" />
                    <stop offset="1" stopColor="#07111a" />
                  </linearGradient>
                  <radialGradient id="poster-lantern" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#f8e68f" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#f2a868" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="640" height="360" fill="url(#poster-sky)" />
                <circle cx="505" cy="72" r="42" fill="#f2dfa0" opacity="0.9" />
                <circle cx="523" cy="58" r="42" fill="#193541" />
                <g fill="#dfffee" opacity="0.66">
                  <circle cx="95" cy="55" r="2.5" />
                  <circle cx="152" cy="84" r="1.8" />
                  <circle cx="265" cy="44" r="2.2" />
                  <circle cx="385" cy="88" r="1.6" />
                  <circle cx="575" cy="122" r="2" />
                </g>

                <path
                  d="M0 225 105 174 212 218 323 155 435 207 545 165 640 209V360H0Z"
                  fill="#10242c"
                />
                <path
                  d="M0 270 110 205 202 250 331 187 447 250 545 207 640 255V360H0Z"
                  fill="url(#poster-ground)"
                />

                <g opacity="0.96">
                  <rect x="56" y="172" width="132" height="93" rx="8" fill="#18333a" />
                  <path d="M43 181h158l-25-36H70Z" fill="#d76f62" />
                  <path d="M64 181h32l11-36H82Zm64 0h32l-4-36h-28Z" fill="#f1c277" />
                  <rect x="78" y="209" width="38" height="56" fill="#0a1b25" />
                  <rect
                    x="132"
                    y="205"
                    width="36"
                    height="28"
                    rx="4"
                    fill="#f2d68e"
                    opacity="0.82"
                  />
                </g>

                <g opacity="0.95">
                  <rect x="427" y="188" width="148" height="79" rx="8" fill="#1a3437" />
                  <path d="M410 196h183l-29-38H440Z" fill="#557c66" />
                  <path d="M444 196h34l11-38h-31Zm68 0h34l-6-38h-28Z" fill="#e2a86e" />
                  <rect x="453" y="216" width="52" height="51" fill="#0b1c23" />
                  <circle cx="542" cy="225" r="15" fill="#e8d990" />
                </g>

                <g>
                  <circle cx="290" cy="224" r="18" fill="#d7a47c" />
                  <path d="M267 273c0-30 10-48 23-48s25 18 25 48Z" fill="#6f82a4" />
                  <path
                    d="m270 238-20 35m57-34 20 34"
                    stroke="#d7a47c"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                  <circle cx="359" cy="239" r="15" fill="#a97866" />
                  <path d="M339 282c1-27 8-43 20-43 13 0 22 16 23 43Z" fill="#b15f6d" />
                </g>

                <g>
                  <circle cx="127" cy="159" r="40" fill="url(#poster-lantern)" />
                  <circle cx="127" cy="159" r="12" fill="#f0c36d" />
                  <path d="M127 145V98" stroke="#efe5b5" strokeWidth="3" opacity="0.8" />
                  <circle cx="500" cy="170" r="42" fill="url(#poster-lantern)" />
                  <circle cx="500" cy="170" r="11" fill="#f0c36d" />
                  <path d="M500 159v-48" stroke="#efe5b5" strokeWidth="3" opacity="0.8" />
                </g>

                <path
                  d="M215 360c23-79 57-119 105-119 53 0 91 40 118 119Z"
                  fill="#15282d"
                  opacity="0.92"
                />
                <path
                  d="M282 360c8-61 20-94 38-94 20 0 34 33 43 94Z"
                  fill="#d5bd7c"
                  opacity="0.2"
                />
              </svg>

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,18,.12),transparent_42%,rgba(3,8,15,.86))]"
              />
              <div
                aria-hidden="true"
                className="inspection-scan-line absolute inset-x-0 top-0 h-px"
              />
              <div
                aria-hidden="true"
                className="absolute inset-3 rounded-xl border border-white/14 [clip-path:polygon(0_0,18%_0,18%_1px,1px_1px,1px_18%,0_18%,0_0,100%_0,100%_18%,calc(100%_-_1px)_18%,calc(100%_-_1px)_1px,82%_1px,82%_0,100%_0,100%_100%,82%_100%,82%_calc(100%_-_1px),calc(100%_-_1px)_calc(100%_-_1px),calc(100%_-_1px)_82%,100%_82%,100%_100%,0_100%,0_82%,1px_82%,1px_calc(100%_-_1px),18%_calc(100%_-_1px),18%_100%)]"
              />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-3 text-[0.58rem] font-extrabold tracking-[0.08em] uppercase sm:p-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[#07111d]/72 px-2.5 py-1.5 text-white/76 backdrop-blur-md">
                  <ScanSearch aria-hidden="true" className="size-3" />
                  {heroInspectionContent.previewLabel}
                </span>
                <span className="rounded-full border border-risk-green/30 bg-[#07111d]/72 px-2.5 py-1.5 text-risk-green backdrop-blur-md">
                  {heroInspectionContent.scanLabel}
                </span>
              </div>

              {heroInspectionContent.markers.map((marker, index) => (
                <span
                  key={marker.id}
                  className={`absolute flex items-center gap-1.5 rounded-full border border-risk-green/45 bg-[#07111d]/82 py-1 pr-2.5 pl-1 text-[0.58rem] font-extrabold tracking-[0.04em] text-white shadow-[0_0_16px_rgba(84,246,198,.14)] backdrop-blur-md uppercase ${markerPositions[index] ?? markerPositions[0]}`}
                  data-inspection-marker={marker.id}
                >
                  <span className="grid size-5 place-items-center rounded-full bg-risk-green text-[0.55rem] font-black text-[#10241d]">
                    {index + 1}
                  </span>
                  {marker.label}
                </span>
              ))}

              <div className="absolute right-4 bottom-4 left-4">
                <p className="text-[0.58rem] font-extrabold tracking-[0.13em] text-risk-green uppercase">
                  {heroInspectionContent.posterEyebrow}
                </p>
                <p className="mt-1 text-xl leading-none font-black tracking-[-0.035em] sm:text-2xl">
                  {heroInspectionContent.posterTitle}
                </p>
                <p className="mt-1.5 text-[0.65rem] font-semibold text-white/62">
                  {heroInspectionContent.posterDetail}
                </p>
              </div>
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
