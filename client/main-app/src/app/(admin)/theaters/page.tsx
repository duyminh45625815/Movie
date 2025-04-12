import CinemaBranchManagement from "@/components/dashboard2/Branch/cinema-branch-management"
import { Card, CardContent } from "@/components/ui/card"


export default function TheaterPage() {
  return (
    <main className="container mx-auto py-10 px-6 min-h-screen bg-white text-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_0%,_rgba(0,0,0,0)_100%)] pointer-events-none"></div>
      <Card className="shadow-lg border border-gray-200 bg-white/20 backdrop-blur-lg text-black rounded-xl p-6">
        <CardContent>
          <CinemaBranchManagement />
        </CardContent>
      </Card>
    </main>
  )
}
