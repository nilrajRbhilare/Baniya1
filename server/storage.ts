import { 
  type Customer, type InsertCustomer,
  type Vendor, type InsertVendor,
  type Category, type InsertCategory,
  type Item, type InsertItem,
  type Invoice, type InsertInvoice,
  type InvoiceItem, type InsertInvoiceItem,
  type StockTransaction, type InsertStockTransaction,
  type Payment, type InsertPayment,
  type Expense, type InsertExpense,
  customers, vendors, categories, items, invoices, invoiceItems,
  stockTransactions, payments, expenses
} from "../shared/schema";
import { db } from "../db";
import { eq, desc, sql, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  // Customers
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: string, customer: Partial<InsertCustomer>): Promise<Customer | undefined>;
  deleteCustomer(id: string): Promise<boolean>;
  
  // Vendors
  getVendors(): Promise<Vendor[]>;
  getVendor(id: string): Promise<Vendor | undefined>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  updateVendor(id: string, vendor: Partial<InsertVendor>): Promise<Vendor | undefined>;
  deleteVendor(id: string): Promise<boolean>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;
  
  // Items
  getItems(): Promise<Item[]>;
  getItem(id: string): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
  updateItem(id: string, item: Partial<InsertItem>): Promise<Item | undefined>;
  deleteItem(id: string): Promise<boolean>;
  getLowStockItems(): Promise<Item[]>;
  
  // Invoices
  getInvoices(): Promise<Invoice[]>;
  getInvoice(id: string): Promise<Invoice | undefined>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  createInvoiceWithItems(invoice: InsertInvoice, items: InsertInvoiceItem[]): Promise<Invoice>;
  updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice | undefined>;
  deleteInvoice(id: string): Promise<boolean>;
  getNextInvoiceNumber(): Promise<string>;
  
  // Invoice Items
  getInvoiceItems(invoiceId: string): Promise<InvoiceItem[]>;
  createInvoiceItem(item: InsertInvoiceItem): Promise<InvoiceItem>;
  deleteInvoiceItems(invoiceId: string): Promise<boolean>;
  
  // Stock Transactions
  getStockTransactions(itemId?: string): Promise<StockTransaction[]>;
  createStockTransaction(transaction: InsertStockTransaction): Promise<StockTransaction>;
  
  // Payments
  getPayments(invoiceId?: string): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  
  // Expenses
  getExpenses(): Promise<Expense[]>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  
  // Dashboard Stats
  getDashboardStats(): Promise<{
    todaySales: number;
    monthlySales: number;
    totalCustomers: number;
    totalItems: number;
    lowStockCount: number;
    invoiceStatusCounts: { paid: number; pending: number; overdue: number; draft: number };
  }>;
}

export class DbStorage implements IStorage {
  // Customers
  async getCustomers(): Promise<Customer[]> {
    return await db.select().from(customers);
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    const result = await db.select().from(customers).where(eq(customers.id, id));
    return result[0];
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const result = await db.insert(customers).values(customer).returning();
    return result[0];
  }

  async updateCustomer(id: string, customer: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const result = await db.update(customers).set(customer).where(eq(customers.id, id)).returning();
    return result[0];
  }

