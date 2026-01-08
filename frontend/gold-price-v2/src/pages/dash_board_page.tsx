import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Legend 
} from "recharts";
import { Building2, Coins, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Dữ liệu giả lập cho biểu đồ
const priceData = [
  { name: "Vàng SJC", mua: 78.5, ban: 80.2 },
  { name: "Vàng 24K", mua: 76.2, ban: 77.5 },
  { name: "Vàng 18K", mua: 55.8, ban: 57.2 },
  { name: "Vàng 9999", mua: 79.1, ban: 81.0 },
];

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Tổng quan hệ thống</h1>
        <p className="text-slate-500">Chào mừng bạn trở lại, đây là thống kê thị trường hôm nay.</p>
      </div>

      {/* 1. Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tổng Công Ty</CardTitle>
            <Building2 className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-slate-500">+1 từ tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Loại Vàng</CardTitle>
            <Coins className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-slate-500">Đang hoạt động</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Giá Mua Cao Nhất</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">79.5M</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 2.1% so với hôm qua
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Giá Bán Thấp Nhất</CardTitle>
            <TrendingUp className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">57.2M</div>
            <div className="flex items-center text-xs text-red-600">
              <ArrowDownRight className="w-3 h-3 mr-1" /> 0.5% so với hôm qua
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Bar Chart - So sánh giá các loại vàng */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>So sánh Giá Vàng (Triệu VNĐ)</CardTitle>
            <CardDescription>Dữ liệu tổng hợp từ các công ty lớn</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
                <Legend />
                <Bar dataKey="mua" fill="#2563eb" name="Giá Mua" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ban" fill="#ef4444" name="Giá Bán" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart - Xu hướng (Giả lập) */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Biến động thị trường</CardTitle>
            <CardDescription>7 ngày gần nhất</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="mua" 
                  stroke="#2563eb" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-slate-500 text-center">
              Thị trường đang có xu hướng tăng nhẹ vào cuối tuần.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}