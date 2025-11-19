import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText, TrendingUp, Package, Users, DollarSign } from "lucide-react";
import { DataTable, Column } from "@/components/data-table";

interface ReportData {
  id: string;
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export default function Reports() {
  //todo: remove mock functionality
  const reportData: ReportData[] = [
    { id: '1', name: 'Total Sales', value: '₹8,42,150', change: '+12.5%', trend: 'up' },
    { id: '2', name: 'Total Purchases', value: '₹3,45,200', change: '+8.2%', trend: 'up' },
    { id: '3', name: 'Net Profit', value: '₹4,96,950', change: '+15.3%', trend: 'up' },
    { id: '4', name: 'Total Expenses', value: '₹1,52,800', change: '-3.1%', trend: 'down' },
  ];

  const columns: Column<ReportData>[] = [
    { header: 'Metric', accessor: 'name', sortable: true },
    { header: 'Value', accessor: 'value', sortable: true },
    {
      header: 'Change',
      accessor: (row) => (
        <span className={row.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
          {row.change}
        </span>
      ),
    },
  ];

  const reportTypes = [
    { icon: FileText, title: 'Sales Report', description: 'Detailed sales analysis' },
    { icon: TrendingUp, title: 'Purchase Report', description: 'Purchase tracking and analysis' },
    { icon: Package, title: 'Stock Report', description: 'Inventory levels and movements' },
    { icon: Users, title: 'Customer Report', description: 'Customer-wise sales summary' },
    { icon: DollarSign, title: 'GST Report', description: 'Tax collection and filing' },
    { icon: TrendingUp, title: 'Profit & Loss', description: 'Financial performance report' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-muted-foreground">Generate and export business reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select>
                <SelectTrigger id="report-type" data-testid="select-report-type">
                  <SelectValue placeholder="Select report" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Report</SelectItem>
                  <SelectItem value="purchase">Purchase Report</SelectItem>
                  <SelectItem value="stock">Stock Report</SelectItem>
                  <SelectItem value="gst">GST Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-date">From Date</Label>
              <Input
                id="from-date"
                type="date"
                data-testid="input-from-date"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-date">To Date</Label>
              <Input
                id="to-date"
                type="date"
                data-testid="input-to-date"
              />
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <div className="flex gap-2">
                <Button className="flex-1" data-testid="button-generate">
                  Generate
                </Button>
                <Button variant="outline" data-testid="button-export">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report, index) => (
          <Card
            key={index}
            className="cursor-pointer hover-elevate active-elevate-2"
            data-testid={`report-card-${index}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-md">
                  <report.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={reportData}
            columns={columns}
            searchable={false}
            emptyMessage="Generate a report to view data"
          />
        </CardContent>
      </Card>
    </div>
  );
}
