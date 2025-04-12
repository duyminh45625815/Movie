
import FilmDetail from "@/components/FilmDetail";
import SlidedownFilm from "@/components/SlidedownFilm";
import Trailer from "@/components/Trailer";
import BookingDetail from "@/components/BookingDetail";

export default function MovieDetails(){
    return (
        <div className="w-full py-5">
            <div className="w-full bg-black">
                <Trailer/>
            </div>
            <div className="flex w-full"> 
                <div className="w-4/6">
                    <div>
                        <FilmDetail />
                    </div>
                    <div>
                        <BookingDetail/>
                    </div>
                </div>
                <div className="w-2/6 flex">
                    <div>
                        <SlidedownFilm />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}