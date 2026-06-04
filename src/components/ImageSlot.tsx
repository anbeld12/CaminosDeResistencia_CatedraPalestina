import type { CSSProperties } from 'react';
import type { ImageVariant } from '../lib/types';

interface ImageSlotProps {
  height?: number;
  label: string;
  variant?: ImageVariant;
  className?: string;
  src?: string;
  alt?: string;
  credit?: string;
  objectPosition?: string;
}

const VARIANT_STRIPES: Record<ImageVariant, string> = {
  olive:  'repeating-linear-gradient(135deg, var(--olive-soft) 0 14px, transparent 14px 28px)',
  terra:  'repeating-linear-gradient(135deg, var(--terracotta-soft) 0 14px, transparent 14px 28px)',
  carbon: 'repeating-linear-gradient(135deg, var(--line-soft) 0 14px, transparent 14px 28px)',
};

export function ImageSlot({ height = 280, label, variant = 'olive', className = '', src, alt, credit, objectPosition }: ImageSlotProps) {
  const style: CSSProperties = {
    height,
    background: `${VARIANT_STRIPES[variant]}, var(--bg-warm)`,
  };

  return (
    <div className={'image-slot ' + className} style={style}>
      {src ? (
        <>
          <img src={src} alt={alt ?? label} className="image-slot-img" style={{ objectPosition: objectPosition ?? '50% 50%' }} />
          {credit && (
            <div className="absolute bottom-3 right-3 z-10 flex flex-col items-end">
              <div className="mb-1 w-56 p-2 bg-neutral-900/95 text-neutral-300 text-[9px] font-mono rounded-md border border-white/10 shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-right leading-relaxed">
                {credit}
              </div>
              <button
                type="button"
                className="bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white/70 text-[10px] px-2 py-0.5 rounded-md font-mono transition-all opacity-40 group-hover:opacity-100"
                aria-label="Información de licencia"
              >
                ©
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="image-slot-label">Imagen · {label}</div>
      )}
    </div>
  );
}
