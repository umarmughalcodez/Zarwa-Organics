"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";
import { Button } from "./ui/button"; // your button component
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const messages = [
    "✨ Free shipping on all orders over $50!",
    "🐾 Get 10% off your first order — use code WELCOME10",
    "🌿 All-natural ingredients, crafted with care.",
    "🚚 Fast worldwide delivery from the USA!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 80);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showHeader ? 0 : -120 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
    >
      {/* 🔸 Animated Announcement Bar */}
      <div className="w-full bg-amber-950 text-white text-sm sm:text-base py-5 overflow-hidden relative flex justify-center items-center font-medium tracking-wide">
        <AnimatePresence mode="wait">
          <motion.div
            key={messages[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute text-center px-4"
          >
            {messages[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🔸 Navbar */}
      <nav className="w-full flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo */}
        <Image
          src={"/images/logo.png"}
          alt="Auro"
          // fill
          width={100}
          height={80}
        />
        {/* <Button
          // variant="link"
          // effect="hoverUnderline"
          className="text-2xl font-heading font-semibold text-charcoal"
          onClick={() => router.push("/")}
        >
          Auroscents
        </Button> */}

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-800 font-medium">
          {navLinks.map((link, i) => (
            <li key={i}>
              <Button
                variant="link"
                effect="hoverUnderline"
                onClick={() => router.push(link.path)}
                className="text-gray-800 p-0"
              >
                {link.name}
              </Button>
            </li>
          ))}
        </ul>
        <Button
          effect={"expandIcon"}
          iconPlacement="right"
          icon={MdOutlineShoppingCart}
          className="bg-gradient-to-br from-[#9fc96b] to-[#86b95a] rounded-3xl hidden md:flex items-center font-semibold"
        >
          Order Now
        </Button>

        {/* Icons */}
        {/* <div className="hidden md:flex items-center gap-5">
          <button aria-label="Search">
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          <button aria-label="Login">
            <User className="w-5 h-5 text-gray-700" />
          </button>
          <button aria-label="Cart">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>
        </div> */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden animate-slideUp">
            <ul className="flex flex-col items-center gap-4 py-6 text-gray-800 font-medium">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Button
                    variant="link"
                    effect="hoverUnderline"
                    onClick={() => {
                      router.push(link.path);
                      setMenuOpen(false);
                    }}
                    className="text-gray-800"
                  >
                    {link.name}
                  </Button>
                </li>
              ))}
              <Button className="bg-gradient-to-br from-[#9fc96b] to-[#86b95a] rounded-3xl font-semibold">
                Order Now
              </Button>
              {/* <div className="flex items-center gap-6 pt-4">
                <Search className="w-5 h-5 text-gray-700" />
                <User className="w-5 h-5 text-gray-700" />
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </div> */}
            </ul>
          </div>
        )}
      </nav>
    </motion.header>
  );
}
