import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Statistics from './components/Statistics';
import CaseStudies from './components/CaseStudies';
import ProductShowcase from './components/ProductShowcase';
import Telemetry from './components/Telemetry';
import Approach from './components/Approach';
import FeatureTabs from './components/FeatureTabs';
import Integrations from './components/Integrations';
import Testimonials from './components/Testimonials';
import Articles from './components/Articles';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F0F0F2]">
      <Navbar />
      <Hero />
      {/* Services already has id="about" inside it */}
      <Services />
      <Statistics />
      {/* CaseStudies already has id="projects" inside it */}
      <CaseStudies />
      <ProductShowcase id="product" />
      <Telemetry id="telemetry" />
      <Approach id="approach" />
      <FeatureTabs id="features" />
      <Integrations />
      <Testimonials />
      <Articles id="articles" />
      <FAQ id="faq" />
      <Newsletter id="contact" />
      <Footer />
    </div>
  );
}