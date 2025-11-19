import { useState } from "react";
import { DataTable, Column } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Item {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  purchasePrice: string;
  sellingPrice: string;
  gstRate: string;
}

export default function Items() {
  const [dialogOpen, setDialogOpen] = useState(false);

  //todo: remove mock functionality
  const items: Item[] = [
    { id: '1', name: 'Laptop', sku: 'LT-001', category: 'Electronics', stock: 15, purchasePrice: '₹40,000', sellingPrice: '₹45,000', gstRate: '18%' },
    { id: '2', name: 'Mouse', sku: 'MS-001', category: 'Electronics', stock: 50, purchasePrice: '₹400', sellingPrice: '₹500', gstRate: '18%' },
    { id: '3', name: 'Keyboard', sku: 'KB-001', category: 'Electronics', stock: 30, purchasePrice: '₹1,200', sellingPrice: '₹1,500', gstRate: '18%' },
    { id: '4', name: 'Monitor', sku: 'MN-001', category: 'Electronics', stock: 5, purchasePrice: '₹10,000', sellingPrice: '₹12,000', gstRate: '18%' },
    { id: '5', name: 'Headphones', sku: 'HP-001', category: 'Electronics', stock: 25, purchasePrice: '₹2,000', sellingPrice: '₹2,500', gstRate: '18%' },
  ];

  const columns: Column<Item>[] = [
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'SKU', accessor: 'sku', sortable: true },
    { header: 'Category', accessor: 'category', sortable: true },
    {
      header: 'Stock',
      accessor: (row) => (
        <Badge variant={row.stock < 10 ? 'destructive' : 'default'} data-testid={`badge-stock-${row.id}`}>
          {row.stock}
        </Badge>
      ),
    },
    { header: 'Purchase Price', accessor: 'purchasePrice' },
    { header: 'Selling Price', accessor: 'sellingPrice' },
    { header: 'GST', accessor: 'gstRate' },
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

  const handleAddItem = () => {
    console.log('Adding new item...');
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Items & Products</h1>
          <p className="text-muted-foreground">Manage your inventory items and stock levels</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-item">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item Name *</Label>
                <Input id="item-name" placeholder="Enter item name" data-testid="input-item-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" placeholder="Enter SKU" data-testid="input-sku" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hsn">HSN Code</Label>
                <Input id="hsn" placeholder="Enter HSN code" data-testid="input-hsn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category" data-testid="select-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="stationery">Stationery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select defaultValue="pcs">
                  <SelectTrigger id="unit" data-testid="select-unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pcs">Pieces</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="ltr">Liters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Opening Stock</Label>
                <Input id="stock" type="number" placeholder="0" data-testid="input-stock" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchase-price">Purchase Price *</Label>
                <Input id="purchase-price" type="number" placeholder="0.00" data-testid="input-purchase-price" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="selling-price">Selling Price *</Label>
                <Input id="selling-price" type="number" placeholder="0.00" data-testid="input-selling-price" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gst">GST Rate (%)</Label>
                <Input id="gst" type="number" placeholder="18" defaultValue="18" data-testid="input-gst" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reorder">Reorder Level</Label>
                <Input id="reorder" type="number" placeholder="10" data-testid="input-reorder" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)} data-testid="button-cancel">
                Cancel
              </Button>
              <Button onClick={handleAddItem} data-testid="button-save">
                Save Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={items}
        columns={columns}
        searchPlaceholder="Search items..."
      />
    </div>
  );
}
