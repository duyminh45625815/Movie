"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Wallet, BanknoteIcon } from "lucide-react"

type PaymentProps = {
  paymentMethod: string | null
  setPaymentMethod: (method: string) => void
}

export default function Payment({ paymentMethod, setPaymentMethod }: PaymentProps) {
   
  
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
  }
 


  return (
    <div className="bg-white text-black p-6 rounded-lg border">
      <h1 className="text-2xl font-bold mb-6">Phương thức thanh toán</h1>

      <RadioGroup
        defaultValue={paymentMethod || undefined}
        className="grid gap-6"
        onValueChange={handlePaymentMethodChange}
      >
        <div className="flex items-center space-x-2 border rounded-lg p-4">
          <RadioGroupItem value="credit_card" id="credit_card" />
          <Label htmlFor="credit_card" className="flex items-center cursor-pointer">
            <CreditCard className="mr-2 h-5 w-5" />
            <div>
              <div className="font-medium">Thẻ tín dụng / Ghi nợ</div>
              <div className="text-sm text-gray-500">Visa, Mastercard, JCB</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 border rounded-lg p-4">
          <RadioGroupItem value="e_wallet" id="e_wallet" />
          <Label htmlFor="e_wallet" className="flex items-center cursor-pointer">
            <Wallet className="mr-2 h-5 w-5" />
            <div>
              <div className="font-medium">Ví điện tử</div>
              <div className="text-sm text-gray-500">Momo, ZaloPay, VNPay</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 border rounded-lg p-4">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash" className="flex items-center cursor-pointer">
            <BanknoteIcon className="mr-2 h-5 w-5" />
            <div>
              <div className="font-medium">Tiền mặt</div>
              <div className="text-sm text-gray-500">Thanh toán tại quầy</div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}

