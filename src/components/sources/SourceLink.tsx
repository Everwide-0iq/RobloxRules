import { ExternalLink } from 'lucide-react';

import { useLocale } from '../../i18n/LocaleContext';
import type { Source } from '../../types/content';

interface SourceLinkProps {
  source: Source;
  inverse?: boolean;
  compact?: boolean;
}

export function SourceLink({ source, inverse = false, compact = true }: SourceLinkProps) {
  const { content } = useLocale();
  const uiCopy = content.ui.copy;

  return (
    <a
      className={`group inline-flex min-h-10 max-w-full shrink-0 items-center gap-2 rounded-xl border px-3 text-sm leading-5 font-bold transition-colors ${
        inverse
          ? 'border-white/12 bg-white/6 text-white hover:bg-white/12'
          : 'border-ink/9 bg-white/48 text-ink hover:bg-white/82'
      }`}
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${uiCopy.viewOfficialSource}: ${source.title} (${uiCopy.opensInNewTab})`}
    >
      <span className="min-w-0 break-words">
        {compact ? uiCopy.viewOfficialSource : source.title}
      </span>
      <ExternalLink
        aria-hidden="true"
        className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}
