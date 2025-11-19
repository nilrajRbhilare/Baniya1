import { DataTable, Column } from '../data-table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface SampleData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleData: SampleData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
];

const columns: Column<SampleData>[] = [
  { header: 'Name', accessor: 'name', sortable: true },
  { header: 'Email', accessor: 'email', sortable: true },
  { header: 'Role', accessor: 'role', sortable: true },
  { header: 'Status', accessor: 'status' },
  {
    header: 'Actions',
    accessor: (row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" data-testid={`button-edit-${row.id}`}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" data-testid={`button-delete-${row.id}`}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];

export default function DataTableExample() {
  return (
    <div className="p-6">
      <DataTable
        data={sampleData}
        columns={columns}
        searchPlaceholder="Search users..."
        pageSize={5}
      />
    </div>
  );
}
