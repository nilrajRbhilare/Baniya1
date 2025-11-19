import { SalesChart } from '../sales-chart';

const sampleData = [
  { name: 'Jan', sales: 45000 },
  { name: 'Feb', sales: 52000 },
  { name: 'Mar', sales: 48000 },
  { name: 'Apr', sales: 61000 },
  { name: 'May', sales: 55000 },
  { name: 'Jun', sales: 67000 },
  { name: 'Jul', sales: 72000 },
];

export default function SalesChartExample() {
  return (
    <div className="p-6">
      <SalesChart data={sampleData} />
    </div>
  );
}
