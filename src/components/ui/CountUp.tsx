'use client';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function CountUp({ value }: { value: number }) {
  const spring = useSpring(0, { bounce: 0, duration: 2000 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());
  useEffect(() => { spring.set(value); }, [spring, value]);
  return <motion.span>{display}</motion.span>;
}
