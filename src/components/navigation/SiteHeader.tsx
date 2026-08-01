import { useMemo } from 'react';

import { useActiveSection } from '../../hooks/useActiveSection';
import { useRiskJourney } from '../../hooks/useRiskJourney';
import type { NavigationItem, RiskBand, SectionId } from '../../types/content';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNavigation } from './MobileNavigation';
import { ThemeSwitcher } from './ThemeSwitcher';

const desktopSectionIds = new Set<SectionId>([
  'start',
  'lower-risk',
  'blind-spots',
  'audit',
  'sources',
]);

export interface SiteHeaderProps {
  action?: NavigationItem | undefined;
  brandLabel: string;
  brandSectionId: SectionId;
  closeMenuLabel: string;
  currentZoneLabel: string;
  items: readonly NavigationItem[];
  menuButtonLabel: string;
  mobileNavigationLabel: string;
  navigationLabel: string;
  riskBandLabels: Readonly<Record<RiskBand, string>>;
  skipLinkLabel: string;
  skipTargetId: string;
}

export function SiteHeader({
  action,
  brandLabel,
  brandSectionId,
  closeMenuLabel,
  currentZoneLabel,
  items,
  menuButtonLabel,
  mobileNavigationLabel,
  navigationLabel,
  riskBandLabels,
  skipLinkLabel,
  skipTargetId,
}: SiteHeaderProps) {
  const sectionIds = useMemo(() => items.map((item) => item.sectionId), [items]);
  const desktopItems = useMemo(
    () => items.filter((item) => desktopSectionIds.has(item.sectionId)),
    [items],
  );
  const activeSectionId = useActiveSection(sectionIds);
  const { activeBand } = useRiskJourney();

  return (
    <>
      <a
        className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-2xl bg-white px-5 py-3 font-semibold text-ink shadow-lg transition-transform focus:translate-y-0 focus-visible:outline-ink"
        href={`#${skipTargetId}`}
      >
        {skipLinkLabel}
      </a>

      <header className="sticky top-0 z-50 border-b border-ink/8 bg-paper/92 text-ink shadow-[0_8px_28px_rgba(48,61,53,.08)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-[4.5rem] max-w-[92rem] items-center gap-2 px-3 sm:gap-4 sm:px-6">
          <a
            className="min-w-0 shrink text-sm font-black tracking-[-0.035em] text-ink sm:text-base"
            href={`#${brandSectionId}`}
          >
            <span className="block truncate">{brandLabel}</span>
          </a>

          <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label={navigationLabel}>
            {desktopItems.map((item) => {
              const isActive = item.sectionId === activeSectionId;

              return (
                <a
                  key={item.sectionId}
                  className={`rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                    isActive ? 'bg-ink text-white' : 'text-ink/70 hover:bg-ink/6 hover:text-ink'
                  }`}
                  href={`#${item.sectionId}`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-2 2xl:ml-3 2xl:flex">
            <span className="text-xs font-semibold text-ink/70">{currentZoneLabel}</span>
            <span className="rounded-xl border border-ink/10 bg-white/72 px-3 py-1.5 text-xs font-extrabold text-ink">
              {riskBandLabels[activeBand]}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>

          {action ? (
            <a
              className="hidden min-h-11 shrink-0 items-center rounded-2xl bg-ink px-4 text-sm font-bold text-white shadow-[0_6px_16px_rgba(48,61,53,.14)] transition-transform hover:-translate-y-0.5 md:inline-flex"
              href={`#${action.sectionId}`}
            >
              {action.label}
            </a>
          ) : null}

          <MobileNavigation
            action={action}
            activeSectionId={activeSectionId}
            closeMenuLabel={closeMenuLabel}
            items={items}
            menuButtonLabel={menuButtonLabel}
            navigationLabel={mobileNavigationLabel}
          />
        </div>
      </header>
    </>
  );
}
