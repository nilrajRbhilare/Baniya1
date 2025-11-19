import { useState } from "react";
import { DataTable, Column } from "@/components/data-table";
import { Button } from "@/components/ui/button";
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

interface Category {
  id: string;
  name: string;
  itemCount: number;
}

export default function Categories() {
  const [dialogOpen, setDialogOpen] = useState(false);

  //todo: remove mock functionality
  const categories: Category[] = [
    { id: '1', name: 'Electronics', itemCount: 125 },
    { id: '2', name: 'Furniture', itemCount: 48 },
    { id: '3', name: 'Stationery', itemCount: 87 },
    { id: '4', name: 'Accessories', itemCount: 63 },
  ];

  const columns: Column<Category>[] = [
    { header: 'Category Name', accessor: 'name', sortable: true },
    { header: 'Items Count', accessor: 'itemCount', sortable: true },
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

  const handleAddCategory = () => {
    console.log('Adding new category...');
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-muted-foreground">Organize your inventory items by categories</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-category">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name *</Label>
                <Input
                  id="category-name"
                  placeholder="Enter category name"
                  data-testid="input-category-name"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)} data-testid="button-cancel">
                Cancel
              </Button>
              <Button onClick={handleAddCategory} data-testid="button-save">
                Save Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        searchPlaceholder="Search categories..."
      />
    </div>
  );
}
