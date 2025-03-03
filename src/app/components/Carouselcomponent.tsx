"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const CarouselComponent = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={3000}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      stopOnHover
      showIndicators={false}
      className="w-full"
    >
      {/* Image 1 */}
      <div className="rounded-md">
        <Image
          src="/1740719627292.png"
          alt="Carousel Image 1"
          layout="responsive"
          width={1920} // ✅ Ensures full width
          height={600} // ✅ Adjust height as needed
          className="object-cover rounded-md"
          priority
        />
      </div>

      {/* Image 2 */}
      <div className="rounded-md">
        <Image
          src="/1740719627309.png"
          alt="Carousel Image 2"
          layout="responsive"
          width={1920}
          height={600}
          className="object-cover rounded-md"
        />
      </div>

      {/* Image 3 */}
      <div className="rounded-md">
        <Image
          src="/1740719627319.jpeg"
          alt="Carousel Image 3"
          layout="responsive"
          width={1920}
          height={600}
          className="object-cover rounded-md"
        />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
