"use client";


import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCallback, useState } from "react";

const bannerImages = ["/2.png", "/natra1.jpg", "/3.png", "/4.jpg"];

export function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useCallback(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-screen-xl mx-auto">
      {/* Slide chính */}
      <Carousel className="w-full rounded-xl overflow-hidden shadow-lg">
        <CarouselContent
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.6s ease-in-out",
          }}
        >
          {bannerImages.map((src, index) => (
            <CarouselItem key={index} className="w-full flex-shrink-0">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={src}
                    width={1200}
                    height={400}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            } transition duration-300`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
