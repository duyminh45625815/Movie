
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AdminHeader from '@/components/dashboard2/headerAdmin'
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"

export default async function Layout({ children }: { children: React.ReactNode }) {
 

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" flex flex-col w-full h-full">
        <div className="w-full h-full  bg-gradient-to-b from-[#C68FE6] to-white  ">
          <Toaster/>
          <SessionProvider > 
          <div className=" sticky top-0 z-50  ">
         
          <AdminHeader />
          </div>
          <div className=" p-4 rounded-xl   bg-white ">
            {children}
          </div>
          </SessionProvider >
        </div>
      </main>
    </SidebarProvider>
  )
} 
