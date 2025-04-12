"use client"

import { useEffect, useState } from "react"

export function LoadingCatCartoon() {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 3)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="relative h-32 w-32">
        {/* Cat */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out"
          style={{
            bottom: position === 0 ? "0px" : position === 1 ? "15px" : "5px",
          }}
        >
          {/* Cat head */}
          <div className="relative w-20 h-16 bg-orange-400 rounded-full">
            {/* Cat ears */}
            <div className="absolute -top-4 left-2 w-6 h-8 bg-orange-400 rounded-tl-full rounded-tr-[80%] transform rotate-[-15deg]"></div>
            <div className="absolute -top-4 right-2 w-6 h-8 bg-orange-400 rounded-tl-[80%] rounded-tr-full transform rotate-[15deg]"></div>

            {/* Inner ears */}
            <div className="absolute -top-3 left-3 w-3 h-5 bg-pink-300 rounded-tl-full rounded-tr-[80%] transform rotate-[-15deg]"></div>
            <div className="absolute -top-3 right-3 w-3 h-5 bg-pink-300 rounded-tl-[80%] rounded-tr-full transform rotate-[15deg]"></div>

            {/* Cat face */}
            <div className="absolute top-2 left-2 w-16 h-10 bg-[#FFF5E0] rounded-[40%]"></div>

            {/* Cat eyes */}
            <div
              className={`absolute top-4 left-5 w-3 h-${position === 1 ? "1" : "3"} bg-black rounded-full transition-all`}
            ></div>
            <div
              className={`absolute top-4 right-5 w-3 h-${position === 1 ? "1" : "3"} bg-black rounded-full transition-all`}
            ></div>

            {/* Cat nose */}
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-pink-500 rounded-full"></div>

            {/* Cat mouth */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-2 border-b-2 border-l-2 border-r-2 border-black rounded-b-full"></div>

            {/* Cat whiskers */}
            <div className="absolute top-7 left-2 w-5 h-[0.5px] bg-gray-700 transform rotate-[10deg]"></div>
            <div className="absolute top-8 left-1 w-6 h-[0.5px] bg-gray-700"></div>
            <div className="absolute top-9 left-2 w-5 h-[0.5px] bg-gray-700 transform rotate-[-10deg]"></div>

            <div className="absolute top-7 right-2 w-5 h-[0.5px] bg-gray-700 transform rotate-[-10deg]"></div>
            <div className="absolute top-8 right-1 w-6 h-[0.5px] bg-gray-700"></div>
            <div className="absolute top-9 right-2 w-5 h-[0.5px] bg-gray-700 transform rotate-[10deg]"></div>
          </div>

          {/* Cat body */}
          <div className="relative w-24 h-14 bg-orange-400 rounded-full mt-[-4px] z-[-1]">
            {/* Cat tail */}
            <div
              className="absolute -right-10 top-2 w-12 h-4 bg-orange-400 rounded-r-full origin-left transition-transform duration-300"
              style={{
                transform: `rotate(${position === 0 ? "-20deg" : position === 1 ? "20deg" : "0deg"})`,
              }}
            ></div>

            {/* Cat paws */}
            <div className="absolute bottom-0 left-2 w-5 h-3 bg-orange-300 rounded-full"></div>
            <div className="absolute bottom-0 right-2 w-5 h-3 bg-orange-300 rounded-full"></div>
          </div>
        </div>

        {/* Shadow */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-300 rounded-full transition-all duration-300"
          style={{
            width: position === 0 ? "16rem" : position === 1 ? "12rem" : "14rem",
            opacity: position === 0 ? "1" : position === 1 ? "0.6" : "0.8",
          }}
        ></div>
      </div>

      <h2 className="text-xl font-medium mt-2 text-gray-800 dark:text-gray-200">Đợi một tí nhé!</h2>
    </div>
  )
}

