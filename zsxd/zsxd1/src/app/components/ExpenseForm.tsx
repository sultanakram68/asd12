import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, "id">) => void;
}

const CATEGORIES = [
  "طعام وشراب",
  "مواصلات",
  "تسوق",
  "فواتير",
  "ترفيه",
  "صحة",
  "تعليم",
  "أخرى",
];

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category) {
      return;
    }

    onAddExpense({
      amount: parseFloat(amount),
      description,
      category,
      date,
    });

    // إعادة تعيين النموذج
    setAmount("");
    setDescription("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-right">إضافة مصروف جديد</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-right block">
              المبلغ
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-right"
              dir="rtl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-right block">
              الوصف
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="مثال: غداء في المطعم"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-right"
              dir="rtl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-right block">
              الفئة
            </Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="text-right" dir="rtl">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-right">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-right block">
              التاريخ
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-right"
              dir="rtl"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="ml-2 h-4 w-4" />
            إضافة المصروف
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
