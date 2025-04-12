"use client"

import type { FC } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatusBadge } from "./status-badge"
import type { Ticket } from "@/types/index"

interface TicketDetailsDialogProps {
  ticket: Ticket | null
  open: boolean
  onOpenChange: (open: boolean) => void
  formatCurrency: (amount: number) => string
}

export const TicketDetailsDialog: FC<TicketDetailsDialogProps> = ({ ticket, open, onOpenChange, formatCurrency }) => {
  if (!ticket) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] animate-in fade-in-50 zoom-in-90 duration-300">
        <DialogHeader>
          <DialogTitle>Chi tiết vé #{ticket._id}</DialogTitle>
          <DialogDescription>Thông tin chi tiết về vé xem phim</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div
            className="grid grid-cols-4 items-center gap-4 animate-in fade-in-50 slide-in-from-left-5 duration-300"
            style={{ animationDelay: "50ms" }}
          >
            <span className="text-sm font-medium">Trạng thái:</span>
            <div className="col-span-3">
              <StatusBadge status={ticket.status} />
            </div>
          </div>

          <div
            className="grid grid-cols-4 items-center gap-4 animate-in fade-in-50 slide-in-from-left-5 duration-300"
            style={{ animationDelay: "100ms" }}
          >
            <span className="text-sm font-medium">Email:</span>
            <div className="col-span-3">{ticket.user?.email}</div>
          </div>

          <div
            className="grid grid-cols-4 items-center gap-4 animate-in fade-in-50 slide-in-from-left-5 duration-300"
            style={{ animationDelay: "150ms" }}
          >
            <span className="text-sm font-medium">Phim:</span>
            <div className="col-span-3">{ticket.showtime.films?.title}</div>
          </div>

          <div
            className="grid grid-cols-4 items-center gap-4 animate-in fade-in-50 slide-in-from-left-5 duration-300"
            style={{ animationDelay: "200ms" }}
          >
            <span className="text-sm font-medium">Suất chiếu:</span>
            <div className="col-span-3">{ticket.showtime.startTime}</div>
          </div>

          <div
            className="grid grid-cols-4 items-center gap-4 animate-in fade-in-50 slide-in-from-left-5 duration-300"
            style={{ animationDelay: "250ms" }}
          >
            <span className="text-sm font-medium">Ghế:</span>
            <div className="col-span-3">{ticket.seats.join(", ")}</div>
          </div>

          <div
            className="grid grid-cols-4 items-center gap-4 animate-in fade-in-50 slide-in-from-left-5 duration-300"
            style={{ animationDelay: "300ms" }}
          >
            <span className="text-sm font-medium">Ngày mua:</span>
            <div className="col-span-3">{new Date(ticket.createdAt).toLocaleString()}</div>
          </div>

          <div
            className="grid grid-cols-4 items-start gap-4 animate-in fade-in-50 slide-in-from-left-5 duration-300"
            style={{ animationDelay: "350ms" }}
          >
            <span className="text-sm font-medium">Combo:</span>
            <div className="col-span-3">
              {ticket.combo.length === 0 ? (
                <span className="text-muted-foreground">Không có</span>
              ) : (
                <ul className="space-y-1">
                  {ticket.combo.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm animate-in fade-in-50 slide-in-from-left-5 duration-300"
                      style={{ animationDelay: `${400 + index * 50}ms` }}
                    >
                      {item.food.titleFood} x{item.quantity} - {formatCurrency(Number(item.food.price))}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div
            className="grid grid-cols-4 items-center gap-4 pt-2 border-t animate-in fade-in-50 slide-in-from-left-5 duration-300"
            style={{ animationDelay: "500ms" }}
          >
            <span className="text-sm font-medium">Tổng tiền:</span>
            <div className="col-span-3 font-bold">{formatCurrency(ticket.totalPrice)}</div>
          </div>

          <div
            className="flex justify-end gap-2 pt-4 animate-in fade-in-50 slide-in-from-bottom-5 duration-300"
            style={{ animationDelay: "550ms" }}
          >
            {ticket.status === "pending" && (
              <>
                <Button variant="default" className="transition-all duration-200 hover:shadow-md">
                  Xác nhận vé
                </Button>
                <Button variant="destructive" className="transition-all duration-200 hover:shadow-md">
                  Hủy vé
                </Button>
              </>
            )}
            {ticket.status === "paid" && (
              <Button variant="destructive" className="transition-all duration-200 hover:shadow-md">
                Hủy vé
              </Button>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)} className="transition-all duration-200">
              Đóng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

