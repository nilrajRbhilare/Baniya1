import { db } from './index';
import { customers, vendors, categories, items, invoices, invoiceItems } from '../shared/schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await db.delete(invoiceItems);
  await db.delete(invoices);
  await db.delete(items);
  await db.delete(categories);
  await db.delete(vendors);
  await db.delete(customers);

  // Seed categories
  const categoryData = [
    { name: 'Electronics' },
    { name: 'Furniture' },
    { name: 'Stationery' },
    { name: 'Accessories' },
  ];

  const createdCategories = await db.insert(categories).values(categoryData).returning();
  console.log(`✓ Created ${createdCategories.length} categories`);

  // Seed customers
  const customerData = [
    {
      name: 'Acme Corp',
      email: 'contact@acmecorp.com',
      phone: '+91 9876543210',
      address: '123 Business Park, Mumbai, MH 400001',
      gstin: '27AABCU9603R1ZM',
    },
    {
      name: 'Tech Solutions Ltd',
      email: 'info@techsolutions.com',
      phone: '+91 9876543211',
      address: '456 Tech Tower, Bangalore, KA 560001',
      gstin: '29AABCT1332L1Z5',
    },
    {
      name: 'Global Industries',
      email: 'sales@globalind.com',
      phone: '+91 9876543212',
      address: '789 Industrial Area, Delhi, DL 110001',
      gstin: '07AABCG5690H1Z0',
    },
    {
      name: 'Smart Retail',
      email: 'contact@smartretail.com',
      phone: '+91 9876543213',
      address: '321 Mall Road, Pune, MH 411001',
      gstin: '27AABCS9614R1ZT',
    },
  ];

  const createdCustomers = await db.insert(customers).values(customerData).returning();
  console.log(`✓ Created ${createdCustomers.length} customers`);

  // Seed vendors
  const vendorData = [
    {
      name: 'Wholesale Electronics',
      email: 'sales@wholesaleelectronics.com',
      phone: '+91 9876543220',
      address: '111 Supplier Street, Mumbai, MH 400001',
      gstin: '27AABCW9603R1ZM',
    },
    {
      name: 'Office Supplies Co',
      email: 'info@officesupplies.com',
      phone: '+91 9876543221',
      address: '222 Supply Lane, Bangalore, KA 560001',
      gstin: '29AABCO1332L1Z5',
    },
  ];

  const createdVendors = await db.insert(vendors).values(vendorData).returning();
  console.log(`✓ Created ${createdVendors.length} vendors`);

  // Seed items
  const itemData = [
    {
      name: 'Laptop',
      sku: 'LT-001',
      hsn: '8471',
      categoryId: createdCategories[0].id,
      unit: 'pcs',
      purchasePrice: '40000',
      sellingPrice: '45000',
      gstRate: '18',
      stock: 15,
      reorderLevel: 5,
    },
    {
      name: 'Wireless Mouse',
      sku: 'MS-001',
      hsn: '8471',
      categoryId: createdCategories[0].id,
      unit: 'pcs',
      purchasePrice: '400',
      sellingPrice: '500',
      gstRate: '18',
      stock: 50,
      reorderLevel: 10,
    },
    {
      name: 'Mechanical Keyboard',
      sku: 'KB-001',
      hsn: '8471',
      categoryId: createdCategories[0].id,
      unit: 'pcs',
      purchasePrice: '1200',
      sellingPrice: '1500',
      gstRate: '18',
      stock: 30,
      reorderLevel: 10,
    },
    {
      name: 'LED Monitor 24"',
      sku: 'MN-001',
      hsn: '8528',
      categoryId: createdCategories[0].id,
      unit: 'pcs',
      purchasePrice: '10000',
      sellingPrice: '12000',
      gstRate: '18',
      stock: 5,
      reorderLevel: 8,
    },
    {
      name: 'Wireless Headphones',
      sku: 'HP-001',
      hsn: '8518',
      categoryId: createdCategories[3].id,
      unit: 'pcs',
      purchasePrice: '2000',
      sellingPrice: '2500',
      gstRate: '18',
      stock: 25,
      reorderLevel: 10,
    },
    {
      name: 'USB-C Hub',
      sku: 'HB-001',
      hsn: '8471',
      categoryId: createdCategories[3].id,
      unit: 'pcs',
      purchasePrice: '1500',
      sellingPrice: '1800',
      gstRate: '18',
      stock: 40,
      reorderLevel: 15,
    },
    {
      name: 'Office Chair',
      sku: 'CH-001',
      hsn: '9401',
      categoryId: createdCategories[1].id,
      unit: 'pcs',
      purchasePrice: '5000',
      sellingPrice: '6500',
      gstRate: '18',
      stock: 8,
      reorderLevel: 5,
    },
    {
      name: 'Desk Lamp',
      sku: 'LM-001',
      hsn: '9405',
      categoryId: createdCategories[1].id,
      unit: 'pcs',
      purchasePrice: '800',
      sellingPrice: '1000',
      gstRate: '18',
      stock: 20,
      reorderLevel: 10,
    },
  ];

  const createdItems = await db.insert(items).values(itemData).returning();
  console.log(`✓ Created ${createdItems.length} items`);

  // Seed invoices
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(now);
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  // Invoice 1: 1 Laptop @ 45000 = 45000 subtotal + 8100 tax = 53100 total
  const invoice1Subtotal = 45000;
  const invoice1Tax = invoice1Subtotal * 0.18;
  const invoice1Total = invoice1Subtotal + invoice1Tax;

  // Invoice 2: 10 Headphones @ 2500 = 25000 subtotal + 4500 tax = 29500 total
  const invoice2Subtotal = 25000;
  const invoice2Tax = invoice2Subtotal * 0.18;
  const invoice2Total = invoice2Subtotal + invoice2Tax;

  // Invoice 3: 5 Monitors @ 12000 = 60000 subtotal + 10800 tax = 70800 total
  const invoice3Subtotal = 60000;
  const invoice3Tax = invoice3Subtotal * 0.18;
  const invoice3Total = invoice3Subtotal + invoice3Tax;

  // Invoice 4: 20 Mice @ 500 + 3 Keyboards @ 1500 = 14500 subtotal + 2610 tax = 17110 total
  const invoice4Subtotal = (20 * 500) + (3 * 1500);
  const invoice4Tax = invoice4Subtotal * 0.18;
  const invoice4Total = invoice4Subtotal + invoice4Tax;

  const invoiceData = [
    {
      invoiceNumber: 'INV-001',
      customerId: createdCustomers[0].id,
      date: monthAgo,
      subtotal: invoice1Subtotal.toFixed(2),
      discount: '0',
      tax: invoice1Tax.toFixed(2),
      total: invoice1Total.toFixed(2),
      status: 'paid',
      paymentMode: 'bank-transfer',
    },
    {
      invoiceNumber: 'INV-002',
      customerId: createdCustomers[1].id,
      date: weekAgo,
      subtotal: invoice2Subtotal.toFixed(2),
      discount: '0',
      tax: invoice2Tax.toFixed(2),
      total: invoice2Total.toFixed(2),
      status: 'paid',
      paymentMode: 'upi',
    },
    {
      invoiceNumber: 'INV-003',
      customerId: createdCustomers[2].id,
      date: yesterday,
      subtotal: invoice3Subtotal.toFixed(2),
      discount: '0',
      tax: invoice3Tax.toFixed(2),
      total: invoice3Total.toFixed(2),
      status: 'pending',
      paymentMode: 'cash',
    },
    {
      invoiceNumber: 'INV-004',
      customerId: createdCustomers[3].id,
      date: now,
      subtotal: invoice4Subtotal.toFixed(2),
      discount: '0',
      tax: invoice4Tax.toFixed(2),
      total: invoice4Total.toFixed(2),
      status: 'draft',
    },
  ];

  const createdInvoices = await db.insert(invoices).values(invoiceData).returning();
  console.log(`✓ Created ${createdInvoices.length} invoices`);

  // Seed invoice items
  const invoiceItemData = [
    // Invoice 1 items: 1 Laptop @ 45000 with 18% tax
    {
      invoiceId: createdInvoices[0].id,
      itemId: createdItems[0].id,
      description: 'Laptop - High Performance',
      quantity: 1,
      rate: '45000',
      taxRate: '18',
      amount: '53100',
    },
    // Invoice 2 items: 10 Headphones @ 2500 with 18% tax
    {
      invoiceId: createdInvoices[1].id,
      itemId: createdItems[4].id,
      description: 'Wireless Headphones',
      quantity: 10,
      rate: '2500',
      taxRate: '18',
      amount: '29500',
    },
    // Invoice 3 items: 5 Monitors @ 12000 with 18% tax
    {
      invoiceId: createdInvoices[2].id,
      itemId: createdItems[3].id,
      description: 'LED Monitor 24"',
      quantity: 5,
      rate: '12000',
      taxRate: '18',
      amount: '70800',
    },
    // Invoice 4 items (draft): 20 Mice @ 500 with 18% tax
    {
      invoiceId: createdInvoices[3].id,
      itemId: createdItems[1].id,
      description: 'Wireless Mouse',
      quantity: 20,
      rate: '500',
      taxRate: '18',
      amount: '11800',
    },
    // Invoice 4 items (draft): 3 Keyboards @ 1500 with 18% tax
    {
      invoiceId: createdInvoices[3].id,
      itemId: createdItems[2].id,
      description: 'Mechanical Keyboard',
      quantity: 3,
      rate: '1500',
      taxRate: '18',
      amount: '5310',
    },
  ];

  const createdInvoiceItems = await db.insert(invoiceItems).values(invoiceItemData).returning();
  console.log(`✓ Created ${createdInvoiceItems.length} invoice items`);

  console.log('✅ Seeding complete!');
}

seed()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
