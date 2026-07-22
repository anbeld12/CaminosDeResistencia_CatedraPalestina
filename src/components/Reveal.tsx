import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'li';
}

const TAG_MAP = {
  div: 'div',
  section: 'section',
  article: 'article',
  span: 'span',
  li: 'li',
} as const;

export function Reveal({
  children,
  delay = 0,
  y = 20,
  duration = 0.6,
  as = 'div',
  className,
  ...rest
}: RevealProps) {
  const [near, setNear] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!near) {
    const Tag = TAG_MAP[as] as 'div';
    return (
      <Tag ref={ref} className={className} style={{ opacity: 0, willChange: 'transform, opacity' }}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration, ease: 'easeOut', delay }}
      style={{ willChange: 'transform, opacity' }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
