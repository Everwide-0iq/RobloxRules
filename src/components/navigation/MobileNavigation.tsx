import { useEffect, useId, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

import type { NavigationItem, SectionId } from '../../types/content';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function focusSection(sectionId: SectionId) {
  window.requestAnimationFrame(() => {
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    const hadTabIndex = target.hasAttribute('tabindex');

    if (!hadTabIndex) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener(
        'blur',
        () => {
          target.removeAttribute('tabindex');
        },
        { once: true },
      );
    }

    target.focus({ preventScroll: true });
  });
}

export interface MobileNavigationProps {
  action?: NavigationItem | undefined;
  activeSectionId: SectionId | null;
  closeMenuLabel: string;
  items: readonly NavigationItem[];
  menuButtonLabel: string;
  navigationLabel: string;
}

export function MobileNavigation({
  action,
  activeSectionId,
  closeMenuLabel,
  items,
  menuButtonLabel,
  navigationLabel,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldRestoreFocusRef = useRef(true);

  const closeMenu = (restoreFocus: boolean) => {
    shouldRestoreFocusRef.current = restoreFocus;
    setIsOpen(false);
  };

  const navigateToSection = (sectionId: SectionId) => {
    closeMenu(false);
    focusSection(sectionId);
  };

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 80rem)');
    const handleDesktopChange = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        shouldRestoreFocusRef.current = false;
        setIsOpen(false);
      }
    };

    desktopQuery.addEventListener('change', handleDesktopChange);

    return () => {
      desktopQuery.removeEventListener('change', handleDesktopChange);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    shouldRestoreFocusRef.current = true;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFrame = window.requestAnimationFrame(() => {
      panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        shouldRestoreFocusRef.current = true;
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !panel) {
        return;
      }

      const focusableElements = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter(
        (element) => element.offsetParent !== null,
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
        panel.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;

      if (shouldRestoreFocusRef.current) {
        window.requestAnimationFrame(() => {
          if (trigger?.isConnected) {
            trigger.focus();
          }
        });
      }
    };
  }, [isOpen]);

  return (
    <div className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-ink/12 bg-white/72 px-3 text-sm font-bold text-ink transition-colors hover:bg-white"
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={menuButtonLabel}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Menu aria-hidden="true" size={18} strokeWidth={2} />
        <span className="hidden sm:inline">{menuButtonLabel}</span>
      </button>

      {isOpen ? (
        <div
          ref={panelRef}
          id={menuId}
          role="dialog"
          aria-label={navigationLabel}
          aria-modal="true"
          className="fixed inset-0 z-[80] flex h-dvh flex-col overflow-y-auto bg-paper px-5 py-5 text-ink"
          tabIndex={-1}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-ink/12 bg-white/72 px-4 text-sm font-bold transition-colors hover:bg-white"
              aria-label={closeMenuLabel}
              onClick={() => {
                closeMenu(true);
              }}
            >
              <span>{closeMenuLabel}</span>
              <X aria-hidden="true" size={18} strokeWidth={2} />
            </button>
          </div>

          <nav className="mt-10 flex flex-1 flex-col" aria-label={navigationLabel}>
            <ol className="grid gap-2">
              {items.map((item, index) => {
                const isActive = item.sectionId === activeSectionId;

                return (
                  <li key={item.sectionId}>
                    <a
                      className={`flex min-h-14 items-center gap-4 rounded-2xl border px-4 py-3 text-xl font-extrabold transition-colors ${
                        isActive
                          ? 'border-ink bg-ink text-white'
                          : 'border-ink/8 bg-white/62 text-ink hover:bg-white'
                      }`}
                      href={`#${item.sectionId}`}
                      aria-current={isActive ? 'location' : undefined}
                      onClick={() => {
                        navigateToSection(item.sectionId);
                      }}
                    >
                      <span className="text-xs font-black opacity-45" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ol>

            {action ? (
              <a
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl bg-ink px-6 text-center font-bold text-white shadow-[0_8px_22px_rgba(48,61,53,.16)]"
                href={`#${action.sectionId}`}
                onClick={() => {
                  navigateToSection(action.sectionId);
                }}
              >
                {action.label}
              </a>
            ) : null}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
