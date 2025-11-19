import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Package,
  Calculator,
  FileBarChart,
  Settings,
  Receipt,
  ClipboardList,
  Warehouse,
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Billing",
    icon: FileText,
    items: [
      { title: "Create Invoice", url: "/billing/create-invoice", icon: Receipt },
      { title: "Invoices", url: "/billing/invoices", icon: FileText },
      { title: "POS Billing", url: "/billing/pos", icon: ShoppingCart },
      { title: "Quotations", url: "/billing/quotations", icon: ClipboardList },
      { title: "Sales Orders", url: "/billing/sales-orders", icon: ClipboardList },
      { title: "Purchase Orders", url: "/billing/purchase-orders", icon: ClipboardList },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    items: [
      { title: "Items", url: "/inventory/items", icon: Package },
      { title: "Stock In", url: "/inventory/stock-in", icon: TrendingUp },
      { title: "Stock Out", url: "/inventory/stock-out", icon: TrendingUp },
      { title: "Categories", url: "/inventory/categories", icon: ClipboardList },
      { title: "Vendors", url: "/inventory/vendors", icon: Users },
    ],
  },
  {
    title: "Accounting",
    icon: Calculator,
    items: [
      { title: "Ledger", url: "/accounting/ledger", icon: BookOpen },
      { title: "Journal Entries", url: "/accounting/journal", icon: FileText },
      { title: "Balance Sheet", url: "/accounting/balance-sheet", icon: FileBarChart },
      { title: "Profit & Loss", url: "/accounting/profit-loss", icon: TrendingUp },
      { title: "Cash Flow", url: "/accounting/cash-flow", icon: DollarSign },
    ],
  },
  {
    title: "Reports",
    icon: FileBarChart,
    url: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-6 py-4 border-b border-sidebar-border">
          <h1 className="text-lg font-semibold text-sidebar-foreground">BizBooks</h1>
          <p className="text-xs text-muted-foreground">Business Management</p>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) =>
                item.items ? (
                  <Collapsible key={item.title} asChild defaultOpen={location.startsWith(`/${item.title.toLowerCase()}`)}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton data-testid={`nav-${item.title.toLowerCase()}`}>
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 w-4 h-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location === subItem.url}
                                data-testid={`nav-${subItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                <Link href={subItem.url}>
                                  <subItem.icon className="w-4 h-4" />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                      data-testid={`nav-${item.title.toLowerCase()}`}
                    >
                      <Link href={item.url!}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
