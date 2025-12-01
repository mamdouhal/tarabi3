import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceShowcase from '@/components/services/ServiceShowcase';
import ProcessTimeline from '@/components/services/ProcessTimeline';
import TechStack from '@/components/services/TechStack';
import ServicesCTA from '@/components/services/ServicesCTA';

export const metadata = {
  title: 'Services - Tarabi3 | Digital Solutions',
  description: 'Explore our comprehensive digital services: Marketing, Tech Development, and Branding solutions that multiply your success.',
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesHero />
      <ServiceShowcase />
      <ProcessTimeline />
      <TechStack />
      <ServicesCTA />
      <Footer />
    </main>
  );
}
