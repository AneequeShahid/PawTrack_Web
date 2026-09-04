'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { Stethoscope, Syringe, CheckCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function VeterinarianDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data));
  }, []);

  const medicalCases = animals.filter(a => a.status === 'InSurgery' || a.status === 'Quarantined');

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-secondary/10 border border-secondary/20 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-secondary font-bold text-sm">
            <Stethoscope size={16} /> Clinic Dashboard
          </div>
          <h2 className="text-4xl font-heading font-bold text-foreground">Neuter & Vaccinate</h2>
          <p className="text-muted font-medium text-lg">
            You currently have {medicalCases.length} animals awaiting medical procedures or clearance.
          </p>
          <button onClick={() => router.push('/dashboard/tnvr')} className="bg-secondary hover:bg-[#d6986e] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors mt-2">
            Open Full TNVR Pipeline <ArrowRight size={18} />
          </button>
        </div>
        <div className="text-9xl mt-6 md:mt-0 drop-shadow-xl select-none relative z-10">
          🩺
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Pending Surgeries & Medical Cases</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {medicalCases.length === 0 && <div className="text-muted p-10 bg-surface rounded-3xl border border-border text-center font-bold">No active medical cases!</div>}
          
          {medicalCases.map((animal, i) => (
            <motion.div key={animal.animalID} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border rounded-3xl p-6 shadow-soft flex flex-col justify-between">
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-warning/10 text-2xl flex items-center justify-center rounded-2xl">{animal.species === 'Dog' ? '🐕' : '🐈'}</div>
                  <div>
                    <h4 className="font-bold text-foreground text-xl">{animal.name}</h4>
                    <p className="text-sm text-muted font-medium">{animal.species} • {animal.age} yrs • {animal.weight} lbs</p>
                  </div>
                </div>
                <span className="bg-warning/10 text-warning border border-warning/20 px-3 py-1 rounded-full text-xs font-bold">● {animal.status}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => router.push(`/dashboard/animals/${animal.animalID}`)} className="flex-1 bg-background border border-border hover:bg-black/5 text-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <Syringe size={16} /> Medical Record
                </button>
                <button onClick={() => router.push('/dashboard/tnvr')} className="flex-1 bg-success hover:bg-[#5da06e] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
                  <CheckCircle size={16} /> Clear for Return
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
