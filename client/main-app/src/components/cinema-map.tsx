"use client"

import { useEffect, useState, useRef } from "react"
import type { CinemaBranch } from "@/types/index"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface CinemaMapProps {
  cinemas: CinemaBranch[]
}

declare global {
  interface Window {
    initMap: () => void
    google: any
    selectCinema: (cinemaId: string) => void
  }
}

export default function CinemaMap({ cinemas }: CinemaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedId = searchParams.get("cinema")

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      try {
        const { Map } = (await window.google.maps.importLibrary("maps")) as google.maps.MapsLibrary

        const mapOptions: google.maps.MapOptions = {
          center: { lat: 10.8231, lng: 106.6297 }, // Default center (Ho Chi Minh City)
          zoom: 12,
          mapId: "CINEMA_MAP",
          mapTypeControl: false,
          fullscreenControl: true,
          streetViewControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
          ],
        }

        const newMap = new Map(mapRef.current, mapOptions)
        setMap(newMap)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to initialize map. Please try again later.")
        setIsLoading(false)
        console.error("Map initialization error:", err)
      }
    }

    // Load Google Maps script
    const script = document.createElement("script")
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      setError("Google Maps API key is missing")
      setIsLoading(false)
      return
    }

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initMap`
    script.async = true
    script.defer = true
    script.onerror = () => {
      setError("Failed to load Google Maps. Please check your internet connection.")
      setIsLoading(false)
    }

    window.initMap = initMap as any
    document.head.appendChild(script)

    return () => {
      window.initMap = undefined
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  // Add markers when map is loaded
  useEffect(() => {
    if (!map) return

    // Clear existing markers and info windows
    markers.forEach((marker) => marker.setMap(null))
    infoWindows.forEach((infoWindow) => infoWindow.close())

    const newMarkers: google.maps.Marker[] = []
    const newInfoWindows: google.maps.InfoWindow[] = []

    // Create a bounds object to fit all markers
    const bounds = new window.google.maps.LatLngBounds()

    cinemas.forEach((cinema) => {
      if (cinema.lat && cinema.lng) {
        const position = { lat: cinema.lat, lng: cinema.lng }
        bounds.extend(position)

        const marker = new window.google.maps.Marker({
          position,
          map,
          title: cinema.name,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: "/movie-marker.svg",
            scaledSize: new window.google.maps.Size(40, 40),
          },
          optimized: true,
        })

        const isSelected = cinema._id === selectedId
        if (isSelected) {
          marker.setAnimation(window.google.maps.Animation.BOUNCE)
          setTimeout(() => {
            marker.setAnimation(null)
          }, 1500)
        }

        const roomsInfo =
          cinema.rooms && cinema.rooms.length > 0
            ? `<p class="mt-1 text-sm text-gray-600">${cinema.rooms.length} screening rooms</p>`
            : ""

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3 max-w-xs">
              <h3 class="font-bold text-lg text-primary">${cinema.name}</h3>
              <p class="mt-1 text-sm">${cinema.address}</p>
              ${roomsInfo}
              <div class="mt-3">
                <button 
                  class="bg-primary text-white text-sm py-1 px-3 rounded hover:bg-primary/90 transition-colors"
                  onclick="window.selectCinema('${cinema._id}')"
                >
                  View Details
                </button>
              </div>
            </div>
          `,
          maxWidth: 300,
          ariaLabel: `Information about ${cinema.name}`,
        })

        marker.addListener("click", () => {
          // Close all info windows
          newInfoWindows.forEach((iw) => iw.close())

          // Open this info window
          infoWindow.open(map, marker)

          // Update URL with cinema ID without refreshing the page
          const params = new URLSearchParams(searchParams.toString())
          params.set("cinema", cinema._id)
          router.replace(`?${params.toString()}`, { scroll: false })
        })

        newMarkers.push(marker)
        newInfoWindows.push(infoWindow)
      }
    })

    // Add a global function to handle the "View Details" button click in info windows
    window.selectCinema = (cinemaId: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("cinema", cinemaId)
      params.set("view", "details")
      router.replace(`?${params.toString()}`, { scroll: false })
    }

    // Fit map to show all markers if there are multiple cinemas
    if (cinemas.length > 1 && !selectedId) {
      map.fitBounds(bounds)

      // Add some padding to the bounds
      const padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      }
      map.fitBounds(bounds, padding)
    }

    setMarkers(newMarkers)
    setInfoWindows(newInfoWindows)

    return () => {
      newMarkers.forEach((marker) => marker.setMap(null))
      newInfoWindows.forEach((infoWindow) => infoWindow.close())
      delete window.selectCinema
    }
  }, [map, cinemas, searchParams, router, selectedId])

  // Handle selected cinema from URL
  useEffect(() => {
    if (!map || !selectedId) return

    const cinema = cinemas.find((c) => c._id === selectedId)

    if (cinema && cinema.lat && cinema.lng) {
      map.panTo({ lat: cinema.lat, lng: cinema.lng })
      map.setZoom(15)

      // Find and open the info window for this cinema
      const index = cinemas.findIndex((c) => c._id === selectedId)
      if (index !== -1 && markers[index] && infoWindows[index]) {
        infoWindows.forEach((iw) => iw.close())
        infoWindows[index].open(map, markers[index])

        // Add a bounce animation to the selected marker
        markers[index].setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(() => {
          markers[index].setAnimation(null)
        }, 1500)
      }
    }
  }, [selectedId, map, cinemas, markers, infoWindows])

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border shadow-md">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
          <div className="bg-destructive/10 border border-destructive rounded-md p-4 max-w-md">
            <p className="text-destructive">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div
        ref={mapRef}
        className={cn("w-full h-full", (isLoading || error) && "opacity-50")}
        aria-label="Map showing cinema locations"
        role="application"
      />

      {cinemas.length === 0 && !isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <p className="text-muted-foreground">No cinemas available to display</p>
        </div>
      )}
    </div>
  )
}

