import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { DataTable, Column } from "@/components/data-table";

interface StockTransaction {
  id: string;
  date: string;
  item: string;
  quantity: number;
  reference: string;
  notes: string;
}

export default function StockIn() {
  const [showForm, setShowForm] = useState(false);

  //todo: remove mock functionality
  const transactions: StockTransaction[] = [
    { id: '1', date: '2024-01-15', item: 'Laptop', quantity: 10, reference: 'PO-001', notes: 'Purchase from vendor A' },
    { id: '2', date: '2024-01-18', item: 'Mouse', quantity: 50, reference: 'PO-002', notes: 'Bulk order' },
    { id: '3', date: '2024-01-20', item: 'Keyboard', quantity: 30, reference: 'PO-003', notes: 'Regular stock' },
  ];

  const columns: Column<StockTransaction>[] = [
    { header: 'Date', accessor: 'date', sortable: true },
    { header: 'Item', accessor: 'item', sortable: true },
    { header: 'Quantity', accessor: 'quantity', sortable: true },
    { header: 'Reference', accessor: 'reference' },
    { header: 'Notes', accessor: 'notes' },
  ];

  const handleSubmit = () => {
    console.log('Stock in submitted');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Stock In</h1>
          <p className="text-muted-foreground">Add stock to your inventory</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} data-testid="button-toggle-form">
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? 'Cancel' : 'Add Stock In'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Stock In Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item">Item *</Label>
                <Select>
                  <SelectTrigger id="item" data-testid="select-item">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="mouse">Mouse</SelectItem>
                    <SelectItem value="keyboard">Keyboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  min="1"
                  data-testid="input-quantity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  data-testid="input-date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Reference</Label>
                <Input
                  id="reference"
                  placeholder="PO number or reference"
                  data-testid="input-reference"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes..."
                  rows={3}
                  data-testid="input-notes"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowForm(false)} data-testid="button-cancel">
                Cancel
              </Button>
              <Button onClick={handleSubmit} data-testid="button-submit">
                Add Stock In
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable
        data={transactions}
        columns={columns}
        searchPlaceholder="Search stock in entries..."
      />
    </div>
  );
}
