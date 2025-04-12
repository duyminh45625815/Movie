"use client";
import { useState, useEffect } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getFilms } from "@/lib/actions";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";

interface Film {
  _id: string;
  title: string;
  description: string;
  age: number;
  timeLength: number;
  year: number;
  onStage: string;
  image: string;
}

export default function SlidedownFilm() {
  const [films, setFilms] = useState<Film[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await getFilms();
        setFilms(response.results || []);
      } catch (error:any) {
      toast({variant:"destructive", title:"Error", description:error.message})
      }
    };
    fetchFilms();
  }, []);

  if (films.length === 0) {
    return <p className="text-white text-center">Không có phim...</p>;
  }

  return (
    <div className="relative w-full max-w-xs mx-auto p-5">
      <Carousel opts={{ align: "start" }} orientation="vertical" className="my-5 h-[500px]">
        <CarouselContent className="h-[500px]">
          {films.map((film) => (
            <CarouselItem key={film._id} className="basis-1/2 py-8 ">
              <div className="p-2">
                <Card
                  className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group transition-transform duration-500 hover:scale-[1.05]"
                  onClick={() => router.push(`/movies/${film._id}`)}
                >
                  <CardContent className="p-0 relative">
                    <Image
                      src={`http://localhost:8080${film.image}`}
                      alt={film.title}
                      width={800}
                      height={450}
                      className="w-[800px] h-[450px] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-bold">{film.title}</h3>
                      <p className="text-sm">{film.year}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="mt-4" />
        <CarouselNext className="mb-5" />
      </Carousel>
    </div>
  );
}
