import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { 
  insertCustomerSchema, updateCustomerSchema,
  insertVendorSchema, updateVendorSchema,
  insertCategorySchema, updateCategorySchema,
  insertItemSchema, updateItemSchema,
  insertInvoiceSchema, updateInvoiceSchema,
  insertInvoiceItemSchema,
  insertStockTransactionSchema, insertPaymentSchema, insertExpenseSchema
} from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Customers
  app.get("/api/customers", async (req, res) => {
    try {
      const customers = await storage.getCustomers();
      res.json(customers);
    } catch (error) {
      console.error('Fetch customers error:', error);
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  });

  app.get("/api/customers/:id", async (req, res) => {
    try {
      const customer = await storage.getCustomer(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(customer);
    } catch (error) {
      console.error('Fetch customer error:', error);
      res.status(500).json({ error: "Failed to fetch customer" });
    }
  });

  app.post("/api/customers", async (req, res) => {
    try {
      const validatedData = insertCustomerSchema.parse(req.body);
      const customer = await storage.createCustomer(validatedData);
      res.status(201).json(customer);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid customer data" });
      } else {
        console.error('Customer creation error:', error);
        res.status(500).json({ error: "Failed to create customer" });
      }
    }
  });

  app.patch("/api/customers/:id", async (req, res) => {
    try {
      const validatedData = updateCustomerSchema.parse(req.body);
      const customer = await storage.updateCustomer(req.params.id, validatedData);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(customer);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid customer data" });
      } else {
        console.error('Customer update error:', error);
        res.status(500).json({ error: "Failed to update customer" });
      }
    }
  });

  app.delete("/api/customers/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteCustomer(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Delete customer error:', error);
      res.status(500).json({ error: "Failed to delete customer" });
    }
  });

  // Vendors
  app.get("/api/vendors", async (req, res) => {
    try {
      const vendors = await storage.getVendors();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vendors" });
    }
  });

  app.post("/api/vendors", async (req, res) => {
    try {
      const validatedData = insertVendorSchema.parse(req.body);
      const vendor = await storage.createVendor(validatedData);
      res.status(201).json(vendor);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid vendor data" });
      } else {
        console.error('Vendor creation error:', error);
        res.status(500).json({ error: "Failed to create vendor" });
      }
    }
  });

  app.patch("/api/vendors/:id", async (req, res) => {
    try {
      const validatedData = updateVendorSchema.parse(req.body);
      const vendor = await storage.updateVendor(req.params.id, validatedData);
      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }
      res.json(vendor);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid vendor data" });
      } else {
        console.error('Vendor update error:', error);
        res.status(500).json({ error: "Failed to update vendor" });
      }
    }
  });

  app.delete("/api/vendors/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteVendor(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Vendor not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete vendor" });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid category data" });
      } else {
        console.error('Category creation error:', error);
        res.status(500).json({ error: "Failed to create category" });
      }
    }
  });

  app.patch("/api/categories/:id", async (req, res) => {
    try {
      const validatedData = updateCategorySchema.parse(req.body);
      const category = await storage.updateCategory(req.params.id, validatedData);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid category data" });
      } else {
        console.error('Category update error:', error);
        res.status(500).json({ error: "Failed to update category" });
      }
    }
  });

  app.delete("/api/categories/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteCategory(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  // Items
  app.get("/api/items", async (req, res) => {
    try {
      const items = await storage.getItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch items" });
    }
  });

  app.get("/api/items/low-stock", async (req, res) => {
    try {
      const items = await storage.getLowStockItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch low stock items" });
    }
  });

  app.get("/api/items/:id", async (req, res) => {
    try {
      const item = await storage.getItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch item" });
    }
  });

  app.post("/api/items", async (req, res) => {
    try {
      const validatedData = insertItemSchema.parse(req.body);
      const item = await storage.createItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid item data" });
      } else {
        console.error('Item creation error:', error);
        res.status(500).json({ error: "Failed to create item" });
      }
    }
  });

  app.patch("/api/items/:id", async (req, res) => {
    try {
      const validatedData = updateItemSchema.parse(req.body);
      const item = await storage.updateItem(req.params.id, validatedData);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid item data" });
      } else {
        console.error('Item update error:', error);
        res.status(500).json({ error: "Failed to update item" });
      }
    }
  });

  app.delete("/api/items/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteItem(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  });

  // Invoices
  app.get("/api/invoices", async (req, res) => {
    try {
      const invoices = await storage.getInvoices();
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.get("/api/invoices/next-number", async (req, res) => {
    try {
      const nextNumber = await storage.getNextInvoiceNumber();
      res.json({ invoiceNumber: nextNumber });
    } catch (error) {
      res.status(500).json({ error: "Failed to get next invoice number" });
    }
  });

  app.get("/api/invoices/:id", async (req, res) => {
    try {
      const invoice = await storage.getInvoice(req.params.id);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      res.json(invoice);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoice" });
    }
  });

  app.get("/api/invoices/:id/items", async (req, res) => {
    try {
      const items = await storage.getInvoiceItems(req.params.id);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoice items" });
    }
  });

  app.post("/api/invoices", async (req, res) => {
    try {
      const { items: invoiceItemsData, ...invoiceData } = req.body;
      
      // Validate invoice data
      const validatedInvoice = insertInvoiceSchema.parse(invoiceData);
      
      // Validate invoice items
      const validatedItems = invoiceItemsData && Array.isArray(invoiceItemsData)
        ? invoiceItemsData.map((item: any) => insertInvoiceItemSchema.parse(item))
        : [];
      
      // Create invoice with items transactionally
      const invoice = await storage.createInvoiceWithItems(validatedInvoice, validatedItems);
      
      res.status(201).json(invoice);
    } catch (error) {
      console.error('Invoice creation error:', error);
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid invoice data" });
      } else {
        res.status(500).json({ error: "Failed to create invoice" });
      }
    }
  });

  app.patch("/api/invoices/:id", async (req, res) => {
    try {
      const validatedData = updateInvoiceSchema.parse(req.body);
      const invoice = await storage.updateInvoice(req.params.id, validatedData);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      res.json(invoice);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid invoice data" });
      } else {
        console.error('Invoice update error:', error);
        res.status(500).json({ error: "Failed to update invoice" });
      }
    }
  });

  app.delete("/api/invoices/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteInvoice(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete invoice" });
    }
  });

  // Stock Transactions
  app.get("/api/stock-transactions", async (req, res) => {
    try {
      const itemId = req.query.itemId as string | undefined;
      const transactions = await storage.getStockTransactions(itemId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stock transactions" });
    }
  });

  app.post("/api/stock-transactions", async (req, res) => {
    try {
      const validatedData = insertStockTransactionSchema.parse(req.body);
      const transaction = await storage.createStockTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid stock transaction data" });
      } else {
        console.error('Stock transaction creation error:', error);
        res.status(500).json({ error: "Failed to create stock transaction" });
      }
    }
  });

  // Payments
  app.get("/api/payments", async (req, res) => {
    try {
      const invoiceId = req.query.invoiceId as string | undefined;
      const payments = await storage.getPayments(invoiceId);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  });

  app.post("/api/payments", async (req, res) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(validatedData);
      res.status(201).json(payment);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid payment data" });
      } else {
        console.error('Payment creation error:', error);
        res.status(500).json({ error: "Failed to create payment" });
      }
    }
  });

  // Expenses
  app.get("/api/expenses", async (req, res) => {
    try {
      const expenses = await storage.getExpenses();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch expenses" });
    }
  });

  app.post("/api/expenses", async (req, res) => {
    try {
      const validatedData = insertExpenseSchema.parse(req.body);
      const expense = await storage.createExpense(validatedData);
      res.status(201).json(expense);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid expense data" });
      } else {
        console.error('Expense creation error:', error);
        res.status(500).json({ error: "Failed to create expense" });
      }
    }
  });

  // Dashboard Stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
