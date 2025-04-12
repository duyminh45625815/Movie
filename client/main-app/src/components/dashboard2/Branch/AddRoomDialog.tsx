import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {createRoomToTheater} from "@/lib/actions";
import { toast } from "@/hooks/use-toast";

const AddRoomDialog = ({ addRoomOpen,theaterId, setAddRoomOpen, selectedBranch, newRoom, setNewRoom, handleAddRoom }:any) => {
  handleAddRoom = async () => {
    try {
      const roomdata = await createRoomToTheater(newRoom, theaterId);
     if(roomdata){
      toast({variant:'success', title:"Success", description:roomdata?.message})
     }
      setAddRoomOpen(false);
    } catch (error:any) {
      toast({ variant:'destructive', title: 'Lỗi', description: error.message });
    }
    setAddRoomOpen(false)
  }
  return (
    <Dialog open={addRoomOpen} onOpenChange={setAddRoomOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm phòng chiếu mới</DialogTitle>
          <DialogDescription>Thêm phòng chiếu mới cho chi nhánh {selectedBranch?.name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="roomName">Tên phòng</Label>
            <Input
              id="roomName"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              placeholder="Nhập tên phòng chiếu"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="capacity">Sức chứa</Label>
            <Input
              id="capacity"
              type=""
              value={newRoom.capacity || ""}
              onChange={(e) => setNewRoom({ ...newRoom, capacity: Number.parseInt(e.target.value) || 0 })}
              placeholder="Nhập sức chứa"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAddRoomOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleAddRoom}>Thêm phòng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomDialog;
