"use client"

import { useState } from "react"
import { Bell, Search, Menu, X, ChevronDown,UserCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarTrigger } from "../ui/sidebar"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  const session = useSession({ required: false})

  return (
    <header className="bg-[#C68FE6] flex flex-grow     text-white shadow-lg">
       <SidebarTrigger />
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease:"backInOut"}}
              className="w-10 h-10 rounded-full flex items-center sm:justify-center"
            >
              <Image src="/lg1.png" fill alt="icon" />
            </motion.div>
            <span className="text-2xl font-extrabold">Dashboard</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {["Dashboard", "Users", "Analytics", "Settings"].map((item) => (
              <a key={item} href="#" className="hover:text-purple-200 transition-colors duration-200">
                {item}
              </a>
            ))}
          </nav>

          {/* Search, Notifications, and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className=" text-black placeholder-purple-300 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-950" size={18} />
            </div>
            <button className="relative hover:text-purple-200 transition-colors duration-200">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 hover:text-purple-200 transition-colors duration-200"
              >
                <UserCircle2/>
                <span>{session?.data?.user.name}</span>
                <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700"
                  >
                    <a href="#" className="block px-4 py-2 hover:bg-purple-100">
                      Profile
                    </a>
                    <a onClick={()=> signOut({callbackUrl:'/login'})} className="block px-4 py-2 hover:bg-purple-100">
                      Logout
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <nav className="flex flex-col space-y-2">
                {["Dashboard", "Users", "Analytics", "Settings"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="hover:bg-purple-600 py-2 px-4 rounded transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <div className="mt-4 space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full text-white placeholder-purple-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" size={18} />
                </div>
                <div className="flex items-center justify-between">
                  <button className="relative hover:text-purple-200 transition-colors duration-200">
                    <Bell size={24} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 hover:text-purple-200 transition-colors duration-200"
                  >
                    <img src="/placeholder.svg?height=32&width=32" alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <span>John Doe</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default AdminHeader

