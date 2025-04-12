import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// 📌 Danh sách ảnh món ăn
const foodImages = [
  "/f1.jpg",
  "/f2.jpg",
  "/f3.jpg",

];

export function SlideFood() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-md"
    >
      <CarouselContent className="my-2 h-[300px]">
        {foodImages.map((src, index) => (
          <CarouselItem key={index} className="pt-1 xl:basis-2">
            <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className="flex items-center justify-center p-0">
                  <Image
                    src={src}
                    width={300}
                    height={180}
                    alt={`Food ${index + 1}`}
                    className="w-full h-[150px] object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
