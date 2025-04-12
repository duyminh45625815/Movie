"use client";
import { useState, useEffect } from "react";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { fetchData } from "@/services/api";

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

export default function MoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const [movieData, setMovieData] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchMovie() {
      try {
        setLoading(true);
        const data = await fetchData(`/films/getfilms/${id}`, {}) as Film;
        console.log("Dữ liệu API trả về:", data);
        setMovieData(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, []);

  // if (loading) return <div className="text-center mt-10"><LoadingDots/></div>;
  if (!movieData) return <p className="text-center mt-10"></p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center uppercase tracking-wide relative p-5">
                    <span className="before:absolute before:left-0 before:top-1/2 before:w-24 before:h-0.5 before:bg-blue-700 before:-translate-y-1/2"></span>
                    <span className="mx-4 text-red-600">Movie Details</span>
                    <span className="after:absolute after:right-0 after:top-1/2 after:w-24 after:h-0.5 after:bg-blue-700 after:-translate-y-1/2"></span>
            </h2>
      <Card className="flex flex-col md:flex-row shadow-lg rounded-2xl">
          <Image
            src={`http://localhost:8080${movieData.image}`}
            alt={`${movieData.title} Poster`}
            width={300}
            height={400}
            className="rounded-t-2xl md:rounded-l-2xl md:rounded-t-none object-cover"
          />
        <div className="w-3/5 relative">
            <CardContent className="p-6 w-full">
            <h1 className="text-2xl font-bold">{movieData.title}</h1>
            <p className="text-gray-400 mt-2">{movieData.timeLength} phút | {movieData.onStage}</p>
            <h2 className="text-xl font-semibold mt-4">Nội Dung Phim</h2>
            <p className="text-gray-200 mt-2">{movieData.description}</p>
            </CardContent>
        </div>
        
      </Card>
    </div>
  );
}