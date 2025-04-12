import { useEffect, useState } from "react";
import { getTheaters } from "@/lib/actions"; // Import API
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, MapPin, Film } from "lucide-react";
import { CinemaBranch } from "@/types";
import { toast } from "@/hooks/use-toast";


const BranchList = ({ openBranchDetails, openAddRoomDialog }: any) => {
  const [branches, setBranches] = useState<CinemaBranch[]>([]);

  const fetchBranches = async () => {
    try {
      const data = await getTheaters() as CinemaBranch[];
      setBranches(data);
    } catch (error:any){
      toast({variant:"destructive", title:"Error", description:error?.message})
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);





  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {branches.map((branch) => (
        <Card key={branch.name} className="overflow-hidden">
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
                  <DropdownMenuItem onClick={() => openBranchDetails(branch)}>Xem chi tiết</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openAddRoomDialog(branch)}>Thêm phòng chiếu</DropdownMenuItem>
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
                <Film className="h-4 w-4 mr-2" />
                <span className="font-medium">Phòng chiếu: {branch.rooms?.length ?? 0}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {branch.rooms?.slice(0, 3).map((room) => (
                  <Badge key={room._id} variant="destructive">
                    {room.name}/{room.screenType}
                  </Badge>
                ))}
                {branch.rooms && branch.rooms?.length > 3 && <Badge  variant="secondary">+{branch.rooms?.length - 3}</Badge>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-1">
            <Button variant="outline" className="w-full" onClick={() => openBranchDetails(branch)}>
              Xem chi tiết
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BranchList;
