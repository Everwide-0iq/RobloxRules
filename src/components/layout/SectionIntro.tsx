import type { ReactNode } from 'react';

interface SectionIntroProps {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  inverse?: boolean;
  aside?: ReactNode;
}

export function SectionIntro({
  number,
  eyebrow,
  title,
  description,
  inverse = false,
  aside,
}: SectionIntroProps) {
  return (
    <header className="grid gap-8 md:grid-cols-[minmax(0,0.66fr)_minmax(18rem,0.34fr)] md:items-end">
      <div>
        <div className="flex items-center gap-3 text-sm font-extrabold tracking-[0.06em] uppercase">
          <span
            className={`grid size-9 place-items-center rounded-full text-xs ${
              inverse ? 'bg-white/12 text-white' : 'bg-white/72 text-ink/70'
            }`}
            aria-hidden="true"
          >
            {number}
          </span>
          <span>{eyebrow}</span>
        </div>
        <h2 className="mt-6 max-w-[15ch] text-[clamp(2.65rem,6vw,5.8rem)] leading-[0.94] font-black tracking-[-0.055em] text-balance">
          {title}
        </h2>
      </div>
      <div className="flex flex-col justify-end gap-6">
        <p className={`text-lg leading-8 ${inverse ? 'text-white/86' : 'text-ink/68'}`}>
          {description}
        </p>
        {aside}
      </div>
    </header>
  );
}
