

import {  getShowTime } from "@/lib/actions"
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


export class FilmFactory {
    static async createFilmLoader(): Promise<FilmType[]> {
      try {
        const response = await getShowTime() || [];
        if (!Array.isArray(response)) {
          throw new Error("Lỗi tải phim");
        }
        const uniqueFilms = response.reduce((acc: FilmType[], showtime: any) => {
          if (!acc.some(film => film._id === showtime.films._id)) {
            acc.push(showtime.films);
          }
          return acc;
        }, []);
  
        return uniqueFilms;
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách phim:", error);
        return [];
      }
    }
  }