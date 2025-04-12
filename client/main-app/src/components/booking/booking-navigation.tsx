"use client"
import { Button } from "../ui/button"

type BookingNavigationProps = {
  currentStep: number
  setStep: (step: number) => void
}

export default function BookingNavigation({ currentStep, setStep }: BookingNavigationProps) {
  const steps = [
    { id: 0, label: "Chọn phim / Rạp / Suất" },
    { id: 1, label: "Chọn ghế" },
    { id: 2, label: "Chọn thức ăn" },
    { id: 3, label: "Thanh toán" },
    { id: 4, label: "Xác nhận" },
  ]

  return (
    <div className="items-center px-60">
    <div className="  mb-8 border-b">
      <div className="flex justify-between">
        {steps.map((step) => (
          <Button
            variant='ghost'
            key={step.id}
            onClick={() => setStep(step.id)}
            className={`pb-2 px-4 relative ${currentStep === step.id ? "text-blue-600" : "text-gray-500"}`}
            disabled={ step.id == currentStep ? false : true }
          >
            {step.label}
            {currentStep === step.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
          </Button>
        ))}
      </div>
    </div>
    </div>
  )
}

