import Hero from "@/components/Hero";
import Transformation from "@/components/Transformation";
import About from "@/components/About";
import ProductHighlights from "@/components/ProductHighlights";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import HowToUse from "@/components/HowToUse";
import FAQ from "@/components/FAQ";
import React from "react";
import PaymentMethods from "@/components/PaymentMethods";

const App = () => {
  return (
    <div>
      <Hero />
      <StatsSection />
      <PaymentMethods />

      <Transformation />

      <ProductHighlights />
      <About />

      <HowToUse />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default App;
