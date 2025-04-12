"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Ticket } from "@/types"
import { redirect } from "next/navigation"


type BookingSummaryProps = {
  booking: Ticket
  getTotalPrice: () => number
  nextStep: () => void
  prevStep: () => void
  showBackButton?: boolean
  showNextButton?: boolean
  nextButtonText?: string
  backButtonText?: string
  onConfirmation?: () => void;
}
export default function BookingSummary({
  booking,
  getTotalPrice,
  nextStep,
  prevStep,
  onConfirmation,
  showBackButton = true,
  showNextButton = true,
  nextButtonText = "Tiếp tục",
  backButtonText = "Quay lại",
}: BookingSummaryProps) {
  const handleNext = () => {
    if (booking.currentStep === 3) {
      onConfirmation?.();
    } else {
      nextStep();
    }
  };
 
  const handleBack = () => {
    if (booking.currentStep === 4) {
      redirect("/"); 
    } else {
      prevStep(); 
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white text-black h-full">
      <div className="border-b border-orange-500 pb-4 mb-4">
        <div className="flex gap-4">
          <Image
            src={`http://localhost:8080${booking.showtime.films?.image}` || "/placeholder-image.png"}
            alt={booking.showtime.films?.title || "Movie"}
            width={120}
            height={180}
            className="rounded-md object-cover"
          />
          <div>
            <h2 className="text-lg font-medium">{booking.showtime.films?.title}</h2>
            <div className="flex gap-2 mt-2">
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{booking.showtime.films?.age}+</span>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">{booking.showtime.films?.timeLength} phút</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-medium">
            {booking.showtime.theater?.name} - {booking.showtime.rooms?.name}
          </p>
          <p className="text-sm mt-1">
            Suất: <span className="font-medium">{booking.showtime.startTime}</span> - {booking.showtime.dateAction.toLocaleDateString()}
          </p>
        </div>
      </div>


      {booking.showtime.seats.length > 0 && (
        <div className="mb-4 pb-4 border-b">
          <h3 className="font-medium mb-2">Ghế đã chọn</h3>
          <div className="flex flex-wrap gap-2">
            {booking.seats.map((seat, index) => (
              <div key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                {seat.row}
                {seat.number}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {booking.seats.length} x {booking.showtime.price}= {formatCurrency(booking.seats.length * Number(booking.showtime.price))}
          </div>
        </div>
      )}
      {/* Selected Food */}
      {booking.combo.length > 0 && (
        <div className="mb-4 pb-4 border-b">
          <h3 className="font-medium mb-2">Thức ăn đã chọn</h3>
          <div className="space-y-2">
            {booking.combo.map((combo) => (
              <div key={combo.food._id} className="flex justify-between">
                <div>
                  <span className="text-sm">{combo.food.titleFood}</span>
                  <span className="text-xs text-gray-500 ml-1">x{combo.quantity}</span>
                </div>
                <span className="text-sm">{formatCurrency(combo.food.price * combo.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Method */}
      {booking.paymentMethod && (
        <div className="mb-4 pb-4 border-b">
          <h3 className="font-medium mb-2">Phương thức thanh toán</h3>
          <div className="text-sm">
            {booking.paymentMethod === "credit_card"
              ? "Thẻ tín dụng / Ghi nợ"
              : booking.paymentMethod === "e_wallet"
                ? "Ví điện tử"
                : "Tiền mặt"}
          </div>
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between items-center py-4 border-b">
        <span className="font-medium">Tổng cộng</span>
        <span className="text-orange-500 font-medium">{formatCurrency(getTotalPrice())}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        {showBackButton && (
          <Button variant="outline" className="text-white flex-1" onClick={handleBack}>
            {backButtonText}
          </Button>
        )}
        {showNextButton && (
          <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={handleNext}
          >
             {booking.currentStep === 3 ? "Xác nhận" : nextButtonText}
          </Button>
        )}
      </div>
    </div>
  )
}