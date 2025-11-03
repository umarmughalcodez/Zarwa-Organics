"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import { FaLeaf, FaHeart, FaSpa, FaSun } from "react-icons/fa";

interface CountUpProps {
  start?: number;
  target: number;
  duration?: number;
  decimals?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  start = 0,
  target,
  duration = 2,
  decimals = 0,
}) => {
  const [count, setCount] = useState(start);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const newValue = start + (target - start) * progress;
      setCount(parseFloat(newValue.toFixed(decimals)));

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [start, target, duration, decimals]);

  return <>{count.toLocaleString()}</>;
};

export default function StatsSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setStartCounting(true);
    }
  }, [inView, controls]);

  const stats = [
    {
      icon: <FaLeaf className="text-white text-4xl mb-3" />,
      label: "Natural Ingredients",
      start: 0,
      value: 100,
      suffix: "%",
      desc: "Pure herbal oils — no parabens, no sulfates, no toxins.",
    },
    {
      icon: <FaHeart className="text-white text-4xl mb-3" />,
      label: "Happy Customers",
      start: 0,
      value: 12000,
      suffix: "+",
      desc: "Thousands trust Zarwa for real hair transformation.",
    },
    {
      icon: <FaSpa className="text-white text-4xl mb-3" />,
      label: "Visible Growth Results",
      start: 0,
      value: 94,
      suffix: "%",
      decimals: 0,
      desc: "Users report stronger, thicker, shinier hair naturally.",
    },
    {
      icon: <FaSun className="text-white text-4xl mb-3" />,
      label: "Ethically Crafted",
      start: 0,
      value: 100,
      suffix: "%",
      desc: "Handcrafted in small batches with care 🌿",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-[#4F6F52] text-white py-24 px-6 overflow-hidden"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent blur-3xl"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="text-3xl md:text-5xl font-semibold tracking-wide text-white"
        >
          Trusted by Nature, Loved by Thousands
        </motion.h2>
        <div className="mt-6 w-full h-[1px] mx-auto bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* Stats */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center p-8 rounded-br-[50%] rounded-tl-[50%] bg-[#6B8E6E]/60 backdrop-blur-sm border border-white/20 hover:border-white/50 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: index * 0.15 },
              },
            }}
          >
            {stat.icon}
            <h3 className="text-4xl md:text-5xl font-semibold text-white">
              {startCounting ? (
                <CountUp
                  start={stat.start}
                  target={stat.value}
                  duration={2.5}
                  decimals={stat.decimals}
                />
              ) : (
                stat.start
              )}
              {stat.suffix}
            </h3>

            <p className="text-base font-medium mt-2 text-white">
              {stat.label}
            </p>
            <p className="text-sm mt-2 text-white/70 max-w-xs">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-20 text-center"
      >
        <a
          href="#shop"
          className="inline-block bg-white text-[#4F6F52] font-semibold rounded-full px-10 py-4 text-lg shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform duration-300"
        >
          Join the Zarwa Hair Community
        </a>
      </motion.div>
    </section>
  );
}
