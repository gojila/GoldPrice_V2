import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  Coins, 
  BadgeDollarSign, 
  Settings,
  Menu, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils"; // Hàm helper mặc định của shadcn
import { useEffect } from "react";

// Import các trang của bạn (đảm bảo đúng đường dẫn file)
import CategoryPage from "./pages/category_page";
import CompanyPage from "./pages/company_page";
import { GoldTypePage } from "./pages/gold_type_page";
import { GoldPricePage } from "./pages/gold_price_page";
import Dashboard from "./pages/dash_board_page";

import AuthPage from "./pages/auth_page";
import Sidebar from "./ui/Sidebar";

export default function App() {
  return (
    <Router>
      <AuthGuard>
        <Routes>
          {/* Route Đăng nhập tách biệt, không có Sidebar */}
          <Route path="/login" element={<AuthPage />} />

          {/* Các Route còn lại có Sidebar */}
          <Route
            path="/*"
            element={
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-white">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/categories" element={<CategoryPage />} />
                    <Route path="/companies" element={<CompanyPage />} />
                    <Route path="/gold-types" element={<GoldTypePage />} />
                    <Route path="/gold-prices" element={<GoldPricePage />} />
                  </Routes>
                </main>
              </div>
            }
          />
      </Routes>
      </AuthGuard>
      
    </Router>
  );
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    
    // Nếu chưa đăng nhập và không phải đang ở trang login thì đá về trang login
    if (!isAuthenticated && location.pathname !== "/login") {
      navigate("/login");
    }
    
    // Ngược lại, nếu đã đăng nhập mà cố tình vào lại trang login thì đá về trang chủ
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/");
    }
  }, [navigate, location]);

  return <>{children}</>;
}