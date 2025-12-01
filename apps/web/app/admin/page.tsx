import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DatabaseBrowser from '@/components/admin/DatabaseBrowser';

export const metadata = {
  title: 'Database Browser - Tarabi3 Admin',
  description: 'Browse and manage database tables',
};

export default function AdminPage() {
  return (
    <main>
      <Navbar />
      <DatabaseBrowser />
      <Footer />
    </main>
  );
}
