"use client"

import type { FC } from "react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        className="transition-all duration-200"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Trước
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="px-4 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
      >
        {currentPage}
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        className="transition-all duration-200"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Sau
      </Button>
    </div>
  )
}

