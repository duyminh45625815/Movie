"use client"

import { useState } from "react"
import { Plus, MapPin, Film, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddRoomDialog from "./AddRoomDialog";
import AddBranchDialog from "./AddBranchDialog"
import BranchList from "./BranchList"
import { CinemaBranch, ScreeningRoom } from "@/types"
import { toast } from "@/hooks/use-toast"
import { Clapperboard } from "lucide-react";

export default function CinemaBranchManagement() {
  const [branches, setBranches] = useState<CinemaBranch[]>([])

  const [selectedBranch, setSelectedBranch] = useState<CinemaBranch | null>(null)
  const [newBranch, setNewBranch] = useState({
    name: "",
    address: ""
   
  })
  const [newRoom, setNewRoom] = useState<ScreeningRoom>({
    name: "",
    capacity: 0,
  })

  const [addBranchOpen, setAddBranchOpen] = useState(false)
  const [addRoomOpen, setAddRoomOpen] = useState(false)
  const [branchDetailsOpen, setBranchDetailsOpen] = useState(false)

  const handleAddBranch = () => {
    setBranches([...branches])
    setNewBranch({ name: "", address: ""})
    setAddBranchOpen(false)
  }

  const handleAddRoom = () => {
    if (!selectedBranch?._id) return toast({title:'Không tìm thấy phòng'})
    const updatedBranches = branches.map((branch) => {
      if (branch._id === selectedBranch._id) {
        return {
          ...branch,
          rooms: [...branch.rooms? branch.rooms : []],
        }
      }
      return branch
    })

    setBranches(updatedBranches)
    setNewRoom({ name: "", capacity: 0})
    setAddRoomOpen(false)
  }

  const openAddRoomDialog = (branch: CinemaBranch) => {
    setSelectedBranch(branch)
    setAddRoomOpen(true)
  }

  const openBranchDetails = (branch: CinemaBranch) => {
    setSelectedBranch(branch)
    setBranchDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Danh sách chi nhánh</h2>
        {/* Add Branch Dialog */}
        <AddBranchDialog
          addBranchOpen={addBranchOpen}
          setAddBranchOpen={setAddBranchOpen}
          newBranch={newBranch}
          setNewBranch={setNewBranch}
          onBranchAdded={handleAddBranch}
        />
      </div>


      {/* Branch List */}
      <BranchList branches={branches}
        openBranchDetails={openBranchDetails}
        openAddRoomDialog={openAddRoomDialog}
      />


      {/* Add Room Dialog */}
      <AddRoomDialog
        addRoomOpen={addRoomOpen}
        setAddRoomOpen={setAddRoomOpen}
        selectedBranch={selectedBranch}
        theaterId={selectedBranch?._id}
        newRoom={newRoom}
        setNewRoom={setNewRoom}
        handleAddRoom={handleAddRoom}
      />


      {/* Branch Details Dialog */}
      <Dialog open={branchDetailsOpen} onOpenChange={setBranchDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedBranch && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBranch.name}</DialogTitle>
                <DialogDescription className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedBranch.address}
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="info" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Thông tin</TabsTrigger>
                  <TabsTrigger value="rooms">Phòng chiếu ({selectedBranch.rooms ? selectedBranch.rooms.length : null})</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Tổng số phòng chiếu</h3>
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      <span>{selectedBranch.rooms?.length} phòng</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => openAddRoomDialog(selectedBranch)}>
                      <Plus className="mr-2 h-4 w-4" /> Thêm phòng chiếu
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="rooms" className="mt-4">
                  <div className="space-y-4">
                    {selectedBranch.rooms?.length === 0 ? (
                      <div className="text-center py-8">
                        <Film className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Chưa có phòng chiếu nào</p>
                        <Button className="mt-4" onClick={() => openAddRoomDialog(selectedBranch)}>
                          <Plus className="mr-2 h-4 w-4" /> Thêm phòng chiếu
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="  w-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedBranch.rooms?.map((room) => (
                            <Card key={room.name}>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">{room.name}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center">
                                  <Clapperboard/>
                                  <Badge variant="destructive">{room.screenType}</Badge> 
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => openAddRoomDialog(selectedBranch)}>
                            <Plus className="mr-2 h-4 w-4" /> Thêm phòng chiếu
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

