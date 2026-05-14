import type { CSSProperties } from 'react';
import type { ImageVariant } from '../lib/types';

interface ImageSlotProps {
  height?: number;
  label: string;
  variant?: ImageVariant;
  className?: string;
}

const VARIANT_STRIPES: Record<ImageVariant, string> = {
  olive:  'repeating-linear-gradient(135deg, rgba(46,71,49,0.10) 0 14px, transparent 14px 28px)',
  terra:  'repeating-linear-gradient(135deg, rgba(139,29,34,0.10) 0 14px, transparent 14px 28px)',
  carbon: 'repeating-linear-gradient(135deg, rgba(18,18,18,0.10) 0 14px, transparent 14px 28px)',
};

export function ImageSlot({ height = 280, label, variant = 'olive', className = '' }: ImageSlotProps) {
  const style: CSSProperties = {
    height,
    background: `${VARIANT_STRIPES[variant]}, var(--bg-warm)`,
  };

  return (
    <div className={'image-slot ' + className} style={style}>
      <div className="image-slot-label">Imagen · {label}</div>
    </div>
  );
}
