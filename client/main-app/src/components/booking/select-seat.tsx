"use client"

import { Button } from "@/components/ui/button"
import { TypeSeat, Seat, Ticket } from "@/types"
type SelectSeatProps = {
  booking: Ticket
  selectedSeats: TypeSeat[]
  addSeat: (seat: TypeSeat) => void
  removeSeat: (seat: TypeSeat) => void
  availableSeats: Seat[];
}

export default function SelectSeat({ booking, selectedSeats, availableSeats, addSeat, removeSeat }: SelectSeatProps) {
  const isSeatSelected = (row: string, number: number) => {
    return selectedSeats.some((seat) => seat.row === row && seat.number === number);
  };

  const toggleSeat = (row: string, number: number) => {
    const seat = { row, number };
    if (isSeatSelected(row, number)) {
      removeSeat(seat);
    } else {
      addSeat(seat);
    }
  };

  const getUniqueRows = (seats: Seat[]): string[] => {
    const rows = seats.map((seat) => seat.seatNumber.charAt(0).toUpperCase());
    const uniqueRows = Array.from(new Set(rows));
    return uniqueRows.sort((a, b) => a.localeCompare(b));
  };

  const isAvailableSeat = (row: string, number: number) => {
    const seatString = `${row}${number}`.toLowerCase();
    const seat = availableSeats.find((s) => s.seatNumber.toLowerCase() === seatString);
    return seat ? seat.status === "available" : true;
  };

  const isSeatSold = (row: string, number: number) => {
    const seatString = `${row}${number}`.toLowerCase();
    const seat = availableSeats.find((s) => s.seatNumber.toLowerCase() === seatString);
    return !seat || seat.status !== "available";
  };
  const rows = getUniqueRows(availableSeats);
  console.log("Available Seats:", availableSeats);
  console.log("Selected Seats:", selectedSeats);
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg text-black border">
      {/* Showtime Selection */}
      <div className="flex items-center gap-4">
        <div className="text-gray-700">Đổi suất chiếu</div>
        <Button className="bg-blue-600 hover:bg-blue-700"> {booking.showtime.startTime} </Button>
      </div>
      <div className="overflow-x-auto">

        {/* Seat Rows J through A */}
        {rows.map((row) => (
          <div key={row} className="flex justify-between mb-2">
            <div className="w-8 flex items-center">{row}</div>
            <div className="flex gap-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                const isAvailable = isAvailableSeat(row, num);
                const isSold = isSeatSold(row, num);
                const isSelected = isSeatSelected(row, num);

                if (isSold) {
                  return (
                    <button
                      key={`${row}-${num}`}
                      className="w-8 h-8 flex items-center justify-center border rounded-md text-sm bg-gray-300 text-gray-500 cursor-not-allowed"
                      disabled
                    >
                      {num}
                    </button>
                  );
                }
                return (
                  <button
                    key={`${row}-${num}`}
                    className={`w-8 h-8 flex items-center justify-center border rounded-md text-sm
                      ${isSelected
                        ? "bg-orange-500 text-white border-orange-500"
                        : "hover:bg-orange-100"
                      }`}
                    onClick={() => toggleSeat(row, num)}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
            <div className="w-8 flex items-center">{row}</div>
          </div>
        ))}

        {/* Screen Label */}
        <div className="text-center text-gray-400 mt-8 mb-4">Màn hình</div>
        <div className="h-2 bg-gray-200 w-full rounded-lg mb-8"></div>

        {/* Seat Legend */}
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <span className="text-sm">Ghế đã bán</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded"></div>
            <span className="text-sm">Ghế đang chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-yellow-400 rounded"></div>
            <span className="text-sm">Ghế VIP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-blue-600 rounded"></div>
            <span className="text-sm">Ghế đôi</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-orange-400 rounded"></div>
            <span className="text-sm">Ghế ba</span>
          </div>
        </div>
      </div>
    </div>

  )
}

