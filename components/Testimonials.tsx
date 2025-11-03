"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Ayesha",
      title: "Karachi",
      text: "I had tried everything for my hair fall until Zarwa Organics. Within weeks, I noticed less breakage and real volume coming back. It feels pure and smells amazing!",
      image: "/images/testimonials/ayesha.webp",
    },
    {
      id: 2,
      name: "Sara",
      title: "Lahore",
      text: "Zarwa oil reminds me of my dadi’s natural hair remedies — except it’s lighter, non-sticky, and beautifully fragrant. My hair feels alive again!",
      image: "/images/testimonials/sara.webp",
    },
    {
      id: 3,
      name: "Hira",
      title: "Islamabad",
      text: "This is not just oil — it’s therapy. I use it twice a week and my hair has grown faster than ever. The herbal aroma feels so calming too.",
      image: "/images/testimonials/hira.webp",
    },
    {
      id: 4,
      name: "Mariam",
      title: "Faisalabad",
      text: "After pregnancy, my hair became dull and thin. Zarwa helped me regain the shine and strength I had lost. Truly an honest product!",
      image: "/images/testimonials/mariam.webp",
    },
    {
      id: 5,
      name: "Anum",
      title: "Rawalpindi",
      text: "Love how soft and full my hair feels after every use. It’s herbal, ethical, and totally worth every rupee!",
      image: "/images/testimonials/anum.webp",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Adjust for screen size
  useEffect(() => {
    const handleResize = () => setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const getDisplayedTestimonials = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (current + i) % testimonials.length;
      items.push(testimonials[index]);
    }
    return items;
  };

  const displayTestimonials = getDisplayedTestimonials();

  return (
    <section className="relative py-24 px-6 bg-[#FAF8F2] overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold text-[#79B27B] mb-4"
        >
          What Our Customers Say
        </motion.h2>
        <p className="text-[#5A574F] max-w-lg mx-auto mb-12 text-sm sm:text-base">
          Real women, real results — discover how Zarwa Organics is helping
          women across Pakistan fall in love with their natural hair again.
        </p>

        {/* Testimonials Carousel */}
        <div
          className="relative flex flex-col items-center justify-center"
          ref={containerRef}
        >
          <div className="flex overflow-hidden w-full justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) {
                    setCurrent((prev) => (prev + 1) % testimonials.length);
                  } else if (info.offset.x > 50) {
                    setCurrent(
                      (prev) =>
                        (prev - 1 + testimonials.length) % testimonials.length
                    );
                  }
                }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 25 }}
                className="flex justify-center gap-6 w-full flex-wrap sm:flex-nowrap cursor-grab active:cursor-grabbing"
              >
                {displayTestimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white p-8 sm:p-10 rounded-2xl shadow-md border border-[#EAE6DC] hover:shadow-lg hover:border-[#79B27B]/40 transition-all duration-300 w-full sm:w-1/3 flex flex-col items-center"
                  >
                    <div className="relative w-20 h-20 mb-4">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover rounded-full border-4 border-[#79B27B]/60"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-[#5A574F] text-sm sm:text-base leading-relaxed mb-4">
                      “{t.text}”
                    </p>
                    <div>
                      <h4 className="font-semibold text-[#2E2B27] text-base sm:text-lg">
                        {t.name}
                      </h4>
                      <p className="text-[#79B27B] text-xs sm:text-sm">
                        {t.title}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-[#79B27B] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(121,178,123,0.12),transparent_70%)] pointer-events-none" />
    </section>
  );
}
