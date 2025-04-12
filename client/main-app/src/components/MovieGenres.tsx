"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";

const genres = [
  {
    title: "Action",
    image: "/bggenres.jpg",
    count: "150+ Movies",
  },
  {
    title: "Comedy",
    image: "/bggenres.jpg",
    count: "120+ Movies",
  },
  {
    title: "Drama",
    image: "/bggenres.jpg",
    count: "200+ Movies",
  },
  {
    title: "Sci-Fi",
    image: "/bggenres.jpg",
    count: "90+ Movies",
  },
  {
    title: "Horror",
    image: "/bggenres.jpg",
    count: "80+ Movies",
  },
];

export function MovieGenres() {
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-4">
      <h2 className="text-3xl font-bold text-center uppercase tracking-wide relative mb-4">
        <span className="before:absolute before:left-0 before:top-1/2 before:w-24 before:h-0.5 before:bg-black before:-translate-y-1/2"></span>
        <span className="mx-4">Movie Genres</span>
        <span className="after:absolute after:right-0 after:top-1/2 after:w-24 after:h-0.5 after:bg-black after:-translate-y-1/2"></span>
      </h2>

      <div className="relative">
        {/* Left Button */}
        <Button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-600 text-white p-2 rounded-full z-10"
          onClick={scrollLeft}
        >
          <ChevronLeft />
        </Button>

        {/* Slider */}
        <div ref={sliderRef} className="flex gap-4 overflow-hidden scroll-smooth no-scrollbar px-8">
          {genres.map((genre, i) => (
            <Card key={i} className="min-w-[220px] flex-shrink-0 rounded-lg overflow-hidden relative">
              <Image
                src={genre.image}
                width={220}
                height={300}
                alt={genre.title}
                className="w-max-[250px] h-[250px] object-cover brightness-75"
              />
              <CardContent className="absolute bottom-2 left-2 text-white">
                <h3 className="text-lg font-semibold">{genre.title}</h3>
                <p className="text-sm">{genre.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Button */}
        <Button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-600 text-white p-2 rounded-full z-10"
          onClick={scrollRight}> 
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
