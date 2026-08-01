import { CircleAlert, CircleCheck, HelpCircle } from 'lucide-react';

import { useLocale } from '../../i18n/LocaleContext';
import type { AuditAnswer, AuditQuestionData } from '../../types/content';

interface AuditQuestionProps {
  question: AuditQuestionData;
  index: number;
  total: number;
  value: AuditAnswer | undefined;
  onChange: (answer: AuditAnswer) => void;
}

const optionIcons = {
  reviewed: CircleCheck,
  'needs-review': CircleAlert,
  unsure: HelpCircle,
} as const;

export function AuditQuestion({ question, index, total, value, onChange }: AuditQuestionProps) {
  const { content } = useLocale();
  const { answerOptions: auditAnswerOptions, interface: auditInterface } = content.audit;

  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">{question.prompt}</legend>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-extrabold tracking-[0.04em] text-white/74 uppercase">
        <span>{question.category}</span>
        <span>
          {auditInterface.questionLabel} {index + 1} {auditInterface.ofLabel} {total}
        </span>
      </div>
      <h3
        id={`audit-question-${question.id}`}
        className="mt-6 max-w-[26ch] text-3xl leading-[1.02] font-black tracking-[-0.04em] text-white sm:text-4xl"
      >
        {question.prompt}
      </h3>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
        {question.detail}
      </p>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {auditAnswerOptions.map((option) => {
          const Icon = optionIcons[option.value];
          const checked = value === option.value;

          return (
            <label
              key={option.value}
              className={`relative min-h-32 rounded-2xl border p-4 transition-[background-color,border-color,transform] hover:-translate-y-0.5 focus-within:outline-3 focus-within:outline-offset-4 focus-within:outline-risk-yellow sm:p-5 ${
                checked
                  ? 'border-risk-green bg-risk-green text-ink'
                  : 'border-white/10 bg-white/6 text-white hover:border-white/22 hover:bg-white/9'
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name={`audit-${question.id}`}
                value={option.value}
                checked={checked}
                onChange={() => {
                  onChange(option.value);
                }}
              />
              <span className="flex items-center gap-2 text-sm font-black">
                <Icon aria-hidden="true" className="size-4" />
                {option.label}
              </span>
              <span
                className={`mt-3 block text-sm leading-5 ${checked ? 'text-ink/72' : 'text-white/68'}`}
              >
                {option.description}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
