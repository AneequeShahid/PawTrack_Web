'use client';
import { useRouter } from 'next/navigation';
import { LogOut, Home, Users, Activity, PawPrint } from 'lucide-react';

export default function DashboardShell({ children, role }: { children: React.ReactNode; role: string }) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-[#0B0F14] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111820] border-r border-[#263241] flex flex-col">
        <div className="p-6 border-b border-[#263241]">
          <h2 className="text-2xl font-bold flex items-center gap-2"><PawPrint className="text-[#5B8DEF]" /> PawTrack</h2>
          <span className="text-xs px-2 py-1 bg-[#263241] rounded mt-2 inline-block text-[#5B8DEF] font-mono">{role} Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="px-4 py-2 bg-[#141C26] text-[#5B8DEF] rounded flex items-center gap-3 cursor-pointer border border-[#263241]">
            <Home size={18} /> Dashboard
          </div>
          {role === 'Admin' && (
            <div className="px-4 py-2 hover:bg-[#141C26] rounded flex items-center gap-3 cursor-pointer text-gray-400 hover:text-white transition-colors">
              <Users size={18} /> Users
            </div>
          )}
          {['Admin', 'Volunteer', 'Veterinarian'].includes(role) && (
            <div className="px-4 py-2 hover:bg-[#141C26] rounded flex items-center gap-3 cursor-pointer text-gray-400 hover:text-white transition-colors">
              <Activity size={18} /> Animals
            </div>
          )}
        </nav>
        <div className="p-4 border-t border-[#263241]">
          <button onClick={handleLogout} className="w-full px-4 py-2 flex items-center gap-3 text-gray-400 hover:text-[#F87171] transition-colors rounded">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0B0F14]">
        <header className="h-16 border-b border-[#263241] flex items-center px-8 bg-[#111820]">
          <h1 className="text-xl font-semibold">Welcome back, {role}</h1>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
