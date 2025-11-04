"use client";
import HowToUse from "@/components/HowToUse";
import PaymentMethods from "@/components/PaymentMethods";
import ProductSection from "@/components/Product/ProductSection";
import Ingredients from "@/components/Product/IngredientsSection.tsx";
import ProductHighlights from "@/components/ProductHighlights";
import TestimonialsSection from "@/components/Testimonials";
import React from "react";
import Transformation from "@/components/Transformation";

const Shop = () => {
  return (
    <div>
      <ProductSection />
      <Ingredients />
      <Transformation />
      <TestimonialsSection />
      <HowToUse />
      <PaymentMethods />
      <ProductHighlights />
    </div>
  );
};

export default Shop;
