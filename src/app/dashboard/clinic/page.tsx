'use client';
import { Syringe, Calendar, Clock } from 'lucide-react';
import { DogMascot } from '@/components/illustrations/Mascots';

export default function ClinicAppointments() {
  return (
    <div className="space-y-8 pb-20 relative">
      <div className="bg-primary/10 border border-primary/20 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-primary font-bold text-sm">
            <Syringe size={16} /> Partner Clinics
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Clinic Appointments</h1>
          <p className="text-muted font-medium text-lg leading-relaxed">
            Manage external veterinary appointments and transport schedules for animals requiring specialized surgical care.
          </p>
        </div>
        <div className="relative z-10 mt-8 md:mt-0 opacity-50">
          <DogMascot state="sleeping" className="w-48 h-48 drop-shadow-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-surface border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="text-primary w-6 h-6" />
            </div>
            <div>
               <h3 className="text-foreground font-bold text-lg mb-1">BNU Veterinary Hospital</h3>
               <div className="flex gap-4 text-xs font-bold text-muted mt-2">
                 <span className="flex items-center gap-1"><Clock size={14}/> {i + 1}:00 PM</span>
                 <span className="text-warning">Orthopedic Consult</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
