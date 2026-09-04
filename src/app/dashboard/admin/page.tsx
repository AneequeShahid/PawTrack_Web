'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { Activity, ShieldCheck, Dog, Cat } from 'lucide-react';

export default function AdminDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(setAnimals);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out space-y-6 text-white">
      <h1 className="text-3xl font-bold">System Administration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141C26] p-6 rounded-lg border border-[#263241] flex items-center gap-4 hover:border-[#5B8DEF] transition-colors duration-300">
          <Activity className="text-[#5B8DEF] w-12 h-12" />
          <div><p className="text-sm text-gray-400">Total Animals</p><h2 className="text-3xl font-bold">{animals.length}</h2></div>
        </div>
        <div className="bg-[#141C26] p-6 rounded-lg border border-[#263241] flex items-center gap-4 hover:border-[#4ADE80] transition-colors duration-300">
          <ShieldCheck className="text-[#4ADE80] w-12 h-12" />
          <div><p className="text-sm text-gray-400">Adopted / Returned</p><h2 className="text-3xl font-bold">{animals.filter(a => a.status === 'Adopted' || a.status === 'Returned').length}</h2></div>
        </div>
        <div className="bg-[#141C26] p-6 rounded-lg border border-[#263241] flex items-center gap-4 hover:border-[#F5A623] transition-colors duration-300">
          <Activity className="text-[#F5A623] w-12 h-12" />
          <div><p className="text-sm text-gray-400">In Surgery / Medical</p><h2 className="text-3xl font-bold">{animals.filter(a => a.status === 'InSurgery' || a.status === 'Quarantined').length}</h2></div>
        </div>
      </div>

      <div className="bg-[#141C26] rounded-lg border border-[#263241] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111820] border-b border-[#263241]">
              <th className="p-4 font-semibold text-gray-300">ID</th>
              <th className="p-4 font-semibold text-gray-300">Name</th>
              <th className="p-4 font-semibold text-gray-300">Species</th>
              <th className="p-4 font-semibold text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal, i) => (
              <tr key={animal.animalID} className="border-b border-[#263241] hover:bg-[#111820] transition-colors duration-200" style={{ animationDelay: `${i * 50}ms` }}>
                <td className="p-4 font-mono text-[#5B8DEF]">{animal.animalID}</td>
                <td className="p-4 font-medium">{animal.name}</td>
                <td className="p-4 flex items-center gap-2">
                  {animal.species === 'Dog' ? <Dog size={16} className="text-gray-400"/> : <Cat size={16} className="text-gray-400"/>}
                  {animal.species}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    animal.status === 'Trapped' ? 'bg-[#F5A623] text-black' :
                    animal.status === 'Adopted' || animal.status === 'Returned' ? 'bg-[#4ADE80] text-black' :
                    'bg-[#5B8DEF] text-white'
                  }`}>
                    {animal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
