"use client";

import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaUniversity,
  FaMobileAlt,
  FaRegCreditCard,
} from "react-icons/fa";

export default function PaymentMethods() {
  return (
    <section className="relative bg-[#4C6B43] text-white py-20 px-6 overflow-hidden">
      {/* Soft organic shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-[#C5A45A]/15 via-transparent to-transparent blur-3xl"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold mb-4"
        >
          Easy & Secure Payment Options
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed mb-12"
        >
          We make ordering simple for everyone across Pakistan — pay with{" "}
          <span className="font-semibold text-white">Easypaisa</span>,{" "}
          <span className="font-semibold text-white">JazzCash</span>,{" "}
          <span className="font-semibold text-white">Bank Transfer</span>, or
          choose{" "}
          <span className="font-semibold text-white">Cash on Delivery</span>.
        </motion.p>

        {/* Payment Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center mt-10">
          {/* Easypaisa */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-3"
          >
            <FaMobileAlt className="text-[#A8E063] text-4xl" />
            <span className="text-white/90 font-medium">Easypaisa</span>
          </motion.div>

          {/* JazzCash */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-3"
          >
            <FaMobileAlt className="text-[#F4B400] text-4xl" />
            <span className="text-white/90 font-medium">JazzCash</span>
          </motion.div>

          {/* Bank Transfer */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-3"
          >
            <FaUniversity className="text-[#E8D8A8] text-4xl" />
            <span className="text-white/90 font-medium">Bank Transfer</span>
          </motion.div>

          {/* Cash on Delivery */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-3"
          >
            <FaMoneyBillWave className="text-[#C5A45A] text-4xl" />
            <span className="text-white/90 font-medium">Cash on Delivery</span>
          </motion.div>
        </div>

        {/* Bottom glow line */}
        <motion.div
          className="mt-16 w-2/3 mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
