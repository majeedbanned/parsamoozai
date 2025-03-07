"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Home,
  Settings2,
  Users,
  BarChart2,
  Layers,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  UserCog,
  UserPlus,
  UsersRound,
  BarChart,
  PieChart,
  LineChart,
  Bell,
  Shield,
} from "lucide-react";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  submenu?: MenuItem[];
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuCategories: MenuCategory[] = [
    {
      title: "Overview",
      items: [{ icon: Home, label: "Dashboard", href: "/" }],
    },
    {
      title: "E-commerce",
      items: [
        {
          icon: ShoppingCart,
          label: "Orders",
          submenu: [
            { icon: Package, label: "All Orders", href: "/orders" },
            { icon: Truck, label: "Shipments", href: "/shipments" },
            { icon: CreditCard, label: "Payments", href: "/payments" },
          ],
        },
        { icon: Layers, label: "Products", href: "/products" },
      ],
    },
    {
      title: "User Management",
      items: [
        {
          icon: Users,
          label: "Users",
          submenu: [
            { icon: UsersRound, label: "All Users", href: "/users" },
            { icon: UserPlus, label: "Add User", href: "/users/add" },
            { icon: UserCog, label: "Roles", href: "/users/roles" },
          ],
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          icon: BarChart2,
          label: "Reports",
          submenu: [
            { icon: BarChart, label: "Sales", href: "/analytics/sales" },
            { icon: PieChart, label: "Products", href: "/analytics/products" },
            { icon: LineChart, label: "Traffic", href: "/analytics/traffic" },
          ],
        },
      ],
    },
    {
      title: "System",
      items: [
        { icon: Settings2, label: "Settings", href: "/settings" },
        { icon: Bell, label: "Notifications", href: "/notifications" },
        { icon: Shield, label: "Security", href: "/security" },
      ],
    },
  ];

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const renderMenuItem = (item: MenuItem, isSubmenuItem = false) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedItems.includes(item.label);

    return (
      <div key={item.label}>
        <Button
          variant="ghost"
          className={`w-full justify-start ${isCollapsed ? "px-2" : "px-4"} ${
            isSubmenuItem ? "pl-8" : ""
          }`}
          onClick={() => (hasSubmenu ? toggleSubmenu(item.label) : undefined)}
          asChild={!hasSubmenu}
        >
          {hasSubmenu ? (
            <div className="flex items-center space-x-2">
              <item.icon className="h-5 w-5" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isExpanded ? "transform rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </div>
          ) : (
            <a href={item.href} className="flex items-center space-x-2">
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          )}
        </Button>
        {hasSubmenu && isExpanded && !isCollapsed && (
          <div className="ml-4 border-l pl-2 mt-1">
            {item.submenu?.map((subItem) => renderMenuItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`relative min-h-screen ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 bg-background border-r`}
    >
      <div className="flex items-center justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <Separator />
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-4 py-4">
          {menuCategories.map((category) => (
            <div key={category.title} className="px-3 py-2">
              {!isCollapsed && (
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  {category.title}
                </h2>
              )}
              <div className="space-y-1">
                {category.items.map((item) => renderMenuItem(item))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
