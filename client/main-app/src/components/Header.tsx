"use client"

import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, CircleUserIcon, Menu, X, Film, MapPin, Ticket, HelpCircle, LogOut, User } from "lucide-react"

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session } = useSession()

  const navItems = [
    { name: "Movies", icon: <Film size={18} />, href: "/movies" },
    { name: "Branches", icon: <MapPin size={18} />, href: "/branches" },
    { name: "Promotion", icon: <Ticket size={18} />, href: "/promotion" },
    { name: "Support", icon: <HelpCircle size={18} />, href: "/support" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      const profileMenu = document.getElementById("profile-menu")
      if (profileMenu && !profileMenu.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
  
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])
  
  

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-1 sm:px-4 lg:px-12 py-2 bg-gradient-to-r from-gray-900 to-black text-white shadow-2xl border-b border-red-900/30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center transform transition-all hover:scale-105 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 overflow-hidden">
              <Image
                src="/lg1.png"
                fill
                sizes="40px"
                alt="Logo"
                className="object-contain drop-shadow-glow animate-pulse"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent hidden sm:inline-block">
              Cinevie+
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-red-500 group-hover:text-red-400 transition-colors">{item.icon}</span>
              <span className="relative font-medium">
                {item.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          ))}
        </nav>

        {/* User Profile / Login Button */}
        <div className="flex items-center gap-2">
          {session ? (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsProfileOpen(!isProfileOpen)
                }}
                variant="ghost"
                className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/70 text-white rounded-full px-4 py-2 h-auto"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image || "/placeholder.svg"}
                      alt="Profile"
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  ) : (
                    <CircleUserIcon size={18} className="text-white" />
                  )}
                </div>
                <span className="max-w-[100px] truncate hidden sm:inline-block">{session.user?.name}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </Button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 text-gray-200 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">{session.user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                    >
                      <User size={16} className="text-gray-400" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-full px-6 py-2 h-auto flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                <CircleUserIcon size={18} />
                <span>Sign in</span>
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-gray-800/50"
            onClick={(e) => {
              e.stopPropagation()
              toggleMobileMenu()
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
                    id="profile-menu"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 text-gray-200 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">{session?.user.email}</p>
                      <p className="text-xs text-gray-400 truncate">{session?.user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                    >
                      <User size={16} className="text-gray-400" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

