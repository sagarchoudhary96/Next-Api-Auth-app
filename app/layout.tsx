import BreadcrumbNav from "@/components/BreadCrumbNav";
import { Toaster } from "@/components/ui/sonner";
import { CloudIcon } from "lucide-react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});

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
        className={`${montserrat.className} antialiased overflow-hidden flex flex-col h-[100dvh]`}
      >
        <header className="flex justify-between items-center mb-2 p-4">
          <div className="flex items-center gap-2">
            <CloudIcon className="w-8 h-8 bg-black text-white p-1.5 rounded-lg" />
            <h1 className="text-xl font-bold">Astudio APP</h1>
          </div>
        </header>
        <BreadcrumbNav />
        <main className="p-4 flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
