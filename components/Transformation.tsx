"use client";

import React from "react";
import { PiSealCheck } from "react-icons/pi";
import { IoStar } from "react-icons/io5";
import { motion } from "framer-motion";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

const Transformation = () => {
  const router = useRouter();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="transformation"
      className="w-full flex flex-col-reverse lg:flex-row items-center justify-center text-[#3E3B2D] py-10 px-6 md:px-12 xl:px-24 bg-[#ffffff] overflow-x-hidden space-y-8"
    >
      {/* === Left Content === */}
      <motion.div
        className="lg:w-1/2 w-full max-w-xl space-y-8"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.div variants={fadeUp}>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Witness Your{" "}
            <span className="text-[#8BBE67]">Hair Transformation</span> —
            Naturally with{" "}
            <span className="text-[#8BBE67]">Zarwa Organics</span>
          </h2>
          <p className="text-[#4a4a3f] leading-relaxed">
            From lifeless, brittle strands to soft, lustrous hair that glows
            with natural vitality — our Hair Growth Oil brings ancestral care
            into your modern routine. Strengthen, nourish, and fall in love with
            your hair all over again.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 space-y-4">
          <div className="flex items-center space-x-3">
            <PiSealCheck className="text-[#8BBE67] text-2xl" />
            <span>100% Natural & Herbal Ingredients</span>
          </div>
          <div className="flex items-center space-x-3">
            <PiSealCheck className="text-[#8BBE67] text-2xl" />
            <span>Visibly Thicker, Shinier Hair</span>
          </div>
          <div className="flex items-center space-x-3">
            <PiSealCheck className="text-[#8BBE67] text-2xl" />
            <span>Deep Scalp Nourishment & Reduced Hair Fall</span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-start sm:space-x-8 space-y-6 sm:space-y-0"
        >
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="flex space-x-1 text-[#8BBE67]">
              {[...Array(5)].map((_, i) => (
                <IoStar key={i} />
              ))}
            </div>
            <p className="text-sm text-gray-600">Loved by 10,000+ Women</p>
          </div>

          <div className="hidden sm:block h-[60px] w-[1px] bg-gradient-to-b from-transparent via-[#8BBE67] to-transparent" />

          <div className="flex flex-col items-center text-center">
            <span className="font-semibold text-lg text-[#8BBE67]">
              Gentle by Nature
            </span>
            <span className="text-sm text-gray-600">Real. Pure. Effective</span>
          </div>
        </motion.div>

        {/* === CTA Section === */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <Button
            effect="expandIcon"
            iconPlacement="right"
            icon={FaArrowRight}
            className="px-8 py-3 rounded-full bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform text-center"
          >
            Experience the Transformation
          </Button>
        </motion.div>
      </motion.div>

      {/* === Right Compare Section === */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center mt-6 mb-12 lg:mb-0 lg:mt-0 space-y-3"
        initial="hidden"
        whileInView="visible"
        variants={fadeRight}
        viewport={{ once: true }}
      >
        <div className="w-full max-w-md sm:max-w-xl bg-[#8BBE67] p-1 rounded-3xl overflow-hidden mx-auto shadow-xl">
          <ReactCompareSlider
            boundsPadding={0}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
            itemOne={
              <ReactCompareSliderImage
                alt="Before Hair Oil Treatment"
                src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?auto=format&fit=crop&w=800&q=80"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                alt="After Using Zarwa Hair Oil"
                src="https://images.unsplash.com/photo-1619946794139-4d84e5d0c53a?auto=format&fit=crop&w=800&q=80"
              />
            }
            position={50}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Transformation;
