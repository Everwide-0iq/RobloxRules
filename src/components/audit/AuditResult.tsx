import { ArrowUpRight, RotateCcw } from 'lucide-react';

import { useLocale } from '../../i18n/LocaleContext';
import type { AuditOutcome, AuditQuestionData } from '../../types/content';

interface AuditResultProps {
  outcome: AuditOutcome;
  unresolved: readonly AuditQuestionData[];
  onReset: () => void;
  onReviewAnswers: () => void;
}

export function AuditResult({ outcome, unresolved, onReset, onReviewAnswers }: AuditResultProps) {
  const { content } = useLocale();
  const { interface: auditInterface, outcomeCopy: auditOutcomeCopy } = content.audit;
  const copy = auditOutcomeCopy[outcome];

  return (
    <section
      aria-live="polite"
      aria-labelledby="audit-result-title"
      className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 sm:p-8"
    >
      <p className="text-sm font-extrabold tracking-[0.055em] text-risk-green uppercase">
        {auditInterface.resultEyebrow}
      </p>
      <h3
        id="audit-result-title"
        className="mt-4 max-w-[18ch] text-4xl leading-[0.9] font-black tracking-[-0.055em] text-white sm:text-6xl"
      >
        {copy.label}
      </h3>
      <p className="mt-5 max-w-2xl text-base leading-7 text-white/76">{copy.description}</p>

      {unresolved.length ? (
        <div className="mt-9">
          <h4 className="text-sm font-extrabold tracking-[0.055em] text-white uppercase">
            {auditInterface.findingsTitle}
          </h4>
          <ol className="mt-3 border-t border-white/25">
            {unresolved.map((question, index) => (
              <li
                key={question.id}
                className="grid gap-4 border-b border-white/18 py-5 md:grid-cols-[2.5rem_minmax(0,1fr)_minmax(12rem,0.42fr)]"
              >
                <span className="text-xs font-black text-risk-green">{index + 1}</span>
                <div>
                  <p className="font-bold text-white">{question.category}</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{question.unresolvedRisk}</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold tracking-[0.05em] text-white/72 uppercase">
                    {auditInterface.nextActionLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/76">{question.nextAction}</p>
                  <a
                    className="mt-3 inline-flex min-h-11 items-center gap-2 border-b border-risk-green text-sm font-bold text-risk-green"
                    href={`#${question.relatedSectionId}`}
                  >
                    {auditInterface.sectionActionLabel}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-risk-green/30 bg-risk-green/10 p-5">
          <p className="font-bold text-white">{auditInterface.completeTitle}</p>
          <p className="mt-2 text-sm leading-6 text-white/72">{auditInterface.completeAction}</p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className="min-h-12 rounded-xl border border-risk-green bg-risk-green px-5 text-sm font-black text-ink hover:bg-white"
          onClick={onReviewAnswers}
        >
          {auditInterface.changeAnswers}
        </button>
        <button
          type="button"
          className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/14 bg-white/6 px-5 text-sm font-bold text-white hover:bg-white/12"
          onClick={onReset}
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          {auditInterface.resetAction}
        </button>
      </div>
    </section>
  );
}
