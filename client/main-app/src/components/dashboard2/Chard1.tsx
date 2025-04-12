"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Bar, BarChart, CartesianGrid } from "recharts";
export default function Chard1(){
    const data = [
        { name: "Week 01", thisWeek: 240000, lastWeek: 480000 },
        { name: "Week 02", thisWeek: 380000, lastWeek: 320000 },
        { name: "Week 03", thisWeek: 320000, lastWeek: 400000 },
        { name: "Week 04", thisWeek: 400000, lastWeek: 240000 },
        { name: "Week 05", thisWeek: 260000, lastWeek: 480000 },
        { name: "Week 06", thisWeek: 340000, lastWeek: 300000 },
      ];
    return(
         <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold text-[#303972] mb-2">School Performance</h2>
                    <div className="flex items-center space-x-4 text-sm mb-4">
                      <div className="flex items-center space-x-1">
                        <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                        <span className="text-gray-700">This Week</span>
                        <span className="font-bold text-blue-600">1.245</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                        <span className="text-gray-700">Last Week</span>
                        <span className="font-bold text-orange-500">1.356</span>
                      </div>
                    </div>
        
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data}>
                        <XAxis dataKey="name" tick={{ fill: "#6B7280" }} />
                        <YAxis tick={{ fill: "#6B7280" }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="thisWeek" stroke="#1D4ED8" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="lastWeek" stroke="#F97316" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
    );
}