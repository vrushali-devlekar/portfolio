import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Background3DCanvas from "@/components/ui/Background3DCanvas";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Work from "@/components/home/Work";
import Services from "@/components/home/Services";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <Background3DCanvas />
      <SmoothScroll>
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Work />
          <Services />
        </main>
        <Footer />
      </SmoothScroll>
    </ErrorBoundary>
  );
}
