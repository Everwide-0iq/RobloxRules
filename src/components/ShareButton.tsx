import { Share2 } from 'lucide-react';
import { useState } from 'react';

import { useLocale } from '../i18n/LocaleContext';

interface ShareButtonProps {
  label: string;
  className?: string;
}

type ShareStatus = 'idle' | 'shared' | 'copied' | 'fallback';

async function copyAddress(url: string): Promise<boolean> {
  const clipboard: unknown = Reflect.get(navigator, 'clipboard');
  if (typeof clipboard === 'object' && clipboard !== null) {
    const writeText: unknown = Reflect.get(clipboard, 'writeText');
    if (typeof writeText !== 'function') return false;
    await Reflect.apply(writeText, clipboard, [url]);
    return true;
  }
  return false;
}

export function ShareButton({ label, className = '' }: ShareButtonProps) {
  const { content } = useLocale();
  const pageInterface = content.page;
  const [status, setStatus] = useState<ShareStatus>('idle');

  async function share() {
    const shareData = {
      title: pageInterface.share.title,
      text: pageInterface.share.text,
      url: window.location.href,
    };

    try {
      const nativeShare: unknown = Reflect.get(navigator, 'share');
      if (typeof nativeShare === 'function') {
        await Reflect.apply(nativeShare, navigator, [shareData]);
        setStatus('shared');
        return;
      }

      setStatus((await copyAddress(shareData.url)) ? 'copied' : 'fallback');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setStatus('fallback');
    }
  }

  const statusMessage =
    status === 'shared'
      ? pageInterface.share.shared
      : status === 'copied'
        ? pageInterface.share.copied
        : status === 'fallback'
          ? pageInterface.share.fallback
          : '';

  return (
    <div className={className}>
      <button
        type="button"
        className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/14 bg-white/6 px-5 text-sm font-black text-white transition-colors hover:bg-white/12"
        onClick={() => void share()}
      >
        <Share2 aria-hidden="true" className="size-4" />
        {label}
      </button>
      <p className="mt-2 min-h-5 text-xs text-white/72" aria-live="polite">
        {statusMessage}
      </p>
    </div>
  );
}
