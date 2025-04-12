"use client"

import { useState } from "react"
import { Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import  { FoodItem} from"@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import Image from "next/image"

interface FoodListProps {
  foods: FoodItem[]
  onEdit: (food: FoodItem) => void
  onDelete: (id: string) => void
}

type SortField = "title" | "price"
type SortDirection = "asc" | "desc"

export function FoodList({ foods, onEdit, onDelete }: FoodListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [sortField, setSortField] = useState<SortField>("title")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")


  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedFoods = [...foods].sort((a, b) => {
    if (sortField === "title") {
      return sortDirection === "asc" ? a.titleFood.localeCompare(b.titleFood) : b.titleFood.localeCompare(a.titleFood)
    } else {
      return sortDirection === "asc" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price)
    }
  })

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Hình ảnh</TableHead>
              <TableHead>
                <button className="flex items-center font-semibold" onClick={() => handleSort("title")}>
                  Tên thức ăn
                  {getSortIcon("title")}
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center font-semibold" onClick={() => handleSort("price")}>
                  Giá
                  {getSortIcon("price")}
                </button>
              </TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFoods.map((food) => (
              <TableRow key={food._id}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-md">
                    <Image src={`http://localhost:8080${food.imageFood}`} alt={food.titleFood} fill className="object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{food.titleFood}</TableCell>
                <TableCell>{food.price}</TableCell>
                <TableCell className="max-w-[300px] truncate">{food.details}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => onEdit(food)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Chỉnh sửa</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteClick(food._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Xóa</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Thức ăn này sẽ bị xóa vĩnh viễn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  )
}

