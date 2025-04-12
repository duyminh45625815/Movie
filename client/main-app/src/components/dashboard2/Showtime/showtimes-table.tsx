"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Edit, MapPin, MoreHorizontal, Trash2, Users } from "lucide-react"
import { format, parseISO } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShowtimeDialog } from "./showtime-dialog"
import { getShowTime } from "@/lib/actions";
import { Showtime } from "@/types/index"
import { createShowtime } from "@/factories/showtime/createShơtimeFactory"


export function ShowtimesTable() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null)
  const [showtimes, setShowtimes] = useState<Showtime[]>([])
    useEffect(() => {
      async function fetchShowtimes(): Promise<void> {
        const data = await getShowTime() as Showtime[];
        const updatedShowtimes = data.map(createShowtime); 
        setShowtimes(updatedShowtimes);
      }
      fetchShowtimes();
    }, []);
 
  const handleDelete = (id: string) => {
    setSelectedShowtime(id)
    setShowDeleteDialog(true)
  }
  const confirmDelete = () => {
    console.log(`Deleting showtime with ID: ${selectedShowtime}`)
    setShowDeleteDialog(false)
  }
  const vietnamTimeZone = "Asia/Ho_Chi_Minh";
  const convertToVietnamTime = (isoString: string) => {
    const date = parseISO(isoString);
    return toZonedTime(date, vietnamTimeZone);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {showtimes.map((showtime) => (
          <Card key={showtime._id} className="overflow-hidden">
            <div className="relative h-48 bg-muted">
              <img
                src={`http://localhost:8080${showtime.films?.image}`}
                alt={showtime.films?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={showtime.status === "active" ? "default" : "destructive"}>
                  {showtime.status === "active" ? "Đang bán" : "Đóng"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-1">{showtime.films?.title}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div>{showtime.theater?.name}</div>
                    <div className="text-muted-foreground">{showtime.rooms?.name}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>{format(parseISO(showtime.dateAction.toString()), "dd/MM/yyyy")}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  {format(convertToVietnamTime(showtime.startTime), "HH:mm")} -{" "}
                  {format(convertToVietnamTime(showtime.endTime), "HH:mm")}
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    {showtime.availableSeats}/{showtime.rooms?.capacity} ghế trống
                  </div>
                </div>

                <div className="font-medium">{Number.parseInt(showtime.price).toLocaleString("vi-VN")} VNĐ</div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <ShowtimeDialog showtime={showtime}>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>
              </ShowtimeDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Mở menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => showtime._id && handleDelete(showtime._id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa lịch chiếu</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa lịch chiếu này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Xóa lịch chiếu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

