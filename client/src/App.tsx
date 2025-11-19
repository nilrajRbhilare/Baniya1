import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import NotFound from "@/pages/not-found";

import Dashboard from "@/pages/dashboard";
import CreateInvoice from "@/pages/billing/create-invoice";
import Invoices from "@/pages/billing/invoices";
import POSBilling from "@/pages/billing/pos";
import Items from "@/pages/inventory/items";
import StockIn from "@/pages/inventory/stock-in";
import Categories from "@/pages/inventory/categories";
import Ledger from "@/pages/accounting/ledger";
import Reports from "@/pages/reports";
import Settings from "@/pages/settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      
      <Route path="/billing/create-invoice" component={CreateInvoice} />
      <Route path="/billing/invoices" component={Invoices} />
      <Route path="/billing/pos" component={POSBilling} />
      <Route path="/billing/quotations" component={Invoices} />
      <Route path="/billing/sales-orders" component={Invoices} />
      <Route path="/billing/purchase-orders" component={Invoices} />
      
      <Route path="/inventory/items" component={Items} />
      <Route path="/inventory/stock-in" component={StockIn} />
      <Route path="/inventory/stock-out" component={StockIn} />
      <Route path="/inventory/categories" component={Categories} />
      <Route path="/inventory/vendors" component={Items} />
      
      <Route path="/accounting/ledger" component={Ledger} />
      <Route path="/accounting/journal" component={Ledger} />
      <Route path="/accounting/balance-sheet" component={Reports} />
      <Route path="/accounting/profit-loss" component={Reports} />
      <Route path="/accounting/cash-flow" component={Reports} />
      
      <Route path="/reports" component={Reports} />
      <Route path="/settings" component={Settings} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
                <div className="flex items-center gap-2">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <h2 className="text-sm font-medium text-muted-foreground">BizBooks</h2>
                </div>
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-y-auto p-6 bg-background">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
