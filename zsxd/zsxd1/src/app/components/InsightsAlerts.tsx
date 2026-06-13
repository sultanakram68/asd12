import { Bell, AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import type { Expense } from "./ExpenseForm";
import type { FixedExpense } from "./FixedExpenses";
import type { Income } from "./IncomeSettings";

interface InsightsAlertsProps {
  expenses: Expense[];
  fixedExpenses: FixedExpense[];
  income: Income;
}

export function InsightsAlerts({ expenses, fixedExpenses, income }: InsightsAlertsProps) {
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

  const totalFixed = fixedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalMonthly = monthlyExpenses + totalFixed;
  const remaining = income.monthlyIncome - totalMonthly;
  const spendingPercentage = income.monthlyIncome > 0 
    ? (totalMonthly / income.monthlyIncome) * 100 
    : 0;

  // حساب متوسط المصروفات اليومية
  const daysInMonth = new Date().getDate();
  const dailyAverage = totalMonthly / daysInMonth;
  const daysRemaining = new Date(currentYear, currentMonth + 1, 0).getDate() - daysInMonth;
  const projectedTotal = totalMonthly + (dailyAverage * daysRemaining);

  // أكثر فئة مصروف
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a
  )[0];

  const alerts = [];

  // تحذير إذا تجاوز 80% من الدخل
  if (spendingPercentage > 80) {
    alerts.push({
      type: "destructive" as const,
      icon: AlertTriangle,
      title: "تحذير: مصروفات عالية",
      description: `لقد استخدمت ${spendingPercentage.toFixed(0)}% من دخلك الشهري. حاول تقليل المصروفات.`,
    });
  }

  // تنبيه إذا كان المتوقع سيتجاوز الدخل
  if (projectedTotal > income.monthlyIncome && income.monthlyIncome > 0) {
    alerts.push({
      type: "warning" as const,
      icon: TrendingUp,
      title: "توقع: قد تتجاوز ميزانيتك",
      description: `بناءً على معدل إنفاقك، المتوقع أن تصرف ${projectedTotal.toFixed(0)} ريال هذا الشهر.`,
    });
  }

  // رسالة إيجابية إذا كان الإنفاق جيد
  if (spendingPercentage < 60 && spendingPercentage > 0) {
    alerts.push({
      type: "success" as const,
      icon: CheckCircle2,
      title: "أحسنت! إدارة ممتازة",
      description: `أنت تدير ميزانيتك بشكل جيد. استخدمت ${spendingPercentage.toFixed(0)}% فقط من دخلك.`,
    });
  }

  // نصيحة عن الفئة الأكثر إنفاقاً
  if (topCategory && topCategory[1] > income.monthlyIncome * 0.3) {
    alerts.push({
      type: "info" as const,
      icon: Bell,
      title: "ملاحظة: تركيز الإنفاق",
      description: `أكثر من 30% من مصروفاتك في فئة "${topCategory[0]}". قد ترغب في مراجعتها.`,
    });
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="w-full border-primary/20">
      <CardHeader>
        <CardTitle className="text-right flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          التنبيهات والرؤى الذكية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            لا توجد تنبيهات حالياً. استمر في التتبع!
          </p>
        ) : (
          alerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <Alert 
                key={index} 
                className={`
                  ${alert.type === "destructive" ? "border-destructive/50 bg-destructive/10" : ""}
                  ${alert.type === "warning" ? "border-orange-500/50 bg-orange-500/10" : ""}
                  ${alert.type === "success" ? "border-green-500/50 bg-green-500/10" : ""}
                  ${alert.type === "info" ? "border-primary/50 bg-primary/10" : ""}
                `}
              >
                <Icon className={`h-4 w-4 ${
                  alert.type === "destructive" ? "text-destructive" :
                  alert.type === "warning" ? "text-orange-500" :
                  alert.type === "success" ? "text-green-500" :
                  "text-primary"
                }`} />
                <AlertTitle className="text-right">{alert.title}</AlertTitle>
                <AlertDescription className="text-right">
                  {alert.description}
                </AlertDescription>
              </Alert>
            );
          })
        )}

        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
          <h4 className="font-medium text-right mb-3">إحصائيات سريعة</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-primary font-bold">{formatCurrency(dailyAverage)} ريال</span>
              <span className="text-muted-foreground">متوسط الإنفاق اليومي</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary font-bold">{daysRemaining} يوم</span>
              <span className="text-muted-foreground">متبقي من الشهر</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary font-bold">{formatCurrency(remaining)} ريال</span>
              <span className="text-muted-foreground">الرصيد المتاح</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
