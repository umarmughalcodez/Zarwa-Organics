"use client";

import { motion } from "framer-motion";
import { Sparkles, SprayCan, Brush, Dog } from "lucide-react";

const steps = [
  {
    icon: <Sparkles className="w-8 h-8 text-[#C5A45A]" />,
    title: "Shake",
    desc: "Gently shake to awaken the natural notes within every bottle.",
  },
  {
    icon: <SprayCan className="w-8 h-8 text-[#C5A45A]" />,
    title: "Spray",
    desc: "A light mist over your pet’s coat brings instant freshness and elegance.",
  },
  {
    icon: <Dog className="w-8 h-8 text-[#C5A45A]" />,
    title: "Comb",
    desc: "Finish with a soft brush to spread the fragrance evenly and gently.",
  },
];

export default function HowToUse() {
  return (
    <section className="relative w-full bg-amber-950 text-white py-24 px-6 overflow-hidden">
      {/* Background shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-[#C5A45A]/10 via-transparent to-transparent blur-3xl"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold tracking-wide"
        >
          Shake → Spray → Comb
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-3 text-white/80 text-lg"
        >
          3 easy steps for gentle care
        </motion.p>

        <div className="mt-6 w-full h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#C5A45A] to-transparent" />
      </div>

      {/* Steps */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center px-6"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 blur-2xl bg-[#C5A45A]/20 rounded-full" />
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#C5A45A]/20 to-transparent border border-[#C5A45A]/30">
                {step.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold tracking-wide mb-3">
              {step.title}
            </h3>
            <p className="text-white/70 text-sm max-w-xs">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Decorative shimmer line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#C5A45A]/40 to-transparent"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
    </section>
  );
}
