import { Trash2, Calendar, Tag } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { Expense } from "./ExpenseForm";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (expenses.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="py-12">
          <p className="text-center text-muted-foreground">
            لا توجد مصروفات بعد. ابدأ بإضافة مصروف جديد!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-right">قائمة المصروفات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteExpense(expense.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="flex-1 mr-4 text-right">
                <h4 className="font-medium">{expense.description}</h4>
                <div className="flex items-center justify-end gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(expense.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {expense.category}
                  </span>
                </div>
              </div>

              <div className="text-left font-bold text-lg">
                {formatCurrency(expense.amount)}
                <span className="text-sm text-muted-foreground mr-1">ريال</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
