import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

import { AuthUseCases } from "@/useCases/Auth";

import { ACCESS_TOKEN } from "@/constants/config";
import { ROUTES } from "@/constants/routes";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
  email: z.email().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginFeature: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutate = AuthUseCases.useLogin();

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate.mutate(values, {
      onSuccess: (data) => {
        if (data.data?.access_token) {
          Cookies.set(ACCESS_TOKEN, data.data.access_token);
          window.location.href = ROUTES.HOME;
        }
      },
    });
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-4 py-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@dev.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-1">
            <p className="text-sm">Don't have an account? </p>
            <Link
              to={ROUTES.AUTH.REGISTER}
              className={cn(
                buttonVariants({ variant: "link", className: "px-0" }),
              )}
            >
              Register here
            </Link>
          </div>

          <Button type="submit" disabled={mutate.isPending}>
            {mutate.isPending && <Loader2 className="animate-spin" />}Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginFeature;
