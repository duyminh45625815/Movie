"use client"

import { useState,useLayoutEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingCatSimple } from "./loading/loadingDot"
import { motion } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Film, Star, Clock } from "lucide-react"
import { FilmFactory } from "@/factories/films/filmsFactory"
import { useRouter } from "next/navigation"

interface FilmType {
  _id: string
  title: string
  description: string
  age: number
  timeLength: number
  year: number
  onStage: string
  image: string
  genre?: string[]
  rating?: number
}


type RecommendMovieProps = {
  films: FilmType[]
}
export function RecommendMovie({ films: initialFilms }: RecommendMovieProps) {
  const [films, setFilms] = useState<FilmType[]>(initialFilms);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  useLayoutEffect(() => {
    const fetchFilms = async () => {
      setFilms(films);
      setIsLoading(false);
    };
    fetchFilms();
  }, []);
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingCatSimple />
      </div>
    )
  }

  return (
    <div className="relative w-full bg-gradient-to-b from-[#0a0f1a] via-[#111827] to-[#0a0f1a] py-16">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-[0.03]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 to-blue-900/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500"></div>
            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 uppercase px-3 py-1">
              Featured
            </Badge>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500"></div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of the latest and greatest films for your entertainment
          </p>
        </motion.div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {films.map((film, index) => (
              <CarouselItem key={film._id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-1"
                >
                  <Card
                    className="relative overflow-hidden rounded-lg cursor-pointer border-0 bg-transparent shadow-[0_0_20px_rgba(0,0,0,0.3)] group"
                    onClick={() => router.push(`/movies/${film._id}`)}
                  > 
                    <CardContent className="p-0 aspect-[2/3] relative">
                      {/* Movie Poster */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity z-10"></div>
                      <Image
                        src={`http://localhost:8080${film.image}`}
                        alt={film.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `/placeholder.svg?height=600&width=400&text=${encodeURIComponent(film.title)}`
                        }}
                      />

                      {/* Year Badge */}
                      <Badge className="absolute top-3 right-3 z-20 bg-red-600 text-white font-medium">
                        {film.year}
                      </Badge>

                      {/* Age Rating */}
                      {film.age && (
                        <Badge className="absolute top-3 left-3 z-20 bg-gray-800/90 text-white">{film.age}+</Badge>
                      )}

                      {/* Bottom Info */}
                      <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                        <div className="transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <h3 className="text-lg font-bold text-white line-clamp-1 mb-1">{film.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-300 mb-2">
                            <div className="flex items-center gap-1">
                              <Clock size={14} className="text-red-400" />
                              <span>{film.timeLength} min</span>
                            </div>
                            {film.rating && (
                              <div className="flex items-center gap-1">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                <span>{film.rating}/10</span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Badge
                              variant="outline"
                              className="bg-red-500/20 hover:bg-red-500/30 text-white border-red-500/30 transition-colors"
                            >
                              View Details
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-black/50 hover:bg-red-600 border-0 text-white shadow-lg" />
          <CarouselNext className="right-2 bg-black/50 hover:bg-red-600 border-0 text-white shadow-lg" />
        </Carousel>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-red-600/20"
            onClick={() => router.push("/movies")}
          >
            <Film size={18} />
            <span>View All Movies</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

