'use client';
import { Users, MapPin, Clock } from 'lucide-react';
import { DogMascot } from '@/components/illustrations/Mascots';

export default function VolunteerTracking() {
  return (
    <div className="space-y-8 pb-20 relative">
      <div className="bg-primary/10 border border-primary/20 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-primary font-bold text-sm">
            <Users size={16} /> Field Ops
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Volunteer Tracking</h1>
          <p className="text-muted font-medium text-lg leading-relaxed">
            Monitor active field volunteers, daily TNVR trapping routes, and total hours logged across the city.
          </p>
        </div>
        <div className="relative z-10 mt-8 md:mt-0">
          <DogMascot state="happy" className="w-48 h-48 drop-shadow-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {[
          { name: "Aisha Khan", area: "DHA Phase 5", hours: 120, status: "Active Now" },
          { name: "Zainab Ali", area: "Model Town", hours: 85, status: "Off Duty" },
          { name: "Ahmed Raza", area: "Gulberg III", hours: 210, status: "Trapping" },
          { name: "Sara Tariq", area: "Johar Town", hours: 45, status: "Active Now" }
        ].map((v, i) => (
          <div key={i} className="bg-surface border border-border p-6 rounded-3xl shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">{v.name.charAt(0)}</div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${v.status === 'Off Duty' ? 'bg-black/5 text-muted' : 'bg-success/10 text-success'}`}>{v.status}</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{v.name}</h3>
              <p className="text-sm font-bold text-muted flex items-center gap-1 mt-1"><MapPin size={14}/> {v.area}</p>
            </div>
            <div className="mt-2 pt-4 border-t border-border flex items-center justify-between text-sm font-bold text-muted">
              <span>Total Impact</span>
              <span className="flex items-center gap-1"><Clock size={14}/> {v.hours} hrs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
