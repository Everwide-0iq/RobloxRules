import { ArrowDownRight, ArrowRight, Check, FileWarning, ShieldCheck } from 'lucide-react';

import { useLocale } from '../i18n/LocaleContext';
import type { SectionId } from '../types/content';
import { EscalationStory } from '../components/EscalationStory';
import { HeroInspection } from '../components/HeroInspection';
import { HighRiskDirectory } from '../components/HighRiskDirectory';
import { PolicyLayers } from '../components/PolicyLayers';
import { ReleaseChecklist } from '../components/ReleaseChecklist';
import { ReleaseQuest } from '../components/ReleaseQuest';
import { ReleaseSimulator } from '../components/ReleaseSimulator';
import { ResponsibilityMap } from '../components/ResponsibilityMap';
import { ShareButton } from '../components/ShareButton';
import { DeferredAuditPanel } from '../components/audit/DeferredAuditPanel';
import { EvidenceBadge } from '../components/layout/EvidenceBadge';
import { SectionIntro } from '../components/layout/SectionIntro';
import { SectionStatement } from '../components/layout/SectionStatement';
import { Reveal } from '../components/motion/Reveal';
import { ScrollRiskField } from '../components/motion/ScrollRiskField';
import { RiskMeter } from '../components/navigation/RiskMeter';
import { SiteHeader } from '../components/navigation/SiteHeader';
import { CaseStudy } from '../components/scenarios/CaseStudy';
import { ImageSlot } from '../components/scenarios/ImageSlot';
import { ScenarioCard } from '../components/scenarios/ScenarioCard';
import { SourceLink } from '../components/sources/SourceLink';
import { SourcesDirectory } from '../components/sources/SourcesDirectory';

const riskBands = ['lower-risk', 'review', 'high-risk', 'recovery'] as const;

function SectionHeading({ id, inverse = false }: { id: SectionId; inverse?: boolean }) {
  const { content } = useLocale();
  const copy = content.sections.copy[id];
  const definition = content.sections.definitions.find((section) => section.id === id);
  if (!definition) throw new Error(`Missing section definition: ${id}`);

  return (
    <SectionIntro
      number={definition.number}
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.intro}
      inverse={inverse}
      aside={
        copy.disclaimer ? (
          <p className={`text-sm leading-6 ${inverse ? 'text-white/86' : 'text-ink/70'}`}>
            {copy.disclaimer}
          </p>
        ) : undefined
      }
    />
  );
}

function Statement({ id, inverse = false }: { id: SectionId; inverse?: boolean }) {
  const { content } = useLocale();
  const statement = content.sections.copy[id].statement;
  if (!statement) return null;

  return (
    <SectionStatement
      text={statement.text}
      evidenceType={statement.evidenceType}
      sourceIds={statement.sourceIds}
      inverse={inverse}
    />
  );
}

