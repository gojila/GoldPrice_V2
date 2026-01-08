import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { LogIn, UserPlus, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
        // LƯU TRẠNG THÁI ĐĂNG NHẬP VÀO ĐÂY
        localStorage.setItem("isLoggedIn", "true"); 
        
        setLoading(false);
        navigate("/"); 
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <span className="text-2xl">💰</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            GOLD MANAGER
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Hệ thống quản lý giá vàng chuyên nghiệp
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng ký</TabsTrigger>
          </TabsList>

          {/* Form Đăng Nhập */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Chào mừng trở lại</CardTitle>
                <CardDescription>
                  Nhập tài khoản của bạn để truy cập hệ thống.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleAuth}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email / Tài khoản</Label>
                    <Input id="email" type="text" placeholder="admin@gold.com" required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mật khẩu</Label>
                      <button type="button" className="text-xs text-primary hover:underline">Quên mật khẩu?</button>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? "Đang xử lý..." : "Đăng nhập"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Form Đăng Ký */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Tạo tài khoản mới</CardTitle>
                <CardDescription>
                  Điền thông tin bên dưới để bắt đầu quản lý.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleAuth}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input id="name" placeholder="Nguyễn Văn A" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Mật khẩu</Label>
                    <Input id="reg-password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" type="submit" disabled={loading}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {loading ? "Đang tạo..." : "Tạo tài khoản"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}