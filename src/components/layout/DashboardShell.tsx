'use client';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Home, Users, Activity, PawPrint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardShell({ children, role }: { children: React.ReactNode; role: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-[#0B0F14] text-white">
      <aside className="w-72 bg-[#111820] border-r border-[#263241] flex flex-col z-20 shadow-2xl">
        <div className="p-8 border-b border-[#263241] flex flex-col items-center">
          <div className="w-16 h-16 bg-[#141C26] rounded-full flex items-center justify-center border-2 border-[#5B8DEF] shadow-[0_0_15px_rgba(91,141,239,0.2)] mb-4">
             <PawPrint className="text-[#5B8DEF] w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">PawTrack</h2>
          <span className="text-xs px-3 py-1 bg-[#5B8DEF]/10 rounded-full mt-2 inline-block text-[#5B8DEF] font-mono border border-[#5B8DEF]/20">{role}</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div onClick={() => router.push(`/dashboard/${role.toLowerCase()}`)} className="px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer relative group">
            {pathname === `/dashboard/${role.toLowerCase()}` && <motion.div layoutId="nav-bg" className="absolute inset-0 bg-[#5B8DEF]/10 border border-[#5B8DEF]/20 rounded-lg -z-10" />}
            <Home size={18} className={pathname === `/dashboard/${role.toLowerCase()}` ? 'text-[#5B8DEF]' : 'text-gray-400'} /> 
            <span className={pathname === `/dashboard/${role.toLowerCase()}` ? 'text-[#5B8DEF] font-medium' : 'text-gray-400 group-hover:text-white transition-colors'}>Dashboard</span>
          </div>
        </nav>
        <div className="p-6 border-t border-[#263241]">
          <button onClick={handleLogout} className="w-full px-4 py-3 flex items-center gap-3 text-gray-400 hover:text-[#F87171] hover:bg-[#F87171]/10 transition-all rounded-lg font-medium">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0B0F14] to-[#0a0d12] relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        <AnimatePresence mode="wait">
          <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="p-10 relative z-10">
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
