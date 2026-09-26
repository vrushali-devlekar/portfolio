import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Work from "@/components/home/Work";
import Services from "@/components/home/Services";
import ToolsSection from "@/components/home/ToolsSection";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function Home() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vrushali Devlekar',
    url: 'https://vrushali-devlekar.vercel.app',
    jobTitle: 'Full Stack & DevOps Engineer',
    knowsAbout: ['Next.js', 'React', 'TypeScript', 'DevOps', 'Docker', 'Kubernetes', 'Web Performance', 'Cloud Architecture'],
    sameAs: [
      'https://github.com/vrushali-devlekar',
      'https://github.com/miidaystudio',
      'https://instagram.com/rushu4miiday',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vrushali Devlekar — Portfolio & Developer Tools Hub',
    url: 'https://vrushali-devlekar.vercel.app',
    description: 'Personal portfolio, engineering case studies, and browser-native developer utilities by Vrushali Devlekar.',
    author: {
      '@type': 'Person',
      name: 'Vrushali Devlekar',
    },
  };

  return (
    <ErrorBoundary>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Work />
          <ToolsSection />
          <Services />
        </main>
        <Footer />
      </SmoothScroll>
    </ErrorBoundary>
  );
}
