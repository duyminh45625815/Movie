
import { Button } from "@/components/ui/button";
import { CardContent, CardTitle } from "@/components/ui/card";
interface OTPFormButtonProps {
  handleVerify: () => void;
  isLoading: boolean;
}
export default function OTPFormButton({ handleVerify, isLoading }: OTPFormButtonProps) {
  return (
    <CardContent>
      <div className="p-5 flex justify-between">
        <CardTitle className="pt-2 text-sm font-thin drop-shadow-glow">
          Chưa nhận được OTP?
        </CardTitle>
        <Button
          type="submit"
          className="w-16 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] hover:from-[#1230AE] hover:to-[#C68FE6] hover:scale-95 text-white font-normal text-sm py-3 rounded-lg drop-shadow-glow"
        >
          Gửi mã
        </Button>
      </div>
      <Button
        onClick={handleVerify}
        className="p-8 w-full bg-gradient-to-r from-[#FFD700] to-[#FF8C00] hover:from-[#1230AE] hover:to-[#C68FE6] hover:scale-95 text-white font-semibold py-3 rounded-lg drop-shadow-glow"
      >
        Xác thực OTP
      </Button>
    </CardContent>
  );
}
