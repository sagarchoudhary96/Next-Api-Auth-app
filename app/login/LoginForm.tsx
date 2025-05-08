"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { PAGE_TITLES, PROTECTED_ROUTES } from "@/lib/constants";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent className={className} {...props} />
    </Suspense>
  );
}

function LoginFormContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("");

  const redirectTo = searchParams.get("redirect_to");
  const description =
    redirectTo && PROTECTED_ROUTES.includes(redirectTo)
      ? `You need to login to access ${PAGE_TITLES[
          redirectTo
        ].toLowerCase()} page`
      : "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll use a mock authentication
      if (
        data.email === "test@example.com" &&
        data.password === "password123"
      ) {
        // Set dummy authentication cookie
        Cookies.set("auth_token", "mock_token", { expires: 7 });

        // Get the redirect path from URL parameters or default to home
        const redirectTo = searchParams.get("redirect_to") || "/";
        router.push(redirectTo);
        router.refresh();
      } else {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login: " + err);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
