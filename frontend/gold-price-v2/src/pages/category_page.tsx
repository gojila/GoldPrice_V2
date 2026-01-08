import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Định nghĩa kiểu dữ liệu
interface Category {
  id: number;
  name: string;
  note: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Điện tử", note: "Các thiết bị dùng điện" },
    { id: 2, name: "Gia dụng", note: "Đồ dùng trong nhà bếp, phòng khách" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", note: "" });

  // Mở modal để thêm mới hoặc sửa
  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, note: category.note });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", note: "" });
    }
    setIsOpen(true);
  };

  // Lưu dữ liệu
  const handleSave = () => {
    if (editingCategory) {
      // Logic Sửa
      setCategories(categories.map(c => 
        c.id === editingCategory.id ? { ...c, ...formData } : c
      ));
    } else {
      // Logic Thêm mới
      const newCategory = {
        id: Date.now(),
        ...formData
      };
      setCategories([...categories, newCategory]);
    }
    setIsOpen(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Category</h1>
        
        {/* Modal Form Thêm/Sửa */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <Button onClick={() => handleOpenModal()}>Thêm Category</Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Chỉnh sửa Category" : "Thêm Category mới"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên Category</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập tên..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="note">Ghi chú</Label>
                <Textarea
                  id="note"
                  rows={4}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Nhập ghi chú..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Hủy</Button>
              <Button onClick={handleSave}>Lưu thay đổi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bảng danh sách */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Tên Category</TableHead>
              <TableHead>Ghi chú</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">{item.note}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    className="text-blue-600"
                    onClick={() => handleOpenModal(item)}
                  >
                    Sửa
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-red-600"
                    onClick={() => setCategories(categories.filter(c => c.id !== item.id))}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}