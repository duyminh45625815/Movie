"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Bar, BarChart, CartesianGrid } from "recharts";
export default function Chard2(){
    
const datacharts = [
    { day: "Sun", students: 70, revenue: 50, teachers: 25 },
    { day: "Mon", students: 80, revenue: 65, teachers: 30 },
    { day: "Tue", students: 70, revenue: 75, teachers: 28 },
    { day: "Wed", students: 95, revenue: 85, teachers: 26 },
    { day: "Thu", students: 40, revenue: 55, teachers: 22 },
    { day: "Fri", students: 90, revenue: 70, teachers: 27 },
    { day: "Sat", students: 75, revenue: 60, teachers: 29 },
  ];
    return(
         <div className="p-6 bg-white rounded-xl shadow-lg">
                    {/* Tiêu đề và Tab */}
                    <div className="flex items-center justify-between pb-4">
                      <h2 className="text-xl font-semibold text-[#303972]">School Overview</h2>
                      <div className="flex space-x-2">
                        {["Week", "Month", "Year", "All"].map((tab, index) => (
                          <button
                            key={index}
                            className={`px-4 py-1 text-sm font-medium rounded-lg ${tab === "Week" ? "bg-[#4d44b51a] text-[#303972]" : "text-gray-500"
                              }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>
        
                    {/* Biểu đồ 2 */}
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={datacharts} barCategoryGap={20}>
                        <CartesianGrid strokeDasharray="2 2" vertical={false} />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="students" fill="#5A4AD1" name="Number of Student" barSize={20} radius={[5, 5, 0, 0]} />
                        <LineChart>
                          <Line type="monotone" dataKey="revenue" stroke="#38A169" strokeWidth={2} name="Revenue" />
                          <Line type="monotone" dataKey="teachers" stroke="#E53E3E" strokeDasharray="4 4" strokeWidth={1.5} name="Active Teacher" />
                        </LineChart>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                
    );
}