import About from "@/components/About";
import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";
import Testimonials from "@/components/Testimonials";
import React from "react";

const App = () => {
  return (
    <div>
      <Hero />
      <About />
      <ProductHighlights />
      <Testimonials />
    </div>
  );
};

export default App;
