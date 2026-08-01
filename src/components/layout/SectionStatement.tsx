import { useLocale } from '../../i18n/LocaleContext';
import type { EvidenceType } from '../../types/content';
import { EvidenceBadge } from './EvidenceBadge';
import { SourceLink } from '../sources/SourceLink';

interface SectionStatementProps {
  text: string;
  evidenceType: EvidenceType;
  sourceIds: readonly string[];
  inverse?: boolean;
}

export function SectionStatement({
  text,
  evidenceType,
  sourceIds,
  inverse = false,
}: SectionStatementProps) {
  const { content } = useLocale();
  const relatedSources = sourceIds.flatMap((sourceId) => {
    const source = content.sources.find((candidate) => candidate.id === sourceId);
    return source ? [source] : [];
  });

  return (
    <aside
      data-section-statement
      className={`flex min-w-0 flex-col gap-5 rounded-[1.75rem] border p-5 sm:p-6 ${
        inverse ? 'border-white/12 bg-white/7' : 'border-ink/8 bg-white/58'
      }`}
    >
      <div className="flex min-w-0 flex-wrap items-start gap-5">
        <div className="shrink-0">
          <EvidenceBadge type={evidenceType} inverse={inverse} />
        </div>
        <p
          data-section-statement-text
          className={`min-w-0 flex-1 basis-[24rem] text-lg leading-8 font-extrabold ${
            inverse ? 'text-white' : 'text-ink'
          }`}
        >
          {text}
        </p>
      </div>
      {relatedSources.length ? (
        <div data-section-statement-sources className="flex min-w-0 flex-wrap gap-2">
          {relatedSources.map((source) => (
            <SourceLink key={source.id} source={source} inverse={inverse} />
          ))}
        </div>
      ) : null}
    </aside>
  );
}
