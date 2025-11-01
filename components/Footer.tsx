"use client";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-[#C1A24A]/30 pt-16 pb-8 overflow-hidden">
      {/* Decorative golden glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#C1A24A]/10 blur-3xl rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left"
      >
        {/* Column 1 - About */}
        <div>
          <h3 className="text-xl font-bold text-[#C1A24A] mb-3">
            Zarwa Organics
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Nourish naturally, shine beautifully.  
            Premium organic care designed to bring out your hair’s true radiance.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-[#C1A24A] mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#hero"
                className="text-gray-700 hover:text-[#C1A24A] transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-gray-700 hover:text-[#C1A24A] transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#highlights"
                className="text-gray-700 hover:text-[#C1A24A] transition"
              >
                Product Highlights
              </a>
            </li>
            <li>
              <a
                href="#shop"
                className="text-gray-700 hover:text-[#C1A24A] transition"
              >
                Shop
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact & Socials */}
        <div>
          <h4 className="text-lg font-semibold text-[#C1A24A] mb-3">
            Contact Us
          </h4>
          <p className="text-gray-700">Email: hello@zarwaorganics.com</p>
          <p className="text-gray-700">WhatsApp: +92 300 1234567</p>

          {/* Social icons */}
          <div className="flex justify-center md:justify-start space-x-5 mt-4">
            <a
              href="#"
              className="text-[#C1A24A] hover:scale-110 transition-transform"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              className="text-[#C1A24A] hover:scale-110 transition-transform"
            >
              <FaTiktok size={22} />
            </a>
            <a
              href="#"
              className="text-[#C1A24A] hover:scale-110 transition-transform"
            >
              <FaWhatsapp size={22} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Divider line */}
      <div className="mt-12 mb-6 h-px bg-gradient-to-r from-transparent via-[#C1A24A]/40 to-transparent" />

      {/* Copyright */}
      <div className="text-center text-gray-600 text-sm">
        © 2025 <span className="text-[#C1A24A] font-semibold">Zarwa Organics</span>. All rights reserved.
      </div>

      {/* Scroll to top button */}
      <motion.a
        href="#hero"
        whileHover={{ scale: 1.1 }}
        className="absolute right-6 bottom-6 bg-[#C1A24A] text-white p-3 rounded-full shadow-lg hover:bg-[#b5933f] transition"
      >
        ↑
      </motion.a>
    </footer>
  );
}
