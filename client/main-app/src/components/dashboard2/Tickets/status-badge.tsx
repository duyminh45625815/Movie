import type { FC } from "react"
import { Badge } from "@/components/ui/badge"

type TicketStatus = "pending"  | "paid" | "cancelled"

interface StatusBadgeProps {
  status: TicketStatus
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 transition-all duration-200">
          {status}
        </Badge>
      )
    // case "confirmed":
    //   return (
    //     <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 transition-all duration-200">
    //       {status}
    //     </Badge>
    //   )
    case "paid":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 transition-all duration-200">
          {status}
        </Badge>
      )
    case "cancelled":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 transition-all duration-200">
          {status}
        </Badge>
      )
  }
}

