'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Activity, Users, LogOut, Heart, Syringe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DogMascot, PawPrint } from '@/components/illustrations/Mascots';

export default function DashboardShell({ children, role, userName }: { children: React.ReactNode, role: string, userName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
  };

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [{ name: 'Dashboard', icon: Home, path: `/dashboard/${role.toLowerCase()}` }]
    },
    {
      title: 'SHELTER',
      items: role === 'Admin' || role === 'Volunteer' || role === 'Veterinarian' ? [
        { name: 'Animal Directory', icon: Activity, path: '/dashboard/animals' },
        { name: 'TNVR Pipeline', icon: Syringe, path: '/dashboard/tnvr' },
        { name: 'Adoptions', icon: Heart, path: '/dashboard/adoptions' },
        { name: 'Medical Records', icon: Activity, path: '/dashboard/veterinarian' },
        { name: 'Donations', icon: Heart, path: '/dashboard/donor' },
        { name: 'Clinic Appointments', icon: Syringe, path: '#' },
        { name: 'Foster Network', icon: Home, path: '#' }
      ] : []
    },
    {
      title: 'MANAGEMENT',
      items: role === 'Admin' ? [
        { name: 'Staff & Users', icon: Users, path: '/dashboard/users' },
        { name: 'Reports & Analytics', icon: Activity, path: '/dashboard/reports' },
        { name: 'Volunteer Tracking', icon: Users, path: '#' },
        { name: 'Inventory & Supplies', icon: Activity, path: '#' },
        { name: 'Settings', icon: Users, path: '#' }
      ] : []
    }
  ];

  return (
    <div className="min-h-screen bg-background flex text-foreground font-sans selection:bg-primary/20">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 font-heading font-black text-xl text-primary">
          <PawPrint className="w-6 h-6" /> PawTrack
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-foreground">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isMobileMenuOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
          <motion.nav 
            initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-surface border-r border-border z-40 flex flex-col pt-16 lg:pt-0 shadow-soft lg:shadow-none`}>
            
            <div className="p-8 hidden lg:flex items-center gap-3 font-heading font-black text-2xl text-primary tracking-tight">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-primary" />
              </div>
              PawTrack
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-8 mt-4 lg:mt-0 pb-20">
              {navGroups.map((group, idx) => group.items.length > 0 && (
                <div key={idx}>
                  <h3 className="px-4 text-xs font-bold text-muted uppercase tracking-wider mb-3">{group.title}</h3>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
                      return (
                        <Link key={item.name} href={item.path} onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all relative group overflow-hidden ${
                            isActive ? 'bg-primary text-white shadow-soft' : 'text-muted hover:bg-black/5 hover:text-foreground'
                          }`}>
                          {isActive && <motion.div layoutId="navIndicator" className="absolute inset-0 bg-primary -z-10 rounded-2xl" />}
                          <item.icon size={20} className={isActive ? 'text-white' : 'text-muted group-hover:text-foreground transition-colors'} />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-border bg-black/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center font-bold text-secondary text-lg uppercase shadow-sm">
                  {userName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{userName}</p>
                  <p className="text-xs font-semibold text-muted">{role}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-danger hover:bg-danger/10 rounded-xl transition-colors">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
            
            <div className="absolute bottom-32 right-[-20px] pointer-events-none opacity-50 hidden lg:block">
               <DogMascot state="sleeping" className="w-24 h-24" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0 pt-16 lg:pt-0 overflow-y-auto">
        <div className="p-4 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