  async deleteCustomer(id: string): Promise<boolean> {
    const result = await db.delete(customers).where(eq(customers.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Vendors
  async getVendors(): Promise<Vendor[]> {
    return await db.select().from(vendors);
  }

  async getVendor(id: string): Promise<Vendor | undefined> {
    const result = await db.select().from(vendors).where(eq(vendors.id, id));
    return result[0];
  }

  async createVendor(vendor: InsertVendor): Promise<Vendor> {
    const result = await db.insert(vendors).values(vendor).returning();
    return result[0];
  }

  async updateVendor(id: string, vendor: Partial<InsertVendor>): Promise<Vendor | undefined> {
    const result = await db.update(vendors).set(vendor).where(eq(vendors.id, id)).returning();
    return result[0];
  }

  async deleteVendor(id: string): Promise<boolean> {
    const result = await db.delete(vendors).where(eq(vendors.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await db.insert(categories).values(category).returning();
    return result[0];
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const result = await db.update(categories).set(category).where(eq(categories.id, id)).returning();
    return result[0];
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Items
  async getItems(): Promise<Item[]> {
    return await db.select().from(items);
  }

  async getItem(id: string): Promise<Item | undefined> {
    const result = await db.select().from(items).where(eq(items.id, id));
    return result[0];
  }

  async createItem(item: InsertItem): Promise<Item> {
    const result = await db.insert(items).values(item).returning();
    return result[0];
  }

  async updateItem(id: string, item: Partial<InsertItem>): Promise<Item | undefined> {
    const result = await db.update(items).set(item).where(eq(items.id, id)).returning();
    return result[0];
  }

  async deleteItem(id: string): Promise<boolean> {
    const result = await db.delete(items).where(eq(items.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getLowStockItems(): Promise<Item[]> {
    return await db.select().from(items).where(
      sql`${items.stock} <= ${items.reorderLevel}`
    );
  }

  // Invoices
  async getInvoices(): Promise<Invoice[]> {
    return await db.select().from(invoices).orderBy(desc(invoices.date));
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    const result = await db.select().from(invoices).where(eq(invoices.id, id));
    return result[0];
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const result = await db.insert(invoices).values(invoice).returning();
    return result[0];
  }

  async createInvoiceWithItems(
    invoice: InsertInvoice, 
    lineItems: InsertInvoiceItem[]
  ): Promise<Invoice> {
    return await db.transaction(async (tx) => {
      // Insert invoice
      const [createdInvoice] = await tx.insert(invoices).values(invoice).returning();
      
      // Insert invoice items and update stock atomically
      if (lineItems && lineItems.length > 0) {
        const itemsWithInvoiceId = lineItems.map(item => ({
          ...item,
          invoiceId: createdInvoice.id
        }));
        await tx.insert(invoiceItems).values(itemsWithInvoiceId);
        
        // Update stock if not a draft - use shared helper for atomic stock adjustments
        if (invoice.status !== 'draft') {
          for (const lineItem of lineItems) {
            if (lineItem.itemId) {
              await this.performStockAdjustment(tx, {
                itemId: lineItem.itemId,
                type: 'out',
                quantity: lineItem.quantity,
                reference: invoice.invoiceNumber,
                notes: `Stock out for invoice ${invoice.invoiceNumber}`
              });
            }
          }
        }
      }
      
      return createdInvoice;
    });
  }

  async updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice | undefined> {
    const result = await db.update(invoices).set(invoice).where(eq(invoices.id, id)).returning();
    return result[0];
  }

  async deleteInvoice(id: string): Promise<boolean> {
    // Delete invoice items first
    await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, id));
    // Delete invoice
    const result = await db.delete(invoices).where(eq(invoices.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getNextInvoiceNumber(): Promise<string> {
    const result = await db.select({ invoiceNumber: invoices.invoiceNumber })
      .from(invoices)
      .orderBy(desc(invoices.invoiceNumber))
      .limit(1);
    
    if (result.length === 0) {
      return 'INV-001';
    }
    
    const lastNumber = result[0].invoiceNumber;
    const match = lastNumber.match(/INV-(\d+)/);
    if (match) {
      const nextNum = parseInt(match[1]) + 1;
      return `INV-${String(nextNum).padStart(3, '0')}`;
    }
    
    return 'INV-001';
  }

  // Invoice Items
  async getInvoiceItems(invoiceId: string): Promise<InvoiceItem[]> {
    return await db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, invoiceId));
  }

  async createInvoiceItem(item: InsertInvoiceItem): Promise<InvoiceItem> {
    const result = await db.insert(invoiceItems).values(item).returning();
    return result[0];
  }

  async deleteInvoiceItems(invoiceId: string): Promise<boolean> {
    const result = await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, invoiceId));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Stock Transactions
  async getStockTransactions(itemId?: string): Promise<StockTransaction[]> {
    if (itemId) {
      return await db.select().from(stockTransactions)
        .where(eq(stockTransactions.itemId, itemId))
        .orderBy(desc(stockTransactions.date));
    }
    return await db.select().from(stockTransactions).orderBy(desc(stockTransactions.date));
  }

  private async performStockAdjustment(
    tx: any,
    transaction: InsertStockTransaction
  ): Promise<StockTransaction> {
    // Insert stock transaction record
    const [result] = await tx.insert(stockTransactions).values(transaction).returning();
    
    // Update item stock within same transaction
    const [item] = await tx.select().from(items).where(eq(items.id, transaction.itemId));
    if (item) {
      const newStock = transaction.type === 'in' 
        ? item.stock + transaction.quantity 
        : item.stock - transaction.quantity;
      await tx.update(items).set({ stock: newStock }).where(eq(items.id, transaction.itemId));
    }
    
    return result;
  }

  async createStockTransaction(transaction: InsertStockTransaction): Promise<StockTransaction> {
    return await db.transaction(async (tx) => {
      return await this.performStockAdjustment(tx, transaction);
    });
  }

  // Payments
  async getPayments(invoiceId?: string): Promise<Payment[]> {
    if (invoiceId) {
      return await db.select().from(payments)
        .where(eq(payments.invoiceId, invoiceId))
        .orderBy(desc(payments.date));
    }
    return await db.select().from(payments).orderBy(desc(payments.date));
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const result = await db.insert(payments).values(payment).returning();
    return result[0];
  }

  // Expenses
  async getExpenses(): Promise<Expense[]> {
    return await db.select().from(expenses).orderBy(desc(expenses.date));
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    const result = await db.insert(expenses).values(expense).returning();
    return result[0];
  }

  // Dashboard Stats
  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Today's sales
    const todaySalesResult = await db.select({
      total: sql<number>`COALESCE(SUM(CAST(${invoices.total} AS NUMERIC)), 0)`
    })
    .from(invoices)
    .where(
      and(
        gte(invoices.date, today),
        sql`${invoices.date} < ${tomorrow}`,
        eq(invoices.status, 'paid')
      )
    );
    
    // Monthly sales
    const monthlySalesResult = await db.select({
      total: sql<number>`COALESCE(SUM(CAST(${invoices.total} AS NUMERIC)), 0)`
    })
    .from(invoices)
    .where(
      and(
        gte(invoices.date, startOfMonth),
        eq(invoices.status, 'paid')
      )
    );
    
    // Total customers
    const customerCount = await db.select({ count: sql<number>`COUNT(*)` }).from(customers);
    
    // Total items
    const itemCount = await db.select({ count: sql<number>`COUNT(*)` }).from(items);
    
    // Low stock items
    const lowStockResult = await db.select({ count: sql<number>`COUNT(*)` })
      .from(items)
      .where(sql`${items.stock} <= ${items.reorderLevel}`);
    
    // Invoice status counts
    const paidCount = await db.select({ count: sql<number>`COUNT(*)` })
      .from(invoices).where(eq(invoices.status, 'paid'));
    const pendingCount = await db.select({ count: sql<number>`COUNT(*)` })
      .from(invoices).where(eq(invoices.status, 'pending'));
    const overdueCount = await db.select({ count: sql<number>`COUNT(*)` })
      .from(invoices).where(eq(invoices.status, 'overdue'));
    const draftCount = await db.select({ count: sql<number>`COUNT(*)` })
      .from(invoices).where(eq(invoices.status, 'draft'));
    
    return {
      todaySales: Number(todaySalesResult[0]?.total || 0),
      monthlySales: Number(monthlySalesResult[0]?.total || 0),
      totalCustomers: Number(customerCount[0]?.count || 0),
      totalItems: Number(itemCount[0]?.count || 0),
      lowStockCount: Number(lowStockResult[0]?.count || 0),
      invoiceStatusCounts: {
        paid: Number(paidCount[0]?.count || 0),
        pending: Number(pendingCount[0]?.count || 0),
        overdue: Number(overdueCount[0]?.count || 0),
        draft: Number(draftCount[0]?.count || 0),
      }
    };
  }
}

export const storage = new DbStorage();
