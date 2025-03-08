import BreadcrumbNav from "@/components/BreadCrumbNav";
import { Toaster } from "@/components/ui/sonner";
import { CloudIcon } from "lucide-react";
import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { neutraText } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Astudio App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${neutraText.className} antialiased overflow-hidden flex flex-col h-[100dvh]`}
      >
        <header className="flex justify-between items-center mb-2 p-4">
          <div className="flex items-center gap-2">
            <CloudIcon className="w-8 h-8 bg-black text-white p-1.5 rounded-lg" />
            <h1 className="text-xl font-bold">ASTUDIO APP</h1>
          </div>
        </header>
        <BreadcrumbNav />
        <main className="p-4 flex-1 flex flex-col overflow-hidden">
          <StoreProvider>{children}</StoreProvider>
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
