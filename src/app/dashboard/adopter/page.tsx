'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { Heart, Info } from 'lucide-react';

export default function AdopterDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data.filter((a: Animal) => a.status === 'AdoptionPending' || a.status === 'Recovering')));
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out text-white">
      <h1 className="text-3xl font-bold mb-6">Find Your New Best Friend</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {animals.map((animal, i) => (
          <div key={animal.animalID} className="bg-[#141C26] rounded-xl border border-[#263241] overflow-hidden hover:border-[#5B8DEF] hover:shadow-[0_0_15px_rgba(91,141,239,0.2)] transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="h-48 bg-[#111820] flex items-center justify-center text-gray-600">
               [Photo Placeholder]
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-1">{animal.name}</h2>
              <p className="text-sm text-gray-400 mb-4">{animal.age} yrs • {animal.gender} • {animal.species}</p>
              <button className="w-full flex items-center justify-center gap-2 bg-[#5B8DEF] text-white py-2 rounded font-semibold hover:bg-[#4a7ad6] transition-colors">
                <Heart size={18} /> Express Interest
              </button>
            </div>
          </div>
        ))}
        {animals.length === 0 && <div className="col-span-3 text-center text-gray-500 py-12">No animals currently pending adoption. Check back later!</div>}
      </div>
    </div>
  );
}
