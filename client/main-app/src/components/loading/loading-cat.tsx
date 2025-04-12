"use client"

import { useEffect, useState } from "react"

export function LoadingCat() {
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="relative">
        {/* Cat body */}
        <div
          className={`relative w-24 h-20 bg-gray-800 rounded-full transition-transform duration-300 ease-in-out ${bounce ? "translate-y-[-8px]" : "translate-y-[0px]"}`}
        >
          {/* Cat ears */}
          <div
            className="absolute top-[-10px] left-[2px] w-0 h-0 
                         border-l-[12px] border-l-transparent
                         border-b-[20px] border-b-gray-800
                         border-r-[12px] border-r-transparent
                         transform rotate-[-30deg]"
          ></div>
          <div
            className="absolute top-[-10px] right-[2px] w-0 h-0 
                         border-l-[12px] border-l-transparent
                         border-b-[20px] border-b-gray-800
                         border-r-[12px] border-r-transparent
                         transform rotate-[30deg]"
          ></div>

          {/* Cat face */}
          <div className="absolute top-[8px] left-[8px] w-8 h-8 bg-white rounded-full"></div>
          <div className="absolute top-[8px] right-[8px] w-8 h-8 bg-white rounded-full"></div>

          {/* Cat eyes */}
          <div className={`absolute top-[14px] left-[14px] w-4 h-${bounce ? "1" : "4"} bg-black rounded-full`}></div>
          <div className={`absolute top-[14px] right-[14px] w-4 h-${bounce ? "1" : "4"} bg-black rounded-full`}></div>

          {/* Cat nose */}
          <div className="absolute top-[22px] left-[50%] transform translate-x-[-50%] w-3 h-2 bg-pink-300 rounded-full"></div>

          {/* Cat mouth */}
          <div className="absolute top-[28px] left-[50%] transform translate-x-[-50%] w-4 h-2 border-b-2 border-black rounded-full"></div>

          {/* Cat whiskers */}
          <div className="absolute top-[24px] left-[4px] w-8 h-[1px] bg-gray-600"></div>
          <div className="absolute top-[28px] left-[2px] w-10 h-[1px] bg-gray-600"></div>
          <div className="absolute top-[24px] right-[4px] w-8 h-[1px] bg-gray-600"></div>
          <div className="absolute top-[28px] right-[2px] w-10 h-[1px] bg-gray-600"></div>

          {/* Cat tail */}
          <div
            className={`absolute bottom-[0px] right-[-20px] w-20 h-4 bg-gray-800 rounded-r-full transition-transform duration-300 ease-in-out ${bounce ? "rotate-[-10deg]" : "rotate-[10deg]"}`}
          ></div>
        </div>

        {/* Shadow */}
        <div
          className={`mt-4 w-20 h-2 bg-gray-300 rounded-full mx-auto transition-all duration-300 ${bounce ? "scale-x-[0.8] opacity-70" : "scale-x-[1] opacity-100"}`}
        ></div>
      </div>

      <h2 className="text-xl font-medium mt-2 text-gray-800 dark:text-gray-200">Đợi một tí nhé!</h2>
    </div>
  )
}

