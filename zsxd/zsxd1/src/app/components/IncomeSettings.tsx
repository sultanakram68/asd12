import { useState } from "react";
import { DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface Income {
  monthlyIncome: number;
}

interface IncomeSettingsProps {
  income: Income;
  onUpdateIncome: (income: Income) => void;
}

export function IncomeSettings({ income, onUpdateIncome }: IncomeSettingsProps) {
  const [amount, setAmount] = useState(income.monthlyIncome.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount) {
      return;
    }

    onUpdateIncome({
      monthlyIncome: parseFloat(amount),
    });
  };

  return (
    <Card className="w-full border-primary/20">
      <CardHeader>
        <CardTitle className="text-right flex items-center justify-end gap-2">
          <span>الدخل الشهري</span>
          <DollarSign className="h-5 w-5 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="income" className="text-right block">
              المبلغ الشهري
            </Label>
            <Input
              id="income"
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

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            تحديث الدخل
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
