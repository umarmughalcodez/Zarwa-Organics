"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#FAF8F2] py-24 text-[#2E2B27]"
    >
      {/* Decorative soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(121,178,123,0.12),transparent_70%)]" />

      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-[300px] md:w-[420px] h-[380px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-[#EAE6DC]">
            <Image
              src="/images/about.png" // Replace with your real brand photo
              alt="About Zarwa Organics"
              fill
              className="object-cover"
            />
          </div>

          {/* Subtle herbal glow */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#79B27B]/25 blur-3xl rounded-full -z-10"></div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-[#79B27B] mb-6">
            About Zarwa Organics
          </h2>

          <p className="text-lg leading-relaxed text-[#5A574F]">
            At Zarwa Organics, we believe true beauty begins with authenticity.
            Our mission is to restore your hair’s natural strength and shine
            through <strong>100% pure, herbal ingredients</strong> — ethically
            sourced and lovingly blended to celebrate timeless South-Asian
            wellness rituals.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#5A574F]">
            Each bottle carries the essence of nature —{" "}
            <strong>
              nourishing roots, revitalizing strands, and promoting long-lasting
              growth
            </strong>
            . No chemicals, no shortcuts — just honest, handcrafted care
            designed for the modern self-care experience.
          </p>

          <div className="mt-10">
            <button className="bg-[#79B27B] text-white font-medium rounded-full px-8 py-3 text-lg shadow-md hover:bg-[#6AA76E] hover:shadow-lg transition-all duration-300">
              Discover More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
