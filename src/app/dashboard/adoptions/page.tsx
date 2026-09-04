'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function AdoptionsDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const router = useRouter();

  const fetchAnimals = () => fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data));
  useEffect(() => { fetchAnimals(); }, []);

  const adoptionAnimals = animals.filter(a => ['Available', 'AdoptionPending', 'Adopted'].includes(a.status));

  const columns = [
    { title: 'AVAILABLE', status: 'Available', color: 'border-border', bg: 'bg-black/5', text: 'text-muted' },
    { title: 'APPLICATIONS UNDER REVIEW', status: 'AdoptionPending', color: 'border-warning', bg: 'bg-warning/10', text: 'text-warning' },
    { title: 'FOREVER HOME FOUND', status: 'Adopted', color: 'border-primary', bg: 'bg-primary/10', text: 'text-primary' }
  ];

  const advanceStage = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Available' ? 'AdoptionPending' : 'Adopted';
    if (nextStatus === 'Adopted') {
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 }, colors: ['#7C9A78', '#E8A87C', '#F2D06B'] });
    }
    await fetch(`/api/animals/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: nextStatus }) });
    fetchAnimals();
  };

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3"><Heart className="text-primary"/> Adoption Management</h1>
        <p className="text-muted mt-2">Review applications and unite pets with their forever families.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colAnimals = adoptionAnimals.filter(a => a.status === col.status);
          return (
            <div key={col.title} className={`bg-surface border-t-4 ${col.color} rounded-2xl p-4 shadow-soft`}>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                <h3 className="font-bold text-sm text-foreground tracking-wider">{col.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${col.bg} ${col.text}`}>{colAnimals.length}</span>
              </div>
              
              <div className="space-y-4">
                {colAnimals.length === 0 && <div className="text-center py-10 text-muted font-medium text-sm">Nothing here yet.</div>}
                
                {colAnimals.map((animal, i) => (
                  <motion.div key={animal.animalID} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="bg-background border border-border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                    onClick={() => router.push(`/dashboard/animals/${animal.animalID}`)}>
                    
                    <div className="flex gap-4 items-center mb-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-2xl shadow-sm">
                        {animal.species === 'Dog' ? '🐕' : '🐈'}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{animal.name}</h4>
                        <p className="text-xs text-muted font-medium">{animal.breed}</p>
                      </div>
                    </div>
                    
                    {col.status === 'Available' && (
                      <button onClick={(e) => { e.stopPropagation(); advanceStage(animal.animalID, animal.status); }} 
                        className="w-full bg-surface hover:bg-black/5 border border-border py-2 rounded-lg text-xs font-bold text-foreground transition-colors">
                        Review Application
                      </button>
                    )}
                    {col.status === 'AdoptionPending' && (
                      <button onClick={(e) => { e.stopPropagation(); advanceStage(animal.animalID, animal.status); }} 
                        className="w-full bg-primary hover:bg-[#6a8767] py-2 rounded-lg text-xs font-bold text-white transition-colors">
                        Approve Adoption
                      </button>
                    )}
                    {col.status === 'Adopted' && (
                      <p className="text-xs font-bold text-primary text-center">A new chapter begins.</p>
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
