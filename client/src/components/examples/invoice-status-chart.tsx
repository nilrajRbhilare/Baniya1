import { InvoiceStatusChart } from '../invoice-status-chart';

const sampleData = [
  { name: 'Paid', value: 156 },
  { name: 'Pending', value: 48 },
  { name: 'Overdue', value: 28 },
  { name: 'Draft', value: 16 },
];

export default function InvoiceStatusChartExample() {
  return (
    <div className="p-6">
      <InvoiceStatusChart data={sampleData} />
    </div>
  );
}
