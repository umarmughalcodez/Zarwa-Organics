import Hero from "@/components/Hero";
import Transformation from "@/components/Transformation";
import About from "@/components/About";
import ProductHighlights from "@/components/ProductHighlights";
import StatsSection from "@/components/StatsSection";
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
import HowToUse from "@/components/HowToUse";
// import FAQ from "@/components/FAQ";
import React from "react";
import PaymentMethods from "@/components/PaymentMethods";
import dynamic from "next/dynamic";

const App = () => {
  return (
    <div>
      <Hero /> {/* White BG */}
      <StatsSection /> {/* Green BG */}
      <Transformation /> {/* White BG */}
      <ProductHighlights /> {/* Green BG */}
      <About /> {/* White BG */}
      <HowToUse /> {/* Green BG */}
      <Testimonials /> {/* White BG */}
      <PaymentMethods /> {/* White BG */}
      <FAQ /> {/* Green BG */}
    </div>
  );
};

export default App;
