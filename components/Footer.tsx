"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="relative bg-white border-t border-[#2cbb1f]/30 pt-16 pb-8 overflow-hidden">
      {/* Decorative golden glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#2cbb1f]/10 blur-3xl rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left place-items-center"
      >
        {/* Column 1 - About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="w-full flex justify-center md:justify-start mb-4">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={90}
              height={90}
              className="mx-auto"
              onClick={() => router.push("/#hero")}
            />
          </div>
          <p className="text-gray-700 leading-relaxed max-w-xs">
            Nourish naturally, shine beautifully. Premium organic care designed
            to bring out your hair’s true radiance.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-[#8BBE67] mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#hero"
                className="text-gray-700 hover:text-[#8BBE67] transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-gray-700 hover:text-[#8BBE67] transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#highlights"
                className="text-gray-700 hover:text-[#8BBE67] transition"
              >
                Product Highlights
              </a>
            </li>
            <li>
              <a
                href="#shop"
                className="text-gray-700 hover:text-[#8BBE67] transition"
              >
                Shop
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact & Socials */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-[#8BBE67] mb-3">
            Contact Us
          </h4>
          <p
            className="text-gray-700"
            onClick={() => router.push("mailto:hello@zarwaorganics.com")}
          >
            <span className="text-[#8BBE67] font-semibold">Email:</span>
            &nbsp;hello@zarwaorganics.com
          </p>
          <p
            className="text-gray-700"
            onClick={() => router.push("tel:03001234567")}
          >
            <span className="text-[#8BBE67] font-semibold">Whatsapp:</span>
            &nbsp;+92 300 1234567
          </p>

          {/* Social icons */}
          <div className="flex justify-center md:justify-start space-x-5 mt-4">
            <a
              href="#"
              className="text-[#8BBE67] hover:scale-110 transition-transform"
            >
              <FaWhatsapp size={22} />
            </a>
            <a
              href="#"
              className="text-[#8BBE67] hover:scale-110 transition-transform"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              className="text-[#8BBE67] hover:scale-110 transition-transform"
            >
              <FaTiktok size={22} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Divider line */}
      <div className="mt-12 mb-6 h-px bg-gradient-to-r from-transparent via-[#2cbb1f]/40 to-transparent" />

      {/* Copyright */}
      <div className="text-center text-gray-600 text-sm">
        © 2025{" "}
        <span className="text-[#8BBE67] font-semibold">Zarwa Organics</span>.
        All rights reserved.
      </div>
    </footer>
  );
}
