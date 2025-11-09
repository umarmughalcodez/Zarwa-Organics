// WhatsAppButton.tsx
"use client";

import Image from "next/image";

export default function WhatsAppButton() {
  const whatsappNumber = "923143988998"; // Replace with your WhatsApp number
  const message = "Hello! I want to inquire about my order."; // Optional pre-filled message
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 w-14 h-14 md:w-16 md:h-16"
    >
      <div className="w-full h-full relative hover:scale-110 transition-transform duration-200">
        <Image
          src="/images/whatsapp.png"
          alt="WhatsApp"
          fill
          className="object-contain"
        />
      </div>
    </a>
  );
}
