import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorkHero from '@/components/work/WorkHero';
import ProjectShowcase from '@/components/work/ProjectShowcase';
import WorkCategories from '@/components/work/WorkCategories';
import FeaturedWork from '@/components/work/FeaturedWork';
import WorkCTA from '@/components/work/WorkCTA';

export const metadata = {
  title: 'Our Work - Tarabi3 | Portfolio & Case Studies',
  description: 'Explore our portfolio of Management Systems, Web Development, and AI Tools. See how we multiply success for businesses worldwide.',
};

export default function WorkPage() {
  return (
    <main>
      <Navbar />
      <WorkHero />
      <WorkCategories />
      <FeaturedWork />
      <ProjectShowcase />
      <WorkCTA />
      <Footer />
    </main>
  );
}
