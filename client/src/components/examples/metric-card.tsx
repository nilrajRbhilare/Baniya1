import { MetricCard } from '../metric-card';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <MetricCard
        title="Today's Sales"
        value="₹45,280"
        icon={DollarSign}
        trend={{ value: "12.5%", positive: true }}
      />
      <MetricCard
        title="Total Invoices"
        value="248"
        icon={ShoppingCart}
        trend={{ value: "8.2%", positive: true }}
      />
      <MetricCard
        title="Total Items"
        value="1,432"
        icon={Package}
      />
      <MetricCard
        title="Total Customers"
        value="384"
        icon={Users}
        trend={{ value: "3.1%", positive: false }}
      />
    </div>
  );
}
