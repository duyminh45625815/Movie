"use client"

import type { FC } from "react"
import { Calendar, ChevronDown, Filter, RefreshCw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"

interface TableActionsProps {
  isRefreshing: boolean
  handleRefresh: () => void
}

export const TableActions: FC<TableActionsProps> = ({ isRefreshing, handleRefresh }) => {
  return (
    <div className="flex flex-row items-center">
      <CardTitle>Danh sách vé</CardTitle>
      <CardDescription className="ml-2">Quản lý tất cả các vé xem phim</CardDescription>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 gap-1 transition-all duration-200 hover:bg-muted">
          <Calendar className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Ngày</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
        <Button variant="link" size="sm" className="h-8 gap-1 transition-all duration-200 hover:bg-muted">
          <Filter className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Lọc</span>
        </Button>
        <Button
          size="sm"
          variant="gradient"
          className="h-8 gap-1 transition-all duration-200"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">Làm mới</span>
        </Button>
      </div>
    </div>
  )
}

