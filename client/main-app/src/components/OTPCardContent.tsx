"use client";

import { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verify } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import OTPFormButton from "./OTPFormButton";
import { useRouter,useSearchParams } from "next/navigation";


export default function OTPCardContent() {
  const [code, setCode] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const email = searchParams.get("email");
    if (email) {
      setUser(email);
    } else {
      toast({
        variant: "destructive",
        description: "Không tìm thấy ID người dùng. Vui lòng đăng ký lại.",
      });
      router.push("/register");
    }
  }, [searchParams, router]);

  // Xử lý xác thực OTP
  const handleVerify = async () => {
    if (!user) {
      toast({ variant: "destructive", description: "Không tìm thấy ID người dùng." });
      return;
    }

    if (code.length !== 8) {
      toast({ variant: "destructive", description: "Vui lòng nhập mã OTP 8 chữ số." });
      return;
    }

    setIsLoading(true);
    try {
      const response = await verify(code, user);
      if (typeof response === "object" && response.error) {
        throw new Error(response.error.message || "Mã OTP không hợp lệ.");
      }
      toast({ variant: "default", description: typeof response === "string" ? response : response.error.message });
      router.push("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message || "Đã xảy ra lỗi khi xác thực OTP.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent className="justify-items-center flex flex-col items-center space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-center mb-4">
          Nhập mã OTP
        </h2>
        <InputOTP
          maxLength={8}
          value={code}
          onChange={(value) => setCode(value)}
          disabled={isLoading}
        >
          <InputOTPGroup>
            {[...Array(4)].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {[...Array(4)].map((_, i) => (
              <InputOTPSlot key={i + 4} index={i + 4} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <OTPFormButton handleVerify={handleVerify} isLoading={isLoading}  />
    </CardContent>
  );
}