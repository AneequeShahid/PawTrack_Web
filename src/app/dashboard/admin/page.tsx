'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { PawPrint, Heart, Activity, Stethoscope, Syringe, Calendar, Users, AlertCircle } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { motion } from 'framer-motion';
import { DogMascot } from '@/components/illustrations/Mascots';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data));
  }, []);

  const total = animals.length;
  const available = animals.filter(a => a.status === 'Available' || a.status === 'Recovering').length;
  const medical = animals.filter(a => a.status === 'Quarantined' || a.status === 'InSurgery').length;
  
  // Decide which mascot to show based on data
  const mascotState = medical > 2 ? 'confused' : available > 0 ? 'happy' : 'idle';

  return (
    <div className="space-y-10 pb-20">
      
      {/* Enhanced Hero Card */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-primary/10 rounded-[2.5rem] p-12 border border-primary/20 flex flex-col md:flex-row items-center justify-between shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />
        
        <div className="relative z-10 space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/10 text-primary font-bold text-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            System Online & Running Smoothly
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
            Here is your daily <br/> PawTrack overview.
          </h2>
          <p className="text-muted text-lg leading-relaxed font-medium">
            Good morning! The shelter is bustling today. We currently have <strong className="text-foreground">{medical} medical cases</strong> requiring attention and <strong className="text-foreground">{available} furry friends</strong> looking for their forever homes. Check the medical logs below for upcoming vaccinations.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={() => router.push('/dashboard/animals')} className="bg-primary hover:bg-[#6a8767] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-soft transition-colors">
              <PawPrint size={18} /> View All Animals
            </button>
            <button onClick={() => router.push('/dashboard/users')} className="bg-surface hover:bg-black/5 text-foreground px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-border shadow-soft transition-colors">
              <Users size={18} /> Manage Staff
            </button>
          </div>
        </div>
        
        <div className="relative z-10 drop-shadow-2xl mt-10 md:mt-0">
          <DogMascot state={mascotState} className="w-64 h-64 md:w-80 md:h-80" />
        </div>
      </motion.div>

      {/* Meaningful Shelter Metrics */}
      <div>
        <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Shelter Snapshot</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Intake" value={total} icon={PawPrint} color="text-primary" bg="bg-primary/10" trend="+8 this month" delay={0.1} />
          <StatCard title="Available for Adoption" value={available} icon={Heart} color="text-secondary" bg="bg-secondary/10" trend="+5 this week" delay={0.2} />
          <StatCard title="Active Medical Cases" value={medical} icon={Stethoscope} color="text-warning" bg="bg-warning/10" trend="Requires attention" delay={0.3} />
          <StatCard title="Vaccines Due" value={14} icon={Syringe} color="text-accent-foreground" bg="bg-accent/20" trend="Next 7 days" delay={0.4} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Recent Animals List */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex justify-between items-end mb-4">
             <h3 className="text-sm font-bold text-muted uppercase tracking-wider">Recent Arrivals</h3>
             <button onClick={() => router.push('/dashboard/animals')} className="text-primary text-sm font-bold hover:underline">View All →</button>
           </div>
           <div className="bg-surface border border-border rounded-3xl shadow-soft divide-y divide-border overflow-hidden">
              {animals.slice(0, 4).map((animal, i) => (
                <motion.div key={animal.animalID} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  onClick={() => router.push(`/dashboard/animals/${animal.animalID}`)}
                  className="p-5 flex items-center justify-between hover:bg-black/[0.02] cursor-pointer transition-colors group">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">
                      {animal.species === 'Dog' ? '🐕' : animal.species === 'Cat' ? '🐈' : '🐾'}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">{animal.name}</h4>
                      <p className="text-sm text-muted font-medium">{animal.species} • {animal.age} yrs • {animal.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-4 py-1.5 rounded-full border ${animal.status === 'Quarantined' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-success/10 text-success border-success/20'}`}>
                      ● {animal.status}
                    </span>
                    <span className="text-muted opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Quick Actions & Vaccine Alerts */}
        <div className="space-y-10">
          <div>
            <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="space-y-3">
               <ActionButton title="Register New Animal" icon={PawPrint} onClick={() => router.push('/dashboard/animals/new')} />
               <ActionButton title="View Medical Records" icon={Stethoscope} onClick={() => router.push('/dashboard/animals')} />
               <ActionButton title="Manage Users" icon={Users} onClick={() => router.push('/dashboard/users')} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4 flex items-center gap-2"><AlertCircle size={16} className="text-warning"/> Vaccine Alerts</h3>
            <div className="bg-surface border border-border rounded-3xl p-5 shadow-soft space-y-4">
               <div className="flex gap-4 items-start pb-4 border-b border-border">
                 <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0"><Syringe size={18} className="text-accent-foreground"/></div>
                 <div>
                   <p className="font-bold text-foreground text-sm">Rabies Booster Due</p>
                   <p className="text-xs text-muted font-medium">For "Max" (Dog, 4 yrs) • Tomorrow</p>
                 </div>
               </div>
               <div className="flex gap-4 items-start">
                 <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0"><Syringe size={18} className="text-accent-foreground"/></div>
                 <div>
                   <p className="font-bold text-foreground text-sm">FVRCP Initial Series</p>
                   <p className="text-xs text-muted font-medium">For "Luna" (Cat, 1 yr) • In 3 Days</p>
                 </div>
               </div>
               <button onClick={() => router.push('/dashboard/animals')} className="w-full text-center text-xs font-bold text-primary hover:underline mt-2">See all medical tasks</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Helper Components
function StatCard({ title, value, icon: Icon, color, bg, trend, delay }: { title: string, value: number, icon: React.ElementType, color: string, bg: string, trend: string, delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} whileHover={{ y: -4 }}
      className="bg-surface p-6 rounded-[2rem] border border-border shadow-soft flex flex-col justify-between group hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center border border-current/10 shadow-sm`}>
          <Icon className={`${color} w-6 h-6 group-hover:rotate-12 transition-transform`} />
        </div>
        <span className="text-xs font-semibold text-muted bg-black/5 px-3 py-1.5 rounded-xl">{trend}</span>
      </div>
      <div>
        <h3 className="text-5xl font-heading font-bold text-foreground mb-2"><CountUp value={value} /></h3>
        <p className="text-sm font-bold text-muted">{title}</p>
      </div>
    </motion.div>
  );
}

function ActionButton({ title, icon: Icon, onClick }: { title: string, icon: React.ElementType, onClick: () => void }) {
  return (
    <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={onClick}
      className="w-full bg-surface border border-border hover:border-primary/50 p-4 rounded-2xl flex items-center gap-4 text-left shadow-soft hover:shadow-md transition-all group">
      <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        <Icon size={18} className="text-muted group-hover:text-primary transition-colors" />
      </div>
      <span className="font-bold text-sm text-foreground">{title}</span>
    </motion.button>
  );
}
