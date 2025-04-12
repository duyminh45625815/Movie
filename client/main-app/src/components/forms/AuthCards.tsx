"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}   
export default function AuthCard({ title, children }: AuthCardProps) {
    return (
       <motion.div
                       initial={{ opacity: 0, y: 50 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8 }}
                       className="w-1/2 flex justify-center items-center"
                   >
        <Card className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 text-gray-900 border border-gray-300 animate-pop-in">
        <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold drop-shadow-glow">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
    </Card>
    </motion.div>
    );
  }