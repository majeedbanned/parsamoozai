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
  GraduationCap,
} from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/utils/translations";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  translationKey: string;
  href?: string;
  submenu?: MenuItem[];
}

interface MenuCategory {
  title: string;
  translationKey: string;
  items: MenuItem[];
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { direction, language } = useLanguage();

  const menuCategories: MenuCategory[] = [
    {
      title: "Overview",
      translationKey: "menu.categories.overview",
      items: [
        {
          icon: Home,
          label: "Dashboard",
          translationKey: "menu.items.dashboard",
          href: "/",
        },
      ],
    },
    {
      title: "Students",
      translationKey: "menu.categories.students",
      items: [
        {
          icon: GraduationCap,
          label: "Students List",
          translationKey: "menu.items.studentsList",
          href: "/students",
        },
      ],
    },
    {
      title: "E-commerce",
      translationKey: "menu.categories.ecommerce",
      items: [
        {
          icon: ShoppingCart,
          label: "Orders",
          translationKey: "menu.items.orders",
          submenu: [
            {
              icon: Package,
              label: "All Orders",
              translationKey: "menu.items.allOrders",
              href: "/orders",
            },
            {
              icon: Truck,
              label: "Shipments",
              translationKey: "menu.items.shipments",
              href: "/shipments",
            },
            {
              icon: CreditCard,
              label: "Payments",
              translationKey: "menu.items.payments",
              href: "/payments",
            },
          ],
        },
        {
          icon: Layers,
          label: "Products",
          translationKey: "menu.items.products",
          href: "/products",
        },
      ],
    },
    {
      title: "User Management",
      translationKey: "menu.categories.userManagement",
      items: [
        {
          icon: Users,
          label: "Users",
          translationKey: "menu.items.users",
          submenu: [
            {
              icon: UsersRound,
              label: "All Users",
              translationKey: "menu.items.allUsers",
              href: "/users",
            },
            {
              icon: UserPlus,
              label: "Add User",
              translationKey: "menu.items.addUser",
              href: "/users/add",
            },
            {
              icon: UserCog,
              label: "Roles",
              translationKey: "menu.items.roles",
              href: "/users/roles",
            },
          ],
        },
      ],
    },
    {
      title: "Analytics",
      translationKey: "menu.categories.analytics",
      items: [
        {
          icon: BarChart2,
          label: "Reports",
          translationKey: "menu.items.reports",
          submenu: [
            {
              icon: BarChart,
              label: "Sales",
              translationKey: "menu.items.sales",
              href: "/analytics/sales",
            },
            {
              icon: PieChart,
              label: "Products",
              translationKey: "menu.items.productAnalytics",
              href: "/analytics/products",
            },
            {
              icon: LineChart,
              label: "Traffic",
              translationKey: "menu.items.traffic",
              href: "/analytics/traffic",
            },
          ],
        },
      ],
    },
    {
      title: "System",
      translationKey: "menu.categories.system",
      items: [
        {
          icon: Settings2,
          label: "Settings",
          translationKey: "menu.items.settings",
          href: "/settings",
        },
        {
          icon: Bell,
          label: "Notifications",
          translationKey: "menu.items.notifications",
          href: "/notifications",
        },
        {
          icon: Shield,
          label: "Security",
          translationKey: "menu.items.security",
          href: "/security",
        },
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
    const translatedLabel = t(item.translationKey, language);

    return (
      <div key={item.label}>
        <Button
          variant="ghost"
          className={`w-full  ${isCollapsed ? "px-2" : "px-4"} ${
            isSubmenuItem ? (direction === "rtl" ? "pr-2" : "pl-2") : ""
          } flex ${
            direction === "rtl" ? "flex-row-reverse" : "flex-row"
          } justify-between`}
          onClick={() => (hasSubmenu ? toggleSubmenu(item.label) : undefined)}
          asChild={!hasSubmenu}
        >
          {hasSubmenu ? (
            <div
              className={`flex w-full items-center ${
                direction === "rtl" ? "flex-row-reverse" : "flex-row"
              } justify-between`}
            >
              <div
                className={`flex items-center ${
                  direction === "rtl"
                    ? "flex-row-reverse gap-2"
                    : "flex-row gap-2"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{translatedLabel}</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isExpanded ? "transform rotate-180" : ""
                  } ${direction === "rtl" ? "rotate-180" : ""}`}
                />
              )}
            </div>
          ) : (
            <a
              href={item.href}
              className={`flex w-full   ${
                direction === "rtl"
                  ? "flex-row-reverse gap-2"
                  : "flex-row gap-2"
              }`}
            >
              <div
                className={`flex w-full   ${
                  direction === "rtl"
                    ? "flex-row-reverse gap-2"
                    : "flex-row gap-2"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{translatedLabel}</span>}
              </div>
            </a>
          )}
        </Button>
        {hasSubmenu && isExpanded && !isCollapsed && (
          <div
            className={`mt-1 ${
              direction === "rtl"
                ? "border-r border-r-border pr-4 mr-4"
                : "border-l border-l-border pl-4 ml-4"
            }`}
          >
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
      } transition-all duration-300 bg-background border-r ${
        direction === "rtl" ? "border-r-0 border-l" : ""
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <LanguageSwitcher />
        <Button
          variant="ghost"
          size="icon"
          className={`${direction === "rtl" ? "rotate-180" : ""}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {direction === "rtl" ? (
            isCollapsed ? (
              <ChevronLeft />
            ) : (
              <ChevronRight />
            )
          ) : isCollapsed ? (
            <ChevronRight />
          ) : (
            <ChevronLeft />
          )}
        </Button>
      </div>
      <Separator />
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-4 py-4">
          {menuCategories.map((category) => (
            <div key={category.title} className="px-3 py-2">
              {!isCollapsed && (
                <h2
                  className={`mb-2 px-4 text-lg font-semibold text-blue-400 tracking-tight ${
                    direction === "rtl" ? "text-right" : "text-left"
                  }`}
                >
                  {t(category.translationKey, language)}
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
