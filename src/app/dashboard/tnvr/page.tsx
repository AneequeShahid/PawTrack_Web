'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { motion } from 'framer-motion';
import { Syringe, ArrowRight, Scissors } from 'lucide-react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function TNVRDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const router = useRouter();

  const fetchAnimals = () => fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data));
  useEffect(() => { fetchAnimals(); }, []);

  const tnvAnimals = animals.filter(a => ['Trapped', 'Quarantined', 'InSurgery', 'Recovering', 'Returned'].includes(a.status));

  const columns = [
    { title: 'TRAPPED', status: 'Trapped', color: 'border-primary', bg: 'bg-primary/10', text: 'text-primary' },
    { title: 'NEUTERED (In Surgery)', status: 'InSurgery', color: 'border-warning', bg: 'bg-warning/10', text: 'text-warning' },
    { title: 'VACCINATED (Recovering)', status: 'Recovering', color: 'border-secondary', bg: 'bg-secondary/10', text: 'text-secondary' },
    { title: 'RETURNED', status: 'Returned', color: 'border-success', bg: 'bg-success/10', text: 'text-success' }
  ];

  const advanceStage = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Trapped' ? 'InSurgery' : currentStatus === 'InSurgery' ? 'Recovering' : 'Returned';
    if (nextStatus === 'Returned') {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#7C9A78', '#E8A87C', '#F2D06B'] });
    }
    await fetch(`/api/animals/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: nextStatus }) });
    fetchAnimals();
  };

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3"><Syringe className="text-primary"/> TNVR Operations</h1>
        <p className="text-muted mt-2">Track community animals from initial sighting to safe return.</p>
      </div>

      <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 snap-x">
        {columns.map((col, idx) => {
          const colAnimals = tnvAnimals.filter(a => a.status === col.status);
          return (
            <div key={col.title} className={`flex-1 min-w-[300px] bg-surface border-t-4 ${col.color} rounded-2xl p-4 shadow-soft snap-center shrink-0`}>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                <h3 className="font-bold text-sm text-foreground tracking-wider">{col.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${col.bg} ${col.text}`}>{colAnimals.length}</span>
              </div>
              
              <div className="space-y-4">
                {colAnimals.length === 0 && <div className="text-center py-10 text-muted font-medium text-sm">Nothing here yet.<br/>This part of the shelter is quiet for now.</div>}
                
                {colAnimals.map((animal, i) => (
                  <motion.div key={animal.animalID} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-background border border-border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden"
                    onClick={() => router.push(`/dashboard/animals/${animal.animalID}`)}>
                    <div className="flex gap-4 items-center mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-black/5`}>
                        {animal.species === 'Dog' ? '🐕' : '🐈'}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{animal.name}</h4>
                        <p className="text-xs text-muted font-medium">{animal.animalID} • {animal.species}</p>
                      </div>
                    </div>
                    {col.status !== 'Returned' && (
                      <button onClick={(e) => { e.stopPropagation(); advanceStage(animal.animalID, animal.status); }} 
                        className="w-full mt-2 bg-surface hover:bg-black/5 border border-border py-2 rounded-lg text-xs font-bold text-foreground transition-colors">
                        Move to next stage →
                      </button>
                    )}
                    {col.status === 'Returned' && (
                      <p className="text-xs font-bold text-success text-center mt-2">Safe, vaccinated & back home.</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
