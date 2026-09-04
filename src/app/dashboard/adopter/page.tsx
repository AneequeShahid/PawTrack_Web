'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function AdopterDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data.filter((a: Animal) => a.status === 'AdoptionPending' || a.status === 'Recovering' || a.status === 'Available')));
  }, []);

  const handleInterest = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#7C9A78', '#E8A87C', '#F2D06B'] });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground">Meet Your New Best Friend</h1>
        <p className="text-muted mt-2">These wonderful animals are looking for their forever home.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {animals.map((animal, i) => (
          <motion.div key={animal.animalID} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5, scale: 1.01 }}
            className="bg-surface rounded-3xl border border-border overflow-hidden hover:shadow-lg transition-all group cursor-pointer relative flex flex-col">
            
            <div className="h-56 bg-primary/10 flex items-center justify-center text-gray-600 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10" />
               <motion.span className="text-7xl group-hover:scale-110 transition-transform duration-500 z-0">
                  {animal.species === 'Dog' ? '🐕' : animal.species === 'Cat' ? '🐈' : '🐾'}
               </motion.span>
               <div className="absolute top-4 left-4 z-20">
                  <span className="bg-surface text-foreground font-bold px-3 py-1 rounded-full text-xs shadow-sm">
                    ● {animal.status}
                  </span>
               </div>
            </div>
            
            <div className="p-6 relative z-20 flex-1 flex flex-col">
              <h2 className="text-2xl font-heading font-bold mb-1 text-foreground">{animal.name}</h2>
              <p className="text-sm text-muted font-medium mb-6">{animal.age} yrs • {animal.gender} • {animal.species}</p>
              
              <div className="mt-auto">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleInterest}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-[#6a8767] transition-colors shadow-soft">
                  <Heart size={18} /> Adopt {animal.name}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
