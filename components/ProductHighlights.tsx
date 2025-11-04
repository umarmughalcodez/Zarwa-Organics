"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Sprout } from "lucide-react";

export default function ProductHighlights() {
  return (
    <section className="relative bg-[#4F6F52] text-white py-24 px-6 overflow-hidden">
      {/* Soft golden background shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-[#C5A45A]/15 via-transparent to-transparent blur-3xl"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold mb-4"
        >
          100% Satisfaction Guaranteed 🤍
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/85 max-w-2xl mx-auto text-lg leading-relaxed mb-12"
        >
          We believe in the power of nature — and we stand behind every drop of
          Zarwa Hair Growth Oil. If you don’t see visible improvement in your
          hair health, shine, or strength, we’ll make it right — no stress, no
          worries.
        </motion.p>

        {/* Icons / Assurance Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-4 bg-[#6B8E6E]/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <ShieldCheck className="w-10 h-10 text-[#ffffff]" />
            <h3 className="text-xl font-semibold text-[#ffffff]">
              Trusted Quality
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Made with pure, organic ingredients — free from toxins or
              chemicals.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-4 bg-[#6B8E6E]/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <Heart className="w-10 h-10 text-[#ffffff]" />
            <h3 className="text-xl font-semibold text-[#ffffff]">
              Loved by Women Nationwide
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Thousands of Pakistani women trust Zarwa Organics for real,
              visible hair transformation.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-4 bg-[#6B8E6E]/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <Sprout className="w-10 h-10 text-[#ffffff]" />
            <h3 className="text-xl font-semibold text-[#ffffff]">
              Handcrafted in Pakistan
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Proudly made locally with care, using time-tested herbal
              traditions passed down through generations.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <a
            href="#shop"
            className="inline-block bg-[#ffffff] text-[#4C6B43] font-semibold py-3 px-10 rounded-full shadow-lg hover:scale-105 hover:shadow-[#C5A45A]/40 transition-all duration-300"
          >
            Shop with Confidence
          </a>
        </motion.div>
      </div>
    </section>
  );
}
