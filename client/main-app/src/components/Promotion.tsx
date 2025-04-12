"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const promotions = [
  {
    title: "Super Saver Deals",
    image: "/f1.jpg",
    description: "Up to 50% off on blockbuster movies!",
  },
  {
    title: "Weekend Specials",
    image: "/f2.jpg",
    description: "Buy 1 Get 1 Free on select movie tickets.",
  },
  {
    title: "Student Discount",
    image: "/f3.jpg",
    description: "Students get 20% off with valid ID.",
  },
  {
    title: "VIP Membership",
    image: "/f4.jpg",
    description: "Exclusive access to early bookings & discounts.",
  },
  {
    title: "Festive Offers",
    image: "/f5.png",
    description: "Celebrate with special festive discounts!",
  },
];

export function Promotion() {
  const router = useRouter();
  return (
    <div className="relative w-full max-w-7xl mx-auto my-6">
      <h2 className="text-3xl font-bold text-center uppercase tracking-wide relative mb-4">
        <span className="before:absolute before:left-0 before:top-1/2 before:w-24 before:h-0.5 before:bg-black before:-translate-y-1/2"></span>
        <span className="mx-4">Exclutive Promotions</span>
        <span className="after:absolute after:right-0 after:top-1/2 after:w-24 after:h-0.5 after:bg-black after:-translate-y-1/2"></span>
      </h2>
      <Carousel opts={{ align: "start" }} className="w-full max-w-7xl mx-auto">
        <CarouselContent>
          {promotions.map((promo, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="relative overflow-hidden rounded-lg group"
                onClick={() => router.push(`/promotion`)}
                >
                  <Image
                    src={promo.image}
                    width={280}
                    height={350}
                    alt={promo.title}
                    className="w-full h-[250px] object-cover transition-transform hover:brightness-50 duration-700 hover:scale-110"
                  />
                  <CardContent className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold">{promo.title}</h3>
                    <p className="text-sm">{promo.description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}