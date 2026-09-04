'use client';
import { motion } from 'framer-motion';
import { Shield, User, Heart, Stethoscope, Mail, Phone, MoreHorizontal } from 'lucide-react';

const mockUsers = [
  { id: 'u1', name: 'Aneeque Shahid', role: 'Admin', email: 'f2024-0920@bnu.edu.pk', phone: '(555) 123-4567', icon: Shield, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 'u2', name: 'Abdullah Zahoor', role: 'Veterinarian', email: 'f2023-683@bnu.edu.pk', phone: '(555) 987-6543', icon: Stethoscope, color: 'text-secondary', bg: 'bg-secondary/10' },
  { id: 'u3', name: 'Hassan Raza', role: 'Volunteer', email: 'hassan.raza@example.com', phone: '(555) 456-7890', icon: Heart, color: 'text-accent-foreground', bg: 'bg-accent/20' },
  { id: 'u4', name: 'Sarah Jenkins', role: 'Adopter', email: 'sarah.j@example.com', phone: '(555) 222-3333', icon: User, color: 'text-muted', bg: 'bg-black/5' },
];

export default function UsersDirectory() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">User Management</h1>
        <p className="text-muted mt-2">Manage shelter staff, volunteers, and registered adopters.</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-soft overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-black/[0.02] text-xs font-bold text-muted uppercase tracking-wider">
          <div className="col-span-4 pl-4">User</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-4">Contact</div>
          <div className="col-span-1 text-right pr-4">Actions</div>
        </div>

        <div className="divide-y divide-border">
          {mockUsers.map((user, i) => (
            <motion.div key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-black/[0.02] transition-colors group">
              
              <div className="col-span-4 flex items-center gap-4 pl-4">
                <div className={`w-10 h-10 rounded-full ${user.bg} flex items-center justify-center shrink-0`}>
                  <user.icon className={`${user.color} w-5 h-5`} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{user.name}</h4>
                  <p className="text-xs text-muted font-medium">ID: {user.id}</p>
                </div>
              </div>

              <div className="col-span-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  user.role === 'Admin' ? 'bg-primary/10 text-primary border-primary/20' :
                  user.role === 'Veterinarian' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                  user.role === 'Volunteer' ? 'bg-accent/20 text-accent-foreground border-accent/30' :
                  'bg-black/5 text-muted border-border'
                }`}>
                  {user.role}
                </span>
              </div>

              <div className="col-span-4 space-y-1">
                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <Mail size={14} className="text-muted" /> {user.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Phone size={14} /> {user.phone}
                </div>
              </div>

              <div className="col-span-1 flex justify-end pr-4">
                <button className="w-8 h-8 rounded-lg hover:bg-black/5 flex items-center justify-center text-muted hover:text-foreground transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
