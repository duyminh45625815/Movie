
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShowtimesTable } from "@/components/dashboard2/Showtime/showtimes-table"
import { ShowtimesFilter } from "@/components/dashboard2/Showtime/showtimes-filter"
import { ShowtimeDialog } from "@/components/dashboard2/Showtime/showtime-dialog"
import { SelectItem } from "@/components/ui/select"
import { ShowtimeFactory } from "@/factories/showtime/showtimeFactory"
import { Film } from "@/types"

export default async  function ShowtimesPage() {
  const theaterOptions = await ShowtimeFactory.getTheaterOptions();
  const showtimes = await ShowtimeFactory.getShowtimes() as Film[];;

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Lịch chiếu</h1>
          <p className="text-muted-foreground">Quản lý tất cả các lịch chiếu phim tại các rạp</p>
        </div>
        <ShowtimeDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm lịch chiếu mới
          </Button>
        </ShowtimeDialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lịch chiếu phim</CardTitle>
          <CardDescription>
           
        Có tổng cộng <span className="font-medium">{showtimes?.length}</span> lịch chiếu trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ShowtimesFilter 
           theaterOptions={theaterOptions.map((option:any) => (
            <SelectItem key={option.key} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
          />
          <div className="mt-6">
            <ShowtimesTable />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

