import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import AdminSidebar from './AdminSidebar';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?redirect=/admin');
  }

  // Only ADMIN and WRITER can access admin dashboard
  if (user.role !== 'ADMIN' && user.role !== 'WRITER') {
    redirect('/');
  }

  return <AdminSidebar user={user}>{children}</AdminSidebar>;
}
