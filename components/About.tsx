"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F9F7F3] py-24 text-[#3E3B2D]"
    >
      {/* Soft botanical glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,190,103,0.12),transparent_70%)]" />

      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-[300px] md:w-[420px] h-[380px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-[#E6E2D9]">
            <Image
              src="/images/about.png" // Replace with your real brand photo
              alt="About Zarwa Organics"
              fill
              className="object-cover"
            />
          </div>

          {/* Subtle herbal glow */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#8BBE67]/25 blur-3xl rounded-full -z-10"></div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-[#6F8F58] mb-6">
            About Zarwa Organics
          </h2>

          <p className="text-lg leading-relaxed text-[#4A483F]">
            At Zarwa Organics, we believe beauty begins with honesty and harmony
            with nature. Our Hair Growth Oil revives your hair’s natural
            strength and shine through{" "}
            <strong>pure, time-honored herbal blends</strong> — crafted to
            restore balance from root to tip.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#4A483F]">
            Every drop is made with ancestral care —{" "}
            <strong>
              promoting growth, reducing hair fall, and awakening your scalp’s
              vitality
            </strong>
            . Free from toxins, packed with love, and powered by tradition for
            your modern-day ritual.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            <a
              href="#shop"
              className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white font-medium rounded-full px-8 py-3 text-lg shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform duration-300"
            >
              Shop Hair Growth Oil
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
