'use client';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Home, Users, Activity, PawPrint, Search, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DogMascot } from '../illustrations/Mascots';

export default function DashboardShell({ children, role }: { children: React.ReactNode; role: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
  };

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [{ name: 'Dashboard', icon: Home, path: `/dashboard/${role.toLowerCase()}` }]
    },
    {
      title: 'SHELF',
      items: role === 'Admin' || role === 'Volunteer' || role === 'Veterinarian' ? [
        { name: 'Animals', icon: Activity, path: '/dashboard/animals' },
      ] : []
    },
    {
      title: 'MANAGEMENT',
      items: role === 'Admin' ? [
        { name: 'Users', icon: Users, path: '/dashboard/users' },
      ] : []
    }
  ];

  return (
    <div className="flex h-screen bg-background text-foreground font-sans">
      {/* Sidebar */}
      <aside className="w-[270px] bg-[#F4F4ED] border-r border-border flex flex-col z-20 relative">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
             <PawPrint className="text-primary w-5 h-5" />
          </div>
          <h2 className="text-xl font-heading font-bold text-foreground">PawTrack</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto">
          {navGroups.map((group, idx) => group.items.length > 0 && (
            <div key={idx}>
              <h3 className="text-xs font-bold text-muted tracking-wider mb-3 px-4">{group.title}</h3>
              <div className="space-y-1">
                {group.items.map(item => (
                  <div key={item.name} onClick={() => router.push(item.path)} 
                    className={`px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer relative group transition-colors ${pathname === item.path ? 'bg-primary/10 text-primary font-semibold' : 'text-muted hover:text-foreground hover:bg-black/5'}`}>
                    {pathname === item.path && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />}
                    <item.icon size={18} className={pathname === item.path ? 'text-primary' : 'text-muted group-hover:text-foreground'} /> 
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Cute Mascot Detail at Bottom */}
        <div className="p-6 relative group">
          <div className="absolute bottom-16 left-8 pointer-events-none group-hover:scale-110 transition-transform">
            <DogMascot state="sleeping" className="w-16 h-16 opacity-80" />
          </div>
          <p className="text-xs text-muted mb-4 px-2 italic">"Taking care of tails, one day at a time."</p>
          <button onClick={handleLogout} className="w-full px-4 py-3 flex items-center gap-3 text-muted hover:text-danger hover:bg-danger/10 transition-all rounded-xl font-medium">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
        <header className="h-20 border-b border-border flex items-center justify-between px-10 bg-surface/50 backdrop-blur-md shrink-0">
          <div>
            <h1 className="text-xl font-heading font-bold text-foreground">Good morning 👋</h1>
            <p className="text-sm text-muted mt-1">Here's what's happening at PawTrack today.</p>
          </div>
          <div className="flex items-center gap-6 text-muted">
            <Search className="w-5 h-5 hover:text-foreground cursor-pointer transition-colors" />
            <Bell className="w-5 h-5 hover:text-foreground cursor-pointer transition-colors" />
            <div className="flex items-center gap-3 pl-6 border-l border-border cursor-pointer">
              <div className="w-9 h-9 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold font-heading">
                {role.charAt(0)}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-foreground leading-tight">Admin User</p>
                <p className="text-xs text-muted leading-tight">{role}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 relative">
          <AnimatePresence mode="wait">
            <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
