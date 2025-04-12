"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { CalendarIcon, Clock, Save } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { showtimeType } from "@/types"
import { createShowtimes, getFilms, getTheaters } from "@/lib/actions"
import { CinemaBranch } from "@/types";
import { toast } from "@/hooks/use-toast"
import { Film } from "@/types/index"
import { LoadingCat } from "@/components/loading/loading-cat"





const formSchema = z.object({
  films: z.string({ required_error: "Vui lòng chọn phim" }), 
  theater: z.string({ required_error: "Vui lòng chọn rạp" }), 
    rooms: z.string({ required_error: "Vui lòng chọn phòng" }),
  dateAction: z.date({ required_error: "Vui lòng chọn ngày chiếu" }),
  startTime: z.string({ required_error: "Vui lòng nhập giờ bắt đầu" }),
  endTime: z.string({ required_error: "Vui lòng nhập giờ kết thúc" }), 
  price: z.string().min(1, "Vui lòng nhập giá vé"), 
  status: z.string().optional(), 
});



interface ShowtimeDialogProps {
  children: React.ReactNode
  showtime?: any 
}

export function ShowtimeDialog({ children, showtime }: ShowtimeDialogProps) {
  const [branches, setBranches] = useState<CinemaBranch[]>([]);
  const fetchBranches = async () => {
    try {
      const data = await getTheaters() as CinemaBranch[];
      setBranches(data);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);
  const [open, setOpen] = useState(false)
  const [selectedTheaterId, setSelectedTheaterId] = useState<string>("")
  const isEditing = !!showtime
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      try {
        const response = await getFilms();
        setFilms(response.results || []);
      } catch (error:any) {
        throw new Error(error);
      }
      setLoading(false);
    };
    fetchFilms();
  }, []);
  const form = useForm<showtimeType>({
    resolver: zodResolver(formSchema),
    defaultValues: showtime || {
      films: "",
      theater: "",
      rooms: "",
      price: "", // Giá trị mặc định là số
      dateAction: new Date(), // Ngày mặc định là ngày hiện tại
      startTime: "00:00",// Giờ mặc định (ví dụ: "00:00")
      endTime: "00:00", // Giờ mặc định (ví dụ: "00:00")
      status: 'active', // Trạng thái mặc định
    },
  });


  const availableRooms = branches.find((theater) => theater._id === selectedTheaterId)?.rooms || []

  // Handle theater change to update available rooms
  const handleTheaterChange = (value: string) => {
    setSelectedTheaterId(value)
    form.setValue("rooms", "")
  }


  useState(() => {
    if (showtime?.theaterId) {
      setSelectedTheaterId(showtime.theaterId)
    }
  })

 async function onSubmit (data: showtimeType)  {
  try {
    const dateString = data.dateAction.toISOString().split('T')[0];
    console.log(availableRooms);
    const formattedData = {
      ...data,
      rooms:data.rooms,
      startTime: new Date(`${dateString}T${data.startTime}:00`), 
      endTime: new Date(`${dateString}T${data.endTime}:00`), 
    };
  
     await createShowtimes(formattedData)
    
    setOpen(false);
    form.reset()
  } catch (error:any) {
    toast({variant:"destructive", title:"Error", description:error.message})
  }
    
  }
  if(loading)return <div><LoadingCat/></div>
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Chỉnh sửa lịch chiếu" : "Thêm lịch chiếu mới"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Cập nhật thông tin lịch chiếu hiện có" : "Điền đầy đủ thông tin để tạo lịch chiếu mới"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="films"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phim</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phim" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {films.map((movie) => (
                          <SelectItem key={movie._id} value={movie._id}>
                            {movie.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="theater"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rạp</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleTheaterChange(value)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn rạp" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branches.map((theater) => (
                          <SelectItem key={theater._id} value={theater._id}>
                            {theater.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phòng</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedTheaterId}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={selectedTheaterId ? "Chọn phòng" : "Chọn rạp trước"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableRooms.map((room) => (
                          <SelectItem key={room._id} value={room._id as string}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateAction"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Ngày chiếu</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP", { locale: vi }) : <span>Chọn ngày</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          locale={vi}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giờ bắt đầu</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input {...field} type="time" value={field.value || "00:00"} />
                        </FormControl>
                        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giờ kết thúc</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input {...field} type="time" value={field.value || "00:00"} />
                        </FormControl>
                        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá vé (VNĐ)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="50000" step="5000" />
                    </FormControl>
                    <FormDescription>Nhập giá vé bằng VNĐ (ví dụ: 120000)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />




            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Cập nhật" : "Tạo lịch chiếu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

