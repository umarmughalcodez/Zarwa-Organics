"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F3] via-white to-[#FFF9F3]">
      {/* top-right gold mist */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(193,162,74,0.18),transparent_70%)]" />
      {/* bottom-left soft cream tint */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,248,240,0.8),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* LEFT TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-lg text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-semibold text-[#C1A24A] leading-tight">
            Zarwa Organics
          </h1>

          <p className="mt-4 text-[#3A3A3A] text-lg md:text-xl font-poppins">
            Indulge in the essence of nature.{" "}
            <span className="text-[#B18B2E] font-medium">
              Nourish, strengthen, and grow
            </span>{" "}
            with our 100% organic Hair Growth Oil — where purity meets luxury.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-[#C6A664] to-[#B18B2E] text-white rounded-full px-10 py-3 text-lg font-poppins font-medium shadow-[0_4px_20px_rgba(193,162,74,0.4)] hover:shadow-[0_4px_25px_rgba(177,139,46,0.55)] transition-all duration-300"
            >
              Shop Now
            </motion.button>
            <a
              href="#about"
              className="text-[#B18B2E] font-medium hover:underline hover:opacity-90 transition"
            >
              Learn More →
            </a>
          </div>

          {/* PAYMENT OPTIONS */}
          <div className="mt-8 flex items-center space-x-4 justify-center md:justify-start">
            <span className="text-gray-600 text-sm font-medium">
              Payment Options:
            </span>
            <div className="flex space-x-3">
              {["JazzCash", "Easypaisa", "Cash on Delivery"].map((opt) => (
                <span
                  key={opt}
                  className="bg-[#FFF9F3] border border-[#C1A24A]/40 rounded-full px-3 py-1 text-xs text-[#C1A24A] font-semibold shadow-sm"
                >
                  {opt}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1 }}
          className="relative mb-12 md:mb-0 flex justify-center"
        >
          <div className="relative w-[300px] md:w-[420px] h-[420px] md:h-[520px]">
            {/* soft glowing aura */}
            <div className="absolute -inset-12 bg-[radial-gradient(circle,rgba(193,162,74,0.2),transparent_70%)] blur-3xl rounded-full" />
            {/* product image */}
            <Image
              src="/images/bottle.png"
              alt="Zarwa Organics Hair Oil"
              fill
              priority
              className="object-contain drop-shadow-[0_15px_30px_rgba(193,162,74,0.35)] hover:scale-105 transition-transform duration-700"
            />
            {/* glossy reflection line */}
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#C1A24A]/50 to-transparent opacity-60" />
          </div>
        </motion.div>
      </div>

      {/* subtle gold shimmer border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C1A24A]/50 to-transparent" />
    </section>
  );
}
