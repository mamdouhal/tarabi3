import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesBento from '@/components/ServicesBento';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServicesBento />
      <Footer />
    </main>
  );
}
