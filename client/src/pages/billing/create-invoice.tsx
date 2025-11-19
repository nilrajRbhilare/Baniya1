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
import { InvoiceLineItems, LineItem } from "@/components/invoice-line-items";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Link } from "wouter";

export default function CreateInvoice() {
  //todo: remove mock functionality
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      itemName: '',
      description: '',
      quantity: 1,
      rate: 0,
      taxRate: 18,
      amount: 0,
    },
  ]);

  const availableItems = [
    { id: '1', name: 'Laptop', sellingPrice: 45000, gstRate: 18 },
    { id: '2', name: 'Mouse', sellingPrice: 500, gstRate: 18 },
    { id: '3', name: 'Keyboard', sellingPrice: 1500, gstRate: 18 },
    { id: '4', name: 'Monitor', sellingPrice: 12000, gstRate: 18 },
  ];

  const customers = [
    { id: '1', name: 'Acme Corp', email: 'contact@acme.com' },
    { id: '2', name: 'Tech Solutions Ltd', email: 'info@techsolutions.com' },
    { id: '3', name: 'Global Industries', email: 'sales@global.com' },
  ];

  const handleSaveDraft = () => {
    console.log('Saving as draft...', { lineItems });
  };

  const handleSaveAndSend = () => {
    console.log('Saving and sending...', { lineItems });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/billing/invoices">
          <Button variant="ghost" size="sm" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">Create Invoice</h1>
          <p className="text-muted-foreground">Generate a new invoice for your customer</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer *</Label>
                <Select>
                  <SelectTrigger id="customer" data-testid="select-customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoice-number">Invoice Number *</Label>
                <Input
                  id="invoice-number"
                  placeholder="INV-001"
                  defaultValue="INV-001"
                  data-testid="input-invoice-number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoice-date">Invoice Date *</Label>
                <Input
                  id="invoice-date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  data-testid="input-invoice-date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  data-testid="input-due-date"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Line Items *</Label>
              <InvoiceLineItems
                items={lineItems}
                onChange={setLineItems}
                availableItems={availableItems}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes or payment terms..."
                rows={3}
                data-testid="input-notes"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-mode">Payment Mode</Label>
                <Select>
                  <SelectTrigger id="payment-mode" data-testid="select-payment-mode">
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  step="0.01"
                  data-testid="input-discount"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button onClick={handleSaveAndSend} data-testid="button-save-send">
              <Send className="w-4 h-4 mr-2" />
              Save & Send
            </Button>
            <Button variant="outline" onClick={handleSaveDraft} data-testid="button-save-draft">
              <Save className="w-4 h-4 mr-2" />
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
