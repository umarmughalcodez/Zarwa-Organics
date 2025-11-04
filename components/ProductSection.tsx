"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { fadeUp, fadeRight } from "@/lib/animations";

export default function ProductSection() {
  return (
    <section
      id="product"
      className="bg-[#F9F7F3] py-20 px-6 lg:px-20 flex flex-col md:flex-row items-center gap-12"
    >
      {/* Left - Product Image */}
      <motion.div
        className="flex-1 flex justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-2xl overflow-hidden shadow-xl border border-[#DAD5C6]">
          <Image
            src="/images/hair-oil-bottle.png"
            alt="Zarwa Hair Growth Oil"
            fill
            className="object-contain p-6"
          />
        </div>
      </motion.div>

      {/* Right - Product Info */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeRight}
      >
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#2E2B27] mb-4">
          Zarwa Hair Growth Oil
        </h2>

        <p className="text-[#4A4A3F] mb-6 leading-relaxed max-w-lg">
          Experience centuries-old herbal wisdom in every drop. Crafted with
          natural ingredients that nourish your scalp, reduce hair fall, and
          promote healthy, shiny growth — naturally.
        </p>

        {/* Price */}
        <p className="text-2xl font-bold text-[#8BBE67] mb-2">
          Rs. 699{" "}
          <span className="text-base text-[#6F8F58] font-normal">/ bottle</span>
        </p>

        {/* Bulk Purchase Offer */}
        <div className="bg-[#EAE6DC] border border-[#DAD5C6] rounded-xl p-4 mb-6 text-sm text-[#3E3B2D]">
          <p className="font-medium mb-1">✨ Bulk Discounts:</p>
          <ul className="space-y-1">
            <li>
              Buy 2 bottles —{" "}
              <span className="text-[#8BBE67] font-semibold">save 5%</span>
            </li>
            <li>
              Buy 3 bottles —{" "}
              <span className="text-[#8BBE67] font-semibold">save 10%</span>
            </li>
            <li>
              Buy 5+ bottles —{" "}
              <span className="text-[#8BBE67] font-semibold">save 15%</span>
            </li>
          </ul>
        </div>

        {/* Buy Now Button */}
        <Button className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white text-sm font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform">
          Buy Now
        </Button>
      </motion.div>
    </section>
  );
}
