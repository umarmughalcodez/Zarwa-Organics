"use client";
import { motion } from "framer-motion";
import { FaLeaf, FaHeart, FaTint, FaSpa } from "react-icons/fa";

const highlights = [
  {
    icon: <FaLeaf size={32} />,
    title: "100% Organic Ingredients",
    desc: "Each drop is crafted from nature’s purest oils — free from sulfates, parabens, and toxins.",
  },
  {
    icon: <FaHeart size={32} />,
    title: "Promotes Hair Growth",
    desc: "Revitalizes scalp health and strengthens roots for visibly thicker, longer hair.",
  },
  {
    icon: <FaTint size={32} />,
    title: "Deep Nourishment",
    desc: "Infuses strands with essential nutrients to restore softness, shine, and hydration.",
  },
  {
    icon: <FaSpa size={32} />,
    title: "Handcrafted with Care",
    desc: "Made in small batches to ensure quality, freshness, and maximum potency.",
  },
];

export default function ProductHighlights() {
  return (
    <section className="relative bg-[#4F6F52] py-24 overflow-hidden text-[#FAF8F3]">
      {/* Soft organic glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-[#FAF8F3]/10 via-transparent to-transparent blur-3xl"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-semibold text-[#FAF8F3]"
        >
          Product Highlights
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 text-lg text-[#FAF8F3]/80 max-w-2xl mx-auto leading-relaxed"
        >
          Discover what makes Zarwa Organics Hair Growth Oil unique — where
          ancient South-Asian herbal wisdom meets modern purity and care.
        </motion.p>

        {/* Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group bg-[#6B8E6E]/60 backdrop-blur-sm border border-[#FAF8F3]/20 rounded-2xl p-8 hover:border-[#FAF8F3]/60 hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-[#FAF8F3] group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#FAF8F3]">
                  {item.title}
                </h3>
                <p className="text-[#FAF8F3]/70 text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <a
            href="#shop"
            className="inline-block bg-[#FAF8F3] text-[#4F6F52] font-semibold rounded-full px-10 py-4 text-lg shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform duration-300"
          >
            Experience the Difference
          </a>
        </motion.div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FAF8F3]/30 to-transparent" />
    </section>
  );
}
