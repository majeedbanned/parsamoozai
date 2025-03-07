import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/noto-kufi-arabic/400.css";
import "@fontsource/noto-kufi-arabic/700.css";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DirectionProvider } from "@/components/direction-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard with collapsible sidebar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <DirectionProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </DirectionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
