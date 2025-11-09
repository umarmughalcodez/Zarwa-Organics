"use client";
import HowToUse from "@/components/HowToUse";
import PaymentMethods from "@/components/PaymentMethods";
import ProductSection from "@/components/Product/ProductSection";
import Ingredients from "@/components/Product/IngredientsSection.tsx";
import ProductHighlights from "@/components/ProductHighlights";
import TestimonialsSection from "@/components/Testimonials";
import React from "react";
import Transformation from "@/components/Transformation";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";

const Shop = () => {
  return (
    <div>
      <ProductSection />
      <Ingredients />
      <Transformation />
      <HowToUse />
      <TestimonialsSection />
      <ProductHighlights />
      <PaymentMethods />
      <FAQ />
      <FinalCTA />
    </div>
  );
};

export default Shop;
