'use client';
import { useEffect, useState } from 'react';
import { Animal, Cat as CatType } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowLeft, Stethoscope, Syringe, Scissors, Calendar, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AnimalDetail({ params }: { params: { id: string } }) {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimal(data.find((a: Animal) => a.animalID === params.id)));
  }, [params.id]);

  if (!animal) return <div className="p-20 text-center text-muted font-bold animate-pulse">Fetching details...</div>;

  return (
    <div className="space-y-8 pb-20">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-muted hover:text-foreground font-bold transition-colors">
        <ArrowLeft size={18} /> Back to Animals
      </button>

      <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border shadow-soft flex flex-col md:flex-row gap-10 items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-48 h-48 rounded-full bg-secondary/20 border-4 border-surface shadow-lg flex items-center justify-center text-8xl shrink-0 z-10">
          {animal.species === 'Dog' ? '🐕' : animal.species === 'Cat' ? '🐈' : '🐾'}
        </motion.div>

        <div className="flex-1 z-10 text-center md:text-left">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-3">{animal.name}</h1>
          <p className="text-xl text-muted font-medium mb-6">{animal.species} • {animal.age} years • {animal.gender} • {animal.weight} lbs</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <span className="bg-success/10 text-success border border-success/20 px-4 py-2 rounded-full font-bold text-sm">● {animal.status}</span>
            {animal.species === 'Cat' && (animal as CatType).earTipped && (
              <span className="bg-accent/20 text-accent-foreground border border-accent/30 px-4 py-2 rounded-full font-bold text-sm">Ear Tipped</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 z-10 w-full md:w-auto">
          <button className="bg-primary hover:bg-[#6a8767] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-soft transition-colors">
            <Heart size={18} /> Start Adoption
          </button>
          <button className="bg-surface border border-border hover:bg-black/5 text-foreground px-6 py-3 rounded-xl font-bold transition-colors">
            Edit Animal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-foreground">Medical Timeline</h2>
          <div className="bg-surface border border-border rounded-3xl p-8 shadow-soft">
            <div className="space-y-8">
              {animal.medicalRecord.vaccinations.length === 0 && animal.medicalRecord.surgeries.length === 0 && (
                <div className="text-center py-10 text-muted font-medium">No medical records yet.</div>
              )}
              
              {animal.medicalRecord.vaccinations.map((v, i) => (
                <TimelineItem key={`v-${i}`} delay={i * 0.1} icon={Syringe} color="text-secondary" bg="bg-secondary/10"
                  title="Vaccination Administered" date={v.date} desc={v.vaccineType} />
              ))}
              
              {animal.medicalRecord.surgeries.map((s, i) => (
                <TimelineItem key={`s-${i}`} delay={(animal.medicalRecord.vaccinations.length + i) * 0.1} icon={Scissors} color="text-warning" bg="bg-warning/10"
                  title="Surgery Performed" date={s.date} desc={s.procedure} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-foreground">Quick Info</h2>
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft space-y-4">
            <InfoRow icon={Calendar} label="Intake Date" value="Aug 14, 2026" />
            <InfoRow icon={Stethoscope} label="Health Status" value="Stable" valueColor="text-success" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ delay, icon: Icon, color, bg, title, date, desc }: { delay: number, icon: React.ElementType, color: string, bg: string, title: string, date: string, desc: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="flex gap-6 relative">
      <div className="absolute left-6 top-14 bottom-[-32px] w-0.5 bg-border -z-10" />
      <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center shrink-0 border border-current/10 shadow-sm z-10`}>
        <Icon className={`${color} w-5 h-5`} />
      </div>
      <div className="pt-2 pb-4">
        <h4 className="font-bold text-foreground text-lg">{title}</h4>
        <p className="text-muted text-sm font-semibold mb-1">{date}</p>
        <p className="text-foreground/80 font-medium">{desc}</p>
      </div>
    </motion.div>
  );
}

function InfoRow({ icon: Icon, label, value, valueColor = "text-foreground" }: { icon: React.ElementType, label: string, value: string, valueColor?: string }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-black/5 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Icon className="text-primary w-5 h-5" /></div>
      <div>
        <p className="text-xs text-muted font-bold uppercase">{label}</p>
        <p className={`font-bold ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
}
