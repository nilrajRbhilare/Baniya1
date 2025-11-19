import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Customers
export const customers = pgTable("customers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  gstin: text("gstin"),
});

export const insertCustomerSchema = createInsertSchema(customers).omit({ id: true });
export const updateCustomerSchema = insertCustomerSchema.partial().refine(
  data => {
    const definedFields = Object.entries(data).filter(([_, v]) => v !== undefined);
    return definedFields.length > 0;
  },
  { message: "At least one field must be provided for update" }
);
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type Customer = typeof customers.$inferSelect;

// Vendors
export const vendors = pgTable("vendors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  gstin: text("gstin"),
});

export const insertVendorSchema = createInsertSchema(vendors).omit({ id: true });
export const updateVendorSchema = insertVendorSchema.partial().refine(
  data => {
    const definedFields = Object.entries(data).filter(([_, v]) => v !== undefined);
    return definedFields.length > 0;
  },
  { message: "At least one field must be provided for update" }
);
export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type Vendor = typeof vendors.$inferSelect;

// Categories
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const updateCategorySchema = insertCategorySchema.partial().refine(
  data => {
    const definedFields = Object.entries(data).filter(([_, v]) => v !== undefined);
    return definedFields.length > 0;
  },
  { message: "At least one field must be provided for update" }
);
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Items/Products
export const items = pgTable("items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  sku: text("sku"),
  hsn: text("hsn"),
  barcode: text("barcode"),
  categoryId: varchar("category_id").references(() => categories.id),
  unit: text("unit").notNull().default("pcs"),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }).notNull(),
  sellingPrice: decimal("selling_price", { precision: 10, scale: 2 }).notNull(),
  gstRate: decimal("gst_rate", { precision: 5, scale: 2 }).notNull().default("18"),
  stock: integer("stock").notNull().default(0),
  reorderLevel: integer("reorder_level").default(10),
});

export const insertItemSchema = createInsertSchema(items).omit({ id: true });
export const updateItemSchema = insertItemSchema.partial().refine(
  data => {
    const definedFields = Object.entries(data).filter(([_, v]) => v !== undefined);
    return definedFields.length > 0;
  },
  { message: "At least one field must be provided for update" }
);
export type InsertItem = z.infer<typeof insertItemSchema>;
export type Item = typeof items.$inferSelect;

// Invoices
export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceNumber: text("invoice_number").notNull().unique(),
  customerId: varchar("customer_id").notNull().references(() => customers.id),
  date: timestamp("date").notNull().defaultNow(),
  dueDate: timestamp("due_date"),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
  tax: decimal("tax", { precision: 10, scale: 2 }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("draft"),
  paymentMode: text("payment_mode"),
  notes: text("notes"),
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({ id: true });
export const updateInvoiceSchema = insertInvoiceSchema.partial().refine(
  data => {
    const definedFields = Object.entries(data).filter(([_, v]) => v !== undefined);
    return definedFields.length > 0;
  },
  { message: "At least one field must be provided for update" }
);
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

// Invoice Items
export const invoiceItems = pgTable("invoice_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceId: varchar("invoice_id").notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  itemId: varchar("item_id").notNull().references(() => items.id),
  description: text("description"),
  quantity: integer("quantity").notNull(),
  rate: decimal("rate", { precision: 10, scale: 2 }).notNull(),
  taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
});

export const insertInvoiceItemSchema = createInsertSchema(invoiceItems).omit({ id: true });
export type InsertInvoiceItem = z.infer<typeof insertInvoiceItemSchema>;
export type InvoiceItem = typeof invoiceItems.$inferSelect;

// Stock Transactions
export const stockTransactions = pgTable("stock_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  itemId: varchar("item_id").notNull().references(() => items.id),
  type: text("type").notNull(),
  quantity: integer("quantity").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  reference: text("reference"),
  notes: text("notes"),
});

export const insertStockTransactionSchema = createInsertSchema(stockTransactions).omit({ id: true });
export type InsertStockTransaction = z.infer<typeof insertStockTransactionSchema>;
export type StockTransaction = typeof stockTransactions.$inferSelect;

// Journal Entries
export const journalEntries = pgTable("journal_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  voucherNumber: text("voucher_number").notNull().unique(),
  date: timestamp("date").notNull().defaultNow(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  type: text("type").notNull(),
});

export const insertJournalEntrySchema = createInsertSchema(journalEntries).omit({ id: true });
export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type JournalEntry = typeof journalEntries.$inferSelect;

// Payments
export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceId: varchar("invoice_id").references(() => invoices.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMode: text("payment_mode").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  reference: text("reference"),
});

export const insertPaymentSchema = createInsertSchema(payments).omit({ id: true });
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

// Expenses
export const expenses = pgTable("expenses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date").notNull().defaultNow(),
  description: text("description"),
  paymentMode: text("payment_mode"),
});

export const insertExpenseSchema = createInsertSchema(expenses).omit({ id: true });
export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type Expense = typeof expenses.$inferSelect;
