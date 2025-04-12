"use client"

import type { CinemaBranch } from "@/types/index"
import { useSearchParams, useRouter } from "next/navigation"
import { MapPin, Film, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CinemaListProps {
  cinemas: CinemaBranch[]
}

export default function CinemaList({ cinemas }: CinemaListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedId = searchParams.get("cinema")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCinemas, setFilteredCinemas] = useState<CinemaBranch[]>(cinemas)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Filter cinemas based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCinemas(cinemas)
    } else {
      const filtered = cinemas.filter(
        (cinema) =>
          cinema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cinema.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredCinemas(filtered)
    }
  }, [searchTerm, cinemas])

  // Update URL when a cinema is selected
  const handleCinemaClick = useCallback(
    (cinemaId: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("cinema", cinemaId)
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  // Clear search input
  const clearSearch = () => {
    setSearchTerm("")
  }

  // Get the selected cinema details
  const selectedCinema = cinemas.find((cinema) => cinema._id === selectedId)

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="sticky top-0 bg-background pt-4 pb-4 z-10 border-b">
        <h2 className="text-2xl font-bold mb-4">Cinema Branches</h2>
        <div className="relative">
          <div
            className={cn(
              "flex items-center border rounded-lg transition-all overflow-hidden",
              isSearchFocused ? "ring-2 ring-primary ring-offset-2" : "",
            )}
          >
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="pl-9 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {searchTerm && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-1" onClick={clearSearch}>
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {selectedCinema && (
        <div className="md:hidden p-4 bg-primary/5 rounded-lg border border-primary/20 mb-4">
          <h3 className="font-bold text-primary">Selected Cinema</h3>
          <p className="font-medium">{selectedCinema.name}</p>
        </div>
      )}

      <div className="space-y-3">
        {filteredCinemas.length > 0 ? (
          filteredCinemas.map((cinema) => (
            <motion.div
              key={cinema._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "p-4 rounded-lg cursor-pointer transition-all border",
                selectedId === cinema._id
                  ? "bg-primary/10 border-primary shadow-sm"
                  : "bg-card hover:bg-muted/50 border-transparent hover:border-muted",
              )}
              onClick={() => handleCinemaClick(cinema._id)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{cinema.name}</h3>
                {selectedId === cinema._id && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">Selected</span>
                )}
              </div>

              <div className="flex items-start mt-3 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 mt-1 shrink-0 text-primary/70" />
                <p className="text-sm">{cinema.address}</p>
              </div>

              {cinema.rooms && cinema.rooms.length > 0 && (
                <div className="flex items-center mt-2 text-muted-foreground">
                  <Film className="h-4 w-4 mr-2 shrink-0 text-primary/70" />
                  <p className="text-sm">
                    {cinema.rooms.length} screening room{cinema.rooms.length !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-4 rounded-lg border border-dashed"
          >
            <div className="flex justify-center mb-4">
              <Search className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium mb-2">No cinemas found</h3>
            <p className="text-muted-foreground">No cinemas match your search criteria. Try a different search term.</p>
            {searchTerm && (
              <Button variant="outline" className="mt-4" onClick={clearSearch}>
                Clear search
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

