"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaMoneyBillWave,
  FaUniversity,
  FaMobileAlt,
  FaRegCreditCard,
} from "react-icons/fa";

export default function PaymentMethods() {
  return (
    <section className="relative bg-[#ffffff] text-[#444] py-20 px-6 overflow-hidden">
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
          Easy & <span className="text-[#8BBE67]">Secure</span>&nbsp;Payment
          Options
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[#444] max-w-2xl mx-auto text-lg leading-relaxed mb-12"
        >
          We make ordering{" "}
          <span className="text-[#8BBE67] font-semibold">
            simple for everyone across Pakistan{" "}
          </span>
          — pay with{" "}
          <span className="font-semibold text-[#8BBE67]">Easypaisa</span>,{" "}
          <span className="font-semibold text-[#8BBE67]">JazzCash</span>,{" "}
          <span className="font-semibold text-[#8BBE67]">Bank Transfer</span>,
          or choose{" "}
          <span className="font-semibold text-[#8BBE67]">Cash on Delivery</span>
          .
        </motion.p>

        {/* Payment Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center mt-10">
          {/* Easypaisa */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center space-y-3"
          >
            <Image
              src="/images/easypaisa.png"
              alt="Easypaisa"
              width={180}
              height={180}
            />
            <span className="text-[#8BBE67] font-medium">Easypaisa</span>
          </motion.div>

          {/* JazzCash */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-3"
          >
            <Image
              src="/images/jazzcash.png"
              alt="JazzCash"
              width={180}
              height={180}
            />
            <span className="text-[#8BBE67] font-medium">JazzCash</span>
          </motion.div>

          {/* Bank Transfer */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-3"
          >
            <Image
              src="/images/atm-card.png"
              alt="Bank Transfer"
              width={80}
              height={80}
            />
            <span className="text-[#8BBE67] font-medium">Bank Transfer</span>
          </motion.div>

          {/* Cash on Delivery */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-3"
          >
            <Image
              src="/images/cod.png"
              alt="Cash on Delivery"
              width={80}
              height={80}
            />
            <span className="text-[#8BBE67] font-medium">Cash on Delivery</span>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <a
            href="#shop"
            className="inline-block bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-[#ffffff] font-semibold rounded-full px-10 py-4 text-md shadow-md hover:shadow-lg hover:scale-[1.04] transition-all duration-300"
          >
            Order Now — Pay the Way You Like
          </a>
        </motion.div>

        {/* Bottom glow line */}
      </div>
    </section>
  );
}
