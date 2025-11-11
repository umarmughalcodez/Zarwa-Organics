"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const slides = [
  {
    image: "/images/edited.png",
    title: "Reconnect with Nature’s Rituals",
    subtitle:
      "Zarwa Organics revives the timeless South-Asian art of herbal self-care — pure, botanical, and deeply nourishing for skin and soul.",
  },
  {
    image: "/images/hero-img.png",
    title: "Pure Botanicals. Honest Beauty.",
    subtitle:
      "Crafted from nature’s most potent herbs and oils, our products celebrate simplicity — free from toxins, full of goodness.",
  },
  {
    image: "/images/hero-image.png",
    title: "Ancient Wisdom, Modern Care.",
    subtitle:
      "Infused with ancestral ingredients like neem, aloe, and sandalwood — reimagined for today’s natural skincare routine.",
  },
  {
    image: "/images/img3.png",
    title: "Elevate Your Everyday Ritual.",
    subtitle:
      "Pamper your skin with Zarwa’s organic blends — a sensory journey towards calm, balance, and timeless glow.",
  },
];

export default function HeroImages() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen bg-[#ffffff] overflow-hidden flex flex-col mt-24"
      id="hero"
    >
      {/* === Image Slideshow === */}
      <div className="relative w-full h-[60vh] sm:h-screen overflow-hidden">
        {slides.map((slide, i) => (
          <motion.img
            key={slide.image}
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.05,
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
            style={{ willChange: "opacity, transform" }}
          />
        ))}

        {/* === Dark overlay only on large screens === */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60 pointer-events-none" />
      </div>

      {/* === Text Content === */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 py-3 sm:py-0 sm:absolute sm:inset-0 sm:items-start sm:justify-center sm:text-left sm:px-16 xl:mt-24 mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* ✅ Green text on mobile, white on large screens */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#79B27B] lg:text-white  transition-colors duration-300">
              {slides[index].title}
            </h1>

            {/* ✅ Subheadline adapts too */}
            <p className="mt-4 text-base sm:text-lg text-[#3e483f]/90 lg:text-[#f1f1f1]/90 max-w-xl mx-auto sm:mx-0 transition-colors duration-300">
              {slides[index].subtitle}
            </p>

            <div className="mt-8 flex flex-wrap justify-center sm:justify-start gap-4">
              <a
                href="/shop"
                className="px-8 py-3 rounded-full bg-gradient-to-br from-[#8BBE67] to-[#6F8F58]  text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform"
              >
                Shop Now
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
