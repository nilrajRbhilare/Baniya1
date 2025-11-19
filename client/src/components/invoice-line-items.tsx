import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface LineItem {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  rate: number;
  taxRate: number;
  amount: number;
}

interface InvoiceLineItemsProps {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
  availableItems?: { id: string; name: string; sellingPrice: number; gstRate: number }[];
}

export function InvoiceLineItems({ items, onChange, availableItems = [] }: InvoiceLineItemsProps) {
  const calculateAmount = (quantity: number, rate: number, taxRate: number) => {
    const subtotal = quantity * rate;
    const tax = (subtotal * taxRate) / 100;
    return subtotal + tax;
  };

  const addRow = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      itemName: "",
      description: "",
      quantity: 1,
      rate: 0,
      taxRate: 18,
      amount: 0,
    };
    onChange([...items, newItem]);
  };

  const removeRow = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const updateRow = (id: string, field: keyof LineItem, value: string | number) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate' || field === 'taxRate') {
          updatedItem.amount = calculateAmount(
            updatedItem.quantity,
            updatedItem.rate,
            updatedItem.taxRate
          );
        }
        return updatedItem;
      }
      return item;
    });
    onChange(updated);
  };

  const selectItem = (rowId: string, itemId: string) => {
    const selectedItem = availableItems.find((i) => i.id === itemId);
    if (selectedItem) {
      updateRow(rowId, 'itemName', selectedItem.name);
      updateRow(rowId, 'rate', Number(selectedItem.sellingPrice));
      updateRow(rowId, 'taxRate', Number(selectedItem.gstRate));
    }
  };

  const subtotal = items.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.rate;
    return sum + itemSubtotal;
  }, 0);

  const totalTax = items.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.rate;
    const tax = (itemSubtotal * item.taxRate) / 100;
    return sum + tax;
  }, 0);

  const total = subtotal + totalTax;

  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Item</TableHead>
              <TableHead className="w-[250px]">Description</TableHead>
              <TableHead className="w-[100px]">Qty</TableHead>
              <TableHead className="w-[120px]">Rate</TableHead>
              <TableHead className="w-[100px]">Tax %</TableHead>
              <TableHead className="w-[120px]">Amount</TableHead>
              <TableHead className="w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  {availableItems.length > 0 ? (
                    <Select
                      value={item.itemName}
                      onValueChange={(value) => selectItem(item.id, value)}
                    >
                      <SelectTrigger data-testid={`select-item-${index}`}>
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableItems.map((availItem) => (
                          <SelectItem key={availItem.id} value={availItem.id}>
                            {availItem.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={item.itemName}
                      onChange={(e) => updateRow(item.id, 'itemName', e.target.value)}
                      placeholder="Item name"
                      data-testid={`input-item-name-${index}`}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Input
                    value={item.description}
                    onChange={(e) => updateRow(item.id, 'description', e.target.value)}
                    placeholder="Description"
                    data-testid={`input-description-${index}`}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateRow(item.id, 'quantity', Number(e.target.value))}
                    min="1"
                    data-testid={`input-quantity-${index}`}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateRow(item.id, 'rate', Number(e.target.value))}
                    min="0"
                    step="0.01"
                    data-testid={`input-rate-${index}`}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.taxRate}
                    onChange={(e) => updateRow(item.id, 'taxRate', Number(e.target.value))}
                    min="0"
                    max="100"
                    step="0.01"
                    data-testid={`input-tax-${index}`}
                  />
                </TableCell>
                <TableCell>
                  <span className="font-medium" data-testid={`text-amount-${index}`}>
                    ₹{item.amount.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRow(item.id)}
                    data-testid={`button-remove-${index}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button onClick={addRow} variant="outline" size="sm" data-testid="button-add-row">
        <Plus className="w-4 h-4 mr-2" />
        Add Row
      </Button>

      <div className="flex justify-end">
        <div className="w-full max-w-sm space-y-2 bg-muted/30 p-4 rounded-md">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium" data-testid="text-subtotal">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax:</span>
            <span className="font-medium" data-testid="text-tax">₹{totalTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold pt-2 border-t">
            <span>Total:</span>
            <span data-testid="text-total">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
