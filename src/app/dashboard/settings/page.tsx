'use client';
import { Settings, Shield, Bell, User } from 'lucide-react';
import { DogMascot } from '@/components/illustrations/Mascots';

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-20 relative">
      <div className="bg-secondary/10 border border-secondary/20 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-secondary font-bold text-sm">
            <Settings size={16} /> System Config
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Shelter Settings</h1>
          <p className="text-muted font-medium text-lg leading-relaxed">
            Configure shelter parameters, user permissions, and automated alert systems.
          </p>
        </div>
        <div className="relative z-10 mt-8 md:mt-0">
          <DogMascot state="happy" className="w-48 h-48 drop-shadow-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border p-6 rounded-3xl shadow-soft">
          <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-4"><Shield size={20} /></div>
          <h3 className="font-bold text-lg text-foreground mb-2">Security & Roles</h3>
          <p className="text-sm font-medium text-muted">Manage RBAC policies and 2FA settings for staff accounts.</p>
          <button className="mt-4 text-primary font-bold text-sm">Configure →</button>
        </div>
        <div className="bg-surface border border-border p-6 rounded-3xl shadow-soft">
          <div className="w-10 h-10 bg-warning/20 text-warning rounded-xl flex items-center justify-center mb-4"><Bell size={20} /></div>
          <h3 className="font-bold text-lg text-foreground mb-2">Notifications</h3>
          <p className="text-sm font-medium text-muted">Set up email alerts for medical emergencies and low stock.</p>
          <button className="mt-4 text-primary font-bold text-sm">Configure →</button>
        </div>
        <div className="bg-surface border border-border p-6 rounded-3xl shadow-soft">
          <div className="w-10 h-10 bg-secondary/20 text-secondary rounded-xl flex items-center justify-center mb-4"><User size={20} /></div>
          <h3 className="font-bold text-lg text-foreground mb-2">Profile</h3>
          <p className="text-sm font-medium text-muted">Update your personal information and contact details.</p>
          <button className="mt-4 text-primary font-bold text-sm">Configure →</button>
        </div>
      </div>
    </div>
  );
}
