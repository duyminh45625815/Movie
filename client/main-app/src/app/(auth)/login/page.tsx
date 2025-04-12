
import LoginForm from '@/components/forms/LoginForm';
import Animation from '@/components/Animation';
import AuthCard from "@/components/forms/AuthCards";


export default async function LoginPage() {
  
   
    return (
        <div className="w-full flex min-h-screen bg-gradient-to-r from-[#1230AE] to-[#C68FE6] p-4 items-center justify-center relative overflow-hidden">
            {/* Left Section */}
            <Animation />
            {/* Right Section */}
            <AuthCard title="Đăng nhập">
                <LoginForm />
            </AuthCard>
        </div>
    );
}
