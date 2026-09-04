'use client';
import { DogMascot } from '@/components/illustrations/Mascots';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, ArrowRight, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AnimalDirectory() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const router = useRouter();

  const fetchAnimals = () => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data));
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this animal?')) {
      await fetch(`/api/animals/${id}`, { method: 'DELETE' });
      fetchAnimals(); // Refresh data
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Animals</h1>
          <p className="text-muted mt-2">Manage every animal currently under PawTrack.</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => router.push('/dashboard/animals/new')}
          className="bg-primary hover:bg-[#6a8767] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-soft transition-colors whitespace-nowrap">
          <Plus size={18} /> Add Animal
        </motion.button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <Search size={18} className="text-muted" />
          <input className="bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted" placeholder="Search animals by name or ID..." />
        </div>
        <button onClick={() => alert('Filtering options coming soon!')} className="bg-surface border border-border px-5 py-3 rounded-xl text-foreground font-semibold flex items-center gap-2 hover:bg-black/5 transition-colors">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal, i) => (
          <motion.div key={animal.animalID} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => router.push(`/dashboard/animals/${animal.animalID}`)}
            whileHover={{ y: -4, scale: 1.01 }} className="bg-surface border border-border rounded-2xl p-6 shadow-soft hover:shadow-md cursor-pointer group transition-all relative">
            
            <button onClick={(e) => handleDelete(e, animal.animalID)} className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-danger/10 text-muted hover:text-danger rounded-full transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 size={16} />
            </button>

            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-sm">
                {animal.species === 'Dog' ? '🐕' : animal.species === 'Cat' ? '🐈' : '🐾'}
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border mr-8 ${
                animal.status === 'Available' ? 'bg-success/10 text-success border-success/20' : 
                animal.status === 'Quarantined' ? 'bg-warning/10 text-warning border-warning/20' : 
                'bg-black/5 text-muted border-border'
              }`}>● {animal.status}</span>
            </div>

            <div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">{animal.name}</h3>
              <p className="text-muted text-sm font-medium mb-4">{animal.species} • {animal.age} yrs • {animal.gender}</p>
            </div>

            <div className="pt-4 border-t border-border flex justify-between items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              View Profile <ArrowRight size={16} />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="fixed bottom-20 left-10 pointer-events-none opacity-20 z-0">
         <DogMascot state="happy" className="w-32 h-32" />
      </div>
    </div>
  );
}
