import { EmptyState } from '../empty-state';
import { FileText } from 'lucide-react';

export default function EmptyStateExample() {
  return (
    <div className="p-6 border rounded-md">
      <EmptyState
        icon={FileText}
        title="No invoices found"
        description="Get started by creating your first invoice to track your sales and payments."
        actionLabel="Create Invoice"
        onAction={() => console.log('Create invoice clicked')}
      />
    </div>
  );
}
