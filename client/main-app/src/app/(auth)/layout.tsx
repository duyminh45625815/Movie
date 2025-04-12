import { Toaster } from "@/components/ui/toaster" 
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
export default async function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  const session = await auth()
  if (session) {
    redirect('/')
  }
  return (
   
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  
  );
}