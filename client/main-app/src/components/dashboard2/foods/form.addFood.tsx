"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import {  createFoods } from "@/lib/actions"
import { FoodItem } from "@/types"
import {  useToast } from "@/hooks/use-toast"

interface FormAddFoodProps {
    open: boolean
    onClose: () => void
    onAdd: (food: Omit<FoodItem, "id">) => void
    onUpdate: (updatedFood: FoodItem) => void
    editingFood: FoodItem | null
}
export default function FormAddFood({ open, onClose, onUpdate, editingFood }: FormAddFoodProps) {
    const [titleFood, setTitleFood] = useState("")
    const [price, setPrice] = useState("")
    const [details, setDetails] = useState("")
    const [imageFood, setImageFood] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.type.startsWith("image/")) {
                setImageFood(file)
                setImagePreview(URL.createObjectURL(file))
            }
        }
    }
    const removeImage = () => {
        setImageFood(null)
        setImagePreview(null)
    }
    const { toast } = useToast();
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("titleFood", titleFood);
            formData.append("details", details);
            formData.append("price", price)
            if (imageFood) {
                formData.append("imageFood", imageFood);
            }
            await createFoods(formData);
            toast({ variant: "success", title: "Successfully", description: "Created" });
            setTitleFood("");
            setDetails("");
            removeImage();
            onClose(); 
        } catch (error: any) {
            toast({variant:"destructive", title:"Error", description:error.message})
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-serif text-orange-400 font-semibold animate-bounce">Add Food</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={titleFood} onChange={(e) => setTitleFood(e.target.value)} required placeholder="Food title" />
                    </div>

                    <div>
                        <Label htmlFor="age">Price</Label>
                        <Input id="age" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="ví dụ: 100000" />
                    </div>

                    <div className="col-span-full">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={details} onChange={(e) => setDetails(e.target.value)} required className="h-24" />
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
                    <DialogClose>
                        <Button variant={"secondary"}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={loading}variant="gradient">
                        {loading ? "Adding..." : "Add Food"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}