import { cookies } from 'next/headers';
import DashboardShell from '@/components/layout/DashboardShell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const sessionData = cookieStore.get('session')?.value;
  let role = 'User';
  let userName = 'Guest';
  try {
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      role = parsed.role;
      userName = parsed.name || 'User';
    }
  } catch {}

  return <DashboardShell role={role} userName={userName}>{children}</DashboardShell>;
}
