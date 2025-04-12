"use client";
import { Users, UserPen, CalendarRange } from "lucide-react";
export default function Statistical(){
  
    return(
        <div className="grid grid-cols-1 items-center align-middle sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Customer", value: "93K", icon: <Users color="white" />, color: "#4D44B5" },
            { title: "Finance", value: "74K", icon: <UserPen color="white" />, color: "#FB7D5B" },
            { title: "Movie", value: "40K", icon: <CalendarRange color="white" />, color: "#fcc43e" },

          ].map((item, index) => (
            <div key={index} className="bg-white p-6 pl-14 w-[auto] shadow rounded-lg flex  items-center">
              <div className={`w-16 h-16 flex items-center justify-center rounded-full`} style={{ backgroundColor: item.color }}>
                {item.icon}
              </div>
              <div className="p-3">
                <h2 className="text-[#a098ae]">{item.title}</h2>
                <p className="text-2xl font-bold text-[#303972]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
    );
}