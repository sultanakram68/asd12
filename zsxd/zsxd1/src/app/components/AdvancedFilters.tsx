import { useState } from "react";
import { Search, SlidersHorizontal, Download, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import type { Expense } from "./ExpenseForm";
import type { FixedExpense } from "./FixedExpenses";
import type { Income } from "./IncomeSettings";

interface AdvancedFiltersProps {
  expenses: Expense[];
  fixedExpenses: FixedExpense[];
  income: Income;
  onFilterChange: (filtered: Expense[]) => void;
}

export function AdvancedFilters({ 
  expenses, 
  fixedExpenses, 
  income,
  onFilterChange 
}: AdvancedFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");

  const categories = Array.from(new Set(expenses.map(exp => exp.category)));

  const applyFilters = () => {
    let filtered = [...expenses];

    // البحث
    if (searchTerm) {
      filtered = filtered.filter(exp => 
        exp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // الفئة
    if (selectedCategory !== "all") {
      filtered = filtered.filter(exp => exp.category === selectedCategory);
    }

    // التاريخ من
    if (dateFrom) {
      filtered = filtered.filter(exp => exp.date >= dateFrom);
    }

    // التاريخ إلى
    if (dateTo) {
      filtered = filtered.filter(exp => exp.date <= dateTo);
    }

    // المبلغ من
    if (amountFrom) {
      filtered = filtered.filter(exp => exp.amount >= parseFloat(amountFrom));
    }

    // المبلغ إلى
    if (amountTo) {
      filtered = filtered.filter(exp => exp.amount <= parseFloat(amountTo));
    }

    onFilterChange(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setDateFrom("");
    setDateTo("");
    setAmountFrom("");
    setAmountTo("");
    onFilterChange(expenses);
  };

  const exportToCSV = () => {
    const totalFixed = fixedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalVariable = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    let csv = "نوع البيان,التاريخ,الوصف,الفئة,المبلغ\n";
    
    // إضافة الدخل
    csv += `الدخل الشهري,${new Date().toISOString().split('T')[0]},الدخل,دخل,${income.monthlyIncome}\n`;
    
    // إضافة المصاريف الثابتة
    fixedExpenses.forEach(exp => {
      csv += `مصروف ثابت,${new Date().toISOString().split('T')[0]},${exp.name},ثابت,${exp.amount}\n`;
    });
    
    // إضافة المصاريف المتغيرة
    expenses.forEach(exp => {
      csv += `مصروف متغير,${exp.date},${exp.description},${exp.category},${exp.amount}\n`;
    });
    
    // إضافة الإجمالي
    csv += `\nالإجمالي,,,إجمالي المصاريف,${totalFixed + totalVariable}\n`;
    csv += `الرصيد المتبقي,,,الرصيد,${income.monthlyIncome - (totalFixed + totalVariable)}\n`;

    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full border-primary/20">
      <CardHeader>
        <CardTitle className="text-right">البحث والفلترة المتقدمة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="border-primary/50 hover:bg-primary/10"
            >
              <Download className="ml-2 h-4 w-4" />
              تصدير CSV
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                  <SlidersHorizontal className="ml-2 h-4 w-4" />
                  فلاتر متقدمة
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" dir="rtl" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium text-right">الفلاتر المتقدمة</h4>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-right block">التاريخ من</label>
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-right block">التاريخ إلى</label>
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-right block">المبلغ من</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amountFrom}
                      onChange={(e) => setAmountFrom(e.target.value)}
                      className="text-right"
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-right block">المبلغ إلى</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amountTo}
                      onChange={(e) => setAmountTo(e.target.value)}
                      className="text-right"
                      dir="rtl"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={applyFilters} className="flex-1 bg-primary hover:bg-primary/90">
                      تطبيق
                    </Button>
                    <Button onClick={resetFilters} variant="outline" className="flex-1">
                      إعادة تعيين
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Select value={selectedCategory} onValueChange={(value) => {
              setSelectedCategory(value);
              setTimeout(applyFilters, 0);
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="جميع الفئات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في الوصف..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setTimeout(applyFilters, 300);
                }}
                className="pr-10 text-right"
                dir="rtl"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
