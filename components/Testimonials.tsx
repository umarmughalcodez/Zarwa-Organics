"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

export default function Testimonials() {
  const reviews = [
    {
      name: "Ayesha Khan",
      text: "Zarwa Hair Oil completely transformed my hair! Softer, stronger, and naturally shiny — I can’t imagine my routine without it.",
      image: "/images/review1.jpg",
    },
    {
      name: "Sara Malik",
      text: "I love that it’s 100% organic — no harsh chemicals. My hair fall reduced in 2 weeks! It smells divine 💛",
      image: "/images/review2.jpg",
    },
    {
      name: "Hina Rahman",
      text: "From packaging to performance — everything feels premium. My hair feels alive again!",
      image: "/images/review3.jpg",
    },
    {
      name: "Fatima Noor",
      text: "It actually works! My mom and I both use it now. Love that it’s totally natural and handmade.",
      image: "/images/review4.jpg",
    },
    {
      name: "Mehak Ali",
      text: "Within a month my hair grew noticeably thicker. So nourishing and gentle on my scalp!",
      image: "/images/review5.jpg",
    },
    {
      name: "Sana Javed",
      text: "Feels like spa treatment at home. Hydration and shine are unreal. Definitely worth every drop.",
      image: "/images/review6.jpg",
    },
    {
      name: "Amna Tariq",
      text: "This oil smells so natural and calming. My hair texture improved drastically!",
      image: "/images/review7.jpg",
    },
    {
      name: "Laiba Riaz",
      text: "No more split ends or dryness. It’s pure magic in a bottle!",
      image: "/images/review8.jpg",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative bg-[#FAF8F2] py-24 overflow-hidden text-[#2E2B27]"
    >
      {/* soft herbal background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(121,178,123,0.1),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-semibold text-[#79B27B] mb-6">
          Customer Love
        </h2>
        <p className="text-[#5A574F] text-lg max-w-2xl mx-auto mb-12">
          Real stories, real results — see how{" "}
          <span className="font-semibold text-[#79B27B]">Zarwa Organics</span>{" "}
          brings life back to hair, naturally.
        </p>

        {/* Infinite auto-scrolling testimonials */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
          >
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm border border-[#79B27B]/20 rounded-2xl shadow-md p-6 w-[240px] h-[240px] flex-shrink-0 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#79B27B]/40">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-[#79B27B]">
                    {review.name}
                  </h3>
                  <div className="flex space-x-1 text-[#79B27B] text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-[#5A574F] text-sm leading-snug">
                    “{review.text}”
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* bottom subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#79B27B]/30 to-transparent" />
    </section>
  );
}
