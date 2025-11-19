import { DataTable, Column } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Download, Send } from "lucide-react";
import { Link } from "wouter";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
}

export default function Invoices() {
  //todo: remove mock functionality
  const invoices: Invoice[] = [
    { id: '1', invoiceNumber: 'INV-001', customer: 'Acme Corp', date: '2024-01-15', amount: '₹45,280', status: 'paid' },
    { id: '2', invoiceNumber: 'INV-002', customer: 'Tech Solutions Ltd', date: '2024-01-18', amount: '₹28,500', status: 'pending' },
    { id: '3', invoiceNumber: 'INV-003', customer: 'Global Industries', date: '2024-01-20', amount: '₹67,890', status: 'overdue' },
    { id: '4', invoiceNumber: 'INV-004', customer: 'Smart Retail', date: '2024-01-22', amount: '₹15,600', status: 'draft' },
    { id: '5', invoiceNumber: 'INV-005', customer: 'Digital Services', date: '2024-01-25', amount: '₹92,340', status: 'paid' },
  ];

  const getStatusBadge = (status: Invoice['status']) => {
    const variants = {
      paid: 'default',
      pending: 'secondary',
      overdue: 'destructive',
      draft: 'outline',
    } as const;

    return (
      <Badge variant={variants[status]} data-testid={`badge-${status}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns: Column<Invoice>[] = [
    { header: 'Invoice #', accessor: 'invoiceNumber', sortable: true },
    { header: 'Customer', accessor: 'customer', sortable: true },
    { header: 'Date', accessor: 'date', sortable: true },
    { header: 'Amount', accessor: 'amount', sortable: true },
    {
      header: 'Status',
      accessor: (row) => getStatusBadge(row.status),
    },
    {
      header: 'Actions',
      accessor: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" data-testid={`button-view-${row.id}`}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" data-testid={`button-download-${row.id}`}>
            <Download className="w-4 h-4" />
          </Button>
          {row.status === 'draft' && (
            <Button size="sm" variant="ghost" data-testid={`button-send-${row.id}`}>
              <Send className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Invoices</h1>
          <p className="text-muted-foreground">Manage all your invoices and track payments</p>
        </div>
        <Link href="/billing/create-invoice">
          <Button data-testid="button-create-invoice">
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </Link>
      </div>

      <DataTable
        data={invoices}
        columns={columns}
        searchPlaceholder="Search invoices..."
      />
    </div>
  );
}
