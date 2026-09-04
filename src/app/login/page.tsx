'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DogMascot, PawPrint } from '@/components/illustrations/Mascots';
import { motion } from 'framer-motion';
import { Shield, Heart, Activity } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [role, setRole] = useState('Admin');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== 'demo') {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    setLoading(true);
    document.cookie = `session={"role":"${role}","username":"${username}"}; path=/`;
    setTimeout(() => router.push(`/dashboard/${role.toLowerCase()}`), 600);
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden relative font-sans">
      
      {/* Left Hero Side */}
      <div className="hidden md:flex w-[55%] flex-col justify-center items-center p-12 bg-primary/5 border-r border-border relative z-10">
        <PawPrint className="absolute top-10 left-10 w-24 h-24 text-primary/10" delay={0.2} />
        <PawPrint className="absolute bottom-20 right-20 w-32 h-32 text-secondary/10" delay={0.4} />
        
        <DogMascot state={error ? 'confused' : isFocused ? 'happy' : 'idle'} className="w-64 h-64 drop-shadow-soft" />
        
        <h1 className="text-5xl font-heading font-bold mt-8 mb-4 tracking-tight text-foreground">PawTrack</h1>
        <p className="text-xl text-muted font-medium tracking-wide">Paws, records & everything in between.</p>
      </div>

      {/* Right Login Side */}
      <div className="flex-1 flex items-center justify-center z-10 bg-background relative">
        <motion.form 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          onSubmit={handleLogin} className="w-full max-w-md p-10 bg-surface rounded-2xl border border-border shadow-soft">
          
          <h2 className="text-3xl font-heading font-bold mb-2">Welcome back.</h2>
          <p className="text-muted mb-8">Sign in to manage the shelter.</p>
          
          <div className="space-y-5">
            <div>
              <label className="text-sm text-foreground font-semibold mb-2 block">Select Role</label>
              <select className="w-full p-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-foreground outline-none transition-all shadow-sm" value={role} onChange={e=>setRole(e.target.value)}>
                <option>Admin</option><option>Volunteer</option><option>Veterinarian</option><option>Adopter</option><option>Donor</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-foreground font-semibold mb-2 block">Username</label>
              <input className="w-full p-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-foreground outline-none transition-all shadow-sm" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-foreground font-semibold mb-2 block">Password (use 'demo')</label>
              <input type="password" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
                className={`w-full p-3 bg-background border rounded-xl outline-none transition-all shadow-sm ${error ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border focus:border-primary focus:ring-primary'}`} 
                value={password} onChange={e=>setPassword(e.target.value)} />
              {error && <p className="text-danger text-sm mt-2 font-medium">Hmm, those details don't seem right.</p>}
            </div>
            
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
              className="w-full p-4 bg-primary hover:bg-[#6a8767] text-white rounded-xl font-bold flex justify-center items-center gap-2 transition-colors shadow-soft mt-4">
              {loading ? <PawPrint className="animate-spin w-5 h-5" /> : <>Sign in as {role}</>}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
