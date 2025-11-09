"use client";
import { useState } from "react";

interface QuantitySelectorProps {
  value: number;
  onChange: (val: number) => void;
}

export default function QuantitySelector({
  value,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-8 h-8 rounded-full border border-[#DAD5C6] text-[#ffffff] bg-[#8BBE67]"
      >
        –
      </button>
      <span className="text-lg font-semibold text-[#8BBE67] w-8 text-center">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 rounded-full border border-[#DAD5C6] text-[#ffffff] bg-[#8BBE67]"
      >
        +
      </button>
    </div>
  );
}
