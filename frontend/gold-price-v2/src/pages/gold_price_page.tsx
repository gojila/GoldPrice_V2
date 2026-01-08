import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";

export function GoldPricePage() {
  const [prices, setPrices] = useState([
    { id: 1, company: "SJC", type: "Vàng 9999", buy: 78000000, sell: 80000000 }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, company: "", type: "", buy: 0, sell: 0 });

  const handleSave = () => {
    if (formData.id) {
      setPrices(prices.map(p => p.id === formData.id ? formData : p));
    } else {
      setPrices([...prices, { ...formData, id: Date.now() }]);
    }
    setIsOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cập nhật Giá Vàng</h1>
        <Button onClick={() => { setFormData({id:0, company:"", type:"", buy:0, sell:0}); setIsOpen(true); }} className="mb-4">Cập nhật giá mới</Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Cấu hình bảng giá</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Công ty</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Chọn công ty" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sjc">SJC</SelectItem>
                    <SelectItem value="pji">PNJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Loại vàng</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Chọn loại vàng" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9999">Vàng 9999</SelectItem>
                    <SelectItem value="24k">Vàng 24K</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Giá Mua</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Giá Bán</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
              </div>
            </div>
            <DialogFooter><Button className="w-full">Cập nhật giá</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Công ty</TableHead>
              <TableHead>Loại vàng</TableHead>
              <TableHead>Giá Mua (VNĐ)</TableHead>
              <TableHead>Giá Bán (VNĐ)</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-bold text-blue-600">{p.company}</TableCell>
                <TableCell>{p.type}</TableCell>
                <TableCell className="text-green-600 font-medium">{p.buy.toLocaleString()}</TableCell>
                <TableCell className="text-red-600 font-medium">{p.sell.toLocaleString()}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button variant="outline" size="sm">Lịch sử</Button>
                   <Button variant="ghost" size="icon" onClick={() => { setFormData(p); setIsOpen(true); }}><Pencil className="w-4 h-4 text-blue-600" /></Button>
                   <Button variant="ghost" size="icon" onClick={() => setPrices(prices.filter(x => x.id !== p.id))}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}