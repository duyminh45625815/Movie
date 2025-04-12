"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Play } from "lucide-react"

export default function Trailer() {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen])
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div className="relative w-full my-8">
      <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

        <div className="relative aspect-video w-full">
          <Image
            src="https://img.youtube.com/vi/bFRr7bv--70/maxresdefault.jpg"
            alt="Trailer Thumbnail"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>


        <button
          onClick={() => setIsOpen(true)}
          className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
          aria-label="Play trailer"
        >
          <div className="bg-white/90 w-20 h-20 flex items-center justify-center rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
            <Play size={36} className="text-red-600 ml-1" />
          </div>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h3 className="text-white text-2xl font-bold">Official Trailer</h3>
          <p className="text-white/80 mt-2">Click to watch the full trailer</p>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-full max-w-5xl mx-4 bg-black rounded-xl overflow-hidden shadow-2xl animate-fadeIn">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors duration-200"
              aria-label="Close trailer"
            >
              <X size={24} />
            </button>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/bFRr7bv--70?autoplay=1&rel=0"
                title="YouTube Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

