'use client'

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tickets = [
  {
    id: 1,
    movie: "The Last Of Us",
    format: "2D Phụ Đề",
    age: "T13",
    cinema: "Galaxy HCM",
    time: "19:15",
    date: "20/03/2025",
    day: "Thứ Tư",
    image: "/poster1.jpg",
    status: "valid"
  },
  {
    id: 2,
    movie: "Us",
    format: "2D Phụ Đề",
    age: "T16",
    cinema: "Galaxy HCM",
    time: "20:00",
    date: "14/08/2024",
    day: "Thứ Năm",
    image: "/poster2.jpg",
    status: "expired"
  }
];

export default function TicketPage() {
  const [tab, setTab] = useState('history');

  return (
    <div className="p-6 max-w-5xl mx-auto"> 
      <div className="flex border-b mb-4">
        <button
          className={`p-2 text-lg font-medium transition-all ${tab === 'history' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setTab('history')}
        >
          Lịch Sử Giao Dịch
        </button>
        <button
          className={`p-2 text-lg font-medium ml-4 transition-all ${tab === 'mytickets' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setTab('mytickets')}
        >
          Vé của tôi
        </button>
      </div>

      <div>
        {tab === 'history' && (
          tickets.map(ticket => (
            <Card key={ticket.id} className="flex items-center p-5 mb-4 shadow-lg rounded-xl border border-gray-200 w-full">
              <img src={ticket.image} alt={ticket.movie} className="w-28 h-40 rounded-lg shadow-md" />
              <CardContent className="ml-6 flex-1 flex justify-between items-center"> 
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{ticket.movie}</h3>
                  <p className="text-sm text-gray-600 mt-2">{ticket.format} <span className="bg-orange-500 text-white px-2 py-1 text-xs rounded-md ml-2">{ticket.age}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium">{ticket.cinema}</p>
                  <p className="text-sm text-gray-700 font-bold">{ticket.time}, {ticket.day}, {ticket.date}</p>
                </div>
              </CardContent>
              <Button className="text-orange-500 border border-orange-500 bg-white px-5 py-2 rounded-lg transition-all hover:bg-orange-500 hover:text-white">Chi tiết</Button>
            </Card>
          ))
        )}

        {tab === 'mytickets' && (
          tickets.filter(ticket => ticket.status === 'valid').length > 0 ? (
            tickets.filter(ticket => ticket.status === 'valid').map(ticket => (
              <Card key={ticket.id} className="flex items-center p-5 mb-4 shadow-lg rounded-xl border border-gray-200 w-full">
                <img src={ticket.image} alt={ticket.movie} className="w-28 h-40 rounded-lg shadow-md" />
                <CardContent className="ml-6 flex-1 flex justify-between items-center"> 
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{ticket.movie}</h3>
                    <p className="text-sm text-gray-600 mt-2">{ticket.format} <span className="bg-orange-500 text-white px-2 py-1 text-xs rounded-md ml-2">{ticket.age}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-medium">{ticket.cinema}</p>
                    <p className="text-sm text-gray-700 font-bold">{ticket.time}, {ticket.day}, {ticket.date}</p>
                  </div>
                </CardContent>
                <Button className="text-orange-500 border border-orange-500 bg-white px-5 py-2 rounded-lg transition-all hover:bg-orange-500 hover:text-white">Chi tiết</Button>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">Chưa có vé nào</p>
          )
        )}
      </div>
    </div>
  );
}
