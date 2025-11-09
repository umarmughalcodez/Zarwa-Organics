"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { fadeUp, fadeRight } from "@/lib/animations";
import QuantitySelector from "./QuantitySelector";
import BulkDiscountSelector from "./BulkDiscountSelector";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProductSection() {
  const images = [
    "/images/edited.png",
    "/images/about.png",
    "/images/img3.png",
    "/images/hero-img.png",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  return (
    <section
      id="product"
      className="bg-[#ffffff] py-20 px-6 lg:px-20 flex flex-col md:flex-row items-center gap-12 mt-20 lg:mt-24"
    >
      {/* Left - Product Gallery */}
      <motion.div
        className="flex-1 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        {/* Main Image */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-[#8BBE67] bg-white">
          <Image
            key={selectedImage}
            src={selectedImage}
            alt="Zarwa Hair Growth Oil"
            fill
            className="object-cover transition-all duration-500 ease-in-out"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-4 mt-6">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedImage === img
                  ? "border-[#8BBE67]"
                  : "border-[#DAD5C6] hover:border-[#8BBE67]/60"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
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
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#8BBE67] mb-4">
          Hair Growth Oil
        </h2>

        <p className="text-[#4A4A3F] mb-6 leading-relaxed max-w-lg">
          Experience the ancestral secret of strong, radiant hair — packed with
          100% natural herbs and oils. Say goodbye to breakage, dryness, and
          dullness with every drop of{" "}
          <span className="text-[#8BBE67] font-medium">
            Zarwa Organic's Hair Growth Oil
          </span>
          .
        </p>

        {/* Price */}
        <p className="text-2xl font-bold text-[#8BBE67] mb-2">
          Rs. 749{" "}
          <span className="text-base text-[#8BBE67] font-normal">
            / bottle (100ml)
          </span>
        </p>

        {/* Quantity Selector */}
        <QuantitySelector
          value={quantity}
          onChange={(val: number) => setQuantity(val)}
        />

        {/* Bulk Discounts — updates the same quantity state */}
        <BulkDiscountSelector onQuantityChange={(q) => setQuantity(q)} />

        {/* Buy Now Button */}
        <Button
          className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white text-sm font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform"
          onClick={() => {
            // Validate quantity before redirect
            const validQuantity = Math.max(1, Math.min(20, quantity));
            if (quantity > 20) {
              toast.error(
                "We're sorry, you can order max 20 bottles due to low stock"
              );
            }
            router.push(`/checkout?qty=${validQuantity}`);
          }}
        >
          Buy Now
        </Button>
      </motion.div>
    </section>
  );
}
