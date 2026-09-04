'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { PawPrint, Navigation, ArrowRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function VolunteerDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data));
  }, []);

  const readyToReturn = animals.filter(a => a.status === 'Recovering');

  return (
    <div className="space-y-8 pb-20">
      
      <div className="bg-accent/20 border border-accent/30 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-accent-foreground font-bold text-sm">
            <PawPrint size={16} /> Volunteer Dashboard
          </div>
          <h2 className="text-4xl font-heading font-bold text-foreground">Trap & Return (TNVR)</h2>
          <p className="text-muted font-medium text-lg">
            There are {readyToReturn.length} animals ready to be transported back to their home colonies today.
          </p>
          <div className="flex gap-4 mt-2">
            <button onClick={() => router.push('/dashboard/animals/new')} className="bg-accent-foreground hover:bg-[#dfb94a] text-foreground px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
              <PawPrint size={18} /> Trap New Animal
            </button>
            <button onClick={() => router.push('/dashboard/tnvr')} className="bg-white hover:bg-black/5 text-foreground px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors border border-border">
              TNVR Pipeline <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="text-9xl mt-6 md:mt-0 drop-shadow-xl select-none relative z-10">
          🚐
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Ready for Return</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {readyToReturn.length === 0 && <div className="text-muted p-10 bg-surface rounded-3xl border border-border text-center font-bold">All clear! No animals pending return.</div>}
          
          {readyToReturn.map((animal, i) => (
            <motion.div key={animal.animalID} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border rounded-3xl p-6 shadow-soft flex flex-col justify-between">
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-secondary/10 text-2xl flex items-center justify-center rounded-2xl">{animal.species === 'Dog' ? '🐕' : '🐈'}</div>
                  <div>
                    <h4 className="font-bold text-foreground text-xl">{animal.name}</h4>
                    <p className="text-sm text-muted font-medium">Cleared by Vet Clinic</p>
                  </div>
                </div>
                <span className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-xs font-bold">● {animal.status}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => router.push(`/dashboard/animals/${animal.animalID}`)} className="flex-1 bg-background border border-border hover:bg-black/5 text-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <MapPin size={16} /> View Details
                </button>
                <button onClick={() => router.push('/dashboard/tnvr')} className="flex-1 bg-primary hover:bg-[#6a8767] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
                  <Navigation size={16} /> Execute Return
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
