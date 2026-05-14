interface ImageSlotProps {
  height?: number;
  label: string;
  variant?: 'olive' | 'terra' | 'carbon';
  style?: React.CSSProperties;
  className?: string;
}

export function ImageSlot({ height = 280, label, variant = 'olive', style, className = '' }: ImageSlotProps) {
  const bg =
    variant === 'terra'
      ? 'repeating-linear-gradient(135deg, rgba(139,29,34,0.10) 0 14px, transparent 14px 28px)'
      : variant === 'carbon'
      ? 'repeating-linear-gradient(135deg, rgba(18,18,18,0.10) 0 14px, transparent 14px 28px)'
      : 'repeating-linear-gradient(135deg, rgba(46,71,49,0.10) 0 14px, transparent 14px 28px)';

  return (
    <div
      className={className}
      style={{
        height,
        borderRadius: 14,
        border: '1px solid var(--line)',
        background: `${bg}, var(--bg-warm)`,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute', bottom: 16, left: 16, right: 16,
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.15em',
        textTransform: 'uppercase', color: 'var(--fg-mute)',
        borderLeft: '2px solid var(--terracotta)',
        paddingLeft: 10,
      }}>
        Imagen · {label}
      </div>
    </div>
  );
}
