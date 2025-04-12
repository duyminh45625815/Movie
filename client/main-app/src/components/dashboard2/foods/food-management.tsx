"use client"
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FoodCard } from "./food-card"
import  { FoodItem } from "@/types"
import { FoodList } from "./food-list"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormAddFood from "./form.addFood"

interface FoodManagementProps {
  initialFoods: FoodItem[]
}
export function FoodManagement({ initialFoods }: FoodManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [foods, setFoods] = useState<FoodItem[]>(initialFoods)
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null)
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards")

  const handleAddFood = (food: Omit<FoodItem, "id">) => {
    const newFood = {
      ...food
      
    }
    setFoods([...foods, newFood])
    setIsDialogOpen(false)
  }

  const handleEditFood = (food: FoodItem) => {
    setEditingFood(food)
    setIsDialogOpen(true)
  }

  const handleUpdateFood = (updatedFood: FoodItem) => {
    setFoods(foods.map((food) => (food._id === updatedFood._id ? updatedFood : food)))
    setIsDialogOpen(false)
    setEditingFood(null)
  }

  const handleDeleteFood = (id: string) => {
    setFoods(foods.filter((food) => food._id !== id))
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingFood(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Tabs
          defaultValue="cards"
          className="w-[200px]"
          onValueChange={(value) => setViewMode(value as "cards" | "list")}
        >
          <TabsList>
            <TabsTrigger value="cards">Thẻ</TabsTrigger>
            <TabsTrigger value="list">Danh sách</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="neon" onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Thêm thức ăn
        </Button>
      </div>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} onEdit={handleEditFood} onDelete={handleDeleteFood} />
          ))}
        </div>
      ) : (
        <FoodList foods={foods} onEdit={handleEditFood} onDelete={handleDeleteFood} />
      )}

      <FormAddFood
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onAdd={handleAddFood}
        onUpdate={handleUpdateFood}
        editingFood={editingFood}
      />
    </div>
  )
}

