import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import type { Expense } from "./ExpenseForm";

interface ExpenseChartsProps {
  expenses: Expense[];
}

const COLORS = ["#ff6b00", "#ff8c00", "#ffa500", "#ffb347", "#ffc266", "#ffd699", "#ffe5cc"];

export function ExpenseCharts({ expenses }: ExpenseChartsProps) {
  // بيانات المصروفات حسب الفئة
  const categoryData = expenses.reduce((acc, exp) => {
    const existing = acc.find(item => item.name === exp.category);
    if (existing) {
      existing.value += exp.amount;
    } else {
      acc.push({ name: exp.category, value: exp.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // بيانات المصروفات حسب التاريخ (آخر 7 أيام)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const dailyData = last7Days.map(date => {
    const dayExpenses = expenses
      .filter(exp => exp.date === date)
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    const dateObj = new Date(date);
    const dayName = dateObj.toLocaleDateString('ar-SA', { weekday: 'short' });
    
    return {
      date: dayName,
      amount: dayExpenses,
    };
  });

  // بيانات المصروفات الشهرية (آخر 6 أشهر)
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    return {
      month: date.getMonth(),
      year: date.getFullYear(),
      name: date.toLocaleDateString('ar-SA', { month: 'short' })
    };
  });

  const monthlyData = last6Months.map(({ month, year, name }) => {
    const monthExpenses = expenses
      .filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === month && expDate.getFullYear() === year;
      })
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      month: name,
      amount: monthExpenses,
    };
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (expenses.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="py-12">
          <p className="text-center text-muted-foreground">
            لا توجد بيانات كافية لعرض الرسوم البيانية
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-right">التوزيع حسب الفئة</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `${formatCurrency(value)} ريال`}
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-right">المصروفات اليومية (آخر 7 أيام)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="date" stroke="#a1a1a1" />
              <YAxis stroke="#a1a1a1" />
              <Tooltip 
                formatter={(value: number) => `${formatCurrency(value)} ريال`}
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px' }}
              />
              <Bar dataKey="amount" fill="#ff6b00" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-primary/20 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-right">التطور الشهري (آخر 6 أشهر)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="month" stroke="#a1a1a1" />
              <YAxis stroke="#a1a1a1" />
              <Tooltip 
                formatter={(value: number) => `${formatCurrency(value)} ريال`}
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#ff6b00" 
                strokeWidth={3}
                dot={{ fill: '#ff6b00', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
