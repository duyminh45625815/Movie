"use client"

import { CreditCard, QrCode, Smartphone} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function PaymentInterface() {

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Thanh Toán</CardTitle>
        <CardDescription>Chọn phương thức thanh toán phù hợp với bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="momo" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="momo" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span>MoMo</span>
            </TabsTrigger>
            <TabsTrigger value="qrcode" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              <span>QR Code</span>
            </TabsTrigger>
            <TabsTrigger value="banking" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Banking</span>
            </TabsTrigger>
          </TabsList>

          {/* MoMo Payment Tab */}
          <TabsContent value="momo">
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-pink-100 p-3">
                  <Image src="/logomomo.png" width={300} height={300} alt="Logo" className="w-[100px] drop-shadow-lg animate-wiggle" />
                </div>
                <h3 className="text-lg font-medium">Thanh toán qua MoMo</h3>
                <div className="text-center text-sm text-muted-foreground">
                  Quét mã QR bằng ứng dụng MoMo
                </div>
                <button className="hover:scale-95 text-center h-10 w-[70%] bg-black border-white border-2 rounded-xl text-white">Thực hiện thanh toán</button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="qrcode">
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-pink-100 p-3">
                  <Smartphone className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-lg font-medium">Thanh toán qua QrCode</h3>
                <div className="text-center text-sm text-muted-foreground">
                  Quét mã QR bằng QrCode hiện chưa đang được bảo trì, vui lòng chọn phương thức khác
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="banking">
            <div className="space-y-6 py-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-pink-100 p-3">
                    <Smartphone className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="text-lg font-medium">Thanh toán qua iBanking</h3>
                  <div className="text-center text-sm text-muted-foreground">
                    Quét mã QR bằng iBanking hiện chưa đang được bảo trì, vui lòng chọn phương thức khác
                  </div>
                </div>
              </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

