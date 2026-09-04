'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MascotWaving, PawPrint } from '@/components/illustrations/Mascots';
import { motion } from 'framer-motion';
import { Shield, Heart, Activity } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [role, setRole] = useState('Admin');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    document.cookie = `session={"role":"${role}","username":"${username}"}; path=/`;
    setTimeout(() => router.push(`/dashboard/${role.toLowerCase()}`), 600);
  };

  const getRoleIcon = () => {
    if (role === 'Veterinarian') return <Activity size={18} />;
    if (role === 'Adopter' || role === 'Donor') return <Heart size={18} />;
    return <Shield size={18} />;
  };

  return (
    <div className="flex h-screen bg-[#0B0F14] text-white overflow-hidden relative">
      <PawPrint className="absolute top-10 left-10 w-32 h-32 text-[#5B8DEF]" delay={0.2} />
      <PawPrint className="absolute bottom-20 left-1/4 w-48 h-48 text-[#F4A184]" delay={0.4} />
      <PawPrint className="absolute top-1/3 right-1/4 w-24 h-24 text-[#4ADE80]" delay={0.6} />
      
      <div className="hidden md:flex w-[55%] flex-col justify-center items-center p-12 bg-gradient-to-br from-[#0B0F14] to-[#111820] border-r border-[#263241] z-10 relative">
        <MascotWaving />
        <h1 className="text-5xl font-bold mt-8 mb-4 tracking-tight">PawTrack</h1>
        <p className="text-xl text-gray-400 font-medium tracking-wide">Trap. Neuter. Vaccinate. Return.</p>
      </div>

      <div className="flex-1 flex items-center justify-center z-10">
        <motion.form 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          onSubmit={handleLogin} className="w-full max-w-md p-8 bg-[#141C26]/80 backdrop-blur-xl rounded-2xl border border-[#263241] shadow-2xl">
          <h2 className="text-3xl font-bold mb-8">Sign in</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-400 font-medium mb-2 block">Select Role</label>
              <select className="w-full p-3 bg-[#0B0F14] border border-[#263241] focus:border-[#5B8DEF] rounded-lg text-white outline-none transition-colors" value={role} onChange={e=>setRole(e.target.value)}>
                <option>Admin</option><option>Volunteer</option><option>Veterinarian</option><option>Adopter</option><option>Donor</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 font-medium mb-2 block">Username</label>
              <input className="w-full p-3 bg-[#0B0F14] border border-[#263241] focus:border-[#5B8DEF] rounded-lg text-white outline-none transition-colors" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
              className="w-full p-3 bg-[#5B8DEF] hover:bg-[#4a7ad6] rounded-lg font-bold flex justify-center items-center gap-2 transition-colors shadow-[0_0_15px_rgba(91,141,239,0.3)]">
              {loading ? <PawPrint className="animate-spin w-5 h-5" /> : <>{getRoleIcon()} Sign in as {role}</>}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
