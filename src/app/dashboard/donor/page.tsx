'use client';
import { Activity, DollarSign, Users } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { motion } from 'framer-motion';

export default function DonorDashboard() {
  return (
    <div className="text-white space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Impact Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-[#141C26] to-[#111820] p-8 rounded-2xl border border-[#263241] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4ADE80]/5 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none"></div>
          <div className="w-12 h-12 bg-[#4ADE80]/10 rounded-xl flex items-center justify-center mb-6 border border-[#4ADE80]/20"><DollarSign className="text-[#4ADE80]" /></div>
          <p className="text-gray-400 font-medium mb-1">Total Contribution</p>
          <h2 className="text-5xl font-bold text-white">$<CountUp value={1250} /></h2>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-[#141C26] to-[#111820] p-8 rounded-2xl border border-[#263241] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B8DEF]/5 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none"></div>
          <div className="w-12 h-12 bg-[#5B8DEF]/10 rounded-xl flex items-center justify-center mb-6 border border-[#5B8DEF]/20"><Activity className="text-[#5B8DEF]" /></div>
          <p className="text-gray-400 font-medium mb-1">Animals Helped</p>
          <h2 className="text-5xl font-bold text-white"><CountUp value={14} /></h2>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-[#141C26] to-[#111820] p-8 rounded-2xl border border-[#263241] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A623]/5 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none"></div>
          <div className="w-12 h-12 bg-[#F5A623]/10 rounded-xl flex items-center justify-center mb-6 border border-[#F5A623]/20"><Users className="text-[#F5A623]" /></div>
          <p className="text-gray-400 font-medium mb-1">Colonies Supported</p>
          <h2 className="text-5xl font-bold text-white"><CountUp value={2} /></h2>
        </motion.div>
      </div>
    </div>
  );
}
