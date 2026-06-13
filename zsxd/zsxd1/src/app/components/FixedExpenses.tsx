import { useState } from "react";
import { Receipt, Edit, Check, X, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
}

interface FixedExpensesProps {
  fixedExpenses: FixedExpense[];
  onUpdateFixedExpense: (id: string, amount: number) => void;
  onAddFixedExpense: (name: string, amount: number) => void;
  onDeleteFixedExpense: (id: string) => void;
}

export function FixedExpenses({ 
  fixedExpenses, 
  onUpdateFixedExpense,
  onAddFixedExpense,
  onDeleteFixedExpense
}: FixedExpensesProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (expense: FixedExpense) => {
    setEditingId(expense.id);
    setEditAmount(expense.amount.toString());
  };

  const handleSave = (id: string) => {
    if (editAmount) {
      onUpdateFixedExpense(id, parseFloat(editAmount));
    }
    setEditingId(null);
    setEditAmount("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditAmount("");
  };

  const handleAddNew = () => {
    if (newName && newAmount) {
      onAddFixedExpense(newName, parseFloat(newAmount));
      setNewName("");
      setNewAmount("");
      setDialogOpen(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const totalFixed = fixedExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Card className="w-full border-primary/20">
      <CardHeader>
        <CardTitle className="text-right flex items-center justify-between">
          <span className="text-primary">{formatCurrency(totalFixed)} ريال</span>
          <div className="flex items-center gap-2">
            <span>المصاريف الثابتة</span>
            <Receipt className="h-5 w-5 text-primary" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {fixedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
            >
              {editingId === expense.id ? (
                <>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSave(expense.id)}
                      className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCancel}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    type="number"
                    step="0.01"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-32 text-right h-8"
                    dir="rtl"
                    autoFocus
                  />
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteFixedExpense(expense.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(expense)}
                      className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">
                      {formatCurrency(expense.amount)}
                      <span className="text-sm text-muted-foreground mr-1">ريال</span>
                    </span>
                    <span className="text-right">{expense.name}</span>
                  </div>
                </>
              )}
            </div>
          ))}
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full border-dashed border-primary/50 hover:border-primary hover:bg-primary/5">
                <Plus className="ml-2 h-4 w-4" />
                إضافة مصروف ثابت جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-right">إضافة مصروف ثابت</DialogTitle>
                <DialogDescription className="text-right">
                  أضف مصروف شهري ثابت جديد (مثل: اشتراكات، أقساط، إلخ)
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="fixed-name" className="text-right block">
                    اسم المصروف
                  </Label>
                  <Input
                    id="fixed-name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="مثال: اشتراك نتفليكس"
                    className="text-right"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fixed-amount" className="text-right block">
                    المبلغ الشهري
                  </Label>
                  <Input
                    id="fixed-amount"
                    type="number"
                    step="0.01"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-right"
                    dir="rtl"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90">
                  إضافة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}