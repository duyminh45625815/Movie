"use client";

import { useState } from "react";
import {  useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/actions";
import  Link  from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { getSession } from "next-auth/react"
export default  function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading]= useState(false)
  const handleSubmit = async (e: React.FormEvent,) => {
    e.preventDefault();
    setLoading(true)
    setTimeout(async()=>{
    const result = await login(username, password);
    if (result.error) {
      if(result.error==="Account is not activity"){
        router.push("/otp")
      }
      toast({ variant: "destructive", title: "Lỗi", description: result?.error });
      setLoading(false);
    } else {
      setLoading(false);
      const session = await getSession();
      if (session?.user?.role === "client") {
        router.push("/");
      } else {
        router.push("/dashboards"); 
      }
      toast({variant:"success" , title:"Wellcome back to the CINEVIE+"})
      
      // else
      // router.push('/dashboards')
    }
  },3000)
}

  return (
    <form className="space-y-6" >
    <motion.div className="space-y-3" whileFocus={{ scale: 1.02 }}>
        <Label htmlFor="email" className="text-gray-700">Email</Label>
        <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white text-gray-900 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD700] animate-input-focus"
        />
    </motion.div>
    <motion.div className="space-y-3" whileFocus={{ scale: 1.02 }}>
        <Label htmlFor="password" className="text-gray-700">Mật khẩu</Label>
        <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-gray-900 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD700] animate-input-focus"
        />
    </motion.div>
    <div className="flex justify-between items-center text-sm">
        <Link href="/register" className="text-blue-600 hover:underline hover:text-black transition-all animate-link-hover">
            <div className="w-auto h-auto">
                Chưa có tài khoản?
            </div>
        </Link>
        <Link href="#" className="text-blue-600 hover:underline hover:text-black transition-all animate-link-hover">Quên mật khẩu?</Link>
    </div>
 
    <motion.div>
        <Button type="submit" disabled={loading} onClick={handleSubmit} className={`w-full py-3 rounded-lg drop-shadow-glow font-semibold flex items-center justify-center gap-2 transition-all
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#FFD700] to-[#FF8C00] hover:from-[#FFC700] hover:to-[#FF7F00] hover:scale-95 text-white"}
          `}
          >
                     {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Đăng nhập"}

        </Button>
    </motion.div>
</form>
  );
}
