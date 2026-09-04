'use client';
import { motion } from 'framer-motion';

export const PawPrint = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.svg viewBox="0 0 24 24" fill="currentColor" className={className}
    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 0.1, scale: 1 }} transition={{ delay, duration: 1 }}>
    <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 6c-3.3 0-6 2.7-6 6v3h12v-3c0-3.3-2.7-6-6-6z" />
  </motion.svg>
);

export const MascotWaving = () => (
  <motion.svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-2xl"
    animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
    <circle cx="50" cy="50" r="45" fill="#F4A184" opacity="0.2" />
    <path d="M30 60 Q50 90 70 60 Q80 40 50 30 Q20 40 30 60" fill="#5B8DEF" />
    <circle cx="40" cy="45" r="5" fill="#0B0F14" />
    <circle cx="60" cy="45" r="5" fill="#0B0F14" />
    <path d="M45 55 Q50 60 55 55" stroke="#0B0F14" strokeWidth="3" fill="none" strokeLinecap="round" />
    <motion.path d="M20 50 Q10 40 20 30" stroke="#5B8DEF" strokeWidth="8" strokeLinecap="round" fill="none"
      animate={{ rotate: [0, 20, 0], originX: "20px", originY: "50px" }} transition={{ repeat: Infinity, duration: 1.5 }} />
  </motion.svg>
);

export const MascotCelebrating = () => (
  <motion.svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-2xl"
    animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>
    <path d="M30 60 Q50 90 70 60 Q80 40 50 30 Q20 40 30 60" fill="#4ADE80" />
    <path d="M45 55 Q50 65 55 55" stroke="#0B0F14" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M50 10 L40 30 L60 30 Z" fill="#F5A623" />
  </motion.svg>
);
