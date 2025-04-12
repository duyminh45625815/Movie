"use client"

import Image from "next/image"
import { Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { FoodItem } from "@/types"
import { useState } from "react"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"

interface FoodCardProps {
  food: FoodItem
  onEdit: (food: FoodItem) => void
  onDelete: (id: string) => void
}

export function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)


  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          <Image src={`http://localhost:8080${food.imageFood}`} alt={food.titleFood}  fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{food.titleFood}</h3>
            <span className="font-bold text-primary">{food.price}</span>
          </div>
          <p className="text-muted-foreground mt-2 text-sm line-clamp-2">{food.details}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-end gap-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(food)}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Chỉnh sửa</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Xóa</span>
          </Button>
        </CardFooter>
      </Card>

      {/* <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Thức ăn "{food.title}" sẽ bị xóa vĩnh viễn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(food.id)} className="bg-destructive text-destructive-foreground">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  )
}

