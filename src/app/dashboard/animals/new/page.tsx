'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { DogMascot } from '@/components/illustrations/Mascots';

export default function TrapNewAnimal() {
  const router = useRouter();
  const [species, setSpecies] = useState('Dog');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#7C9A78', '#E8A87C', '#F2D06B'] });
    setTimeout(() => router.push('/dashboard/admin'), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      
      <motion.form initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} onSubmit={handleSubmit}
        className="bg-surface p-10 rounded-3xl border border-border shadow-soft relative overflow-hidden flex flex-col md:flex-row gap-10">
        
        <div className="flex-1 space-y-8 relative z-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3"><Plus className="text-primary"/> Add Animal</h1>
            <p className="text-muted mt-2 font-medium">Let&apos;s get this new resident into PawTrack.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-3">Species</label>
            <div className="flex gap-4">
              {['Dog', 'Cat', 'Other'].map(s => (
                <label key={s} className={`flex-1 cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm ${species === s ? 'border-primary bg-primary/5' : 'border-border hover:border-muted hover:bg-black/5'}`}>
                  <input type="radio" name="species" value={s} checked={species === s} onChange={() => setSpecies(s)} className="hidden" />
                  <span className="text-3xl">{s === 'Dog' ? '🐕' : s === 'Cat' ? '🐈' : '🐾'}</span>
                  <span className={`font-bold text-sm ${species===s?'text-primary':'text-muted'}`}>{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-foreground">Temporary Name</label>
              <input required className="w-full bg-background border border-border p-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm placeholder:text-muted" placeholder="e.g. Bruno" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-foreground">Estimated Age (yrs)</label>
              <input type="number" required className="w-full bg-background border border-border p-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm placeholder:text-muted" placeholder="e.g. 3" />
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" 
            className="w-full bg-primary hover:bg-[#6a8767] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-soft mt-8">
            <Send size={18} /> Register Trapped Animal
          </motion.button>
        </div>

        {/* Playful Side Decoration */}
        <div className="hidden md:flex w-1/3 bg-primary/10 rounded-2xl border border-primary/20 items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
           <div className="text-center p-6 relative z-10">
              <DogMascot state={species === 'Dog' ? 'happy' : 'idle'} className="w-40 h-40 mx-auto drop-shadow-lg mb-4" />
              <p className="text-primary font-bold text-sm">&quot;Every tail wags a little harder when you&apos;re here!&quot;</p>
           </div>
        </div>

      </motion.form>
    </div>
  );
}
