import { ImagePlus } from 'lucide-react';
import { useState } from 'react';

import { useLocale } from '../../i18n/LocaleContext';
import type { ImageSlotData } from '../../types/content';

interface ImageSlotProps {
  slot: ImageSlotData;
  priority?: boolean;
  className?: string;
}

type ImageStatus = 'checking' | 'loaded' | 'missing';

const GENERATED_EXAMPLE_ROOT = '/examples/generated';

export function ImageSlot({ slot, priority = false, className = '' }: ImageSlotProps) {
  const { content } = useLocale();
  const uiCopy = content.ui.copy;
  const imageCopy = content.images.content;
  const shouldLoadImage = slot.available === true;
  const [status, setStatus] = useState<ImageStatus>(shouldLoadImage ? 'checking' : 'missing');
  const imagePath = `${GENERATED_EXAMPLE_ROOT}/${slot.fileName}`;
  const previewImagePath = imagePath.replace(/\.webp$/u, '-800.webp');

  return (
    <figure
      data-image-slot={slot.id}
      data-image-status={status}
      className={`overflow-hidden rounded-2xl border border-ink/12 bg-white/62 shadow-[0_8px_24px_rgba(55,66,58,.06)] ${className}`}
    >
      <div className="relative aspect-square overflow-hidden border-b border-ink/12 bg-pure-white text-ink">
        {shouldLoadImage ? (
          <img
            className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
              status === 'loaded' ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            src={imagePath}
            srcSet={`${previewImagePath} 800w, ${imagePath} 1600w`}
            sizes="(min-width: 1280px) 700px, (min-width: 768px) 50vw, 100vw"
            width={slot.resolution.width}
            height={slot.resolution.height}
            alt={status === 'loaded' ? slot.alt : ''}
            aria-hidden={status !== 'loaded'}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => {
              setStatus('loaded');
            }}
            onError={() => {
              setStatus('missing');
            }}
          />
        ) : null}

        <div
          data-image-fallback
          className={`absolute inset-0 flex flex-col justify-between p-5 sm:p-6 ${
            status === 'loaded' ? 'invisible' : 'visible'
          }`}
          aria-hidden={status === 'loaded'}
        >
          <div className="flex items-start justify-between gap-4">
            <span className="border border-ink bg-ink px-2 py-1 font-mono text-[0.62rem] font-bold tracking-[0.12em] text-white uppercase">
              {slot.label}
            </span>
            <ImagePlus aria-hidden="true" className="size-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="max-w-[24ch] text-sm leading-5 font-semibold">{slot.description}</p>
            <dl className="mt-4 grid gap-1 font-mono text-[0.63rem] leading-4 uppercase">
              <div className="grid grid-cols-[5.4rem_1fr] gap-2">
                <dt>{uiCopy.recommendedSize}</dt>
                <dd>
                  {slot.resolution.width} × {slot.resolution.height}
                </dd>
              </div>
              <div className="grid grid-cols-[5.4rem_1fr] gap-2">
                <dt>{uiCopy.expectedFile}</dt>
                <dd className="truncate">{slot.fileName}</dd>
              </div>
            </dl>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute top-2 left-2 size-4 border-t border-l border-ink"
        />
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 size-4 border-t border-r border-ink"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-2 size-4 border-b border-l border-ink"
        />
        <span
          aria-hidden="true"
          className="absolute right-2 bottom-2 size-4 border-r border-b border-ink"
        />
      </div>
      <figcaption data-image-caption className="grid gap-2.5 px-4 py-4 text-left sm:px-5 sm:py-5">
        <p className="text-sm leading-5 text-ink/72">
          <span data-image-caption-label="shown" className="mr-2 font-extrabold text-ink">
            {imageCopy.shownLabel}:
          </span>
          {slot.caption.shown}
        </p>
        <p className="text-sm leading-5 text-ink/86">
          <span data-image-caption-label="takeaway" className="mr-2 font-extrabold text-ink">
            {imageCopy.takeawayLabel}:
          </span>
          {slot.caption.takeaway}
        </p>
        {status !== 'loaded' ? <span className="sr-only">{slot.alt}</span> : null}
      </figcaption>
    </figure>
  );
}
