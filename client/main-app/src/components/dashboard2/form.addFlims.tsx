"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Upload, X } from "lucide-react"
import Image from "next/image"
import { createFilms } from "@/lib/actions"
import { toast, useToast } from "@/hooks/use-toast"

export default function FormAddMovie() {
    const [title, setTitle] = useState("")
    const [year, setYear] = useState("")
    const [description, setDescription] = useState("")
    const [age, setAge] = useState("")
    const [onStage, setOnStage] = useState("")
    const [timeLength, setTimeLength] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.type.startsWith("image/")) {
                setImage(file)
                setImagePreview(URL.createObjectURL(file))
            }
        }
    }

    const removeImage = () => {
        setImage(null)
        setImagePreview(null)
    }
    const {toast} = useToast();
    const handleSubmit = async () => {
        try {
            setLoading(true);
            
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("age", String(age)); // Chuyển thành string
            formData.append("timeLength", String(timeLength)); // Chuyển thành string
            formData.append("year", String(year)); // Chuyển thành string
            formData.append("onStage", onStage);
    
            if (image) {
                formData.append("image", image); // Gửi file ảnh
            }
            const result = await createFilms(formData);
            toast({ variant: "success", title: "Successfully", description: "Created" });
            setTitle("");
            setYear("");
            setDescription("");
            setAge("");
            setOnStage("");
            setTimeLength("");
            removeImage();
        } catch (error: any) {
            console.error("Lỗi khi thêm phim:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-center">Add Movie</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Movie title" />
                    </div>
                    <div>
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} required min="1900" max={new Date().getFullYear()} />
                    </div>
                    <div>
                        <Label htmlFor="age">Age Limit</Label>
                        <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required placeholder="e.g., 13" />
                    </div>
                    <div>
                        <Label htmlFor="timeLength">Time Length (minutes)</Label>
                        <Input id="timeLength" type="number" value={timeLength} onChange={(e) => setTimeLength(e.target.value)} required placeholder="e.g., 150" />
                    </div>
                    <div className="col-span-full">
                        <Label htmlFor="onStage">Release Date</Label>
                        <Input id="onStage" type="date" value={onStage} onChange={(e) => setOnStage(e.target.value)} required />
                    </div>
                    <div className="col-span-full">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="h-24" />
                    </div>
                    <div className="col-span-full">
                        <Label htmlFor="image">Poster</Label>
                        <div className="relative w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer" onClick={() => document.getElementById("image")?.click()}>
                            {imagePreview ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        fill
                                        className="object-contain"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeImage()
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <Upload className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                        <Input id="image" type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
                    </div>
                </div>
                <DialogFooter className="flex justify-between mt-4">
                    <DialogClose >
                        <Button variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                    <Button onClick={handleSubmit} disabled={loading} className="bg-gradient-to-r from-red-400 to-amber-500 text-white">
                        {loading ? "Adding..." : "Add Movie"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
