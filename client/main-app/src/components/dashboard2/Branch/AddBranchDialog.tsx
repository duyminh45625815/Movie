import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { createTheater } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";

const AddBranchDialog = ({ addBranchOpen, setAddBranchOpen,onBranchAdded  }:any) => {

  const [newBranch, setNewBranch] = useState({
    name: "",
    address: ""
  });
  const handleAddBranch = async () => {
    try {
      const response = await createTheater(newBranch);

      toast({variant:"default", description:"Thêm rạp thành công"})
      onBranchAdded(response); 
      setAddBranchOpen(false); 
    } catch (error: any) {
      toast({variant:"destructive", title: 'Lỗi' , description:error?.message})
    }
  };
  return (
    <Dialog open={addBranchOpen} onOpenChange={setAddBranchOpen}>
      <DialogTrigger asChild>
        <Button variant="neon">
          <Plus className="mr-2 h-4 w-4" /> Thêm chi nhánh
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm chi nhánh mới</DialogTitle>
          <DialogDescription>Nhập thông tin chi nhánh rạp chiếu phim mới</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Tên chi nhánh</Label>
            <Input
              id="name"
              value={newBranch.name}
              onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
              placeholder="Nhập tên chi nhánh"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Textarea
              id="address"
              value={newBranch.address}
              onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
              placeholder="Nhập địa chỉ chi nhánh"
            />
          </div>
         
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAddBranchOpen(false)}>
            Hủy
          </Button>
          <Button className="bg-gradient-to-r from-rose-400 to-red-700" onClick={handleAddBranch}>Thêm chi nhánh</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBranchDialog;
