"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { CinemaBranch } from "@/types"

interface BranchCardProps {
  branch: CinemaBranch
  onViewDetails: (branch: CinemaBranch) => void
  onAddRoom: (branch: CinemaBranch) => void
}

const BranchCard: React.FC<BranchCardProps> = ({ branch, onViewDetails, onAddRoom }) => {
  return (
    <Card key={branch._id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{branch.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(branch)}>Xem chi tiết</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddRoom(branch)}>Thêm phòng chiếu</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="flex items-start mt-1">
          <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{branch.address}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <div className="flex items-center mb-2">
            <span className="font-medium">Phòng chiếu: {branch.rooms?.length}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {branch.rooms?.slice(0, 3).map((room) => (
              <Badge key={room._id} variant="outline">
                {room.name} 
              </Badge>
            ))}
            {branch.rooms && branch.rooms?.length > 3 && <Badge variant="outline">+{branch.rooms?.length - 3}</Badge>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BranchCard