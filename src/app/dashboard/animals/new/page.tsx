'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cat, Dog, Rabbit, MapPin, Send } from 'lucide-react';

export default function TrapNewAnimal() {
  const router = useRouter();
  const [species, setSpecies] = useState('Cat');

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-white max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <MapPin className="text-[#F5A623] w-10 h-10 animate-bounce" />
        <h1 className="text-4xl font-bold">Trap New Animal</h1>
      </div>

      <form className="bg-[#141C26] p-8 rounded-xl border border-[#263241] shadow-2xl space-y-6 relative overflow-hidden" onSubmit={(e) => { e.preventDefault(); router.push('/dashboard/admin'); }}>
        <div className="absolute -top-10 -right-10 opacity-10 text-white pointer-events-none">
          {species === 'Cat' ? <Cat size={200} className="animate-pulse"/> : species === 'Dog' ? <Dog size={200} className="animate-pulse"/> : <Rabbit size={200} className="animate-pulse"/>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Species</label>
          <div className="flex gap-4">
            {['Cat', 'Dog', 'Other'].map(s => (
              <label key={s} className={`flex-1 cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${species === s ? 'border-[#5B8DEF] bg-[#1d2838]' : 'border-[#263241] hover:border-gray-500'}`}>
                <input type="radio" name="species" value={s} checked={species === s} onChange={() => setSpecies(s)} className="hidden" />
                {s === 'Cat' ? <Cat size={24}/> : s === 'Dog' ? <Dog size={24}/> : <Rabbit size={24}/>}
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 relative z-10">
          <div><label className="block text-sm mb-1 text-gray-400">Temporary Name</label><input required className="w-full bg-[#0B0F14] border border-[#263241] p-3 rounded-lg focus:border-[#5B8DEF] outline-none transition-colors" placeholder="e.g. Scruffy" /></div>
          <div><label className="block text-sm mb-1 text-gray-400">Estimated Age (yrs)</label><input type="number" required className="w-full bg-[#0B0F14] border border-[#263241] p-3 rounded-lg focus:border-[#5B8DEF] outline-none" /></div>
        </div>

        {species === 'Cat' && (
          <div className="p-4 bg-[#111820] rounded-lg border border-[#263241] flex items-center justify-between mt-4">
            <span>Has this cat been ear-tipped?</span>
            <input type="checkbox" className="w-5 h-5 accent-[#5B8DEF]" />
          </div>
        )}

        <button type="submit" className="w-full bg-[#5B8DEF] hover:bg-[#4a7ad6] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(91,141,239,0.3)]">
          <Send size={20} /> Register Trapped Animal
        </button>
      </form>
    </div>
  );
}
