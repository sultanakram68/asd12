import { TrendingUp, Wallet, Calendar, PieChart, TrendingDown, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { Expense } from "./ExpenseForm";
import type { FixedExpense } from "./FixedExpenses";
import type { Income } from "./IncomeSettings";

interface ExpenseStatsProps {
  expenses: Expense[];
  fixedExpenses: FixedExpense[];
  income: Income;
}

export function ExpenseStats({ expenses, fixedExpenses, income }: ExpenseStatsProps) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalFixed = fixedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalAllExpenses = totalExpenses + totalFixed;

  const today = new Date().toISOString().split("T")[0];
  const todayExpenses = expenses
    .filter((exp) => exp.date === today)
    .reduce((sum, exp) => sum + exp.amount, 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = expenses
    .filter((exp) => {
      const expDate = new Date(exp.date);
      return (
        expDate.getMonth() === currentMonth &&
        expDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  const monthlyTotal = monthlyExpenses + totalFixed;
  const remainingBalance = income.monthlyIncome - monthlyTotal;

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a
  )[0];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const stats = [
    {
      title: "الدخل الشهري",
      value: formatCurrency(income.monthlyIncome),
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "الرصيد المتبقي",
      value: formatCurrency(remainingBalance),
      icon: Wallet,
      color: remainingBalance >= 0 ? "text-primary" : "text-destructive",
      bgColor: remainingBalance >= 0 ? "bg-primary/10" : "bg-destructive/10",
    },
    {
      title: "مصروفات الشهر",
      value: formatCurrency(monthlyTotal),
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      subtitle: `ثابت: ${formatCurrency(totalFixed)} + متغير: ${formatCurrency(monthlyExpenses)}`,
    },
    {
      title: "مصروفات اليوم",
      value: formatCurrency(todayExpenses),
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "إجمالي المصروفات",
      value: formatCurrency(totalAllExpenses),
      icon: TrendingDown,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "أكثر فئة",
      value: topCategory ? topCategory[0] : "لا يوجد",
      icon: PieChart,
      color: "text-primary",
      bgColor: "bg-primary/10",
      subtitle: topCategory ? formatCurrency(topCategory[1]) : undefined,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-right">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold text-right ${stat.color}`}>
                {stat.value}
                {stat.title !== "أكثر فئة" && (
                  <span className="text-sm text-muted-foreground mr-1">ريال</span>
                )}
              </div>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground text-right mt-1">
                  {stat.subtitle}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}