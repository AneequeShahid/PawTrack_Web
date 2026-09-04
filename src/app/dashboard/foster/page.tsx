'use client';
import { Home, Heart } from 'lucide-react';
import { DogMascot } from '@/components/illustrations/Mascots';

export default function FosterNetwork() {
  return (
    <div className="space-y-8 pb-20 relative">
      <div className="bg-secondary/10 border border-secondary/20 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-secondary font-bold text-sm">
            <Home size={16} /> Foster Homes
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Foster Network</h1>
          <p className="text-muted font-medium text-lg leading-relaxed">
            Coordinate with your network of verified foster homes for animals recovering from surgery or too young for the shelter.
          </p>
        </div>
        <div className="relative z-10 mt-8 md:mt-0">
          <DogMascot state="happy" className="w-48 h-48 drop-shadow-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-surface border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Heart className="text-secondary w-5 h-5" />
              </div>
              <span className="bg-success/10 text-success px-2 py-1 rounded text-xs font-bold">Active</span>
            </div>
            <h3 className="text-foreground font-bold text-base mb-1">Foster Home #{i}</h3>
            <p className="text-xs text-muted font-bold">Capacity: 2 Animals</p>
          </div>
        ))}
      </div>
    </div>
  );
}
