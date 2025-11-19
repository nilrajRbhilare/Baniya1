import { DataTable, Column } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface LedgerEntry {
  id: string;
  date: string;
  voucherNo: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;
  type: 'debit' | 'credit';
}

export default function Ledger() {
  //todo: remove mock functionality
  const ledgerEntries: LedgerEntry[] = [
    { id: '1', date: '2024-01-15', voucherNo: 'JV-001', description: 'Sales Invoice INV-001', debit: '₹45,280', credit: '—', balance: '₹45,280', type: 'debit' },
    { id: '2', date: '2024-01-16', voucherNo: 'JV-002', description: 'Purchase Payment', debit: '—', credit: '₹12,500', balance: '₹32,780', type: 'credit' },
    { id: '3', date: '2024-01-18', voucherNo: 'JV-003', description: 'Sales Invoice INV-002', debit: '₹28,500', credit: '—', balance: '₹61,280', type: 'debit' },
    { id: '4', date: '2024-01-20', voucherNo: 'JV-004', description: 'Salary Payment', debit: '—', credit: '₹35,000', balance: '₹26,280', type: 'credit' },
    { id: '5', date: '2024-01-22', voucherNo: 'JV-005', description: 'Sales Invoice INV-004', debit: '₹15,600', credit: '—', balance: '₹41,880', type: 'debit' },
  ];

  const totalDebit = '₹89,380';
  const totalCredit = '₹47,500';
  const netBalance = '₹41,880';

  const columns: Column<LedgerEntry>[] = [
    { header: 'Date', accessor: 'date', sortable: true },
    { header: 'Voucher No', accessor: 'voucherNo', sortable: true },
    { header: 'Description', accessor: 'description' },
    {
      header: 'Debit',
      accessor: (row) => (
        <span className={row.type === 'debit' ? 'font-medium text-green-600' : 'text-muted-foreground'}>
          {row.debit}
        </span>
      ),
    },
    {
      header: 'Credit',
      accessor: (row) => (
        <span className={row.type === 'credit' ? 'font-medium text-red-600' : 'text-muted-foreground'}>
          {row.credit}
        </span>
      ),
    },
    {
      header: 'Balance',
      accessor: 'balance',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Ledger Accounts</h1>
        <p className="text-muted-foreground">View detailed account transactions and balances</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-md">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Debit</p>
                <p className="text-2xl font-bold" data-testid="text-total-debit">{totalDebit}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-md">
                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Credit</p>
                <p className="text-2xl font-bold" data-testid="text-total-credit">{totalCredit}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-muted-foreground">Net Balance</p>
              <p className="text-2xl font-bold mt-1" data-testid="text-net-balance">{netBalance}</p>
              <Badge variant="default" className="mt-2">
                Debit Balance
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={ledgerEntries}
        columns={columns}
        searchPlaceholder="Search ledger entries..."
      />
    </div>
  );
}
