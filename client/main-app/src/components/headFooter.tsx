"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'

export default function HeadFooter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")

  }

  return (
    <div className="w-full md:flex md:justify-between md:items-center px-6 sm:px-10 py-10 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800">
      <div className="md:w-[50%] mb-6 md:mb-0">
        <h2 className="text-white text-3xl font-bold mb-2">
          Join <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Cinevie+</span>
        </h2>
        <p className="text-gray-300 text-base font-normal max-w-md">
          Subscribe to our newsletter and receive updates on new movies, exclusive promotions, and special events!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="md:w-[40%] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 h-12 pr-12 focus-visible:ring-red-500"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 h-10 w-10 rounded-md"
          >
            <Send size={18} />
          </Button>
        </div>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-12 px-6 sm:hidden"
        >
          Subscribe
        </Button>
      </form>
    </div>
  )
}
