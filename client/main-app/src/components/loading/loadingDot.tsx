export function LoadingCatSimple() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
        <div className="relative">
          {/* Cat head */}
          <div
            className="w-20 h-16 bg-gray-800 rounded-full relative animate-bounce"
            style={{ animationDuration: "0.6s" }}
          >
            {/* Cat ears */}
            <div
              className="absolute top-[-8px] left-[2px] w-0 h-0 
                           border-l-[10px] border-l-transparent
                           border-b-[16px] border-b-gray-800
                           border-r-[10px] border-r-transparent
                           transform rotate-[-30deg]"
            ></div>
            <div
              className="absolute top-[-8px] right-[2px] w-0 h-0 
                           border-l-[10px] border-l-transparent
                           border-b-[16px] border-b-gray-800
                           border-r-[10px] border-r-transparent
                           transform rotate-[30deg]"
            ></div>
  
            {/* Cat eyes */}
            <div className="absolute top-[4px] left-[4px] w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <div className="absolute top-[4px] right-[4px] w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
  
            {/* Cat nose and mouth */}
            <div className="absolute top-[10px] left-[50%] transform translate-x-[-50%] w-3 h-2 bg-pink-300 rounded-full"></div>
            <div className="absolute top-[14px] left-[50%] transform translate-x-[-50%] w-1 h-3 bg-gray-700 rounded-full"></div>
          </div>
  
          {/* Shadow */}
          <div className="mt-2 w-16 h-2 bg-gray-300 rounded-full mx-auto animate-pulse"></div>
        </div>
  
        <h2 className="text-xl font-medium mt-2 text-gray-800 dark:text-gray-200">Đợi một tí nhé!</h2>
      </div>
    )
  }
  
  