"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-[#fdf8f3] to-white py-24"
    >
      {/* decorative background shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(193,162,74,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* left image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-[300px] md:w-[420px] h-[380px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/bottle.png" // replace with your actual about image
              alt="About Zarwa Organics"
              fill
              className="object-cover"
            />
          </div>
          {/* soft golden glow */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#C1A24A]/20 blur-3xl rounded-full -z-10"></div>
        </motion.div>

        {/* right content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#C1A24A] mb-6">
            About Zarwa Organics
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Zarwa Organics, we believe beauty begins with purity. Our mission
            is to restore your hair’s natural strength and shine through the
            power of **100% organic ingredients** — sourced ethically and
            blended with care.
          </p>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            Each drop of our Hair Growth Oil carries the essence of nature —
            **nourishing roots, revitalizing strands, and promoting healthy,
            radiant growth**. No chemicals, no shortcuts — just honest,
            handcrafted care.
          </p>

          <div className="mt-8">
            <button className="bg-[#C1A24A] text-white rounded-full px-8 py-3 text-lg hover:bg-[#b5933f] transition shadow-lg">
              Discover More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
