import { MetricCard } from "@/components/metric-card";
import { SalesChart } from "@/components/sales-chart";
import { InvoiceStatusChart } from "@/components/invoice-status-chart";
import { DollarSign, ShoppingCart, Package, Users, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Dashboard() {
  //todo: remove mock functionality
  const metrics = {
    todaySales: { value: "₹45,280", trend: { value: "12.5%", positive: true } },
    monthSales: { value: "₹8,42,150", trend: { value: "8.2%", positive: true } },
    totalCustomers: { value: "384", trend: { value: "3.1%", positive: false } },
    totalItems: { value: "1,432" },
  };

  const salesData = [
    { name: 'Mon', sales: 12500 },
    { name: 'Tue', sales: 15200 },
    { name: 'Wed', sales: 11800 },
    { name: 'Thu', sales: 18400 },
    { name: 'Fri', sales: 21300 },
    { name: 'Sat', sales: 25100 },
    { name: 'Sun', sales: 19800 },
  ];

  const invoiceStatusData = [
    { name: 'Paid', value: 156 },
    { name: 'Pending', value: 48 },
    { name: 'Overdue', value: 28 },
    { name: 'Draft', value: 16 },
  ];

  const lowStockItems = [
    { name: 'Product A', stock: 5, reorderLevel: 10 },
    { name: 'Product B', stock: 3, reorderLevel: 15 },
    { name: 'Product C', stock: 8, reorderLevel: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <Link href="/billing/create-invoice">
          <Button data-testid="button-create-invoice">Create Invoice</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Today's Sales"
          value={metrics.todaySales.value}
          icon={DollarSign}
          trend={metrics.todaySales.trend}
        />
        <MetricCard
          title="Monthly Sales"
          value={metrics.monthSales.value}
          icon={ShoppingCart}
          trend={metrics.monthSales.trend}
        />
        <MetricCard
          title="Total Customers"
          value={metrics.totalCustomers.value}
          icon={Users}
          trend={metrics.totalCustomers.trend}
        />
        <MetricCard
          title="Total Items"
          value={metrics.totalItems.value}
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={salesData} />
        <InvoiceStatusChart data={invoiceStatusData} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Low Stock Alert</CardTitle>
            <Link href="/inventory/items">
              <Button variant="outline" size="sm" data-testid="button-view-all-items">
                View All Items
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-md"
                data-testid={`low-stock-item-${index}`}
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {item.stock} | Reorder Level: {item.reorderLevel}
                    </p>
                  </div>
                </div>
                <Link href="/inventory/stock-in">
                  <Button size="sm" variant="outline" data-testid={`button-restock-${index}`}>
                    Restock
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
