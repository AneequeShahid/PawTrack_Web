'use client';
import { useEffect, useState } from 'react';
import { Animal } from '@/lib/types';
import { PawPrint, Heart, Activity, Stethoscope } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { motion } from 'framer-motion';
import { DogMascot } from '@/components/illustrations/Mascots';

export default function AdminDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    fetch('/api/animals').then(res => res.json()).then(data => setAnimals(data));
  }, []);

  const total = animals.length;
  const available = animals.filter(a => a.status === 'Recovering' || a.status === 'Returned').length;
  const medical = animals.filter(a => a.status === 'Quarantined' || a.status === 'InSurgery').length;
  
  // Decide which mascot to show based on data
  const mascotState = medical > 0 ? 'confused' : available > 0 ? 'happy' : 'sleeping';

  return (
    <div className="space-y-10">
      
      {/* WOW Moment: The Hero Card */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-primary/10 rounded-2xl p-10 border border-primary/20 flex items-center justify-between shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-heading font-bold text-foreground">Welcome to the floor.</h2>
          <p className="text-muted max-w-md leading-relaxed font-medium">The shelter is bustling today. We have {medical} cases that need attention and {available} furry friends ready for a home.</p>
          <div className="flex gap-4 pt-4">
            <span className="bg-surface px-4 py-2 rounded-xl text-sm font-bold shadow-sm border border-border flex items-center gap-2"><PawPrint size={16} className="text-primary"/> {total} Animals</span>
            <span className="bg-surface px-4 py-2 rounded-xl text-sm font-bold shadow-sm border border-border flex items-center gap-2"><Stethoscope size={16} className="text-secondary"/> {medical} Medical Cases</span>
          </div>
        </div>
        
        <div className="relative z-10 drop-shadow-xl">
          <DogMascot state={mascotState} className="w-48 h-48" />
        </div>
      </motion.div>

      {/* Meaningful Shelter Metrics */}
      <div>
        <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Shelter Snapshot</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Animals" value={total} icon={PawPrint} color="text-primary" bg="bg-primary/10" trend="+8 this month" delay={0.1} />
          <StatCard title="Available for Adoption" value={available} icon={Heart} color="text-secondary" bg="bg-secondary/10" trend="+5 this week" delay={0.2} />
          <StatCard title="Medical Cases" value={medical} icon={Stethoscope} color="text-warning" bg="bg-warning/10" trend="2 require attention" delay={0.3} />
          <StatCard title="Recently Rescued" value={13} icon={Activity} color="text-success" bg="bg-success/10" trend="this month" delay={0.4} />
        </div>
      </div>

      {/* Recent Activity / Animals List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
           <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Recent Arrivals</h3>
           <div className="bg-surface border border-border rounded-2xl shadow-soft divide-y divide-border overflow-hidden">
              {animals.slice(0, 4).map((animal, i) => (
                <motion.div key={animal.animalID} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-5 flex items-center justify-between hover:bg-black/[0.02] cursor-pointer transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {animal.species === 'Dog' ? '🐕' : animal.species === 'Cat' ? '🐈' : '🐾'}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{animal.name}</h4>
                      <p className="text-xs text-muted font-medium">{animal.species} • {animal.age} yrs • {animal.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${animal.status === 'Quarantined' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-success/10 text-success border-success/20'}`}>
                      ● {animal.status}
                    </span>
                    <span className="text-muted opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Quick Actions</h3>
          <div className="space-y-3">
             <ActionButton title="Add Animal Intake" icon={PawPrint} />
             <ActionButton title="Record Medical Event" icon={Stethoscope} />
             <ActionButton title="Register Adoption" icon={Heart} />
          </div>
        </div>
      </div>

    </div>
  );
}

// Helper Components
function StatCard({ title, value, icon: Icon, color, bg, trend, delay }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} whileHover={{ y: -2 }}
      className="bg-surface p-6 rounded-2xl border border-border shadow-soft flex flex-col justify-between group hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center border border-current/10`}>
          <Icon className={`${color} w-5 h-5 group-hover:rotate-12 transition-transform`} />
        </div>
        <span className="text-xs font-semibold text-muted bg-black/5 px-2 py-1 rounded-lg">{trend}</span>
      </div>
      <div>
        <h3 className="text-4xl font-heading font-bold text-foreground mb-1"><CountUp value={value} /></h3>
        <p className="text-sm font-bold text-muted">{title}</p>
      </div>
    </motion.div>
  );
}

function ActionButton({ title, icon: Icon }: any) {
  return (
    <motion.button whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.99 }}
      className="w-full bg-surface border border-border hover:border-primary/50 p-4 rounded-xl flex items-center gap-3 text-left shadow-soft hover:shadow-md transition-all group">
      <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        <Icon size={16} className="text-muted group-hover:text-primary transition-colors" />
      </div>
      <span className="font-bold text-sm text-foreground">{title}</span>
    </motion.button>
  );
}
