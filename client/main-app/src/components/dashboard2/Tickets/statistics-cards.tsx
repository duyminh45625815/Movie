import type { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatisticsCardsProps {
  totalTickets: number
  confirmedTickets: number
  pendingTickets: number
  totalRevenue: number
  isLoading: boolean
  formatCurrency: (amount: number) => string 
}

export const StatisticsCards: FC<StatisticsCardsProps> = ({
  totalTickets,
  confirmedTickets,
  pendingTickets,
  totalRevenue,
  isLoading,
  formatCurrency,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng số vé</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold animate-in fade-in-50 duration-500">{totalTickets}</div>
          )}
          <p className="text-xs text-muted-foreground">+2.5% so với tuần trước</p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vé đã xác nhận</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold animate-in fade-in-50 duration-500 delay-100">{confirmedTickets}</div>
          )}
          <p className="text-xs text-muted-foreground">+12% so với tuần trước</p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vé chờ xác nhận</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold animate-in fade-in-50 duration-500 delay-200">{pendingTickets}</div>
          )}
          <p className="text-xs text-muted-foreground">-8% so với tuần trước</p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold animate-in fade-in-50 duration-500 delay-300">
              {formatCurrency(totalRevenue)}
            </div>
          )}
          <p className="text-xs text-muted-foreground">+18.2% so với tuần trước</p>
        </CardContent>
      </Card>
    </div>
  )
}

