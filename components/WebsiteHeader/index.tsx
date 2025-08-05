"use client";

import { CloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { PROTECTED_ROUTES } from "@/lib/constants";

export default function WebsiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = !!Cookies.get("auth_token");

  const handleAuth = () => {
    if (isLoggedIn) {
      Cookies.remove("auth_token");
      router.refresh();
      // Only redirect if on a protected route
      if (
        PROTECTED_ROUTES.some((route: string) => pathname.startsWith(route))
      ) {
        router.push("/login");
      }
    } else {
      // add redirect to the pathname
      router.push(`/login?redirect_to=${pathname}`);
    }
  };

  return (
    <header className="flex justify-between items-center mb-2 p-4">
      <div className="flex items-center gap-2">
        <CloudIcon className="w-8 h-8 bg-black text-white p-1.5 rounded-lg" />
        <h1 className="text-xl font-bold">Next Auth API App</h1>
      </div>
      <Button
        variant="outline"
        onClick={handleAuth}
        className={isLoggedIn ? "text-red-500 hover:text-red-600" : ""}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </Button>
    </header>
  );
}
