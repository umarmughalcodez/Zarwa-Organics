"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeRight } from "@/lib/animations";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question:
        "Is Zarwa Organics Hair Growth Oil suitable for all hair types?",
      answer:
        "Yes! Our formula is crafted with 100% natural, herbal ingredients — safe and effective for all hair types, including chemically treated and color-dyed hair. Whether your hair is dry, frizzy, or thinning, Zarwa nourishes deeply from root to tip.",
    },
    {
      question: "How long does it take to see visible hair growth results?",
      answer:
        "Most users begin noticing visible improvement within 1-2 weeks of consistent use — reduced hair fall, softer texture, and new baby hair growth. However, results vary depending on your hair health and routine.",
    },
    {
      question: "Can I use it daily?",
      answer:
        "You can use it 2–3 times a week for best results. Massage gently into the scalp for 5–10 minutes, leave it on for a few hours or overnight, and then wash with a mild herbal shampoo.",
    },
    {
      question: "Does it make the scalp oily or sticky?",
      answer:
        "No — Zarwa Organics oil absorbs beautifully into the scalp without leaving a greasy residue. It’s lightweight, natural, and non-sticky, designed for comfort and nourishment.",
    },
    {
      question: "Are there any chemicals or preservatives in it?",
      answer:
        "Absolutely not. Our oil is 100% free from parabens, sulfates, silicones, and synthetic fragrances. Each bottle is handcrafted in small batches using pure herbal infusions.",
    },
    {
      question: "Is it safe for sensitive scalp or postpartum hair loss?",
      answer:
        "Yes. Our gentle blend of amla, bhringraj, and castor oil supports natural recovery for women facing postpartum or stress-related hair fall — without irritation or harsh ingredients.",
    },
    {
      question: "How should I store Zarwa Organics Hair Oil?",
      answer:
        "Keep it in a cool, dry place away from direct sunlight. Since it’s made with natural oils, avoid leaving it near heat sources to preserve its herbal potency.",
    },
    {
      question: "Do you deliver across Pakistan?",
      answer:
        "Yes, we offer fast delivery all over Pakistan — with secure packaging to keep your product safe and fresh when it reaches you.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#4F6F52] py-20 text-white" id="faq">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-semibold text-center mb-10"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          className="space-y-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                activeIndex === index
                  ? "bg-white/10 border-white/40"
                  : "bg-white/5 border-white/20"
              }`}
              variants={fadeRight}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className={`flex justify-between items-center w-full p-5 text-left cursor-pointer font-medium transition-colors duration-300 ${
                  activeIndex === index ? "text-white" : "text-white/90"
                }`}
              >
                <span className="text-lg">{item.question}</span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4"
                >
                  <svg
                    className="w-5 h-5 text-white/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.span>
              </button>

              {/* Animated Answer */}
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0, y: -10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.8, 0.25, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mb-3 mx-auto"
                    />
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="text-white/80 px-5 pb-5 leading-relaxed"
                    >
                      {item.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
