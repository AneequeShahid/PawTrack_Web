'use client';
import { Activity, DollarSign, Users } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { motion } from 'framer-motion';

export default function DonorDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground">Your Impact</h1>
        <p className="text-muted mt-2">See how your contributions are helping animals find their forever homes.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-surface p-8 rounded-3xl border border-border shadow-soft relative overflow-hidden group transition-shadow hover:shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary/20 transition-colors"></div>
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20"><DollarSign className="text-primary w-6 h-6" /></div>
          <p className="text-muted font-bold mb-1 uppercase text-xs tracking-wider">Total Contribution</p>
          <h2 className="text-5xl font-heading font-bold text-foreground">$<CountUp value={1250} /></h2>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-surface p-8 rounded-3xl border border-border shadow-soft relative overflow-hidden group transition-shadow hover:shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-secondary/20 transition-colors"></div>
          <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 border border-secondary/20"><Activity className="text-secondary w-6 h-6" /></div>
          <p className="text-muted font-bold mb-1 uppercase text-xs tracking-wider">Animals Helped</p>
          <h2 className="text-5xl font-heading font-bold text-foreground"><CountUp value={14} /></h2>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-surface p-8 rounded-3xl border border-border shadow-soft relative overflow-hidden group transition-shadow hover:shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-accent/30 transition-colors"></div>
          <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 border border-accent/30"><Users className="text-accent-foreground w-6 h-6" /></div>
          <p className="text-muted font-bold mb-1 uppercase text-xs tracking-wider">Colonies Supported</p>
          <h2 className="text-5xl font-heading font-bold text-foreground"><CountUp value={2} /></h2>
        </motion.div>
      </div>
    </div>
  );
}
