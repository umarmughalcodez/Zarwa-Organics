"use client";

import { motion } from "framer-motion";
import { Droplet, HandHeart, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <Droplet className="w-8 h-8 text-white" />,
    title: "Apply",
    desc: "Pour a few drops of Zarwa Hair Growth Oil onto your palm and warm it gently between your hands.",
  },
  {
    icon: <HandHeart className="w-8 h-8 text-white" />,
    title: "Massage",
    desc: "Massage into your scalp with slow circular motions — it improves blood flow and strengthens your hair roots.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-white" />,
    title: "Nourish",
    desc: "Leave it on overnight or for at least 2 hours, then wash for naturally thicker, shinier, and stronger hair.",
  },
];

export default function HowToUse() {
  return (
    <section className="relative w-full bg-[#4F6F52] text-white py-24 px-6 overflow-hidden">
      {/* Subtle green shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent blur-3xl"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold tracking-wide text-white"
        >
          Apply → Massage → Nourish
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-3 text-white/80 text-lg"
        >
          Your 3-step ritual for naturally radiant, healthy hair
        </motion.p>

        <div className="mt-6 w-full h-[1px] mx-auto bg-gradient-to-r from-transparent via-white/40 to-transparent" />
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
              <div className="absolute inset-0 blur-2xl bg-white/20 rounded-full" />
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#6B8E6E]/50 border border-white/40 backdrop-blur-sm">
                {step.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold tracking-wide mb-3 text-white">
              {step.title}
            </h3>
            <p className="text-white/70 text-sm max-w-xs">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom shimmer */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
    </section>
  );
}
