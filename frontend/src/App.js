import { ReactLenis } from "lenis/react";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/LanguageContext";
import { QuoteProvider } from "@/context/QuoteContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EditorialMarquee from "@/components/EditorialMarquee";
import About from "@/components/About";
import Vision from "@/components/Vision";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import WhatsAppFloat from "@/components/WhatsAppFloat";

function App() {
  return (
    <LanguageProvider>
      <QuoteProvider>
        <ReactLenis root options={{ lerp: 0.09, duration: 1.2 }}>
          <div className="min-h-screen bg-white font-body text-ink">
            <Navbar />
            <main>
              <Hero />
              <EditorialMarquee />
              <About />
              <Vision />
              <Services />
              <WhyUs />
              <CtaBand />
            </main>
            <Footer />
            <QuoteModal />
            <WhatsAppFloat />
            <Toaster position="top-center" richColors />
          </div>
        </ReactLenis>
      </QuoteProvider>
    </LanguageProvider>
  );
}

export default App;
