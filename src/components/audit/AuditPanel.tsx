import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

import { useLocale } from '../../i18n/LocaleContext';
import type { AuditAnswer, AuditOutcome, AuditQuestionData } from '../../types/content';
import { AuditQuestion } from './AuditQuestion';
import { AuditResult } from './AuditResult';

type AuditAnswers = Partial<Record<AuditQuestionData['id'], AuditAnswer>>;

export function AuditPanel() {
  const { content } = useLocale();
  const {
    disclaimer: auditDisclaimer,
    interface: auditInterface,
    questions: auditQuestions,
  } = content.audit;
  const [answers, setAnswers] = useState<AuditAnswers>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const currentQuestion = auditQuestions[questionIndex] ?? auditQuestions[0];
  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === auditQuestions.length;

  const unresolved = useMemo(
    () => auditQuestions.filter((question) => answers[question.id] !== 'reviewed'),
    [answers, auditQuestions],
  );

  const outcome: AuditOutcome = useMemo(() => {
    if (unresolved.some((question) => question.severity === 'critical')) {
      return 'high-risk-items-found';
    }
    if (unresolved.length) return 'review-required';
    return 'lower-risk-profile';
  }, [unresolved]);

  function focusPanel() {
    window.requestAnimationFrame(() => panelRef.current?.focus());
  }

  function answerCurrent(answer: AuditAnswer) {
    if (!currentQuestion) return;
    setAnswers((current) => ({ ...current, [currentQuestion.id]: answer }));
  }

  function reset() {
    setAnswers({});
    setQuestionIndex(0);
    setShowResult(false);
    focusPanel();
  }

  if (!currentQuestion) {
    return <p className="text-sm leading-6 text-white/65">{auditDisclaimer}</p>;
  }

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="region"
      className="outline-none"
      aria-labelledby={showResult ? 'audit-result-title' : `audit-question-${currentQuestion.id}`}
    >
      <div className="mb-8 flex items-center gap-4">
        <p className="sr-only" aria-live="polite">
          {answeredCount} {auditInterface.ofLabel} {auditQuestions.length}{' '}
          {auditInterface.answeredLabel}
        </p>
        <div
          className="h-2 flex-1 overflow-hidden rounded-full bg-white/12"
          role="progressbar"
          aria-label={auditInterface.progressLabel}
          aria-valuemin={0}
          aria-valuemax={auditQuestions.length}
          aria-valuenow={answeredCount}
        >
          <div
            className="h-full origin-left bg-risk-green transition-transform"
            style={{ transform: `scaleX(${String(answeredCount / auditQuestions.length)})` }}
          />
        </div>
        <span className="text-xs font-extrabold text-white/70">
          {answeredCount}/{auditQuestions.length}
        </span>
      </div>

      {showResult ? (
        <AuditResult
          outcome={outcome}
          unresolved={unresolved}
          onReset={reset}
          onReviewAnswers={() => {
            setShowResult(false);
            focusPanel();
          }}
        />
      ) : (
        <>
          <AuditQuestion
            question={currentQuestion}
            index={questionIndex}
            total={auditQuestions.length}
            value={answers[currentQuestion.id]}
            onChange={answerCurrent}
          />

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-4 text-sm font-bold text-white transition-colors hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-30"
              disabled={questionIndex === 0}
              onClick={() => {
                setQuestionIndex((index) => Math.max(0, index - 1));
                focusPanel();
              }}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              {auditInterface.previousAction}
            </button>

            <div className="ml-auto flex flex-wrap gap-3">
              {answers[currentQuestion.id] && questionIndex < auditQuestions.length - 1 ? (
                <button
                  type="button"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-ink transition-colors hover:bg-risk-green"
                  onClick={() => {
                    setQuestionIndex((index) => Math.min(auditQuestions.length - 1, index + 1));
                    focusPanel();
                  }}
                >
                  {auditInterface.nextAction}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              ) : null}

              {complete ? (
                <button
                  type="button"
                  className="min-h-12 rounded-xl bg-risk-green px-5 text-sm font-black text-ink transition-colors hover:bg-white"
                  onClick={() => {
                    setShowResult(true);
                    focusPanel();
                  }}
                >
                  {auditInterface.resultAction}
                </button>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/72 hover:text-white"
            onClick={reset}
          >
            <RotateCcw aria-hidden="true" className="size-3.5" />
            {auditInterface.resetAction}
          </button>
        </>
      )}

      <p className="mt-7 max-w-3xl text-sm leading-6 text-white/72">{auditDisclaimer}</p>
    </div>
  );
}

export default AuditPanel;
