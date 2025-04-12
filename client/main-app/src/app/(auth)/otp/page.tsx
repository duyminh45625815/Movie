  import { Card} from "@/components/ui/card";
  import OTPCardHeader from "@/components/OTPCardHeader";
  import OTPCardContent from "@/components/OTPCardContent";
  import OTPFormButton from "@/components/OTPFormButton";
import { getSession } from "next-auth/react";


  export default function InputOTPDemo() {

   
    return (
      <div className="w-full flex min-h-screen bg-gradient-to-r from-[#1230AE] to-[#C68FE6] p-4 items-center justify-center relative overflow-hidden">
        <Card className=" w-full max-w-md bg-white shadow-xl rounded-3xl p-8 text-gray-900 border border-gray-300 animate-pop-in">
                    <OTPCardHeader></OTPCardHeader>
                    <OTPCardContent></OTPCardContent>
                              
        </Card>
      </div>  
    )
  }
  