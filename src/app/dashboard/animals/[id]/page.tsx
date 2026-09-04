'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { PawPrint, Syringe, ClipboardList, Stethoscope, ArrowRight, CheckCircle2, Cat, Dog } from 'lucide-react';

export default function AnimalDetail({ params }: { params: { id: string } }) {
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimal(data.find((a: Animal) => a.animalID === params.id)));
  }, [params.id]);

  if (!animal) return <div className="text-white animate-pulse flex flex-col items-center justify-center py-20"><PawPrint size={48} className="text-[#5B8DEF] mb-4" /> Loading details...</div>;

  const statusPipeline = ['Trapped', 'Quarantined', 'InSurgery', 'Recovering', 'Returned', 'AdoptionPending', 'Adopted'];
  const currentIndex = statusPipeline.indexOf(animal.status);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out text-white space-y-8 relative">
      <div className="absolute top-0 right-10 opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '3s' }}>
        {animal.species === 'Dog' ? <Dog size={120} /> : <Cat size={120} />}
      </div>

      <h1 className="text-4xl font-bold flex items-center gap-4">
        {animal.name} <span className="text-lg font-mono text-[#5B8DEF] bg-[#141C26] px-3 py-1 rounded-full border border-[#263241]">ID: {animal.animalID}</span>
      </h1>

      <div className="bg-[#141C26] p-8 rounded-xl border border-[#263241] shadow-lg relative overflow-hidden">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2"><ArrowRight className="text-[#F5A623]"/> TNVR Pipeline Status</h2>
        <div className="flex items-center justify-between w-full relative z-10">
          {statusPipeline.map((step, idx) => (
            <div key={step} className="flex flex-col items-center flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-4 border-[#141C26] transition-colors duration-500 ${idx <= currentIndex ? 'bg-[#4ADE80] text-black' : 'bg-[#263241] text-gray-500'}`}>
                {idx <= currentIndex ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
              </div>
              <span className={`text-xs mt-2 font-medium ${idx <= currentIndex ? 'text-[#4ADE80]' : 'text-gray-500'}`}>{step}</span>
              {idx !== statusPipeline.length - 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-1 -z-10 transition-colors duration-500 ${idx < currentIndex ? 'bg-[#4ADE80]' : 'bg-[#263241]'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#141C26] p-6 rounded-xl border border-[#263241] hover:border-[#5B8DEF] transition-colors group">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 group-hover:text-[#5B8DEF] transition-colors"><ClipboardList size={20}/> Core Information</h3>
          <ul className="space-y-3 text-gray-300">
            <li><strong className="text-white">Species:</strong> {animal.species}</li>
            <li><strong className="text-white">Age:</strong> {animal.age} years</li>
            <li><strong className="text-white">Weight:</strong> {animal.weight} lbs</li>
            <li><strong className="text-white">Gender:</strong> {animal.gender}</li>
            {animal.species === 'Cat' && <li><strong className="text-white">Ear Tipped:</strong> {(animal as any).earTipped ? 'Yes' : 'No'}</li>}
          </ul>
        </div>

        <div className="bg-[#141C26] p-6 rounded-xl border border-[#263241] hover:border-[#F87171] transition-colors group">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 group-hover:text-[#F87171] transition-colors"><Syringe size={20}/> Medical History</h3>
          {animal.medicalRecord.vaccinations.length > 0 ? (
            <ul className="space-y-2 text-sm text-gray-300">
              {animal.medicalRecord.vaccinations.map((v, i) => <li key={i}>💉 {v.date}: {v.vaccineType}</li>)}
            </ul>
          ) : <p className="text-gray-500 text-sm">No vaccinations on record.</p>}
          
          <h4 className="font-semibold mt-4 mb-2 flex items-center gap-2"><Stethoscope size={16}/> Surgeries</h4>
          {animal.medicalRecord.surgeries.length > 0 ? (
            <ul className="space-y-2 text-sm text-gray-300">
              {animal.medicalRecord.surgeries.map((s, i) => <li key={i}>✂️ {s.date}: {s.procedure}</li>)}
            </ul>
          ) : <p className="text-gray-500 text-sm">No surgeries on record.</p>}
        </div>
      </div>
    </div>
  );
}
