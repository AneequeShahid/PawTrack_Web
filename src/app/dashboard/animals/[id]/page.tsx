'use client';
import { useEffect, useState } from 'react';
import { Animal, Cat as CatType } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Stethoscope, Syringe, Scissors, Calendar, Heart, Trash2, Edit3, X, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function AnimalDetail({ params }: { params: { id: string } }) {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState(0);
  const router = useRouter();

  const fetchAnimal = () => {
    fetch('/api/animals').then(res => res.json()).then(data => {
      const a = data.find((a: Animal) => a.animalID === params.id);
      setAnimal(a);
      if (a) {
        setEditName(a.name);
        setEditAge(a.age);
      }
    });
  };

  useEffect(() => {
    fetchAnimal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this animal?')) {
      await fetch(`/api/animals/${params.id}`, { method: 'DELETE' });
      router.push('/dashboard/animals');
    }
  };

  const handleAdopt = async () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#7C9A78', '#E8A87C', '#F2D06B'] });
    await fetch(`/api/animals/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Adopted' })
    });
    fetchAnimal();
  };

  const handleSaveEdit = async () => {
    await fetch(`/api/animals/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, age: editAge })
    });
    setIsEditing(false);
    fetchAnimal();
  };

  if (!animal) return <div className="p-20 text-center text-muted font-bold animate-pulse">Fetching details...</div>;

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="flex justify-between items-center">
        <button onClick={() => router.push('/dashboard/animals')} className="flex items-center gap-2 text-muted hover:text-foreground font-bold transition-colors">
          <ArrowLeft size={18} /> Back to Animals
        </button>
        <button onClick={handleDelete} className="flex items-center gap-2 text-danger hover:bg-danger/10 px-4 py-2 rounded-xl font-bold transition-colors text-sm">
          <Trash2 size={16} /> Delete Animal
        </button>
      </div>

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
          {animal.status !== 'Adopted' && (
            <button onClick={handleAdopt} className="bg-primary hover:bg-[#6a8767] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-soft transition-colors">
              <Heart size={18} /> Register Adoption
            </button>
          )}
          <button onClick={() => setIsEditing(true)} className="bg-surface border border-border hover:bg-black/5 text-foreground px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
            <Edit3 size={18} /> Edit Information
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
            <InfoRow icon={Calendar} label="Intake Date" value={animal.intakeDate} />
            <InfoRow icon={Stethoscope} label="Health Status" value={animal.status === 'Quarantined' || animal.status === 'InSurgery' ? 'Requires Attention' : 'Stable'} valueColor={animal.status === 'Quarantined' || animal.status === 'InSurgery' ? 'text-warning' : 'text-success'} />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditing(false)} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-surface border border-border rounded-3xl p-8 max-w-md w-full shadow-lg relative z-10">
              <button onClick={() => setIsEditing(false)} className="absolute top-6 right-6 text-muted hover:text-foreground transition-colors"><X size={20} /></button>
              <h2 className="text-2xl font-heading font-bold mb-6 text-foreground">Edit {animal.name}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-foreground">Name</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-background border border-border p-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-foreground">Age (years)</label>
                  <input type="number" value={editAge} onChange={e => setEditAge(Number(e.target.value))} className="w-full bg-background border border-border p-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <button onClick={handleSaveEdit} className="w-full bg-primary hover:bg-[#6a8767] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 transition-colors">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
