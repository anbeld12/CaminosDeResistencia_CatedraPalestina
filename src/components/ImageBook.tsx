import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Icon } from '../lib/icons';

interface ImageBookProps {
  src: string;
  alt?: string;
  label?: string;
  credit?: string;
  naturalWidth: number;
  naturalHeight: number;
  className?: string;
}

export function ImageBook({ src, alt, label, credit, naturalWidth, naturalHeight, className = '' }: ImageBookProps) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ w: 800, h: 500 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setStage({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!open) {
      setScale(1);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const aspect = naturalWidth / naturalHeight;
  const maxFitW = stage.w;
  const maxFitH = stage.h;
  const fitByH = maxFitH * aspect;
  const baseW = Math.min(maxFitW, fitByH);
  const baseH = baseW / aspect;

  const zoomIn = () => setScale(s => Math.min(s * 1.4, 20));
  const zoomOut = () => setScale(s => Math.max(s / 1.4, 0.10));
  const zoomReset = () => setScale(1);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setScale(s => Math.max(0.10, Math.min(20, s * (e.deltaY > 0 ? 0.9 : 1.1))));
    }
  }, []);

  const handleDoubleClick = () => {
    if (scale === 1) setScale(2);
    else setScale(1);
  };

  return (
    <div className={'image-book ' + className}>
      {/* ============ TRIGGER ============ */}
      <div
        className="image-book-trigger group"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Abrir visor: ${label ?? alt ?? src}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(true); }}
      >
        <img src={src} alt="" aria-hidden className="image-book-trigger-bg" />
        <div className="image-book-trigger-shade" />
        <span className="image-book-trigger-cta absolute bottom-3 right-3 z-10">
          <Icon.Search /> Abrir visor
        </span>

        {credit && (
          <div className="absolute bottom-3 left-3 z-10 flex flex-col items-start pointer-events-none">
            <div className="mb-1 w-56 p-2 bg-neutral-900/95 text-neutral-300 text-[9px] font-mono rounded-md border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-left leading-relaxed">
              {credit}
            </div>
            <button
              type="button"
              className="pointer-events-auto bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white/70 text-[10px] px-2 py-0.5 rounded-md font-mono transition-all opacity-40 group-hover:opacity-100"
              aria-label="Información de licencia"
              onClick={(e) => e.stopPropagation()}
            >
              ©
            </button>
          </div>
        )}
      </div>

      {/* ============ MODAL ============ */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="image-book-modal-veil"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="image-book-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="image-book-modal-header">
                <div className="kicker truncate">{label}</div>
                <div className="image-book-modal-zoom">
                  <button onClick={zoomOut} aria-label="Alejar"><ZoomOut size={14} /></button>
                  <span className="image-book-modal-zoom-pct">{Math.round(scale * 100)}%</span>
                  <button onClick={zoomIn} aria-label="Acercar"><ZoomIn size={14} /></button>
                  <button onClick={zoomReset} aria-label="Restablecer zoom"><RotateCcw size={14} /></button>
                </div>
                <button className="image-book-modal-close" onClick={() => setOpen(false)} aria-label="Cerrar">
                  <Icon.Close />
                </button>
              </div>

              {/* Stage */}
              <div
                ref={stageRef}
                className="image-book-modal-stage"
                onWheel={handleWheel}
                onDoubleClick={handleDoubleClick}
              >
                <motion.div
                  className="image-book-modal-pan"
                  drag={scale > 1}
                  dragConstraints={stageRef}
                  dragElastic={0}
                >
                  <img
                    src={src}
                    alt={alt ?? label ?? ''}
                    draggable={false}
                    className="image-book-modal-img"
                    style={{
                      width: baseW * scale,
                      height: baseH * scale,
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