function App() {
  const { content, locale } = useLocale();
  const appealContent = content.appeals;
  const caseStudies = content.cases;
  const finalActions = content.sections.finalActions;
  const heroActions = content.sections.heroActions;
  const highRiskTopics = content.highRiskTopics;
  const imageSlots = content.images.slots;
  const navigationContent = content.navigation.content;
  const navigationItems = content.navigation.items;
  const pageInterface = content.page;
  const releaseWorkflow = content.release.workflow;
  const riskBandLabels = content.navigation.riskBandLabels;
  const scenarios = content.scenarios;
  const sectionCopy = content.sections.copy;
  const sources = content.sources;
  const noticeSlot = imageSlots.find((slot) => slot.id === 'image-slot-08');
  const appealSlot = imageSlots.find((slot) => slot.id === 'image-slot-12');
  const appealSourceIds: ReadonlySet<string> = new Set(appealContent.sourceIds);
  const appealSources = sources.filter((source) => appealSourceIds.has(source.id));
  const shareAction = finalActions.find((action) => 'action' in action);

  return (
    <ScrollRiskField className="cozy-guide relative overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-60 [background-image:radial-gradient(circle_at_12%_10%,rgba(255,255,255,.7),transparent_24%),radial-gradient(circle_at_88%_24%,rgba(255,245,211,.55),transparent_22%),radial-gradient(circle_at_50%_78%,rgba(255,255,255,.28),transparent_28%)]"
      />

      <SiteHeader
        brandLabel={navigationContent.brand}
        brandSectionId="start"
        navigationLabel={navigationContent.desktopLabel}
        mobileNavigationLabel={navigationContent.mobileLabel}
        items={navigationItems}
        action={navigationContent.auditAction}
        menuButtonLabel={navigationContent.menuButtonLabel}
        closeMenuLabel={navigationContent.closeMenuLabel}
        currentZoneLabel={navigationContent.currentZoneLabel}
        riskBandLabels={riskBandLabels}
        skipLinkLabel={navigationContent.skipLinkLabel}
        skipTargetId="main-content"
      />
      <RiskMeter
        ariaLabel={navigationContent.mobileProgressLabel}
        bands={riskBands}
        labels={riskBandLabels}
      />

      <main id="main-content" className="relative z-10 focus:outline-none" tabIndex={-1}>
        <section
          id="start"
          data-risk-band="lower-risk"
          className="scroll-mt-20 px-4 pt-10 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:px-10"
          aria-labelledby="page-title"
        >
          <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-[82rem] content-center gap-12 lg:grid-cols-[minmax(0,0.56fr)_minmax(24rem,0.44fr)] lg:items-center">
            <div>
              <EvidenceBadge type="best-practice" />
              <p className="mt-6 text-sm font-extrabold tracking-[0.08em] text-ink/70 uppercase">
                {sectionCopy.start.eyebrow}
              </p>
              <h1
                id="page-title"
                className={`mt-5 font-black text-balance ${
                  locale === 'ru'
                    ? 'max-w-[13ch] text-[clamp(3.25rem,7vw,5.7rem)] leading-[0.91] tracking-[-0.055em] break-words'
                    : 'max-w-[11ch] text-[clamp(3.8rem,9vw,8.6rem)] leading-[0.88] tracking-[-0.065em]'
                }`}
              >
                {sectionCopy.start.title}
              </h1>
              <p className="mt-7 max-w-xl text-xl leading-8 font-extrabold tracking-[-0.025em] sm:text-2xl sm:leading-9">
                {pageInterface.heroLead}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-ink/68 sm:text-lg sm:leading-8">
                {sectionCopy.start.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {heroActions.map((action, index) => (
                  <a
                    key={action.id}
                    className={`inline-flex min-h-12 items-center gap-3 rounded-2xl px-5 text-sm font-extrabold shadow-[0_8px_22px_rgba(47,58,51,.12)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(47,58,51,.16)] ${
                      index === 0
                        ? 'bg-ink text-white'
                        : 'border border-ink/12 bg-white/75 text-ink'
                    }`}
                    href={`#${action.sectionId}`}
                  >
                    {action.label}
                    {index === 0 ? (
                      <ArrowDownRight aria-hidden="true" className="size-4" />
                    ) : (
                      <ArrowRight aria-hidden="true" className="size-4" />
                    )}
                  </a>
                ))}
              </div>
              <p className="mt-8 max-w-xl border-t border-ink/12 pt-4 text-sm leading-6 text-ink/70">
                {sectionCopy.start.disclaimer}
              </p>
            </div>
            <Reveal delay={0.12}>
              <HeroInspection />
            </Reveal>
          </div>
          <div className="mx-auto mt-8 max-w-[82rem]">
            <ReleaseQuest />
            <div className="mt-10">
              <Statement id="start" />
            </div>
          </div>
        </section>

        <section
          id="responsibility"
          data-risk-band="lower-risk"
          className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32 lg:px-10 lg:py-40"
        >
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <SectionHeading id="responsibility" />
            </Reveal>
            <div className="mt-12 sm:mt-16">
              <ResponsibilityMap />
            </div>
            <div className="mt-12">
              <Statement id="responsibility" />
            </div>
          </div>
        </section>

        <section
          id="policy-layers"
          data-risk-band="lower-risk"
          className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32 lg:px-10 lg:py-40"
        >
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <SectionHeading id="policy-layers" />
            </Reveal>
            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(18rem,0.35fr)] lg:items-start">
              <PolicyLayers />
              <div className="story-sticky lg:sticky lg:top-28">
                <Statement id="policy-layers" />
              </div>
            </div>
          </div>
        </section>

        <section
          id="lower-risk"
          data-risk-band="lower-risk"
          className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32 lg:px-10 lg:py-40"
        >
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <SectionHeading id="lower-risk" />
            </Reveal>

            <div className="mt-12 overflow-hidden rounded-[2rem] border border-ink/10 bg-white/74 text-ink shadow-[0_18px_50px_rgba(55,66,58,.1)] sm:mt-16">
              <div className="grid gap-4 border-b border-ink/8 p-6 sm:p-8 md:grid-cols-2 md:items-end">
                <p className="text-sm font-extrabold tracking-[0.07em] text-ink/70 uppercase">
                  {pageInterface.workflowEyebrow}
                </p>
                <h3 className="text-3xl leading-tight font-black tracking-[-0.045em] md:text-right sm:text-4xl">
                  {pageInterface.workflowTitle}
                </h3>
              </div>
              <ol className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
                {releaseWorkflow.map((step, index) => (
                  <li
                    key={step.id}
                    className="min-h-48 rounded-2xl border border-ink/8 bg-paper/78 p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold text-ink/70">
                      <span>{pageInterface.workflowStepLabel}</span>
                      <span className="grid size-8 place-items-center rounded-full bg-white">
                        {index + 1}
                      </span>
                    </div>
                    <Check aria-hidden="true" className="mt-6 size-5 text-ink/70" />
                    <h4 className="mt-4 text-xl leading-tight font-black tracking-[-0.03em]">
                      {step.label}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-ink/66">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-12">
              <ReleaseChecklist />
            </div>
            <div className="mt-12">
              <Statement id="lower-risk" />
            </div>
          </div>
        </section>

        <section
          id="blind-spots"
          data-risk-band="review"
          className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32 lg:px-10 lg:py-40"
        >
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <SectionHeading id="blind-spots" />
            </Reveal>
            <div className="mt-6 flex items-center justify-between border-b border-ink/12 pb-4 text-sm font-extrabold text-ink/70">
              <span>{pageInterface.scenarioCountLabel}</span>
              <span>{String(scenarios.length).padStart(2, '0')}</span>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {scenarios.map((scenario, index) => (
                <Reveal
                  key={scenario.id}
                  delay={Math.min(index * 0.025, 0.12)}
                  className={
                    scenario.id === 'ai-generated-poster' ||
                    scenario.id === 'content-maturity-mismatch'
                      ? 'md:col-span-2'
                      : undefined
                  }
                >
                  <ScenarioCard
                    scenario={scenario}
                    sources={sources}
                    imageSlots={imageSlots}
                    featured={scenario.id === 'ai-generated-poster'}
                  />
                </Reveal>
              ))}
            </div>
            <div className="mt-12 sm:mt-16">
              <ReleaseSimulator />
            </div>
            <div className="mt-12">
              <Statement id="blind-spots" />
            </div>
          </div>
        </section>

        <section
          id="risk-escalation"
          data-risk-band="high-risk"
          className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32 lg:px-10 lg:py-40"
        >
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <SectionHeading id="risk-escalation" />
            </Reveal>
            <div className="mt-12 sm:mt-16">
              <EscalationStory disclaimer={sectionCopy['risk-escalation'].disclaimer} />
            </div>
            <div className="mt-12">
              <Statement id="risk-escalation" />
            </div>
          </div>
        </section>

        <section
          id="high-risk"
          data-risk-band="high-risk"
          className="scroll-mt-20 bg-risk-crimson px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-10 lg:py-40"
        >
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <SectionHeading id="high-risk" inverse />
            </Reveal>
            <div className="mt-12 sm:mt-16">
              <HighRiskDirectory topics={highRiskTopics} sources={sources} />
            </div>
            <div className="mt-12">
              <Statement id="high-risk" inverse />
            </div>
          </div>
        </section>

        <section
          id="cases"
          data-risk-band="high-risk"
          className="scroll-mt-20 bg-[#34433d] px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-10 lg:py-40"
        >
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <SectionHeading id="cases" inverse />
            </Reveal>
            <div className="mt-8 flex items-center justify-between text-sm font-extrabold text-white/76">
              <span>{pageInterface.caseCountLabel}</span>
              <span>{String(caseStudies.length).padStart(2, '0')}</span>
            </div>
            <div className="mt-5">
              {caseStudies.map((caseStudy) => (
                <CaseStudy
                  key={caseStudy.id}
                  caseStudy={caseStudy}
                  sources={sources}
                  imageSlots={imageSlots}
                />
              ))}
            </div>
            <div className="mt-12">
              <Statement id="cases" inverse />
            </div>
          </div>
        </section>

        <section
          id="audit"
          data-risk-band="high-risk"
          className="scroll-mt-20 bg-[#293832] px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-10 lg:py-40"
        >
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <SectionHeading id="audit" inverse />
            </Reveal>
            <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_55px_rgba(8,18,13,.12)] sm:mt-16 sm:p-8">
              <DeferredAuditPanel
                loadingLabel={pageInterface.auditLoading}
                errorTitle={pageInterface.auditErrorTitle}
                errorBody={pageInterface.auditErrorBody}
                retryLabel={pageInterface.auditRetryLabel}
              />
            </div>
            <div className="mt-12">
              <Statement id="audit" inverse />
            </div>
          </div>
        </section>

        <section
          id="appeals"
          data-risk-band="recovery"
          className="scroll-mt-20 bg-[#edf0e5] px-4 py-24 text-ink sm:px-6 sm:py-32 lg:px-10 lg:py-40"
        >
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <SectionHeading id="appeals" />
            </Reveal>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(18rem,0.42fr)] sm:mt-16">
              <div>
                <h3 className="text-sm font-extrabold tracking-[0.06em] text-risk-crimson uppercase">
                  {pageInterface.appealsImmediateTitle}
                </h3>
                <ol className="mt-4 border-t border-ink/10">
                  {appealContent.immediateSteps.map((step, index) => (
                    <li
                      key={step}
                      className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-ink/8 py-4 text-sm leading-6 text-ink/70"
                    >
                      <span className="text-xs font-black text-risk-crimson">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="story-sticky self-start rounded-[1.75rem] border border-ink/8 bg-white/72 p-5 shadow-[0_16px_42px_rgba(55,66,58,.09)] sm:p-7 lg:sticky lg:top-28">
                <FileWarning aria-hidden="true" className="size-6 text-risk-crimson" />
                <h3 className="mt-6 text-3xl leading-none font-black tracking-[-0.04em]">
                  {appealContent.structureTitle}
                </h3>
                <ul className="mt-6 grid gap-3">
                  {appealContent.structureFields.map((field) => (
                    <li key={field} className="flex gap-3 text-sm leading-6 text-ink/68">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-risk-crimson"
                      />
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {noticeSlot ? <ImageSlot slot={noticeSlot} /> : null}
              {appealSlot ? <ImageSlot slot={appealSlot} /> : null}
            </div>

            <div className="mt-12 rounded-[1.75rem] border border-ink/8 bg-white/58 p-5 sm:p-7">
              <h3 className="text-sm font-extrabold tracking-[0.06em] text-risk-crimson uppercase">
                {pageInterface.appealsLimitsTitle}
              </h3>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {appealContent.limits.map((limit) => (
                  <li
                    key={limit}
                    className="rounded-2xl border border-ink/8 bg-paper/58 p-4 text-sm leading-6 text-ink/70 sm:p-5"
                  >
                    {limit}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-ink/70">{appealContent.disclaimer}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {appealSources.map((source) => (
                  <SourceLink key={source.id} source={source} />
                ))}
              </div>
            </div>

            <div className="mt-12">
              <Statement id="appeals" />
            </div>
          </div>
        </section>

        <section
          id="final"
          data-risk-band="recovery"
          className="relative scroll-mt-20 overflow-hidden bg-[#1f3029] px-4 py-28 text-white sm:px-6 sm:py-40 lg:px-10 lg:py-44"
        >
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[min(90vw,60rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-risk-green/12 blur-[100px]"
          />
          <div className="relative mx-auto max-w-[96rem]">
            <p className="text-sm font-extrabold tracking-[0.07em] text-risk-green uppercase">
              {pageInterface.finalSignalLabel}
            </p>
            <h2 className="mt-8 max-w-[12ch] text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] font-black tracking-[-0.06em] text-balance">
              {sectionCopy.final.title}
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              {sectionCopy.final.intro}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {finalActions
                .filter((action) => 'sectionId' in action)
                .map((action) => (
                  <a
                    key={action.id}
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/14 bg-white/6 px-5 text-sm font-black text-white transition-colors hover:bg-white/12"
                    href={`#${action.sectionId}`}
                  >
                    {action.label}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                ))}
              {shareAction ? <ShareButton label={shareAction.label} /> : null}
            </div>
            <div className="mt-16">
              <Statement id="final" inverse />
            </div>
          </div>
        </section>

        <section
          id="sources"
          data-risk-band="recovery"
          className="scroll-mt-20 bg-[#1b2924] px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-10 lg:py-40"
        >
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <SectionHeading id="sources" inverse />
            </Reveal>
            <div className="mt-12 sm:mt-16">
              <SourcesDirectory sources={sources} />
            </div>
            <div className="mt-14 flex items-start gap-3 rounded-2xl border border-risk-green/20 bg-risk-green/8 p-5 text-sm leading-6 text-white/72">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-risk-green" />
              {pageInterface.sourcePolicyNote}
            </div>
            <footer className="mt-20 grid gap-6 border-t border-white/16 pt-6 text-sm leading-6 text-white/66 sm:grid-cols-2 sm:items-end">
              <div>
                <p className="font-black text-white">{navigationContent.brand}</p>
                <p className="mt-2 max-w-md">{sectionCopy.start.disclaimer}</p>
              </div>
              <p className="font-semibold sm:text-right">{pageInterface.footerEdition}</p>
            </footer>
          </div>
        </section>
      </main>
    </ScrollRiskField>
  );
}

export default App;
