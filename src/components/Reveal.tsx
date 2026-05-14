import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'li';
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  duration = 0.6,
  as = 'div',
  className,
  ...rest
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration, ease: 'easeOut', delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
