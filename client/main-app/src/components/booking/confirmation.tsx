"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { Ticket } from "@/types"
import { useSearchParams } from "next/navigation"
import { updateticket } from "@/lib/actions"
import { useEffect, useState } from "react"

interface ConfirmationProps  {
  booking: Ticket
  getTotalPrice: () => number
}

export default function Confirmation({ booking, getTotalPrice }: ConfirmationProps) {
    const params = useSearchParams()
    const resultCode=  params.get('resultCode');  
    const [bookingId, setBookingId] = useState<string | null>(null);

    useEffect(() => {
      const storedId = localStorage.getItem('bookingId');
      setBookingId(storedId);
    }, []);
    useEffect(() => {
      const updateBooking = async () => {
        if (resultCode === "0" && bookingId) {
          await updateticket(bookingId);
        }
      };
      updateBooking();
    }, [resultCode, bookingId]);
    
    if (resultCode !== "0") {
      return (
        <div className="bg-white p-6 rounded-lg border text-black text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Thanh toán không thành công</h1>
          <p className="text-gray-600 mb-6">
            {resultCode === "1" ? "Giao dịch bị từ chối" : 
             resultCode === "2" ? "Giao dịch bị hủy" : 
             "Có lỗi xảy ra trong quá trình thanh toán"}
          </p>
  
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="font-medium mb-4">Thông tin đặt vé</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Phim:</p>
                <p className="text-sm">{booking.showtime.films?.title|| "Không có thông tin"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Rạp:</p>
                <p className="text-sm">
              {booking.showtime.theater?.name} 
            </p>
              </div>
              <div>
                <p className="text-sm font-medium">Suất chiếu:</p>
                <p className="text-sm">
                  {booking.showtime?.startTime.toLocaleString()} - {new Date(booking.showtime?.dateAction).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Tổng tiền:</p>
                <p className="text-sm">{formatCurrency(getTotalPrice())}</p>
              </div>
            </div>
          </div>
  
        </div>
      )
    }
  
 
    
  
  
  return (
    <div className="bg-white p-6 rounded-lg border text-black text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Đặt vé thành công!</h1>
      <p className="text-gray-600 mb-6">Cảm ơn bạn đã đặt vé xem phim tại rạp chúng tôi</p>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-medium mb-2">Thông tin phim</h2>
            <p className="text-sm">{booking.showtime.films?.title}</p>
            <p className="text-sm">
              {booking.showtime.rooms?.screenType} 
            </p>
          </div>
          <div>
            <h2 className="font-medium mb-2">Thông tin rạp</h2>
            <p className="text-sm">
              {booking.showtime.theater?.name} 
            </p>
            <p className="text-sm">
              {booking.showtime?.startTime.toLocaleString()} - {new Date(booking.showtime?.dateAction).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h2 className="font-medium mb-2">Ghế đã đặt</h2>
            <div className="flex flex-wrap gap-2">
              {booking.seats.map((seat:any, index:any) => (
                <span key={index} className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                  {seat.row}{seat.number}
                </span>
              ))}
            </div>
          </div>
          <div>
            {/* <h2 className="font-medium mb-2">Phương thức thanh toán</h2> */}
            {/* <p className="text-sm">
              {booking.paymentMethod === "credit_card"
                ? "Thẻ tín dụng / Ghi nợ"
                : booking.paymentMethod === "e_wallet"
                  ? "Ví điện tử"
                  : "Tiền mặt"}
            </p> */}
            <p className="text-sm font-medium mt-2">Tổng tiền: {formatCurrency(getTotalPrice())}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="bg-orange-500 hover:bg-orange-600">Tải vé điện tử</Button>
      </div>
    </div>
  )
}

