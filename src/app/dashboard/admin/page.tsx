'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { Activity, Heart, Syringe, Users, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DogMascot, CatMascot } from '@/components/illustrations/Mascots';

export default function AdminDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data));
  }, []);

  const totalAnimals = animals.length;
  const availableAnimals = animals.filter(a => a.status === 'Available').length;
  const adoptedAnimals = animals.filter(a => a.status === 'Adopted').length;
  const medicalCases = animals.filter(a => a.status === 'Quarantined' || a.status === 'InSurgery').length;
  const tnvrCases = animals.filter(a => ['Trapped', 'Recovering', 'Returned'].includes(a.status)).length;

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="absolute top-0 right-0 pointer-events-none opacity-10">
        <CatMascot state="happy" className="w-64 h-64 -mt-20 -mr-20" />
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-primary font-bold text-sm">
            <Activity size={16} /> Shelter Operations
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Good afternoon, Admin</h1>
          <p className="text-muted font-medium text-lg leading-relaxed">
            Here's what needs your attention today. You have <strong className="text-primary">{availableAnimals} animals</strong> available for adoption and <strong className="text-warning">{medicalCases} medical cases</strong> requiring attention.
          </p>
        </div>
        <div className="relative z-10 mt-8 md:mt-0">
          <DogMascot state="happy" className="w-48 h-48 drop-shadow-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <StatCard icon={Activity} title="Total Animals" value={totalAnimals} trend="+12% this month" onClick={() => router.push('/dashboard/animals')} />
        <StatCard icon={Heart} title="Adoptions" value={adoptedAnimals} trend="+8 this week" color="text-primary" bg="bg-primary/10" onClick={() => router.push('/dashboard/adoptions')} />
        <StatCard icon={Syringe} title="Medical Cases" value={medicalCases} trend="2 urgent" color="text-warning" bg="bg-warning/10" onClick={() => router.push('/dashboard/veterinarian')} />
        <StatCard icon={Users} title="TNVR Animals" value={tnvrCases} trend="+14% active" color="text-secondary" bg="bg-secondary/10" onClick={() => router.push('/dashboard/tnvr')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-foreground">Shelter Impact</h2>
          <div className="bg-surface border border-border rounded-3xl p-8 shadow-soft flex gap-8 items-center justify-around flex-wrap">
            <ImpactStat number={adoptedAnimals} label="ADOPTIONS" />
            <ImpactStat number={tnvrCases} label="TNVR CASES" />
            <ImpactStat number={12} label="VACCINATIONS" />
            <ImpactStat number={totalAnimals} label="RESCUES" />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">Needs Attention</h2>
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-soft space-y-4">
            <AttentionItem icon="⚕️" text={`${medicalCases} animals require medical follow-up`} link="/dashboard/veterinarian" router={router} />
            <AttentionItem icon="💉" text="4 vaccinations due this week" link="/dashboard/veterinarian" router={router} />
            <AttentionItem icon="🐕" text="3 adoption applications awaiting review" link="/dashboard/adoptions" router={router} />
            <AttentionItem icon="🏠" text="2 animals in shelter > 90 days" link="/dashboard/animals" router={router} />
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20">
         <CatMascot state="sleeping" className="w-32 h-32" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, trend, color = "text-foreground", bg = "bg-black/5", onClick }: { icon: React.ElementType, title: string, value: number, trend: string, color?: string, bg?: string, onClick?: () => void }) {
  return (
    <motion.div whileHover={{ y: -5 }} onClick={onClick} className="bg-surface border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center`}>
          <Icon className={`${color} w-6 h-6`} />
        </div>
        <ArrowUpRight className="text-muted group-hover:text-foreground transition-colors" size={20} />
      </div>
      <h3 className="text-muted font-bold text-sm mb-1">{title}</h3>
      <div className="flex items-end gap-3">
        <span className="text-3xl font-black text-foreground font-heading">{value}</span>
        <span className="text-xs font-bold text-success mb-1">{trend}</span>
      </div>
    </motion.div>
  );
}

function ImpactStat({ number, label }: { number: number, label: string }) {
  return (
    <div className="text-center group">
      <div className="text-5xl font-black text-foreground font-heading group-hover:scale-110 transition-transform mb-2">{number}</div>
      <div className="text-xs font-bold text-muted uppercase tracking-widest">{label}</div>
    </div>
  );
}

function AttentionItem({ icon, text, link, router }: { icon: string, text: string, link: string, router: any }) {
  return (
    <div onClick={() => router.push(link)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-black/5 transition-colors cursor-pointer group">
      <div className="w-10 h-10 bg-background border border-border rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
      <p className="flex-1 font-bold text-sm text-foreground">{text}</p>
      <ArrowRight className="text-muted group-hover:text-primary transition-colors" size={16} />
    </div>
  );
}
