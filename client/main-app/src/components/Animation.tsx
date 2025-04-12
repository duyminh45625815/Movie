"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function Animation(){
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);
    return(
    <motion.div
        className={`w-1/2 flex flex-col justify-center text-white px-16 space-y-4 drop-shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-200px]'
            }`}
    >
        <h1 className="text-6xl font-extrabold drop-shadow-glow animate-slide-in">
            Chào mừng đến với
            <span
                className="bg-gradient-to-r pl-5 from-[#FFD700] to-[#FFFFFF] bg-clip-text text-transparent"
                style={{ textShadow: "0px 0px 5px rgba(255, 215, 0, 0.8), 0px 0px 10px rgba(255, 215, 0, 0.6), 0px 0px 15px rgba(255, 215, 0, 0.4)" }}
            >
                Cinevie+
            </span>
        </h1>
        <p className="text-lg opacity-90 leading-relaxed animate-fade-in">
            Nơi trải nghiệm điện ảnh đỉnh cao! Đặt vé nhanh chóng, chọn ghế dễ dàng, tận hưởng những bộ phim hot nhất ngay hôm nay.
        </p>
    </motion.div>
    );
}