import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, LayoutDashboard, Building2, Coins, BadgeDollarSign, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

// Component xử lý từng mục Menu
const NavItem = ({ item }: { item: any }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  
  // Kiểm tra xem có mục con nào đang active không
  const isActive = hasChildren 
    ? item.children.some((child: any) => location.pathname === child.href)
    : location.pathname === item.href;

  if (!hasChildren) {
    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-slate-200",
          isActive ? "bg-white shadow-sm text-primary border" : "text-slate-500"
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.name}
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-slate-200",
          isActive ? "text-primary" : "text-slate-500"
        )}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          <span>{item.name}</span>
        </div>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="ml-4 space-y-1 border-l pl-4">
          {item.children.map((child: any) => (
            <Link
              key={child.href}
              to={child.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-slate-200",
                location.pathname === child.href ? "text-primary font-semibold" : "text-slate-500"
              )}
            >
              <child.icon className="h-4 w-4" />
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
    const navigation = [
        { 
            name: "Dashboard", 
            href: "/", 
            icon: LayoutDashboard 
        },
        { 
            name: "Danh mục", 
            href: "/categories", 
            icon: Settings // Hoặc icon nào bạn thích
        },
        {
            name: "Bảng Giá Vàng",
            icon: BadgeDollarSign,
            children: [
            { name: "Công ty", href: "/companies", icon: Building2 },
            { name: "Loại Vàng", href: "/gold-types", icon: Coins },
            { name: "Giá Vàng", href: "/gold-prices", icon: BadgeDollarSign },
            ],
        },
    ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-slate-50/50">
      <div className="flex h-16 items-center border-b px-6 font-bold text-primary">
        GOLD MANAGER
      </div>

      <nav className="flex-1 space-y-2 px-3 py-4">
        {navigation.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </nav>

      <div className="border-t p-4">
        <button 
          onClick={() => { localStorage.removeItem("isLoggedIn"); window.location.href = "/login"; }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" /> Đăng xuất
        </button>
      </div>
    </div>
  );
}