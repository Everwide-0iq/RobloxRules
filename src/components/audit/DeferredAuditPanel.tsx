import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

const AuditPanel = lazy(() => import('./AuditPanel'));

interface DeferredAuditPanelProps {
  loadingLabel: string;
  errorTitle: string;
  errorBody: string;
  retryLabel: string;
}

interface AuditErrorBoundaryProps extends Omit<DeferredAuditPanelProps, 'loadingLabel'> {
  children: ReactNode;
}

function LoadingState({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <p className="text-sm font-bold text-white/70" aria-live={active ? 'polite' : undefined}>
      {label}
    </p>
  );
}

class AuditErrorBoundary extends Component<AuditErrorBoundaryProps, { hasError: boolean }> {
  override state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        className="max-w-xl rounded-2xl border border-white/12 bg-white/6 p-6 sm:p-8"
      >
        <h3 className="text-xl font-black tracking-[-0.03em]">{this.props.errorTitle}</h3>
        <p className="mt-3 text-sm leading-6 text-white/75">{this.props.errorBody}</p>
        <button
          type="button"
          className="mt-6 min-h-11 rounded-xl border border-white px-5 text-sm font-bold transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          onClick={() => {
            window.location.reload();
          }}
        >
          {this.props.retryLabel}
        </button>
      </div>
    );
  }
}

export function DeferredAuditPanel({
  loadingLabel,
  errorTitle,
  errorBody,
  retryLabel,
}: DeferredAuditPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    if (shouldLoad) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '800px 0px', threshold: 0.01 },
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="min-h-[24rem]">
      {shouldLoad ? (
        <AuditErrorBoundary errorTitle={errorTitle} errorBody={errorBody} retryLabel={retryLabel}>
          <Suspense fallback={<LoadingState label={loadingLabel} active />}>
            <AuditPanel />
          </Suspense>
        </AuditErrorBoundary>
      ) : (
        <LoadingState label={loadingLabel} />
      )}
    </div>
  );
}
