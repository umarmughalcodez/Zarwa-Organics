"use client";
import Image from "next/image";

const Ingredients = () => {
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Disable right-click
    alert("Right-click is disabled."); // Optional message
  };

  return (
    <div
      className="w-full relative select-none grid place-items-center"
      onContextMenu={handleContextMenu} // Disable right-click
    >
      <Image
        src="/images/productimg.webp"
        alt="Ingredients"
        width={1920}
        height={1080}
        className="w-full h-auto pointer-events-none lg:w-[75%]" // Prevent drag
        draggable={false} // Prevent drag
        priority
      />
    </div>
  );
};

export default Ingredients;
