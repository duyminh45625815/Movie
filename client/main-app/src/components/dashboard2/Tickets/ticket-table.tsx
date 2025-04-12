"use client"

import type { FC } from "react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "./status-badge"
import { TableSkeleton } from "./table-skeleton"
import type { Ticket } from "@/types/index"

interface TicketTableProps {
  tickets: Ticket[]
  isLoading: boolean
  formatCurrency: (amount: number) => string
  viewTicketDetails: (ticket: Ticket) => void
}

export const TicketTable: FC<TicketTableProps> = ({ tickets, isLoading, formatCurrency, viewTicketDetails }) => {
  return (
    <div className="rounded-md border overflow-hidden transition-all duration-300">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>ID</TableHead> */}
            
            <TableHead>Trạng thái</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phim</TableHead>
            <TableHead>Suất chiếu</TableHead>
            <TableHead>Ghế</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton rowCount={5} />
          ) : tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24">
                Không tìm thấy vé nào
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket, index) => (
              <TableRow
                key={ticket._id}
                className="transition-all duration-200 hover:bg-muted/50 animate-in fade-in-50 slide-in-from-left-5"
                style={{ animationDelay: `${index * 50}ms` }}
              >
         
              
                <TableCell>
                  <StatusBadge status={ticket.status} />
                </TableCell>
                <TableCell>{ticket.user?.email}</TableCell>
                <TableCell>{ticket.showtime?.films?.title}</TableCell>
                <TableCell>{ticket.showtime.startTime}</TableCell>
                <TableCell>{ticket.seats.join(", ")}</TableCell>
                <TableCell>{formatCurrency(ticket.totalPrice)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="transition-all duration-200 hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mở menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="animate-in fade-in-50 zoom-in-95 duration-100">
                      <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => viewTicketDetails(ticket)}
                        className="transition-colors duration-200 cursor-pointer"
                      >
                        Xem chi tiết
                      </DropdownMenuItem>
                      {ticket.status === "pending" && (
                        <DropdownMenuItem className="transition-colors duration-200 cursor-pointer">
                          Xác nhận vé
                        </DropdownMenuItem>
                      )}
                      {(ticket.status === "pending" || ticket.status === "paid") && (
                        <DropdownMenuItem className="text-red-600 transition-colors duration-200 cursor-pointer">
                          Hủy vé
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

