import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Hero from "@/components/home/Hero";
import WhoIAm from "@/components/home/WhoIAm";
import FeaturedProject from "@/components/home/FeaturedProject";
import CaseStudyDeepDive from "@/components/home/CaseStudyDeepDive";
import Metrics from "@/components/home/Metrics";
import ProjectGrid from "@/components/home/ProjectGrid";
import SkillsGrid from "@/components/home/SkillsGrid";
import Timeline from "@/components/home/Timeline";
import BentoDashboard from "@/components/home/BentoDashboard";
import ContactForm from "@/components/home/ContactForm";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <SmoothScroll>
        {/* Sticky Top Navigation Bar */}
        <Navbar />

        <main className="flex-grow">
          {/* 1. Hero Section */}
          <Hero />

          {/* Dedicated "Who I Am" Section */}
          <WhoIAm />

          {/* 2. Featured Project Showcase */}
          <FeaturedProject />

          {/* 3. Case Study / System Design Deep Dive */}
          <CaseStudyDeepDive />

          {/* 4. Metrics & Impact Counter */}
          <Metrics />

          {/* 5. Selected Projects Grid */}
          <ProjectGrid />

          {/* 6. Technical Skills & Tools */}
          <SkillsGrid />

          {/* 7. Work & Experience Timeline */}
          <Timeline />

          {/* 8. Utility / Dashboard Widgets (Bento Grid) */}
          <BentoDashboard />

          {/* 9. Contact Section */}
          <ContactForm />
        </main>

        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </ErrorBoundary>
  );
}
