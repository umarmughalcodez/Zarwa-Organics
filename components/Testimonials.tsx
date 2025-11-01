"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

export default function Testimonials() {
  const reviews = [
    {
      name: "Ayesha Khan",
      text: "Zarwa Hair Oil completely transformed my hair! It feels softer, stronger, and the natural shine is unreal. I can’t imagine my routine without it now.",
      image: "/images/review1.jpg", // replace with your testimonial image
    },
    {
      name: "Sara Malik",
      text: "I love that it’s 100% organic — no harsh chemicals, just pure care. My hair fall reduced in just 2 weeks! Smells amazing too 💛",
      image: "/images/review2.jpg",
    },
    {
      name: "Hina Rahman",
      text: "From the packaging to the results — everything feels premium. My hair feels alive again. Highly recommended for anyone who wants real growth!",
      image: "/images/review3.jpg",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-b from-white to-[#fdf8f3] py-24 overflow-hidden"
    >
      {/* soft golden background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(193,162,74,0.1),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#C1A24A] mb-6">
          Customer Love
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-12">
          Hear from our happy customers who embraced natural beauty with{" "}
          <span className="font-semibold text-[#C1A24A]">Zarwa Organics</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-[#C1A24A]/20 hover:shadow-2xl hover:scale-[1.02] transition-all"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#C1A24A]">
                  {review.name}
                </h3>
                <div className="flex space-x-1 text-[#C1A24A]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  “{review.text}”
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* bottom decorative divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C1A24A]/40 to-transparent" />
    </section>
  );
}
