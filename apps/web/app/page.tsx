import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesBento from '@/components/ServicesBento';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServicesBento />
      <ContactForm />
      <Footer />
    </main>
  );
}
