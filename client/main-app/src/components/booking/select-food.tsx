"use client"

import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { FoodItem, Combo } from "@/types"

type SelectFoodProps = {
  selectedFood: Combo[]
  updateFoodQuantity: (foodId: string, quantity: number) => void
  foodItems: FoodItem[] 
}

export default function SelectFood({ foodItems,selectedFood, updateFoodQuantity }: SelectFoodProps) {
  const getQuantity = (foodId: string) => {
    const item = selectedFood.find((f) => f.food._id === foodId)
    return item ? item.quantity : 0
  }

  return (
    <div className="bg-white p-6 rounded-lg text-black border">
      <h1 className="text-2xl font-bold mb-6">Chọn thức ăn</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {foodItems.map((food) => (
          <div key={food._id} className="flex border rounded-lg p-3">
            <Image
              src={`http:localhost:8080${food.imageFood}`}
              alt={food.titleFood}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="ml-4 flex-1">
              <h3 className="font-medium">{food.titleFood}</h3>
              <p className="text-orange-500 font-medium mt-1">{formatCurrency(food.price)}</p>

              <div className="flex items-center justify-end mt-2">
                <Button
                  variant="dark"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => updateFoodQuantity(food._id, getQuantity(food._id) - 1)}
                  disabled={getQuantity(food._id) === 0}
                >
                  <Minus className="h-4 w-4  " />
                </Button>
                <span className="mx-3 w-6 text-center">{getQuantity(food._id)}</span>
                <Button
                  variant='light'
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => updateFoodQuantity(food._id, getQuantity(food._id) + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}