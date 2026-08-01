import { useEffect, useRef, useState } from 'react';

const DEFAULT_THRESHOLDS = [0, 0.1, 0.25, 0.5, 0.75, 1] as const;

export interface ActiveSectionOptions {
  activationOffset?: number;
  rootMargin?: string;
  thresholds?: readonly number[];
}

function readHash(): string | null {
  if (typeof window === 'undefined' || window.location.hash.length <= 1) {
    return null;
  }

  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return window.location.hash.slice(1);
  }
}

export function useActiveSection<const Section extends string>(
  sectionIds: readonly Section[],
  {
    activationOffset = 0.28,
    rootMargin = '-18% 0px -68% 0px',
    thresholds = DEFAULT_THRESHOLDS,
  }: ActiveSectionOptions = {},
): Section | null {
  const sectionKey = sectionIds.join('\u0000');
  const thresholdKey = thresholds.join(',');
  const [activeSection, setActiveSection] = useState<Section | null>(() => {
    const hash = readHash();

    return sectionIds.find((sectionId) => sectionId === hash) ?? sectionIds[0] ?? null;
  });
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    const ids = (sectionKey.length > 0 ? sectionKey.split('\u0000') : []) as Section[];
    const elements = ids.flatMap((sectionId) => {
      const element = document.getElementById(sectionId);

      return element ? [{ element, sectionId }] : [];
    });

    const updateActiveSection = (nextSection: Section | null) => {
      if (activeSectionRef.current === nextSection) {
        return;
      }

      activeSectionRef.current = nextSection;
      setActiveSection(nextSection);
    };

    if (elements.length === 0) {
      updateActiveSection(ids[0] ?? null);
      return undefined;
    }

    const sectionIdByElement = new Map<Element, Section>(
      elements.map(({ element, sectionId }) => [element, sectionId] as const),
    );
    const visibleSections = new Map<Section, IntersectionObserverEntry>();

    const chooseActiveSection = () => {
      const activationLine = window.innerHeight * activationOffset;
      const visibleCandidate = [...visibleSections.entries()].sort(([, first], [, second]) => {
        const firstDistance = Math.abs(first.boundingClientRect.top - activationLine);
        const secondDistance = Math.abs(second.boundingClientRect.top - activationLine);

        return firstDistance - secondDistance || second.intersectionRatio - first.intersectionRatio;
      })[0]?.[0];

      if (visibleCandidate) {
        updateActiveSection(visibleCandidate);
        return;
      }

      let nearestPassedSection = elements[0]?.sectionId ?? null;

      for (const { element, sectionId } of elements) {
        if (element.getBoundingClientRect().top > activationLine) {
          break;
        }

        nearestPassedSection = sectionId;
      }

      updateActiveSection(nearestPassedSection);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = sectionIdByElement.get(entry.target);

          if (!sectionId) {
            continue;
          }

          if (entry.isIntersecting) {
            visibleSections.set(sectionId, entry);
          } else {
            visibleSections.delete(sectionId);
          }
        }

        chooseActiveSection();
      },
      {
        rootMargin,
        threshold: thresholdKey.split(',').map(Number),
      },
    );

    for (const { element } of elements) {
      observer.observe(element);
    }

    const handleHashChange = () => {
      const hash = readHash();
      const matchingSection = ids.find((sectionId) => sectionId === hash);

      if (matchingSection) {
        updateActiveSection(matchingSection);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    chooseActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [activationOffset, rootMargin, sectionKey, thresholdKey]);

  return activeSection;
}
