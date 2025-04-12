
import { Mail, Plus } from "lucide-react";
import Statistical from "@/components/dashboard2/Statistical";
import Chard1 from "../../../components/dashboard2/Chard1";
import Chard2 from "@/components/dashboard2/chard2";





const recentStudents = [
  { name: "Samantha William", class: "Class VII A", image: "/images/LongNguyen.jpg" },
  { name: "Tony Soap", class: "Class VII B", image: "/images/taihocbai.jpg" },
  { name: "Karen Hope", class: "Web Developer", image: "/images/taihocbai.jpg" },
  { name: "Jordan Nico", class: "Class VII A", image: "/images/taihocbai.jpg" },
  { name: "Nadila Adja", class: "Class VII B", image: "/images/taihocbai.jpg" },
];



const DashboardPage = async () => {

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-grow space-y-6 p-6">
        {/* Thống kê */}
        <Statistical/>
        {/* Biểu đồ 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Chard1/>
         <Chard2/>
        </div>
      </div>

      {/* Sidebar bên phải */}
      <div className="w-full lg:w-80 space-y-6">
        {/* Recent Students */}
        <div className="bg-white h-full p-4 rounded-2xl shadow-lg justify-between">
          <div className="flex p-3 justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#303972]">Recent Students</h2>
              <span className="text-sm text-gray-500 mb-4">You have 456 Students</span>
            </div>
            <div>
              <button className="w-12 h-12 flex items-center justify-center rounded-full border bg-[#4D44B5] ">
                <Plus className="text-white" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {recentStudents.map((student, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 text-[#303972] justify-between">
                <div className="flex gap-4">
                  <img src={student.image} alt={student.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.class}</p>
                  </div>
                </div>
                <div>
                  <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:bg-[#5751e1] ">
                    <Mail className="text-gray-400 hover:text-white transition-all" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full bg-[#4d44b51a] border-[#4d44b51a] text-[#4D44B5] py-2 rounded-full hover:bg-[#4D44B5] hover:text-white transition-all">
            View More
            </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;