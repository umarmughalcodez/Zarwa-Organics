"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeRight, fadeUp } from "@/lib/animations";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";

const FinalCTA = () => {
  return (
    <div
      id="TransformationCTA"
      className="w-full grid place-items-center p-4 lg:p-16 xl:p-26 pb-12 bg-[#4F6F52]"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#ffffff] text-[#3E3B2D] border border-[#DAD5C6] shadow-2xl">
        {/* --- Fixed Natural Glow (Top Left) --- */}
        <div
          className="absolute top-0 left-0 w-[300px] h-[300px] blur-[120px]"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(139,190,103,0.6) 0%, rgba(139,190,103,0) 70%)",
          }}
        />

        {/* --- Fixed Natural Glow (Bottom Right) --- */}
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] blur-[140px]"
          style={{
            background:
              "radial-gradient(circle at bottom right, rgba(111,143,88,0.7) 0%, rgba(111,143,88,0) 70%)",
          }}
        />

        {/* --- Foreground Content --- */}
        <div className="relative z-10 p-10 flex flex-col items-center text-center space-y-6 mt-2">
          {/* Small Highlight */}
          <p className="uppercase tracking-widest text-[#6F8F58] font-semibold text-sm">
            Nourish • Strengthen • Grow
          </p>

          {/* Heading */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-snug text-[#2E2B27]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            Fall Back in Love with Your{" "}
            <span className="text-[#8BBE67]">Natural Hair</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-[#4A4A3F] mb-6 text-sm md:text-base max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            Experience centuries-old herbal wisdom in every drop. Our{" "}
            <span className="text-[#8BBE67] font-medium">
              Zarwa Hair Growth Oil
            </span>{" "}
            restores your hair’s strength, shine, and confidence — naturally.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeRight}
          >
            <Button
              effect="expandIcon"
              iconPlacement="right"
              icon={FaArrowRight}
              className="px-8 py-3 rounded-full bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform"
            >
              Order Your Hair Growth Oil Now
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
