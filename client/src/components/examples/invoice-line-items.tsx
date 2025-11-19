import { useState } from 'react';
import { InvoiceLineItems, LineItem } from '../invoice-line-items';

export default function InvoiceLineItemsExample() {
  const [items, setItems] = useState<LineItem[]>([
    {
      id: '1',
      itemName: 'Product A',
      description: 'High quality product',
      quantity: 2,
      rate: 1000,
      taxRate: 18,
      amount: 2360,
    },
    {
      id: '2',
      itemName: 'Product B',
      description: 'Premium service',
      quantity: 1,
      rate: 2500,
      taxRate: 18,
      amount: 2950,
    },
  ]);

  const availableItems = [
    { id: '1', name: 'Product A', sellingPrice: 1000, gstRate: 18 },
    { id: '2', name: 'Product B', sellingPrice: 2500, gstRate: 18 },
    { id: '3', name: 'Product C', sellingPrice: 500, gstRate: 12 },
  ];

  return (
    <div className="p-6">
      <InvoiceLineItems
        items={items}
        onChange={setItems}
        availableItems={availableItems}
      />
    </div>
  );
}
