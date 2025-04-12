"use client"

import { useEffect, useState } from "react"

export function LoadingCatSleeping() {
  const [isBreathing, setIsBreathing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBreathing((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="relative h-32 w-40">
        {/* Sleeping cat */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          {/* Cat body */}
          <div
            className="w-32 h-16 bg-gray-500 rounded-full transition-all duration-1000"
            style={{
              transform: isBreathing ? "scale(1.05, 0.95)" : "scale(1, 1)",
            }}
          >
            {/* Cat head */}
            <div className="absolute -left-4 top-1 w-16 h-14 bg-gray-500 rounded-full">
              {/* Cat ears */}
              <div className="absolute -top-4 left-3 w-4 h-6 bg-gray-500 rounded-tl-full rounded-tr-[80%] transform rotate-[-15deg]"></div>
              <div className="absolute -top-4 right-3 w-4 h-6 bg-gray-500 rounded-tl-[80%] rounded-tr-full transform rotate-[15deg]"></div>

              {/* Cat face */}
              <div className="absolute top-2 left-2 w-12 h-8 bg-gray-400 rounded-[40%]"></div>

              {/* Cat eyes - closed */}
              <div className="absolute top-5 left-4 w-2 h-0.5 bg-black rounded-full"></div>
              <div className="absolute top-5 right-4 w-2 h-0.5 bg-black rounded-full"></div>

              {/* Cat nose */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1.5 h-1 bg-pink-300 rounded-full"></div>

              {/* Cat mouth */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-3 h-1 border-t-2 border-black rounded-t-full"></div>
            </div>

            {/* Cat tail */}
            <div className="absolute -right-8 top-6 w-10 h-3 bg-gray-500 rounded-r-full origin-left transform rotate-[20deg]"></div>

            {/* Cat paws */}
            <div className="absolute bottom-0 left-4 w-6 h-3 bg-gray-400 rounded-full"></div>
            <div className="absolute bottom-0 right-4 w-6 h-3 bg-gray-400 rounded-full"></div>

            {/* Z's for sleeping */}
            <div
              className="absolute -top-4 -right-4 text-gray-600 font-bold text-lg animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              z
            </div>
            <div
              className="absolute -top-8 -right-2 text-gray-600 font-bold text-xl animate-bounce"
              style={{ animationDuration: "2s", animationDelay: "0.3s" }}
            >
              Z
            </div>
            <div
              className="absolute -top-12 right-0 text-gray-600 font-bold text-2xl animate-bounce"
              style={{ animationDuration: "2s", animationDelay: "0.6s" }}
            >
              Z
            </div>
          </div>
        </div>

        {/* Loading bar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <h2 className="text-xl font-medium mt-2 text-gray-800 dark:text-gray-200">Đợi một tí nhé!</h2>

      <style jsx global>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  )
}

