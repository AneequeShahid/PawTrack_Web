'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cat, Dog, Rabbit, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function TrapNewAnimal() {
  const router = useRouter();
  const [species, setSpecies] = useState('Cat');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#5B8DEF', '#F5A623'] });
    setTimeout(() => router.push('/dashboard/admin'), 1500);
  };

  return (
    <div className="text-white max-w-2xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <MapPin className="text-[#F5A623] w-10 h-10 animate-bounce" />
        <h1 className="text-4xl font-bold tracking-tight">Trap New Animal</h1>
      </div>

      <motion.form initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onSubmit={handleSubmit}
        className="bg-[#141C26] p-8 rounded-2xl border border-[#263241] shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-[0.03] text-white pointer-events-none">
          {species === 'Cat' ? <Cat size={250}/> : species === 'Dog' ? <Dog size={250}/> : <Rabbit size={250}/>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">Species</label>
          <div className="flex gap-4">
            {['Cat', 'Dog', 'Other'].map(s => (
              <label key={s} className={`flex-1 cursor-pointer border-2 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all ${species === s ? 'border-[#5B8DEF] bg-[#5B8DEF]/10 shadow-[0_0_15px_rgba(91,141,239,0.2)]' : 'border-[#263241] hover:border-gray-500 hover:bg-[#111820]'}`}>
                <input type="radio" name="species" value={s} checked={species === s} onChange={() => setSpecies(s)} className="hidden" />
                {s === 'Cat' ? <Cat size={28} className={species===s?'text-[#5B8DEF]':'text-gray-400'}/> : s === 'Dog' ? <Dog size={28} className={species===s?'text-[#5B8DEF]':'text-gray-400'}/> : <Rabbit size={28} className={species===s?'text-gray-400':''}/>}
                <span className={`font-semibold ${species===s?'text-[#5B8DEF]':'text-gray-400'}`}>{s}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 relative z-10">
          <div><label className="block text-sm font-medium mb-2 text-gray-400">Temporary Name</label><input required className="w-full bg-[#0B0F14] border border-[#263241] p-3 rounded-lg focus:border-[#5B8DEF] focus:ring-1 focus:ring-[#5B8DEF] outline-none transition-all" placeholder="e.g. Scruffy" /></div>
          <div><label className="block text-sm font-medium mb-2 text-gray-400">Estimated Age (yrs)</label><input type="number" required className="w-full bg-[#0B0F14] border border-[#263241] p-3 rounded-lg focus:border-[#5B8DEF] focus:ring-1 focus:ring-[#5B8DEF] outline-none transition-all" /></div>
        </div>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" 
          className="w-full bg-[#5B8DEF] hover:bg-[#4a7ad6] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#5B8DEF]/30">
          <Send size={20} /> Register Trapped Animal
        </motion.button>
      </motion.form>
    </div>
  );
}
