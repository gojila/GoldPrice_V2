import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function CompanyPage() {
  const [companies, setCompanies] = useState([
    { id: 1, name: "SJC", address: "TP.HCM", taxNo: "01010101", status: "Active" }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", address: "", taxNo: "", phone: "", email: "", description: "" });

  const handleOpen = (company?: any) => {
    if (company) {
      setEditingId(company.id);
      setFormData(company);
    } else {
      setEditingId(null);
      setFormData({ name: "", address: "", taxNo: "", phone: "", email: "", description: "" });
    }
    setIsOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setCompanies(companies.map(c => c.id === editingId ? { ...formData, id: editingId, status: "Active" } : c));
    } else {
      setCompanies([...companies, { ...formData, id: Date.now(), status: "Active" }]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa công ty này?")) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Công ty</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild><Button onClick={() => handleOpen()}>Thêm Công ty</Button></DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Thông tin Công ty</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Tên công ty</Label>
                <Input placeholder="Tên công ty..." />
              </div>
              <div className="space-y-2">
                <Label>Mã số thuế</Label>
                <Input placeholder="MST..." />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" />
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Địa chỉ</Label>
                <Input />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Mô tả/Ghi chú</Label>
                <Textarea />
              </div>
            </div>
            <DialogFooter><Button onClick={() => setIsOpen(false)}>Lưu lại</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>MST</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>{c.taxNo}</TableCell>
                <TableCell>{c.address}</TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpen(c)}><Pencil className="w-4 h-4 text-blue-600" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}