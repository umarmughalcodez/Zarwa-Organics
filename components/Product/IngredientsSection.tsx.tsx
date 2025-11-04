"use client";
import Image from "next/image";

const Ingredients = () => {
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Disable right-click
    alert("Right-click is disabled on this image."); // Optional message
  };

  return (
    <div
      className="w-full relative select-none"
      onContextMenu={handleContextMenu} // Disable right-click
    >
      <Image
        src="/images/productimg.webp"
        alt="Ingredients"
        width={1920}
        height={1080}
        className="w-full h-auto pointer-events-none" // Prevent drag
        draggable={false} // Prevent drag
        priority
      />
    </div>
  );
};

export default Ingredients;
