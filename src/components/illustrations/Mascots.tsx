'use client';
import { motion } from 'framer-motion';

export const PawPrint = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.svg viewBox="0 0 24 24" fill="currentColor" className={className}
    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, duration: 1 }}>
    <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 6c-3.3 0-6 2.7-6 6v3h12v-3c0-3.3-2.7-6-6-6z" />
  </motion.svg>
);

export const DogMascot = ({ state = 'idle', className = "w-32 h-32" }: { state?: 'idle' | 'sleeping' | 'happy' | 'confused', className?: string }) => {
  return (
    <motion.svg viewBox="0 0 100 100" className={className} 
      animate={state === 'idle' ? { y: [0, -3, 0] } : state === 'happy' ? { y: [0, -8, 0], rotate: [-2, 2, -2] } : {}} 
      transition={{ repeat: Infinity, duration: state === 'happy' ? 0.5 : 3, ease: "easeInOut" }}>
      
      {/* Body */}
      <circle cx="50" cy="65" r="30" fill="#E8A87C" />
      {/* Head */}
      <circle cx="50" cy="40" r="25" fill="#E8A87C" />
      
      {/* Ears */}
      {state === 'confused' ? (
        <>
          <path d="M25 35 Q15 20 10 40" fill="#D97878" />
          <path d="M75 35 Q85 10 90 20" fill="#D97878" />
        </>
      ) : state === 'sleeping' ? (
        <>
          <path d="M25 45 Q15 60 10 70" fill="#D8A74D" />
          <path d="M75 45 Q85 60 90 70" fill="#D8A74D" />
        </>
      ) : (
        <>
          <motion.path d="M25 35 Q15 20 10 40" fill="#D8A74D" animate={{ rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4 }} />
          <motion.path d="M75 35 Q85 20 90 40" fill="#D8A74D" animate={{ rotate: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 0.5 }} />
        </>
      )}

      {/* Eyes */}
      {state === 'sleeping' ? (
        <>
          <path d="M35 40 Q40 45 45 40" stroke="#17211B" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M55 40 Q60 45 65 40" stroke="#17211B" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : state === 'confused' ? (
        <>
          <circle cx="40" cy="38" r="3" fill="#17211B" />
          <circle cx="60" cy="42" r="4" fill="#17211B" />
        </>
      ) : (
        <>
          <circle cx="40" cy="38" r="3" fill="#17211B" />
          <circle cx="60" cy="38" r="3" fill="#17211B" />
        </>
      )}
      
      {/* Nose */}
      <circle cx="50" cy="48" r="4" fill="#17211B" />
      
      {/* Mouth */}
      {state === 'happy' ? (
        <path d="M45 55 Q50 65 55 55" fill="#E9A6A6" stroke="#17211B" strokeWidth="2" />
      ) : state === 'confused' ? (
        <path d="M45 55 L55 55" stroke="#17211B" strokeWidth="2" strokeLinecap="round" />
      ) : state === 'sleeping' ? (
        <path d="M48 53 Q50 55 52 53" stroke="#17211B" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M45 53 Q50 58 55 53" stroke="#17211B" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
      
      {/* Zzz for sleeping */}
      {state === 'sleeping' && (
        <motion.text x="70" y="20" fontSize="12" fill="#6B756E" fontStyle="italic" fontWeight="bold"
          animate={{ opacity: [0, 1, 0], y: [0, -10] }} transition={{ repeat: Infinity, duration: 2 }}>Zzz</motion.text>
      )}
    </motion.svg>
  );
};
