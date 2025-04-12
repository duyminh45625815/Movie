import type React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { SessionProvider } from "next-auth/react"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <html lang="en" className="dark">
        <body className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </SessionProvider>
  )
}

