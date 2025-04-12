"use client"

import type React from "react"
import Link from "next/link"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { register } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export function RegisterForm() {
  const { toast } = useToast()
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [lastName, setLastname] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRepassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await register({
        firstName,
        email,
        lastName,
        password,
        rePassword,
      })
      console.log("Registration result:", result)
      if (result?.error) {
        toast({ variant: "destructive", title: "Error", description: result.error.message })
      }
      toast({ variant: "default", title: "Success", description: "Registration successful!" })
      router.push(`/otp?email=${email}`)
    } catch (error: any) {
      if (error) {
        toast({ variant: "destructive", title: "Error", description: error.message })
      }
    }
  }

  return (
    <div className="w-full flex min-h-screen bg-gradient-to-br from-[#1230AE] via-[#4A0E8F] to-[#C68FE6] p-4 items-center justify-center overflow-hidden">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 flex flex-col justify-center text-white px-16 space-y-6"
      >
        <h1 className="text-6xl font-extrabold drop-shadow-lg">
          Chào mừng đến với
          <span className="bg-gradient-to-r from-[#FFD700] to-[#FFFFFF] bg-clip-text text-transparent animate-pulse drop-shadow-glow ml-2">
            Cinevie+
          </span>
        </h1>
        <p className="text-xl opacity-90 leading-relaxed">
          Đăng ký ngay để trải nghiệm điện ảnh tuyệt vời với những bộ phim hấp dẫn nhất!
        </p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button className="mt-4 bg-white text-[#1230AE] hover:bg-opacity-90 transition-all duration-300 text-lg px-8 py-3 rounded-full">
            Khám phá ngay
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 flex justify-center items-center"
      >
        <Card className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Đăng ký</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label  className="text-white">
                    Họ
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="  text-white border-transparent border-white rounded-lg px-4 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label  className="text-white">
                    Tên
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                    className="text-white border-transparent border-white rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label  className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-white border-transparent border-white rounded-lg px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <Label  className="text-white">
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-white border-transparent border-white rounded-lg px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <Label  className="text-white">
                  Xác nhận mật khẩu
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={rePassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  className="text-white border-transparent border-white rounded-lg px-4 py-2"
                />
              </div>
              <div className="flex justify-between items-center text-sm mt-4">
                <Link href="/login" className="text-white hover:underline transition-all duration-300">
                  Đã có tài khoản?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FF8C00] hover:from-[#FFC700] hover:to-[#FF7F00] text-white font-semibold py-3 rounded-lg mt-6 transition-all duration-300 transform hover:scale-105"
              >
                Đăng ký
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

