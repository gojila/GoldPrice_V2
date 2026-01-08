import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from "lucide-react";

export function GoldTypePage() {
  const [types, setTypes] = useState([
    { id: 1, name: "Vàng SJC 9999", description: "Vàng miếng", status: "Active" }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState({ id: 0, name: "", description: "" });

  const handleSave = () => {
    if (current.id) {
      setTypes(types.map(t => t.id === current.id ? { ...t, ...current } : t));
    } else {
      setTypes([...types, { ...current, id: Date.now(), status: "Active" }]);
    }
    setIsOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Loại Vàng</h1>
        <Button onClick={() => { setCurrent({id: 0, name: "", description: ""}); setIsOpen(true); }}>Thêm Loại Vàng</Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Thông tin Loại Vàng</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Tên loại vàng</Label>
              <Input value={current.name} onChange={e => setCurrent({...current, name: e.target.value})} />
            </div>
            <div className="space-y-2"><Label>Mô tả</Label>
              <Textarea value={current.description} onChange={e => setCurrent({...current, description: e.target.value})} />
            </div>
          </div>
          <DialogFooter><Button onClick={handleSave}>Lưu</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên loại vàng</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell>{t.description}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => { setCurrent(t); setIsOpen(true); }}><Pencil className="w-4 h-4 text-blue-600" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => setTypes(types.filter(x => x.id !== t.id))}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}