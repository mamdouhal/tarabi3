import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import TeamSection from '@/components/about/TeamSection';
import ValuesSection from '@/components/about/ValuesSection';
import StatsSection from '@/components/about/StatsSection';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata = {
  title: 'About Us - Tarabi3 | Our Story & Team',
  description: 'Learn about Tarabi3 - a digital agency that multiplies your success through innovative marketing, technology, and branding solutions.',
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <OurStory />
      <StatsSection />
      <ValuesSection />
      <TeamSection />
      <AboutCTA />
      <Footer />
    </main>
  );
}
