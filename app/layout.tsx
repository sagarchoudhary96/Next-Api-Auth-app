import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WebsiteHeader from "@/components/WebsiteHeader";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
import BreadcrumbNav from "@/components/BreadCrumbNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth API App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebsiteHeader />
        <BreadcrumbNav />
        <main className="p-4 flex-1 flex flex-col overflow-hidden">
          <StoreProvider>{children}</StoreProvider>
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
