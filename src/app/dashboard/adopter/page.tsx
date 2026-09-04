'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function AdopterDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data.filter((a: Animal) => a.status === 'AdoptionPending' || a.status === 'Recovering')));
  }, []);

  const handleInterest = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#5B8DEF', '#F4A184', '#4ADE80'] });
  };

  return (
    <div className="text-white space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Find Your New Best Friend</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {animals.map((animal, i) => (
          <motion.div key={animal.animalID} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5, scale: 1.02 }}
            className="bg-[#141C26] rounded-2xl border border-[#263241] overflow-hidden hover:border-[#5B8DEF] shadow-xl group cursor-pointer">
            <div className="h-48 bg-[#111820] flex items-center justify-center text-gray-600 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-[#141C26] to-transparent z-10" />
               <span className="text-4xl group-hover:scale-125 transition-transform duration-500 z-0">🐾</span>
            </div>
            <div className="p-6 relative z-20 -mt-8">
              <h2 className="text-2xl font-bold mb-1">{animal.name}</h2>
              <p className="text-sm text-gray-400 mb-6 font-medium">{animal.age} yrs • {animal.gender} • {animal.species}</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleInterest}
                className="w-full flex items-center justify-center gap-2 bg-[#5B8DEF] text-white py-3 rounded-lg font-bold hover:bg-[#4a7ad6] transition-colors shadow-lg shadow-[#5B8DEF]/20">
                <Heart size={18} /> Express Interest
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
