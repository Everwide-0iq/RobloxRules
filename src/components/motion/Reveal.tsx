import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';

export interface RevealProps extends Omit<
  HTMLMotionProps<'div'>,
  'animate' | 'children' | 'initial' | 'transition' | 'viewport' | 'whileInView'
> {
  amount?: 'all' | 'some' | number;
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function Reveal({
  amount = 0.2,
  children,
  delay = 0,
  distance = 24,
  duration = 0.55,
  once = true,
  ...rest
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  if (prefersReducedMotion) {
    return <motion.div {...rest}>{children}</motion.div>;
  }

  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0, y: distance }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount, once }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
