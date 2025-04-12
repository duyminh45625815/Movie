"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getShowTime } from "@/lib/actions"
import type { Showtime } from "@/types"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingCatSimple } from "./loading/loadingDot" 

const ShowtimesList: React.FC = () => {
  const { id: filmId } = useParams()
  const [showtimes, setShowtimes] = useState<Showtime[]>([])
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedTheater, setSelectedTheater] = useState<string>("all")

  useEffect(() => {
    if (!filmId) return

    const fetchShowtimes = async () => {
      const data = await getShowTime()
      if (Array.isArray(data)) {
        const currentTime = new Date()
        const filteredShowtimes = data.filter((showtime: Showtime) => {
          const showtimeStartTime = new Date(showtime.startTime)
          return showtime.films?._id === filmId && showtimeStartTime > currentTime
        })
        setShowtimes(filteredShowtimes)

        if (filteredShowtimes.length) {
          const firstDate = new Date(filteredShowtimes[0].startTime).toISOString().split("T")[0]
          setSelectedDate(firstDate)
        }
      }
    }
    fetchShowtimes()
  }, [filmId])

  if (!showtimes.length) return <div className="text-gray-500"> <LoadingCatSimple/> </div>

  // Get unique dates from showtimes
  const uniqueDates = Array.from(
    new Set(showtimes.map((showtime) => new Date(showtime.startTime).toISOString().split("T")[0])),
  ).sort()

  const generateDateTabs = () => {
    const dateIndex = uniqueDates.indexOf(selectedDate)
    const startIndex = Math.max(0, dateIndex - 2)
    const endIndex = Math.min(uniqueDates.length - 1, startIndex + 4)

    return uniqueDates.slice(startIndex, endIndex + 1).map((date) => {
      const dateObj = new Date(date)
      const isToday = new Date().toISOString().split("T")[0] === date

      // Format weekday in Vietnamese
      const weekdays = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"]
      const weekday = weekdays[dateObj.getDay()]

      // Format date as DD/MM
      const formattedDate = `${dateObj.getDate().toString().padStart(2, "0")}/${(dateObj.getMonth() + 1).toString().padStart(2, "0")}`

      return {
        date,
        label: isToday ? "Hôm Nay" : weekday,
        formattedDate,
        isSelected: date === selectedDate,
      }
    })
  }

  const dateTabs = generateDateTabs()

  // Filter showtimes by selected date
  const showtimesByDate = showtimes.filter((showtime) => {
    const showtimeStartTime = new Date(showtime.startTime)
    return (
      new Date(showtime.startTime).toISOString().split("T")[0] === selectedDate &&
      showtimeStartTime > new Date()
    )
  })


  // Group showtimes by theater
  const theaterGroups = showtimesByDate.reduce<{ [theaterId: string]: Showtime[] }>((acc, showtime) => {
    const theaterId = showtime.theater?._id
    if (theaterId) {
      if (!acc[theaterId]) acc[theaterId] = []
      acc[theaterId].push(showtime)
    }
    return acc
  }, {})

  // Get unique locations
  const locations = Array.from(new Set(showtimesByDate.map((showtime) => showtime.theater?.address || "Toàn quốc")))

  // Get theaters filtered by location if selected
  const theaters = Array.from(
    new Set(
      showtimesByDate
        .filter((showtime) => selectedLocation === "all" || showtime.theater?.address === selectedLocation)
        .map((showtime) => showtime.theater?.name),
    ),
  )

  // Navigate to previous/next date
  const navigateDate = (direction: "prev" | "next") => {
    const currentIndex = uniqueDates.indexOf(selectedDate)
    if (direction === "prev" && currentIndex > 0) {
      setSelectedDate(uniqueDates[currentIndex - 1])
    } else if (direction === "next" && currentIndex < uniqueDates.length - 1) {
      setSelectedDate(uniqueDates[currentIndex + 1])
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-l-4 border-blue-600 pl-2 mb-4">
        <h1 className="text-xl font-bold text-blue-800">Lịch Chiếu</h1>
      </div>

      {/* Date selection */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigateDate("prev")}
          className="p-2 text-gray-600 hover:text-blue-600"
          disabled={uniqueDates.indexOf(selectedDate) === 0}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex-1 grid grid-cols-5 gap-1">
          {dateTabs.map((tab) => (
            <button
              key={tab.date}
              onClick={() => setSelectedDate(tab.date)}
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-md transition-colors ${tab.isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <span className="text-sm font-medium">{tab.label}</span>
              <span className="text-sm">{tab.formattedDate}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigateDate("next")}
          className="p-2 text-gray-600 hover:text-blue-600"
          disabled={uniqueDates.indexOf(selectedDate) === uniqueDates.length - 1}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Toàn quốc" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toàn quốc</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTheater} onValueChange={setSelectedTheater}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tất cả rạp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả rạp</SelectItem>
            {theaters.map((theater) => (
              <SelectItem key={theater} value={theater || ""}>
                {theater}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Divider */}
      <div className="h-1 bg-blue-600 mb-6"></div>

      {/* Theaters and showtimes */}
      <div className="space-y-8">
        {Object.entries(theaterGroups)
          .filter(([theaterId, theaterShowtimes]) => {
            const theater = theaterShowtimes[0].theater
            return (
              (selectedLocation === "all" || theater?.address === selectedLocation) &&
              (selectedTheater === "all" || theater?.name === selectedTheater)
            )
          })
          .map(([theaterId, theaterShowtimes]) => {
            const theater = theaterShowtimes[0].theater

            // Group showtimes by format
            const formatGroups = theaterShowtimes.reduce<{ [format: string]: Showtime[] }>((acc, showtime) => {
              const format = showtime.rooms?.screenType + ' Phụ đề'
              if (!acc[format]) acc[format] = []
              acc[format].push(showtime)
              return acc
            }, {})

            return (
              <div key={theaterId} className="pb-6 border-b border-gray-200 last:border-0">
                <h2 className="text-lg font-bold mb-4">{theater?.name}</h2>

                <div className="space-y-4">
                  {Object.entries(formatGroups).map(([format, formatShowtimes]) => {
                    // Sort showtimes by time
                    const sortedShowtimes = [...formatShowtimes].sort(
                      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
                    )
                    return (
                      <div key={format} className="space-y-2">
                        <p className="text-sm font-medium">{format}</p>
                        <div className="flex flex-wrap gap-2">
                          {sortedShowtimes.map((showtime) => {
                            const showtimeStartTime = new Date(showtime.startTime)
                            if (showtimeStartTime > new Date()) {
                              return (
                                <Link key={showtime._id} href={`/booking/${showtime._id}`}>
                                  <button className="min-w-16 px-4 py-2 border border-gray-300 rounded hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                                    {new Date(showtime.startTime).toLocaleTimeString("vi-VN", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
                                  </button>
                                </Link>
                              )
                            }
                            return null
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ShowtimesList

