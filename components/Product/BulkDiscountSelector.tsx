// "use client";
// import { useState } from "react";

// export default function BulkDiscountSelector({
//   onQuantityChange,
// }: {
//   onQuantityChange: (quantity: number) => void;
// }) {
//   const [selected, setSelected] = useState<number | null>(null);

//   const options = [
//     { id: 3, label: "3 Bottles", discount: "5%" },
//     { id: 5, label: "5 Bottles", discount: "8%" },
//     { id: 8, label: "8+ Bottles", discount: "12%" },
//   ];

//   const handleClick = (id: number) => {
//     if (selected === id) {
//       // Unselect if clicked again
//       setSelected(null);
//       onQuantityChange(1);
//     } else {
//       setSelected(id);
//       onQuantityChange(id);
//     }
//   };

//   return (
//     <div className="rounded-xl p-2 mb-6 text-sm text-[#3E3B2D]">
//       {/* Buttons Container */}
//       <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
//         {options.map((opt) => (
//           <button
//             key={opt.id}
//             onClick={() => handleClick(opt.id)}
//             className={`px-4 py-2 rounded-lg border transition-all duration-200 w-full sm:w-auto ${
//               selected === opt.id
//                 ? "bg-[#8BBE67] text-white border-[#8BBE67]"
//                 : "bg-white text-[#3E3B2D] border-[#DAD5C6] hover:border-[#8BBE67]/60"
//             }`}
//           >
//             {opt.label} —{" "}
//             <span
//               className={`font-semibold ${
//                 selected === opt.id ? "text-white" : "text-[#8BBE67]"
//               }`}
//             >
//               save {opt.discount}
//             </span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";

export default function BulkDiscountSelector({
  onQuantityChange,
}: {
  onQuantityChange: (quantity: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  // Adjusted discounts so you don't sell at a loss
  const options = [
    { id: 3, label: "3 Bottles", discount: "3%" },
    { id: 5, label: "5 Bottles", discount: "5%" },
    { id: 8, label: "8+ Bottles", discount: "8%" },
  ];

  const handleClick = (id: number) => {
    if (selected === id) {
      setSelected(null);
      onQuantityChange(1);
    } else {
      setSelected(id);
      onQuantityChange(id);
    }
  };

  return (
    <div className="rounded-xl p-2 mb-6 text-sm text-[#3E3B2D]">
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleClick(opt.id)}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 w-full sm:w-auto ${
              selected === opt.id
                ? "bg-[#8BBE67] text-white border-[#8BBE67]"
                : "bg-white text-[#3E3B2D] border-[#DAD5C6] hover:border-[#8BBE67]/60"
            }`}
          >
            {opt.label} —{" "}
            <span
              className={`font-semibold ${
                selected === opt.id ? "text-white" : "text-[#8BBE67]"
              }`}
            >
              save {opt.discount} & FREE Delivery
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
