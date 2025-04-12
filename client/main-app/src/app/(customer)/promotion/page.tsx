"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Tag, Ticket } from "lucide-react"

// Promotion data with added categories
const promotions = [
  {
    image: "f1.jpg",
    title: "Giảm 10.000đ khi thanh toán ShopeePay",
    description: "Xem phim cực đã, ưu đãi cực chất cùng ShopeePay.",
    category: "payment",
    validUntil: "30/06/2025",
  },
  {
    image: "f2.jpg",
    title: "Thứ Ba Vui Vẻ với khuyến mãi hấp dẫn",
    description: "Giá vé chỉ từ 50K vào thứ ba hàng tuần.",
    category: "weekly",
    validUntil: "31/12/2025",
  },
  {
    image: "f3.jpg",
    title: "Quyền lợi thành viên Galaxy Cinema",
    description: "Ưu đãi tích điểm và giảm giá vé khi trở thành thành viên.",
    category: "membership",
    validUntil: "Không giới hạn",
  },
  {
    image: "f4.jpg",
    title: "U22 Vui Vẻ - Bắp nước siêu hạt dẻ",
    description: "Giá siêu ưu đãi dành cho khách hàng dưới 22 tuổi.",
    category: "food",
    validUntil: "31/12/2025",
  },
  {
    image: "f5.png",
    title: "Gói xem phim Premium 70K",
    description: "Trải nghiệm trọn vẹn với gói xem phim siêu tiết kiệm.",
    category: "ticket",
    validUntil: "30/09/2025",
  },
  {
    image: "promotion_cgv.jpg",
    title: "Rạp Phòng Đê - Thứ Năm Ngay!",
    description: "Ưu đãi bắp nước 25% vào mỗi thứ năm.",
    category: "weekly",
    validUntil: "31/12/2025",
  },
]

// Category definitions with icons and colors
const categories = [
  { id: "all", label: "Tất cả", icon: Ticket },
  { id: "payment", label: "Thanh toán", icon: Tag },
  { id: "weekly", label: "Hàng tuần", icon: Calendar },
  { id: "membership", label: "Thành viên", icon: Ticket },
  { id: "food", label: "Bắp nước", icon: Tag },
  { id: "ticket", label: "Vé xem phim", icon: Ticket },
]

// Animation variants for the cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

export default function PromotionPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter promotions based on active category
  const filteredPromotions =
    activeCategory === "all" ? promotions : promotions.filter((promo) => promo.category === activeCategory)

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "payment":
        return "bg-blue-100 text-blue-800"
      case "weekly":
        return "bg-purple-100 text-purple-800"
      case "membership":
        return "bg-green-100 text-green-800"
      case "food":
        return "bg-yellow-100 text-yellow-800"
      case "ticket":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero section */}
      <div className="relative bg-red-600 text-white">
        <div
          className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center"
          style={{ backgroundBlendMode: "overlay" }}
        />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ƯU ĐÃI ĐẶC BIỆT
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto text-center text-red-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Khám phá các chương trình khuyến mãi hấp dẫn và tiết kiệm khi xem phim tại Cinevie+
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {/* Category tabs */}
        <Tabs defaultValue="all" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white shadow-md p-1 rounded-full">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className="rounded-full px-4 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {/* Promotions grid */}
          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPromotions.map((promo, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl flex flex-col">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img
                        src={promo.image || "/placeholder.svg"}
                        alt={promo.title}
                        className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <Badge className={`absolute top-4 right-4 z-20 ${getCategoryColor(promo.category)}`}>
                        {categories.find((c) => c.id === promo.category)?.label}
                      </Badge>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{promo.title}</h2>
                      <p className="text-gray-600 mb-6 flex-grow">{promo.description}</p>

                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Có hiệu lực đến: {promo.validUntil}</span>
                      </div>

                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors">
                        Xem chi tiết
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

