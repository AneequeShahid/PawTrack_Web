import { cookies } from 'next/headers';
import DashboardShell from '@/components/layout/DashboardShell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const sessionData = cookieStore.get('session')?.value;
  let role = 'User';
  try {
    if (sessionData) {
      role = JSON.parse(sessionData).role;
    }
  } catch {}

  return <DashboardShell role={role}>{children}</DashboardShell>;
}
